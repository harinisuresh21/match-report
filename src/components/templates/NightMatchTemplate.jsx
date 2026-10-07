import React from 'react';

export default function NightMatchTemplate({ data }) {
  const team1 = data.team1 || {};
  const team2 = data.team2 || {};
  const mvp = data.mvp || {};
  const topBatsmen = data.topBatsmen || [];
  const topBowlers = data.topBowlers || [];
  const highlights = data.highlights || [];

  return (
    <div 
      className="w-full bg-[#090d16] text-white p-8 md:p-10 flex flex-col justify-between shadow-2xl border border-slate-800 font-sans select-none relative overflow-hidden"
      style={{ minHeight: '980px' }}
    >
      {/* Accent Top Border */}
      <div className="absolute top-0 inset-x-0 h-2 bg-[#dc2626]" />

      <div>
        {/* HEADER */}
        <div className="border-b border-slate-800 pb-5 mb-6 flex justify-between items-end">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#dc2626] font-mono block mb-1">
              NIGHT MATCH RECAP // {data.tournament || 'CRICKET CHAMPIONSHIP'}
            </span>
            <h1 className="text-3xl md:text-4xl font-black uppercase font-display tracking-tight text-white leading-none">
              {data.matchTitle || 'OFFICIAL MATCH REPORT'}
            </h1>
          </div>
          <div className="text-right text-xs font-mono text-slate-400">
            <div>{data.matchDate || '07 OCT 2026'}</div>
            <div className="text-slate-500 mt-0.5">{data.venue || 'Stadium'}</div>
          </div>
        </div>

        {/* HERO SCOREBOARD */}
        <div className="bg-[#111827] border border-slate-800 rounded-none p-6 mb-8 relative">
          <div className="grid grid-cols-12 items-center gap-4">
            {/* Team 1 */}
            <div className="col-span-5 flex items-center space-x-4">
              <div className="w-14 h-14 bg-slate-900 border border-slate-800 p-2 flex items-center justify-center shrink-0">
                {team1.logo ? (
                  <img src={team1.logo} alt={team1.name} className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="font-black text-slate-500 text-sm">{team1.name?.slice(0, 3).toUpperCase() || 'T1'}</span>
                )}
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white font-condensed">
                  {team1.name || 'TEAM 1'}
                </h2>
                <div className="text-3xl md:text-4xl font-black text-[#dc2626] font-display leading-none">
                  {team1.score || '0/0'}
                  <span className="text-xs font-normal text-slate-400 ml-2">({team1.overs || '0'} OV)</span>
                </div>
              </div>
            </div>

            {/* VS */}
            <div className="col-span-2 text-center">
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 font-mono text-xs font-bold uppercase text-slate-400">
                VS
              </span>
            </div>

            {/* Team 2 */}
            <div className="col-span-5 flex items-center justify-end space-x-4 text-right">
              <div>
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white font-condensed">
                  {team2.name || 'TEAM 2'}
                </h2>
                <div className="text-3xl md:text-4xl font-black text-white font-display leading-none">
                  {team2.score || '0/0'}
                  <span className="text-xs font-normal text-slate-400 ml-2">({team2.overs || '0'} OV)</span>
                </div>
              </div>
              <div className="w-14 h-14 bg-slate-900 border border-slate-800 p-2 flex items-center justify-center shrink-0">
                {team2.logo ? (
                  <img src={team2.logo} alt={team2.name} className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="font-black text-slate-500 text-sm">{team2.name?.slice(0, 3).toUpperCase() || 'T2'}</span>
                )}
              </div>
            </div>
          </div>

          {data.resultText && (
            <div className="mt-5 pt-4 border-t border-slate-800 text-center">
              <span className="text-xs font-black uppercase tracking-widest text-[#dc2626] bg-[#dc2626]/10 border border-[#dc2626]/30 px-4 py-1.5 inline-block font-mono">
                {data.resultText}
              </span>
            </div>
          )}
        </div>

        {/* MVP FEATURE */}
        {mvp.name && (
          <div className="bg-[#111827] border border-slate-800 p-5 mb-8 flex items-center gap-6">
            <div className="w-24 h-24 border border-slate-700 overflow-hidden shrink-0 bg-slate-900">
              {mvp.photo ? (
                <img src={mvp.photo} alt={mvp.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold text-xl">
                  {mvp.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#dc2626] font-mono mb-1">
                PLAYER OF THE MATCH
              </div>
              <h3 className="text-2xl font-black text-white uppercase font-display tracking-tight">
                {mvp.name}
              </h3>
              <p className="text-xs font-mono text-slate-300 mt-1">
                {mvp.stats || '82 RUNS • 48 BALLS • 2 WICKETS'}
              </p>
            </div>
          </div>
        )}

        {/* TOP PERFORMERS & MOMENTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-slate-300 pb-2 border-b border-slate-800 mb-4 font-mono">
              TOP PERFORMERS
            </div>
            <div className="space-y-2">
              {topBatsmen.concat(topBowlers).slice(0, 4).map((p, i) => (
                <div key={i} className="flex justify-between items-center text-xs py-1.5 border-b border-slate-800/80 font-mono">
                  <span className="font-bold text-slate-200">0{i+1} {p.name}</span>
                  <span className="text-[#dc2626] font-bold">
                    {p.runs ? `${p.runs} RUNS` : `${p.wickets}/${p.runs}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-black uppercase tracking-widest text-slate-300 pb-2 border-b border-slate-800 mb-4 font-mono">
              MATCH STREAM HIGHLIGHTS
            </div>
            <ul className="space-y-2 text-xs text-slate-400 font-sans">
              {highlights.slice(0, 4).map((h, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-[#dc2626] font-bold">►</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase">
        <span className="font-bold text-slate-400">MATCHDAY MEDIA RECAP</span>
        <span>VERIFIED RESULT</span>
      </div>
    </div>
  );
}
