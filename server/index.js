import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as cheerio from 'cheerio';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Helper function to convert external image to base64 proxy
app.get('/api/proxy-image', async (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) return res.status(400).send('Image URL is required');

  try {
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    const contentType = response.headers['content-type'] || 'image/png';
    const base64 = Buffer.from(response.data, 'binary').toString('base64');
    const dataUri = `data:${contentType};base64,${base64}`;

    res.json({ dataUri });
  } catch (error) {
    console.error('Image proxy error:', error.message);
    res.status(500).json({ error: 'Failed to proxy image' });
  }
});

// Endpoint to scrape cricket / sport scorecard from URL
app.post('/api/scrape-url', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    const $ = cheerio.load(response.data);
    let scrapedData = {
      matchTitle: '',
      tournament: '',
      venue: '',
      matchDate: new Date().toISOString().split('T')[0],
      resultText: '',
      team1: { name: 'Team A', shortCode: 'TMA', score: '', overs: '' },
      team2: { name: 'Team B', shortCode: 'TMB', score: '', overs: '' },
      highlights: [],
      topBatsmen: [],
      topBowlers: [],
      mvp: { name: '', team: '', role: 'Man of the Match', stats: '' }
    };

    // Parse metadata like page title
    const pageTitle = $('title').text().trim() || $('h1').first().text().trim();
    if (pageTitle) {
      scrapedData.matchTitle = pageTitle.split('|')[0].trim();
    }

    // Try parsing open graph / meta descriptions
    const description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || '';
    if (description) {
      scrapedData.resultText = description.split('.')[0] || description;
    }

    // Look for common score patterns in text e.g. "IND 176/7 (20) vs SA 169/8 (20)"
    const fullText = $('body').text();
    const scoreMatches = [...fullText.matchAll(/([A-Z]{2,4}|[A-Z][a-z]+(?:\s[A-Z][a-z]+)?)\s+(\d{1,3}\/\d{1,2}|\d{1,3})\s*(?:\((\d{1,2}(?:\.\d)?)\s*ov(?:ers)?\))?/gi)];
    
    if (scoreMatches.length >= 2) {
      scrapedData.team1.name = scoreMatches[0][1] || 'Team 1';
      scrapedData.team1.shortCode = (scoreMatches[0][1] || 'T1').slice(0, 3).toUpperCase();
      scrapedData.team1.score = scoreMatches[0][2] || '';
      scrapedData.team1.overs = scoreMatches[0][3] || '20.0';

      scrapedData.team2.name = scoreMatches[1][1] || 'Team 2';
      scrapedData.team2.shortCode = (scoreMatches[1][1] || 'T2').slice(0, 3).toUpperCase();
      scrapedData.team2.score = scoreMatches[1][2] || '';
      scrapedData.team2.overs = scoreMatches[1][3] || '20.0';
    }

    res.json({ success: true, data: scrapedData });
  } catch (err) {
    console.error('Scraping error:', err.message);
    res.status(500).json({ 
      error: 'Could not fetch data directly from this URL due to anti-bot protection. Try pasting the raw scorecard text instead!' 
    });
  }
});

// Endpoint to parse raw text scorecard input
app.post('/api/parse-text', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text input is required' });
  }

  try {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    
    let parsed = {
      matchTitle: lines[0] || 'Match Summary',
      resultText: '',
      team1: { name: '', shortCode: '', score: '', overs: '' },
      team2: { name: '', shortCode: '', score: '', overs: '' },
      highlights: [],
      topBatsmen: [],
      topBowlers: [],
      mvp: { name: '', team: '', role: 'Man of the Match', stats: '' }
    };

    // Extract score lines using Regex
    const scoreRegex = /([A-Za-z\s]+)\s+(\d{1,3}(?:\/\d{1,2})?)\s*(?:\((\d{1,2}(?:\.\d)?)\))?/g;
    let matches = [];
    let match;
    while ((match = scoreRegex.exec(text)) !== null) {
      matches.push(match);
    }

    if (matches.length >= 1) {
      parsed.team1.name = matches[0][1].trim();
      parsed.team1.shortCode = matches[0][1].trim().slice(0, 3).toUpperCase();
      parsed.team1.score = matches[0][2];
      parsed.team1.overs = matches[0][3] || '20.0';
    }
    if (matches.length >= 2) {
      parsed.team2.name = matches[1][1].trim();
      parsed.team2.shortCode = matches[1][1].trim().slice(0, 3).toUpperCase();
      parsed.team2.score = matches[1][2];
      parsed.team2.overs = matches[1][3] || '20.0';
    }

    // Extract result line e.g., "won by 5 wickets", "won by 12 runs"
    const resultMatch = text.match(/([A-Za-z\s]+\s+won\s+by\s+[^\n.]+)/i);
    if (resultMatch) {
      parsed.resultText = resultMatch[1].trim();
    }

    // Extract key stats/players from lines
    lines.forEach(line => {
      // Check for player performance like "Virat Kohli 76 (59)"
      const batMatch = line.match(/([A-Z][a-z]+\s+[A-Z][a-z]+)\s+(\d{1,3})\s*\((?:balls?\s*)?(\d{1,3})\)/i);
      if (batMatch && parsed.topBatsmen.length < 2) {
        parsed.topBatsmen.push({
          name: batMatch[1],
          team: parsed.team1.name || 'Team 1',
          runs: parseInt(batMatch[2]),
          balls: parseInt(batMatch[3]),
          fours: 4,
          sixes: 2,
          sr: (parseInt(batMatch[2]) / parseInt(batMatch[3]) * 100).toFixed(1)
        });
      }

      // Check for bowling performance like "Jasprit Bumrah 4-0-18-2" or "Bumrah 2/18"
      const bowlMatch = line.match(/([A-Z][a-z]+\s+[A-Z][a-z]+|\b[A-Z][a-z]+\b)\s+(\d{1,2})\/(\d{1,3})/i);
      if (bowlMatch && parsed.topBowlers.length < 2) {
        parsed.topBowlers.push({
          name: bowlMatch[1],
          team: parsed.team1.name || 'Team 1',
          overs: '4.0',
          wickets: parseInt(bowlMatch[2]),
          runs: parseInt(bowlMatch[3]),
          economy: (parseInt(bowlMatch[3]) / 4).toFixed(2)
        });
      }
    });

    res.json({ success: true, data: parsed });
  } catch (err) {
    res.status(500).json({ error: 'Failed to parse text input' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
