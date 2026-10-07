import React from 'react';
import { Zap, Calendar, MapPin, Award, Activity, ShieldAlert } from 'lucide-react';

export default function NeonCyberTemplate({ data, logoUrl }) {
  return (
    <div 
      className="w-full bg-[#050811] text-emerald-100 p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden font-sans border border-emerald-500/30 rounded-xl select-none"
      style={{ minHeight: '900px' }}
    >
      {/* Neon Glow Effects */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 blur-[100px] pointer-events-none" />

      <div>
        {/* HEADER */}
        <div className="border-b border-emerald-500/30 pb-4 mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-cyan-400">
                {data.tournament || 'LIVE MATCH REPORT'}
              </span>
              <h1 className="text-2xl font-black text-white uppercase tracking-wider font-display drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                {data.matchTitle}
              </h1>
            </div>
          </div>

          <div className="text-right text-xs text-slate-400 font-mono">
            <div className="flex items-center justify-end space-x-1 text-emerald-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>{data.matchDate}</span>
            </div>
            <div className="flex items-center justify-end space-x-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{data.venue}</span>
            </div>
          </div>
        </div>

        {/* HERO SCOREBOARD */}
        <div className="bg-slate-900/90 border border-emerald-500/40 rounded-xl p-6 shadow-[0_0_20px_rgba(16,185,129,0.15)] mb-6 backdrop-blur">
          <div className="grid grid-cols-12 items-center gap-4">
            {/* Team 1 */}
            <div className="col-span-5 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg bg-slate-950 border border-emerald-500/50 p-2 flex items-center justify-center shrink-0">
                {data.team1.logo ? (
                  <img src={data.team1.logo} alt={data.team1.name} className="max-h-full max-w-full object-contain" />
                ) : (
                  <ShieldAlert className="w-7 h-7 text-emerald-400" />
                )}
              </div>
              <div>
                <h2 className="text-xl font-black text-white uppercase font-display">{data.team1.name}</h2>
                <div className="text-3xl font-black text-emerald-400 font-display">
                  {data.team1.score}
                  <span className="text-xs text-slate-400 font-normal ml-2">({data.team1.overs} ov)</span>
                </div>
              </div>
            </div>

            {/* VS */}
            <div className="col-span-2 text-center">
              <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-mono text-xs font-bold uppercase rounded">
                VS
              </span>
            </div>

            {/* Team 2 */}
            <div className="col-span-5 flex items-center justify-end space-x-4 text-right">
              <div>
                <h2 className="text-xl font-black text-white uppercase font-display">{data.team2.name}</h2>
                <div className="text-3xl font-black text-cyan-400 font-display">
                  {data.team2.score}
                  <span className="text-xs text-slate-400 font-normal ml-2">({data.team2.overs} ov)</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-slate-950 border border-cyan-500/50 p-2 flex items-center justify-center shrink-0">
                {data.team2.logo ? (
                  <img src={data.team2.logo} alt={data.team2.name} className="max-h-full max-w-full object-contain" />
                ) : (
                  <ShieldAlert className="w-7 h-7 text-cyan-400" />
                )}
              </div>
            </div>
          </div>

          {data.resultText && (
            <div className="mt-4 pt-3 border-t border-slate-800 text-center">
              <span className="inline-block bg-emerald-950/80 border border-emerald-400 text-emerald-300 text-xs font-mono font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                {data.resultText}
              </span>
            </div>
          )}
        </div>

        {/* MVP FEATURE */}
        {data.mvp?.name && (
          <div className="bg-gradient-to-r from-emerald-950/50 via-slate-900 to-slate-900 border border-emerald-500/40 rounded-xl p-5 mb-6 flex items-center gap-5">
            <div className="w-20 h-20 rounded-xl border border-emerald-400 p-0.5 overflow-hidden shrink-0 bg-slate-950">
              {data.mvp.photo ? (
                <img src={data.mvp.photo} alt={data.mvp.name} className="w-full h-full object-cover rounded-lg" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-emerald-400 font-bold text-xl">
                  {data.mvp.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-1 text-xs font-mono font-bold text-emerald-400 uppercase">
                <Award className="w-4 h-4" />
                <span>{data.mvp.role || 'MAN OF THE MATCH'}</span>
              </div>
              <h3 className="text-2xl font-black text-white font-display uppercase">{data.mvp.name}</h3>
              <p className="text-xs text-slate-300 font-mono mt-1">{data.mvp.stats}</p>
            </div>
          </div>
        )}

        {/* TOP PERFORMERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div className="bg-slate-900/80 border border-emerald-500/20 rounded-xl p-4">
            <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-3 pb-2 border-b border-slate-800 flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Top Batsmen</span>
            </div>
            <div className="space-y-3">
              {data.topBatsmen?.map((bat, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                  <div>
                    <div className="font-bold text-sm text-slate-100">{bat.name}</div>
                    <div className="text-[10px] text-slate-400">{bat.team}</div>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-lg font-black text-emerald-400 font-display">
                      {bat.runs} <span className="text-xs font-normal text-slate-400">({bat.balls}b)</span>
                    </div>
                    <div className="text-[10px] text-slate-400">SR: {bat.sr}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/80 border border-cyan-500/20 rounded-xl p-4">
            <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-3 pb-2 border-b border-slate-800 flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Top Bowlers</span>
            </div>
            <div className="space-y-3">
              {data.topBowlers?.map((bowl, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                  <div>
                    <div className="font-bold text-sm text-slate-100">{bowl.name}</div>
                    <div className="text-[10px] text-slate-400">{bowl.team}</div>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-lg font-black text-cyan-400 font-display">
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
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>Match Stream Highlights</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300 font-mono">
              {data.highlights.map((h, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-emerald-400">►</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-emerald-500/20 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span className="text-emerald-400 font-bold">MATCHPULSE // NEON CYBER EDITION</span>
        <span>STATUS: VERIFIED</span>
      </div>
    </div>
  );
}
