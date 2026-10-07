import React from 'react';
import { SAMPLE_MATCHES } from '../utils/sampleData';

export default function Header({ currentView, onToggleView, onSelectPreset, onOpenScraper }) {
  return (
    <header className="border-b-2 border-[#0f172a] bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* BRAND IDENTITY */}
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => onToggleView('landing')}
            className="flex items-baseline space-x-2 text-left focus:outline-none group"
          >
            <span className="text-2xl md:text-3xl font-black uppercase font-display tracking-tight text-[#0f172a] group-hover:text-[#dc2626] transition">
              MATCHDAY
            </span>
            <span className="text-xs font-mono text-[#dc2626] font-bold hidden sm:inline">
              PRO
            </span>
          </button>
          <span className="text-xs font-medium text-slate-500 hidden md:inline border-l border-slate-300 pl-4 italic">
            "Your match. Your story."
          </span>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-black uppercase tracking-wider text-[#0f172a]">
          <button 
            onClick={() => onToggleView('studio')} 
            className={`hover:text-[#dc2626] transition ${currentView === 'studio' ? 'text-[#dc2626] underline underline-offset-4' : ''}`}
          >
            CREATE REPORT
          </button>
          <button 
            onClick={() => onToggleView('landing')} 
            className={`hover:text-[#dc2626] transition ${currentView === 'landing' ? 'text-[#dc2626] underline underline-offset-4' : ''}`}
          >
            TEMPLATES
          </button>
          <a href="#showcase" className="hover:text-[#dc2626] transition">
            ABOUT
          </a>
        </nav>

        {/* RIGHT ACTION CONTROLS */}
        <div className="flex items-center space-x-3">
          {currentView === 'studio' && (
            <select
              onChange={(e) => {
                if (e.target.value && SAMPLE_MATCHES[e.target.value]) {
                  onSelectPreset(SAMPLE_MATCHES[e.target.value]);
                }
              }}
              defaultValue=""
              className="px-2.5 py-1.5 border border-slate-300 bg-slate-50 text-xs font-bold uppercase text-[#0f172a] outline-none cursor-pointer hidden sm:block"
            >
              <option value="" disabled>LOAD PRESET MATCH...</option>
              <option value="t20_wc_final">T20 WC FINAL 2024</option>
              <option value="ipl_thriller">IPL THRILLER DERBY</option>
            </select>
          )}

          <button
            onClick={() => onToggleView(currentView === 'studio' ? 'landing' : 'studio')}
            className="px-5 py-2.5 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-black text-xs uppercase tracking-wider transition rounded-none"
          >
            {currentView === 'studio' ? 'LANDING PAGE' : 'CREATE REPORT'}
          </button>
        </div>
      </div>
    </header>
  );
}
