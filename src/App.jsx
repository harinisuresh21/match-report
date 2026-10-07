import React, { useState } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import MatchDetailsForm from './components/MatchDetailsForm';
import ReportPreview from './components/ReportPreview';
import ScraperModal from './components/ScraperModal';
import { SAMPLE_MATCHES } from './utils/sampleData';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' or 'studio'
  const [matchData, setMatchData] = useState(SAMPLE_MATCHES.t20_wc_final);
  const [isScraperOpen, setIsScraperOpen] = useState(false);

  const handleDataFetched = (fetchedData) => {
    setMatchData((prev) => ({
      ...prev,
      ...fetchedData,
      team1: { ...prev.team1, ...fetchedData.team1 },
      team2: { ...prev.team2, ...fetchedData.team2 },
      mvp: { ...prev.mvp, ...fetchedData.mvp },
      topBatsmen: fetchedData.topBatsmen?.length ? fetchedData.topBatsmen : prev.topBatsmen,
      topBowlers: fetchedData.topBowlers?.length ? fetchedData.topBowlers : prev.topBowlers,
    }));
  };

  const handleReset = () => {
    setMatchData({
      matchTitle: '',
      tournament: '',
      matchDate: new Date().toISOString().split('T')[0],
      venue: '',
      tossWinner: '',
      tossDecision: 'Batting',
      resultText: '',
      team1: { name: 'Team A', score: '0/0', overs: '0.0', logo: '' },
      team2: { name: 'Team B', score: '0/0', overs: '0.0', logo: '' },
      mvp: { name: '', role: 'Man of the Match', stats: '', photo: '' },
      topBatsmen: [
        { name: '', team: '', runs: 0, balls: 0, fours: 0, sixes: 0, sr: 0 },
        { name: '', team: '', runs: 0, balls: 0, fours: 0, sixes: 0, sr: 0 }
      ],
      topBowlers: [
        { name: '', team: '', overs: '0', wickets: 0, runs: 0, economy: '0.0' },
        { name: '', team: '', overs: '0', wickets: 0, runs: 0, economy: '0.0' }
      ],
      highlights: ['']
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#0f172a] flex flex-col font-sans selection:bg-[#dc2626] selection:text-white">
      {/* Top Header */}
      <Header
        currentView={currentView}
        onToggleView={(view) => setCurrentView(view)}
        onSelectPreset={(preset) => setMatchData(preset)}
        onOpenScraper={() => setIsScraperOpen(true)}
      />

      {/* Main View Router */}
      {currentView === 'landing' ? (
        <LandingPage 
          onGoToStudio={() => setCurrentView('studio')}
          onSelectPreset={(preset) => {
            setMatchData(preset);
            setCurrentView('studio');
          }}
        />
      ) : (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Editor Column with Divider */}
            <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r-2 border-slate-200 pb-8 lg:pb-0">
              <MatchDetailsForm
                data={matchData}
                onChange={setMatchData}
                onOpenScraper={() => setIsScraperOpen(true)}
                onResetPreset={handleReset}
              />
            </div>

            {/* Right Dominant Preview Column */}
            <div className="lg:col-span-7 sticky top-24">
              <ReportPreview data={matchData} />
            </div>
          </div>
        </main>
      )}

      {/* Auto Scraper Modal */}
      <ScraperModal
        isOpen={isScraperOpen}
        onClose={() => setIsScraperOpen(false)}
        onDataFetched={handleDataFetched}
      />
    </div>
  );
}
