import React from 'react';

export default function TournamentTemplate({ data }) {
  const team1 = data.team1 || {};
  const team2 = data.team2 || {};
  const mvp = data.mvp || {};
  const topBatsmen = data.topBatsmen || [];
  const topBowlers = data.topBowlers || [];
  const highlights = data.highlights || [];

  return (
    <div 
      className="w-full bg-white text-[#0f172a] p-8 md:p-10 flex flex-col justify-between shadow-2xl border-2 border-slate-900 font-sans select-none relative overflow-hidden"
      style={{ minHeight: '980px' }}
    >
      {/* Top Banner Block */}
      <div className="bg-[#0f172a] text-white p-5 -mx-8 -mt-8 mb-6 border-b-4 border-[#dc2626]">
        <div className="flex justify-between items-center text-xs font-mono font-bold uppercase text-slate-400 mb-1">
          <span>{data.tournament || 'TOURNAMENT MEDIA'}</span>
          <span>{data.matchDate || '07 OCT 2026'}</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-wide font-display text-white">
          {data.matchTitle || 'FINAL MATCH SUMMARY'}
        </h1>
        <div className="text-xs text-slate-300 font-medium mt-1">{data.venue || 'Venue'}</div>
      </div>

      <div>
        {/* SCORE BOARD BLOCK */}
        <div className="border-2 border-slate-900 p-6 mb-8 bg-slate-50">
          <div className="grid grid-cols-12 items-center gap-4">
            {/* Team 1 */}
            <div className="col-span-5 flex items-center space-x-3">
              {team1.logo && (
                <img src={team1.logo} alt={team1.name} className="w-12 h-12 object-contain" />
              )}
              <div>
                <h2 className="text-xl font-black uppercase text-[#0f172a] font-condensed">{team1.name}</h2>
                <div className="text-3xl font-black text-[#dc2626] font-display">
                  {team1.score}
                  <span className="text-xs text-slate-500 font-normal ml-1.5">({team1.overs}ov)</span>
                </div>
              </div>
            </div>

            {/* VS */}
            <div className="col-span-2 text-center">
              <span className="bg-[#0f172a] text-white px-3 py-1 font-black text-xs uppercase font-mono">
                VS
              </span>
            </div>

            {/* Team 2 */}
            <div className="col-span-5 flex items-center justify-end space-x-3 text-right">
              <div>
                <h2 className="text-xl font-black uppercase text-[#0f172a] font-condensed">{team2.name}</h2>
                <div className="text-3xl font-black text-[#0f172a] font-display">
                  {team2.score}
                  <span className="text-xs text-slate-500 font-normal ml-1.5">({team2.overs}ov)</span>
                </div>
              </div>
              {team2.logo && (
                <img src={team2.logo} alt={team2.name} className="w-12 h-12 object-contain" />
              )}
            </div>
          </div>

          {data.resultText && (
            <div className="mt-4 pt-3 border-t border-slate-300 text-center font-black uppercase text-xs text-[#0f172a] tracking-wider">
              🏆 {data.resultText}
            </div>
          )}
        </div>

        {/* MVP FEATURE */}
        {mvp.name && (
          <div className="border-2 border-slate-900 p-5 mb-8 bg-slate-900 text-white flex items-center gap-5">
            <div className="w-20 h-20 overflow-hidden border border-white shrink-0 bg-slate-800">
              {mvp.photo ? (
                <img src={mvp.photo} alt={mvp.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-xl text-white">
                  {mvp.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#dc2626] font-mono">
                PLAYER OF THE MATCH
              </div>
              <h3 className="text-2xl font-black uppercase font-display">{mvp.name}</h3>
              <p className="text-xs font-mono text-slate-300 mt-1">{mvp.stats}</p>
            </div>
          </div>
        )}

        {/* STATS & HIGHLIGHTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="border border-slate-300 p-4 bg-slate-50">
            <div className="text-xs font-black uppercase text-[#0f172a] pb-2 border-b border-slate-300 mb-3 font-mono">
              TOP PERFORMERS
            </div>
            <div className="space-y-2 text-xs font-medium">
              {topBatsmen.concat(topBowlers).slice(0, 4).map((p, i) => (
                <div key={i} className="flex justify-between border-b border-slate-200 pb-1">
                  <span>0{i+1} {p.name}</span>
                  <span className="font-bold text-[#dc2626]">{p.runs ? `${p.runs} R` : `${p.wickets}/${p.runs} W`}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-slate-300 p-4 bg-slate-50">
            <div className="text-xs font-black uppercase text-[#0f172a] pb-2 border-b border-slate-300 mb-3 font-mono">
              MATCH HIGHLIGHTS
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              {highlights.slice(0, 4).map((h, i) => (
                <li key={i} className="flex items-start space-x-1.5">
                  <span className="font-bold text-[#dc2626]">•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t-2 border-slate-900 flex justify-between items-center text-[10px] font-mono text-slate-600 uppercase">
        <span className="font-bold text-[#0f172a]">OFFICIAL TOURNAMENT BULLETIN</span>
        <span>MATCHDAY ARCHIVE</span>
      </div>
    </div>
  );
}
