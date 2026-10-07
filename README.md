# 🏆 MatchPulse - Instant Match Report & Graphics Generator

A simple, user-friendly, and professional **Match Report Generator** designed for non-technical users to convert match details, scores, and player photos into single-page graphics, downloaded instantly as high-resolution **PNG/JPEG images** or **PDF documents**.

---

## 🌟 Key Features

1. **Standard Input & Manual Form Builder**:
   - Easily enter match date, title, tournament, venue, toss details, and final result summary.
   - Enter team names, final scores, overs, and upload custom team logos.

2. **Auto Scorecard Scraper & Raw Text Parser**:
   - **URL Scraper**: Paste an ESPN Cricinfo / Cricbuzz / Web match link to automatically pull match title, venue, scores, and player statistics.
   - **Raw Text Parser**: Paste raw scorecard text from anywhere and auto-extract scores, player runs, wickets, and highlights.

3. **MVP & Top Performer Cards**:
   - **Man of the Match / MVP**: Name, team, role title, custom stats line, and photo uploader (drag & drop / file browse / URL).
   - **Top Batsmen & Bowlers**: Track top 2 batsmen (Runs, Balls, 4s, 6s, Strike Rate) and top 2 bowlers (Wickets, Runs, Overs, Economy) with photo options.

4. **Key Match Moments & Highlights**:
   - Add dynamic bullet points detailing turning points, key catches, or match-winning overs.

5. **4 Broadcast-Grade Graphic Templates**:
   - **Broadcast Dark (TV Style)**: Ultra-sleek TV sports broadcast styling with dynamic neon accents and scoreboard hero card.
   - **Classic Print (Editorial)**: Clean, high-contrast sports magazine layout.
   - **Champions Gold (Trophy Edition)**: Royal dark navy theme with rich gold gradient borders.
   - **Neon Cyber (Modern Esports)**: High-energy dark mode with cyan and emerald neon glow effects.

6. **Flexible Layout Aspect Ratios**:
   - `A4 Vertical`: Ideal for PDF printing and official match records.
   - `1:1 Square`: Optimized for Instagram feed posts.
   - `4:5 Portrait`: Optimized for Mobile & Social Stories.
   - `16:9 Landscape`: Optimized for TV & Web broadcast banners.

7. **Export Capabilities**:
   - ⚡ **One-Click Download PNG** (High-DPI Retina render).
   - 📄 **One-Click Download PDF** (Single-page document).

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Application (Server + Frontend)
```bash
npm run dev
```

- **Frontend Application**: `http://localhost:3000`
- **Scraper & Image Proxy Backend**: `http://localhost:5000`

---

## 📁 Project Structure

```
match-report/
├── package.json              # App configuration & scripts
├── vite.config.js            # Vite bundler setup
├── postcss.config.cjs        # PostCSS configuration
├── server/
│   └── index.js              # Express backend for scraping & image CORS proxying
├── src/
│   ├── App.jsx               # Main container
│   ├── main.jsx              # React entry point
│   ├── index.css             # Tailwind CSS styles
│   ├── components/
│   │   ├── Header.jsx        # Top navbar with sample demo presets
│   │   ├── MatchDetailsForm.jsx # Multi-tab input builder form
│   │   ├── ScraperModal.jsx  # URL scraper & text parser modal
│   │   ├── ReportPreview.jsx # Live report preview canvas & exporter
│   │   └── templates/
│   │       ├── BroadcastDarkTemplate.jsx  # TV Broadcast style
│   │       ├── ClassicLightTemplate.jsx   # Editorial magazine style
│   │       ├── ChampionsGoldTemplate.jsx  # Luxury Gold trophy style
│   │       └── NeonCyberTemplate.jsx      # Esports Neon style
│   └── utils/
│       ├── sampleData.js     # Preloaded demo matches (T20 World Cup, IPL Thriller)
│       └── exporter.js       # html2canvas & jsPDF rendering engine
```

---

## 💡 How to Use

1. Launch the app using `npm run dev`.
2. Click **⚡ Load Demo Matches** in the top bar to explore instant preloaded matches (e.g. *T20 World Cup Final 2024*).
3. Or click **✨ Auto Scrape / Paste** to auto-fill match details from a Cricinfo URL or pasted text summary.
4. Modify any field, upload team logos and MVP photos on the left panel.
5. Watch the live 1-page report update in real-time on the right panel.
6. Select your preferred **Design Template** and **Layout Ratio**.
7. Click **Download PNG** or **Download PDF** to export your graphic!
