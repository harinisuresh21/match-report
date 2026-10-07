import React from 'react';

export default function EditorialTemplate({ data }) {
  const team1 = data.team1 || {};
  const team2 = data.team2 || {};
  const mvp = data.mvp || {};
  const topBatsmen = data.topBatsmen || [];
  const topBowlers = data.topBowlers || [];
  const highlights = data.highlights || [];

  return (
    <div 
      className="w-full bg-[#fafafa] text-[#0f172a] p-8 md:p-10 flex flex-col justify-between shadow-xl border border-slate-300 font-sans select-none relative overflow-hidden"
      style={{ minHeight: '980px' }}
    >
      {/* Top Red Accent Rule Bar */}
      <div className="absolute top-0 inset-x-0 h-2 bg-[#dc2626]" />

      <div>
        {/* HEADER: Tournament & Match Title */}
        <div className="border-b-2 border-[#0f172a] pb-5 mb-6">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#dc2626]">
              {data.tournament || 'CRICKET CHAMPIONSHIP'}
            </span>
            <span className="text-xs font-semibold text-slate-500 font-mono">
              {data.matchDate || '07 OCT 2026'}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black uppercase font-display tracking-tight text-[#0f172a] leading-none mb-3">
            {data.matchTitle || 'OFFICIAL MATCH REPORT'}
          </h1>

          <div className="flex items-center space-x-2 text-xs font-medium text-slate-600">
            <span>{data.venue || 'Chepauk, Chennai'}</span>
            {data.tossWinner && (
              <>
                <span>•</span>
                <span>Toss: <strong>{data.tossWinner}</strong> ({data.tossDecision || 'Bat'})</span>
              </>
            )}
          </div>
        </div>

        {/* HERO SCOREBOARD BLOCK */}
        <div className="border-y border-slate-300 py-6 mb-8 bg-white px-6">
          <div className="grid grid-cols-12 items-center gap-4">
            {/* Team 1 */}
            <div className="col-span-5 flex items-center space-x-4">
              <div className="w-14 h-14 rounded bg-slate-100 border border-slate-300 p-2 flex items-center justify-center shrink-0">
                {team1.logo ? (
                  <img src={team1.logo} alt={team1.name} className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="font-black text-slate-400 text-sm">{team1.name?.slice(0, 3).toUpperCase() || 'T1'}</span>
                )}
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-[#0f172a] font-condensed">
                  {team1.name || 'TEAM 1'}
                </h2>
                <div className="text-3xl md:text-4xl font-black text-[#dc2626] font-display leading-none">
                  {team1.score || '0/0'}
                  <span className="text-xs font-normal text-slate-500 ml-2">({team1.overs || '0'} OV)</span>
                </div>
              </div>
            </div>

            {/* VS */}
            <div className="col-span-2 text-center">
              <span className="text-xs font-black tracking-widest text-slate-400 uppercase font-mono">
                VS
              </span>
            </div>

            {/* Team 2 */}
            <div className="col-span-5 flex items-center justify-end space-x-4 text-right">
              <div>
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-[#0f172a] font-condensed">
                  {team2.name || 'TEAM 2'}
                </h2>
                <div className="text-3xl md:text-4xl font-black text-[#0f172a] font-display leading-none">
                  {team2.score || '0/0'}
                  <span className="text-xs font-normal text-slate-500 ml-2">({team2.overs || '0'} OV)</span>
                </div>
              </div>
              <div className="w-14 h-14 rounded bg-slate-100 border border-slate-300 p-2 flex items-center justify-center shrink-0">
                {team2.logo ? (
                  <img src={team2.logo} alt={team2.name} className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="font-black text-slate-400 text-sm">{team2.name?.slice(0, 3).toUpperCase() || 'T2'}</span>
                )}
              </div>
            </div>
          </div>

          {/* RESULT SUMMARY BANNER */}
          {data.resultText && (
            <div className="mt-5 pt-4 border-t border-slate-200 text-center">
              <span className="text-xs font-black uppercase tracking-widest text-[#dc2626] bg-red-50 border border-red-200 px-4 py-1.5 rounded-sm">
                RESULT: {data.resultText}
              </span>
            </div>
          )}
        </div>

        {/* MVP FEATURE EDITORIAL SECTION */}
        {mvp.name && (
          <div className="border-b border-slate-300 pb-6 mb-8 flex flex-col md:flex-row items-center gap-6 bg-slate-100/70 p-5 rounded-sm">
            <div className="w-28 h-28 border-2 border-[#0f172a] overflow-hidden shrink-0 bg-white shadow-sm">
              {mvp.photo ? (
                <img src={mvp.photo} alt={mvp.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-700 font-bold text-2xl">
                  {mvp.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-[#dc2626] mb-1">
                PLAYER OF THE MATCH
              </div>
              <h3 className="text-2xl font-black text-[#0f172a] uppercase font-display tracking-tight">
                {mvp.name}
              </h3>
              <p className="text-xs font-bold text-slate-700 font-mono mt-1">
                {mvp.stats || '82 RUNS • 48 BALLS • 2 WICKETS'}
              </p>
            </div>
          </div>
        )}

        {/* TOP PERFORMERS & HIGHLIGHTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          {/* Top Performers List */}
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-[#0f172a] pb-2 border-b-2 border-[#0f172a] mb-4">
              TOP PERFORMERS
            </div>
            <div className="space-y-2.5">
              {topBatsmen.concat(topBowlers).slice(0, 4).map((player, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-200 last:border-0 font-medium">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-slate-400 font-bold">0{idx + 1}</span>
                    <span className="font-bold text-[#0f172a] uppercase">{player.name || 'Player'}</span>
                  </div>
                  <div className="font-bold text-[#dc2626] font-mono">
                    {player.runs ? `${player.runs} RUNS (${player.balls || 0}B)` : `${player.wickets || 0}/${player.runs || 0} (${player.overs || 0}ov)`}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Moments */}
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-[#0f172a] pb-2 border-b-2 border-[#0f172a] mb-4">
              MATCH MOMENTS
            </div>
            <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
              {highlights.slice(0, 4).map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="font-bold text-[#dc2626]">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="pt-4 border-t border-slate-300 flex items-center justify-between text-[10px] font-mono uppercase text-slate-500">
        <span className="font-bold tracking-widest text-[#0f172a]">MATCHDAY EDITORIAL PUBLISHING</span>
        <span>CONFIRMED RESULT • OFFICIAL SCORECARD</span>
      </div>
    </div>
  );
}
