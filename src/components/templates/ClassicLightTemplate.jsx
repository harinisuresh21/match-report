import React from 'react';
import { Trophy, Calendar, MapPin, Award, Zap, CheckCircle2 } from 'lucide-react';

export default function ClassicLightTemplate({ data, logoUrl }) {
  return (
    <div 
      className="w-full bg-slate-50 text-slate-900 p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden font-sans border border-slate-300 rounded-xl select-none"
      style={{ minHeight: '900px' }}
    >
      <div>
        {/* HEADER */}
        <div className="border-b-4 border-slate-950 pb-4 mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="w-12 h-12 object-contain" />
            ) : (
              <div className="w-12 h-12 bg-slate-950 text-white rounded flex items-center justify-center font-bold text-xl">
                <Trophy className="w-7 h-7 text-amber-400" />
              </div>
            )}
            <div>
              <span className="text-xs uppercase tracking-widest font-black text-blue-800">
                {data.tournament || 'OFFICIAL SCORECARD'}
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-slate-950 uppercase font-display tracking-tight">
                {data.matchTitle || 'Match Summary'}
              </h1>
            </div>
          </div>

          <div className="text-right text-xs text-slate-600 font-medium">
            <div className="flex items-center justify-end space-x-1 font-bold text-slate-900">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>{data.matchDate}</span>
            </div>
            <div className="flex items-center justify-end space-x-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span>{data.venue}</span>
            </div>
          </div>
        </div>

        {/* HERO SCOREBOARD */}
        <div className="bg-white border-2 border-slate-950 rounded-xl p-6 shadow-md mb-6">
          <div className="grid grid-cols-12 items-center gap-4">
            {/* Team 1 */}
            <div className="col-span-5 flex items-center space-x-3">
              {data.team1.logo && (
                <img src={data.team1.logo} alt={data.team1.name} className="w-12 h-12 object-contain" />
              )}
              <div>
                <h2 className="text-xl font-black text-slate-950 uppercase tracking-tight">{data.team1.name}</h2>
                <div className="text-3xl font-black text-blue-900 font-display">
                  {data.team1.score}
                  <span className="text-xs text-slate-500 font-normal ml-2">({data.team1.overs} ov)</span>
                </div>
              </div>
            </div>

            {/* VS */}
            <div className="col-span-2 text-center">
              <span className="px-3 py-1 bg-slate-950 text-white font-black text-xs uppercase tracking-widest rounded">
                VS
              </span>
            </div>

            {/* Team 2 */}
            <div className="col-span-5 flex items-center justify-end space-x-3 text-right">
              <div>
                <h2 className="text-xl font-black text-slate-950 uppercase tracking-tight">{data.team2.name}</h2>
                <div className="text-3xl font-black text-slate-900 font-display">
                  {data.team2.score}
                  <span className="text-xs text-slate-500 font-normal ml-2">({data.team2.overs} ov)</span>
                </div>
              </div>
              {data.team2.logo && (
                <img src={data.team2.logo} alt={data.team2.name} className="w-12 h-12 object-contain" />
              )}
            </div>
          </div>

          {data.resultText && (
            <div className="mt-4 pt-3 border-t border-slate-200 text-center">
              <span className="inline-block bg-blue-100 text-blue-950 text-xs font-black px-4 py-1 rounded-full uppercase border border-blue-300">
                {data.resultText}
              </span>
            </div>
          )}
        </div>

        {/* MVP FEATURE */}
        {data.mvp?.name && (
          <div className="bg-amber-50 border-2 border-amber-400 rounded-xl p-5 mb-6 flex items-center gap-5">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-amber-600 shrink-0 bg-white">
              {data.mvp.photo ? (
                <img src={data.mvp.photo} alt={data.mvp.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-amber-700 font-bold text-xl">
                  {data.mvp.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-900 uppercase">
                <Award className="w-4 h-4 text-amber-600" />
                <span>{data.mvp.role || 'MAN OF THE MATCH'}</span>
              </div>
              <h3 className="text-2xl font-black text-slate-950 font-display">{data.mvp.name}</h3>
              <p className="text-xs text-slate-700 font-medium mt-1">{data.mvp.stats}</p>
            </div>
          </div>
        )}

        {/* TOP PERFORMERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div className="bg-white border border-slate-300 rounded-xl p-4 shadow-sm">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 pb-2 border-b border-slate-200 mb-3 flex items-center space-x-2">
              <Zap className="w-4 h-4 text-blue-600" />
              <span>Top Batsmen</span>
            </h4>
            <div className="space-y-3">
              {data.topBatsmen?.map((bat, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0">
                  <div>
                    <div className="font-bold text-sm text-slate-900">{bat.name}</div>
                    <div className="text-[10px] text-slate-500">{bat.team}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-slate-900 font-display">
                      {bat.runs} <span className="text-xs font-normal text-slate-500">({bat.balls}b)</span>
                    </div>
                    <div className="text-[10px] text-slate-500">SR: {bat.sr}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-300 rounded-xl p-4 shadow-sm">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 pb-2 border-b border-slate-200 mb-3 flex items-center space-x-2">
              <Zap className="w-4 h-4 text-amber-600" />
              <span>Top Bowlers</span>
            </h4>
            <div className="space-y-3">
              {data.topBowlers?.map((bowl, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0">
                  <div>
                    <div className="font-bold text-sm text-slate-900">{bowl.name}</div>
                    <div className="text-[10px] text-slate-500">{bowl.team}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-slate-900 font-display">
                      {bowl.wickets}/{bowl.runs} <span className="text-xs font-normal text-slate-500">({bowl.overs}ov)</span>
                    </div>
                    <div className="text-[10px] text-slate-500">Econ: {bowl.economy}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* HIGHLIGHTS */}
        {data.highlights?.length > 0 && (
          <div className="bg-white border border-slate-300 rounded-xl p-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3">Key Match Moments</h4>
            <ul className="space-y-2 text-xs text-slate-700">
              {data.highlights.map((h, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-slate-300 flex items-center justify-between text-[11px] text-slate-500">
        <span className="font-bold text-slate-700">Official Match Report</span>
        <span>Generated via MatchPulse</span>
      </div>
    </div>
  );
}
