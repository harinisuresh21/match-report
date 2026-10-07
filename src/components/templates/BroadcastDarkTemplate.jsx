import React from 'react';
import { Trophy, Calendar, MapPin, Award, Activity, Flame, Shield, Target } from 'lucide-react';

export default function BroadcastDarkTemplate({ data, customColors, logoUrl }) {
  const primaryBg = customColors?.bg || '#0b0f19';
  const cardBg = customColors?.card || '#131b2e';
  const accentColor = customColors?.accent || '#3b82f6';

  return (
    <div 
      className="w-full text-slate-100 p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden font-sans border border-slate-800/80 rounded-xl select-none"
      style={{ backgroundColor: primaryBg, minHeight: '900px' }}
    >
      {/* Background Decorative Glow */}
      <div 
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />
      <div 
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-[120px] opacity-15 pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />

      {/* TOP BRANDING & TOURNAMENT HEADER */}
      <div>
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
          <div className="flex items-center space-x-3">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="w-10 h-10 object-contain rounded" />
            ) : (
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white shadow-lg"
                style={{ backgroundColor: accentColor }}
              >
                <Trophy className="w-6 h-6 text-white" />
              </div>
            )}
            <div>
              <div className="text-xs uppercase tracking-widest font-semibold text-slate-400">
                {data.tournament || 'MATCH REPORT'}
              </div>
              <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-white font-display uppercase">
                {data.matchTitle || 'Official Match Summary'}
              </h1>
            </div>
          </div>

          <div className="text-right text-xs text-slate-400 space-y-1">
            <div className="flex items-center justify-end space-x-1 font-medium">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              <span>{data.matchDate || 'Oct 2026'}</span>
            </div>
            <div className="flex items-center justify-end space-x-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span className="truncate max-w-[200px]">{data.venue || 'Main Stadium'}</span>
            </div>
          </div>
        </div>

        {/* MAIN SCOREBOARD HERO BAR */}
        <div 
          className="rounded-2xl p-6 mb-6 shadow-xl border border-slate-700/50 backdrop-blur-md relative overflow-hidden"
          style={{ backgroundColor: cardBg }}
        >
          {/* Subtle top banner strip */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-500" />

          <div className="grid grid-cols-12 items-center gap-4">
            {/* Team 1 */}
            <div className="col-span-5 flex items-center space-x-4">
              <div className="w-14 h-14 rounded-xl bg-slate-800/80 border border-slate-700 p-2 flex items-center justify-center shrink-0 shadow-inner">
                {data.team1.logo ? (
                  <img src={data.team1.logo} alt={data.team1.name} className="max-h-full max-w-full object-contain" />
                ) : (
                  <Shield className="w-8 h-8 text-blue-400" />
                )}
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-black uppercase text-white tracking-wide">
                  {data.team1.name || 'Team A'}
                </h2>
                <div className="text-2xl md:text-3xl font-black tracking-tight text-blue-400 font-display">
                  {data.team1.score || '0/0'}
                  <span className="text-xs font-normal text-slate-400 ml-2">({data.team1.overs || '0.0'} ov)</span>
                </div>
              </div>
            </div>

            {/* VS Badge */}
            <div className="col-span-2 flex flex-col items-center justify-center">
              <div className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 uppercase tracking-widest">
                VS
              </div>
            </div>

            {/* Team 2 */}
            <div className="col-span-5 flex items-center justify-end space-x-4 text-right">
              <div>
                <h2 className="text-lg md:text-xl font-black uppercase text-white tracking-wide">
                  {data.team2.name || 'Team B'}
                </h2>
                <div className="text-2xl md:text-3xl font-black tracking-tight text-amber-400 font-display">
                  {data.team2.score || '0/0'}
                  <span className="text-xs font-normal text-slate-400 ml-2">({data.team2.overs || '0.0'} ov)</span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-xl bg-slate-800/80 border border-slate-700 p-2 flex items-center justify-center shrink-0 shadow-inner">
                {data.team2.logo ? (
                  <img src={data.team2.logo} alt={data.team2.name} className="max-h-full max-w-full object-contain" />
                ) : (
                  <Shield className="w-8 h-8 text-amber-400" />
                )}
              </div>
            </div>
          </div>

          {/* MATCH RESULT PILL */}
          {data.resultText && (
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                Toss: <strong className="text-slate-200">{data.tossWinner ? `${data.tossWinner} (${data.tossDecision || 'Bat'})` : 'N/A'}</strong>
              </span>
              <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold tracking-wide uppercase">
                {data.resultText}
              </div>
            </div>
          )}
        </div>

        {/* MIDDLE SECTION: MVP / MAN OF THE MATCH FEATURE CARD */}
        {data.mvp?.name && (
          <div 
            className="rounded-xl p-5 mb-6 border border-amber-500/30 bg-gradient-to-r from-amber-950/30 via-slate-900/60 to-slate-900/60 relative overflow-hidden flex flex-col md:flex-row items-center gap-5 shadow-lg"
          >
            <div className="relative w-24 h-24 rounded-full border-2 border-amber-400/80 overflow-hidden shrink-0 shadow-md">
              {data.mvp.photo ? (
                <img src={data.mvp.photo} alt={data.mvp.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-amber-950/50 flex items-center justify-center text-amber-400 font-bold text-xl">
                  {data.mvp.name.charAt(0)}
                </div>
              )}
              <div className="absolute bottom-0 inset-x-0 bg-amber-500 text-slate-950 font-bold text-[9px] uppercase text-center py-0.5 tracking-wider">
                MVP
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Award className="w-4 h-4" />
                <span>{data.mvp.role || 'PLAYER OF THE MATCH'}</span>
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight font-display">
                {data.mvp.name}
              </h3>
              <p className="text-xs text-slate-300 mt-1 font-mono font-medium">
                {data.mvp.stats || 'Outstanding all-round performance'}
              </p>
            </div>
          </div>
        )}

        {/* TOP PERFORMERS GRID (BATSMEN & BOWLERS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {/* Top Batsmen */}
          <div className="rounded-xl p-4 border border-slate-800" style={{ backgroundColor: cardBg }}>
            <div className="flex items-center space-x-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-3 pb-2 border-b border-slate-800">
              <Flame className="w-4 h-4 text-blue-400" />
              <span>Top Batsmen</span>
            </div>
            <div className="space-y-3">
              {data.topBatsmen?.map((bat, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/60">
                  <div className="flex items-center space-x-3">
                    {bat.photo ? (
                      <img src={bat.photo} alt={bat.name} className="w-9 h-9 rounded-full object-cover border border-slate-700" />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-300 font-bold text-xs">
                        {bat.name ? bat.name.charAt(0) : 'B'}
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-bold text-slate-100">{bat.name || 'Player Name'}</div>
                      <div className="text-[10px] text-slate-400">{bat.team || 'Team'}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-blue-400 font-display">
                      {bat.runs || 0} <span className="text-xs font-normal text-slate-400">({bat.balls || 0}b)</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      SR: {bat.sr || '0.0'} • {bat.fours || 0}x4, {bat.sixes || 0}x6
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Bowlers */}
          <div className="rounded-xl p-4 border border-slate-800" style={{ backgroundColor: cardBg }}>
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 pb-2 border-b border-slate-800">
              <Target className="w-4 h-4 text-amber-400" />
              <span>Top Bowlers</span>
            </div>
            <div className="space-y-3">
              {data.topBowlers?.map((bowl, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-800/60">
                  <div className="flex items-center space-x-3">
                    {bowl.photo ? (
                      <img src={bowl.photo} alt={bowl.name} className="w-9 h-9 rounded-full object-cover border border-slate-700" />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-amber-950 border border-amber-800 flex items-center justify-center text-amber-300 font-bold text-xs">
                        {bowl.name ? bowl.name.charAt(0) : 'B'}
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-bold text-slate-100">{bowl.name || 'Bowler Name'}</div>
                      <div className="text-[10px] text-slate-400">{bowl.team || 'Team'}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-amber-400 font-display">
                      {bowl.wickets || 0}/{bowl.runs || 0} <span className="text-xs font-normal text-slate-400">({bowl.overs || '0'}ov)</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Econ: {bowl.economy || '0.0'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MATCH HIGHLIGHTS BULLETS */}
        {data.highlights && data.highlights.length > 0 && (
          <div className="rounded-xl p-4 border border-slate-800 mb-6" style={{ backgroundColor: cardBg }}>
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">
              <Activity className="w-4 h-4" />
              <span>Key Match Highlights</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {data.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* FOOTER WATERMARK */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-slate-400">MatchPulse Verified Report</span>
        </div>
        <div>Generated on {new Date().toLocaleDateString()}</div>
      </div>
    </div>
  );
}
