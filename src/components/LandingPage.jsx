import React from 'react';
import EditorialTemplate from './templates/EditorialTemplate';
import NightMatchTemplate from './templates/NightMatchTemplate';
import TournamentTemplate from './templates/TournamentTemplate';
import { SAMPLE_MATCHES } from '../utils/sampleData';

export default function LandingPage({ onGoToStudio, onSelectPreset }) {
  const sample1 = SAMPLE_MATCHES.t20_wc_final;
  const sample2 = SAMPLE_MATCHES.ipl_thriller;

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#0f172a] font-sans selection:bg-[#dc2626] selection:text-white">
      {/* HERO SECTION */}
      <section className="border-b border-slate-200 bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-block px-3 py-1 bg-red-50 border border-red-200 text-[#dc2626] text-xs font-black uppercase tracking-[0.2em]">
                SPORTS MEDIA PUBLISHING STUDIO
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight font-display text-[#0f172a] leading-none">
                YOUR MATCH.<br />
                <span className="text-[#dc2626]">YOUR STORY.</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-600 font-medium max-w-xl leading-relaxed">
                Turn match statistics into a professional report worth sharing. Broadcast-ready single-page graphics for clubs, leagues, and tournaments.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onGoToStudio}
                  className="px-8 py-4 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-black text-sm uppercase tracking-wider transition shadow-sm rounded-none"
                >
                  CREATE MATCH REPORT
                </button>

                <a
                  href="#showcase"
                  className="px-8 py-4 bg-white border-2 border-[#0f172a] hover:bg-[#0f172a] hover:text-white text-[#0f172a] font-black text-sm uppercase tracking-wider transition rounded-none"
                >
                  VIEW EXAMPLE
                </a>
              </div>
            </div>

            {/* Right Hero Preview Graphic */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-[500px] shadow-2xl border-4 border-[#0f172a] bg-white transform hover:scale-[1.01] transition duration-300">
                <EditorialTemplate data={sample1} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPORTS REPORT SHOWCASE SECTION */}
      <section id="showcase" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b-2 border-[#0f172a] pb-4 mb-12 flex justify-between items-end">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#dc2626] block mb-1">
              GALLERY OF RECENT REPORTS
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase font-display text-[#0f172a]">
              FINISHED MATCH POSTERS
            </h2>
          </div>
          <button
            onClick={onGoToStudio}
            className="hidden sm:inline-block text-xs font-black uppercase tracking-wider text-[#dc2626] hover:underline"
          >
            CREATE YOUR OWN REPORT →
          </button>
        </div>

        {/* 3 Finished Sports Poster Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Poster 1: Editorial Style */}
          <div className="space-y-4">
            <div className="border-2 border-slate-900 shadow-lg bg-white overflow-hidden">
              <EditorialTemplate data={sample1} />
            </div>
            <div className="p-2 border-l-2 border-[#dc2626]">
              <span className="text-xs font-black uppercase tracking-widest text-[#0f172a] block">01 EDITORIAL STYLE</span>
              <p className="text-xs text-slate-500">Clean magazine print layout for formal league finals.</p>
            </div>
          </div>

          {/* Poster 2: Night Match Style */}
          <div className="space-y-4">
            <div className="border-2 border-slate-900 shadow-lg bg-[#090d16] overflow-hidden">
              <NightMatchTemplate data={sample2} />
            </div>
            <div className="p-2 border-l-2 border-[#dc2626]">
              <span className="text-xs font-black uppercase tracking-widest text-[#0f172a] block">02 NIGHT MATCH STYLE</span>
              <p className="text-xs text-slate-500">High-contrast dark theme for evening games.</p>
            </div>
          </div>

          {/* Poster 3: Tournament Style */}
          <div className="space-y-4">
            <div className="border-2 border-slate-900 shadow-lg bg-white overflow-hidden">
              <TournamentTemplate data={sample1} />
            </div>
            <div className="p-2 border-l-2 border-[#dc2626]">
              <span className="text-xs font-black uppercase tracking-widest text-[#0f172a] block">03 TOURNAMENT STYLE</span>
              <p className="text-xs text-slate-500">Structured poster appearance for championship bulletins.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BOTTOM BANNER */}
      <section className="bg-[#0f172a] text-white py-16 border-t-4 border-[#dc2626]">
        <div className="max-w-5xl mx-auto text-center px-4 space-y-6">
          <h2 className="text-4xl md:text-5xl font-black uppercase font-display tracking-tight">
            READY TO PUBLISH YOUR MATCH REPORT?
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm font-medium">
            Join sports academies, tournament organizers, and amateur leagues generating broadcast-grade match graphics in seconds.
          </p>
          <div>
            <button
              onClick={onGoToStudio}
              className="px-10 py-4 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-black text-sm uppercase tracking-wider transition rounded-none"
            >
              OPEN MATCH REPORT STUDIO
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
