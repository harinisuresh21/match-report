import React from 'react';
import { Crown, Calendar, MapPin, Award, Star, Shield } from 'lucide-react';

export default function ChampionsGoldTemplate({ data, logoUrl }) {
  return (
    <div 
      className="w-full bg-[#080d1a] text-slate-100 p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden font-sans border-2 border-amber-500/40 rounded-xl select-none"
      style={{ minHeight: '900px' }}
    >
      {/* Gold Header Accent */}
      <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600" />

      <div>
        {/* HEADER */}
        <div className="border-b border-amber-500/30 pb-5 mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg text-slate-950 font-black">
              <Crown className="w-7 h-7 text-slate-950" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest font-extrabold text-amber-400 flex items-center space-x-1">
                <Star className="w-3 h-3 fill-amber-400" />
                <span>{data.tournament || 'CHAMPIONSHIP MATCH REPORT'}</span>
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-white uppercase font-display tracking-tight drop-shadow-sm">
                {data.matchTitle}
              </h1>
            </div>
          </div>

          <div className="text-right text-xs text-slate-300">
            <div className="flex items-center justify-end space-x-1 font-bold text-amber-300">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>{data.matchDate}</span>
            </div>
            <div className="flex items-center justify-end space-x-1 mt-1 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>{data.venue}</span>
            </div>
          </div>
        </div>

        {/* HERO SCOREBOARD */}
        <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-[#0f172a] border border-amber-500/40 rounded-2xl p-6 shadow-xl mb-6 relative">
          <div className="grid grid-cols-12 items-center gap-4">
            {/* Team 1 */}
            <div className="col-span-5 flex items-center space-x-4">
              <div className="w-14 h-14 rounded-xl bg-slate-800 border border-amber-500/30 p-2 flex items-center justify-center shrink-0 shadow-md">
                {data.team1.logo ? (
                  <img src={data.team1.logo} alt={data.team1.name} className="max-h-full max-w-full object-contain" />
                ) : (
                  <Shield className="w-8 h-8 text-amber-400" />
                )}
              </div>
              <div>
                <h2 className="text-xl font-black text-white uppercase">{data.team1.name}</h2>
                <div className="text-3xl font-black text-amber-400 font-display">
                  {data.team1.score}
                  <span className="text-xs text-slate-400 font-normal ml-2">({data.team1.overs} ov)</span>
                </div>
              </div>
            </div>

            {/* VS */}
            <div className="col-span-2 text-center">
              <span className="px-3 py-1 bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest rounded-full shadow-md">
                VS
              </span>
            </div>

            {/* Team 2 */}
            <div className="col-span-5 flex items-center justify-end space-x-4 text-right">
              <div>
                <h2 className="text-xl font-black text-white uppercase">{data.team2.name}</h2>
                <div className="text-3xl font-black text-slate-200 font-display">
                  {data.team2.score}
                  <span className="text-xs text-slate-400 font-normal ml-2">({data.team2.overs} ov)</span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-xl bg-slate-800 border border-amber-500/30 p-2 flex items-center justify-center shrink-0 shadow-md">
                {data.team2.logo ? (
                  <img src={data.team2.logo} alt={data.team2.name} className="max-h-full max-w-full object-contain" />
                ) : (
                  <Shield className="w-8 h-8 text-amber-400" />
                )}
              </div>
            </div>
          </div>

          {data.resultText && (
            <div className="mt-4 pt-3 border-t border-slate-800 text-center">
              <span className="inline-block bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-xs px-5 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                🏆 {data.resultText}
              </span>
            </div>
          )}
        </div>

        {/* MVP SECTION */}
        {data.mvp?.name && (
          <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-400/50 rounded-xl p-5 mb-6 flex items-center gap-5">
            <div className="w-20 h-20 rounded-full border-2 border-amber-400 p-0.5 overflow-hidden shrink-0 shadow-lg">
              {data.mvp.photo ? (
                <img src={data.mvp.photo} alt={data.mvp.name} className="w-full h-full object-cover rounded-full" />
              ) : (
                <div className="w-full h-full bg-amber-950 text-amber-400 flex items-center justify-center font-bold text-xl">
                  {data.mvp.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-400 uppercase">
                <Award className="w-4 h-4" />
                <span>{data.mvp.role || 'MAN OF THE MATCH'}</span>
              </div>
              <h3 className="text-2xl font-black text-white font-display uppercase">{data.mvp.name}</h3>
              <p className="text-xs text-amber-200/90 font-mono mt-1">{data.mvp.stats}</p>
            </div>
          </div>
        )}

        {/* TOP PERFORMERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div className="bg-slate-900/80 border border-amber-500/20 rounded-xl p-4">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 pb-2 border-b border-amber-500/20 flex items-center space-x-2">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>Top Batsmen</span>
            </div>
            <div className="space-y-3">
              {data.topBatsmen?.map((bat, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                  <div>
                    <div className="font-bold text-sm text-slate-100">{bat.name}</div>
                    <div className="text-[10px] text-slate-400">{bat.team}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-amber-400 font-display">
                      {bat.runs} <span className="text-xs font-normal text-slate-400">({bat.balls}b)</span>
                    </div>
                    <div className="text-[10px] text-slate-400">SR: {bat.sr}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/80 border border-amber-500/20 rounded-xl p-4">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 pb-2 border-b border-amber-500/20 flex items-center space-x-2">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>Top Bowlers</span>
            </div>
            <div className="space-y-3">
              {data.topBowlers?.map((bowl, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                  <div>
                    <div className="font-bold text-sm text-slate-100">{bowl.name}</div>
                    <div className="text-[10px] text-slate-400">{bowl.team}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-amber-400 font-display">
                      {bowl.wickets}/{bowl.runs} <span className="text-xs font-normal text-slate-400">({bowl.overs}ov)</span>
                    </div>
                    <div className="text-[10px] text-slate-400">Econ: {bowl.economy}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* HIGHLIGHTS */}
        {data.highlights?.length > 0 && (
          <div className="bg-slate-900/80 border border-amber-500/20 rounded-xl p-4">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">Highlights</div>
            <ul className="space-y-2 text-xs text-slate-300">
              {data.highlights.map((h, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-amber-500/20 flex items-center justify-between text-[11px] text-slate-400">
        <span className="font-semibold text-amber-400">Champions Edition Match Summary</span>
        <span>MatchPulse Certified</span>
      </div>
    </div>
  );
}
