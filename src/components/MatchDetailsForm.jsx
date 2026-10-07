import React from 'react';
import { Upload, Plus, Trash2, Sparkles, RefreshCw } from 'lucide-react';

export default function MatchDetailsForm({ data, onChange, onOpenScraper, onResetPreset }) {
  const team1 = data.team1 || {};
  const team2 = data.team2 || {};
  const mvp = data.mvp || {};

  const handleNestedChange = (section, field, value) => {
    onChange({
      ...data,
      [section]: {
        ...data[section],
        [field]: value
      }
    });
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    const updated = [...(data[arrayName] || [])];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...data, [arrayName]: updated });
  };

  const handleFileUpload = (e, callback) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addHighlight = () => {
    onChange({
      ...data,
      highlights: [...(data.highlights || []), '']
    });
  };

  const removeHighlight = (idx) => {
    const updated = data.highlights.filter((_, i) => i !== idx);
    onChange({ ...data, highlights: updated });
  };

  const updateHighlight = (idx, value) => {
    const updated = [...data.highlights];
    updated[idx] = value;
    onChange({ ...data, highlights: updated });
  };

  return (
    <div className="bg-white text-[#0f172a] font-sans divide-y divide-slate-200 px-6 md:px-8 py-6">
      {/* STUDIO QUICK BAR */}
      <div className="pb-6 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#dc2626] font-mono">
            EDITOR PANEL
          </span>
          <h2 className="text-xl font-black uppercase font-display text-[#0f172a]">
            MATCH REPORT STUDIO
          </h2>
        </div>
        <button
          onClick={onOpenScraper}
          className="px-3 py-2 bg-[#0f172a] hover:bg-[#dc2626] text-white text-xs font-black uppercase tracking-wider transition flex items-center space-x-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          <span>AUTO SCRAPE</span>
        </button>
      </div>

      {/* 01 MATCH DETAILS */}
      <div className="py-6 space-y-4">
        <div className="flex items-center space-x-3">
          <span className="text-xl font-black text-[#dc2626] font-mono">01</span>
          <h3 className="text-sm font-black uppercase tracking-widest text-[#0f172a] font-display">
            MATCH DETAILS
          </h3>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Match Title
            </label>
            <input
              type="text"
              value={data.matchTitle || ''}
              onChange={(e) => onChange({ ...data, matchTitle: e.target.value })}
              placeholder="Championship Final"
              className="w-full px-3 py-2 border-b-2 border-slate-300 focus:border-[#dc2626] bg-slate-50 text-sm font-bold text-[#0f172a] outline-none transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Tournament
              </label>
              <input
                type="text"
                value={data.tournament || ''}
                onChange={(e) => onChange({ ...data, tournament: e.target.value })}
                placeholder="Chennai Premier League"
                className="w-full px-3 py-2 border-b-2 border-slate-300 focus:border-[#dc2626] bg-slate-50 text-xs font-bold text-[#0f172a] outline-none transition"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Date
              </label>
              <input
                type="date"
                value={data.matchDate || ''}
                onChange={(e) => onChange({ ...data, matchDate: e.target.value })}
                className="w-full px-3 py-2 border-b-2 border-slate-300 focus:border-[#dc2626] bg-slate-50 text-xs font-bold text-[#0f172a] outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Venue
            </label>
            <input
              type="text"
              value={data.venue || ''}
              onChange={(e) => onChange({ ...data, venue: e.target.value })}
              placeholder="Chepauk Stadium, Chennai"
              className="w-full px-3 py-2 border-b-2 border-slate-300 focus:border-[#dc2626] bg-slate-50 text-xs font-bold text-[#0f172a] outline-none transition"
            />
          </div>
        </div>
      </div>

      {/* 02 TEAM SCORE EDITOR */}
      <div className="py-6 space-y-4">
        <div className="flex items-center space-x-3">
          <span className="text-xl font-black text-[#dc2626] font-mono">02</span>
          <h3 className="text-sm font-black uppercase tracking-widest text-[#0f172a] font-display">
            TEAM SCORES & RESULT
          </h3>
        </div>

        {/* Team 1 Score Box */}
        <div className="p-4 bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black uppercase text-[#0f172a]">TEAM 1</span>
            <label className="text-[10px] font-bold uppercase text-[#dc2626] cursor-pointer hover:underline flex items-center space-x-1">
              <Upload className="w-3 h-3" />
              <span>UPLOAD LOGO</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, (val) => handleNestedChange('team1', 'logo', val))}
                className="hidden"
              />
            </label>
          </div>

          <input
            type="text"
            value={team1.name || ''}
            onChange={(e) => handleNestedChange('team1', 'name', e.target.value)}
            placeholder="CHENNAI WARRIORS"
            className="w-full text-base font-black uppercase tracking-tight bg-white border-b-2 border-slate-300 px-3 py-1.5 focus:border-[#dc2626] outline-none"
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-500 block">SCORE (RUNS/WKTS)</label>
              <input
                type="text"
                value={team1.score || ''}
                onChange={(e) => handleNestedChange('team1', 'score', e.target.value)}
                placeholder="186 / 6"
                className="w-full text-xl font-black text-[#dc2626] font-display bg-white border-b-2 border-slate-300 px-3 py-1 outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-500 block">OVERS</label>
              <input
                type="text"
                value={team1.overs || ''}
                onChange={(e) => handleNestedChange('team1', 'overs', e.target.value)}
                placeholder="20.0"
                className="w-full text-xl font-black text-[#0f172a] font-display bg-white border-b-2 border-slate-300 px-3 py-1 outline-none"
              />
            </div>
          </div>
        </div>

        {/* VS SEPARATOR */}
        <div className="text-center font-black text-xs font-mono text-slate-400 py-1">VS</div>

        {/* Team 2 Score Box */}
        <div className="p-4 bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black uppercase text-[#0f172a]">TEAM 2</span>
            <label className="text-[10px] font-bold uppercase text-[#dc2626] cursor-pointer hover:underline flex items-center space-x-1">
              <Upload className="w-3 h-3" />
              <span>UPLOAD LOGO</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, (val) => handleNestedChange('team2', 'logo', val))}
                className="hidden"
              />
            </label>
          </div>

          <input
            type="text"
            value={team2.name || ''}
            onChange={(e) => handleNestedChange('team2', 'name', e.target.value)}
            placeholder="MUMBAI STRIKERS"
            className="w-full text-base font-black uppercase tracking-tight bg-white border-b-2 border-slate-300 px-3 py-1.5 focus:border-[#dc2626] outline-none"
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-500 block">SCORE (RUNS/WKTS)</label>
              <input
                type="text"
                value={team2.score || ''}
                onChange={(e) => handleNestedChange('team2', 'score', e.target.value)}
                placeholder="179 / 8"
                className="w-full text-xl font-black text-[#0f172a] font-display bg-white border-b-2 border-slate-300 px-3 py-1 outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-500 block">OVERS</label>
              <input
                type="text"
                value={team2.overs || ''}
                onChange={(e) => handleNestedChange('team2', 'overs', e.target.value)}
                placeholder="20.0"
                className="w-full text-xl font-black text-[#0f172a] font-display bg-white border-b-2 border-slate-300 px-3 py-1 outline-none"
              />
            </div>
          </div>
        </div>

        {/* MATCH RESULT SUMMARY */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            MATCH RESULT
          </label>
          <input
            type="text"
            value={data.resultText || ''}
            onChange={(e) => onChange({ ...data, resultText: e.target.value })}
            placeholder="CHENNAI WARRIORS WON BY 7 RUNS"
            className="w-full px-3 py-2 border-b-2 border-[#dc2626] bg-red-50 text-xs font-black uppercase tracking-wider text-[#dc2626] outline-none"
          />
        </div>
      </div>

      {/* 03 PERFORMANCES & MVP */}
      <div className="py-6 space-y-4">
        <div className="flex items-center space-x-3">
          <span className="text-xl font-black text-[#dc2626] font-mono">03</span>
          <h3 className="text-sm font-black uppercase tracking-widest text-[#0f172a] font-display">
            PERFORMANCES & MVP
          </h3>
        </div>

        {/* PLAYER OF THE MATCH */}
        <div className="p-4 bg-slate-900 text-white space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black uppercase tracking-widest text-[#dc2626] font-mono">
              PLAYER OF THE MATCH
            </span>
            <label className="text-[10px] font-bold uppercase text-white bg-[#dc2626] px-2 py-1 cursor-pointer hover:bg-[#b91c1c]">
              UPLOAD PHOTO
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, (val) => handleNestedChange('mvp', 'photo', val))}
                className="hidden"
              />
            </label>
          </div>

          <input
            type="text"
            value={mvp.name || ''}
            onChange={(e) => handleNestedChange('mvp', 'name', e.target.value)}
            placeholder="ARJUN KUMAR"
            className="w-full text-lg font-black uppercase font-display bg-slate-800 border-b-2 border-[#dc2626] px-3 py-1 text-white outline-none"
          />

          <div>
            <label className="text-[10px] font-bold uppercase text-slate-400 block">KEY STATS SUMMARY</label>
            <input
              type="text"
              value={mvp.stats || ''}
              onChange={(e) => handleNestedChange('mvp', 'stats', e.target.value)}
              placeholder="82 RUNS • 48 BALLS • 2 WICKETS"
              className="w-full text-xs font-mono font-bold bg-slate-800 border-b border-slate-700 px-3 py-1 text-red-400 outline-none"
            />
          </div>
        </div>

        {/* TOP PERFORMERS LIST */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            TOP PERFORMERS LIST
          </label>
          {(data.topBatsmen || []).map((bat, idx) => (
            <div key={idx} className="flex items-center space-x-2 py-1.5 border-b border-slate-200">
              <span className="font-mono text-xs font-bold text-slate-400">0{idx + 1}</span>
              <input
                type="text"
                value={bat.name || ''}
                onChange={(e) => handleArrayChange('topBatsmen', idx, 'name', e.target.value)}
                placeholder="PLAYER NAME"
                className="flex-1 text-xs font-bold uppercase border-b border-slate-300 px-2 py-1 outline-none"
              />
              <input
                type="number"
                value={bat.runs || 0}
                onChange={(e) => handleArrayChange('topBatsmen', idx, 'runs', e.target.value)}
                placeholder="82"
                className="w-16 text-xs font-black font-mono text-[#dc2626] border-b border-slate-300 px-2 py-1 outline-none"
              />
              <span className="text-[10px] font-bold text-slate-400">RUNS</span>
            </div>
          ))}
        </div>
      </div>

      {/* 04 HIGHLIGHT MOMENTS */}
      <div className="py-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="text-xl font-black text-[#dc2626] font-mono">04</span>
            <h3 className="text-sm font-black uppercase tracking-widest text-[#0f172a] font-display">
              KEY MATCH MOMENTS
            </h3>
          </div>
          <button
            onClick={addHighlight}
            className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-[#0f172a] text-[10px] font-black uppercase tracking-wider border border-slate-300 flex items-center space-x-1"
          >
            <Plus className="w-3 h-3" />
            <span>ADD MOMENT</span>
          </button>
        </div>

        <div className="space-y-2">
          {(data.highlights || []).map((item, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <span className="text-xs font-bold text-[#dc2626]">—</span>
              <input
                type="text"
                value={item}
                onChange={(e) => updateHighlight(idx, e.target.value)}
                placeholder="Key moment detail..."
                className="flex-1 text-xs border-b border-slate-300 px-2 py-1 outline-none focus:border-[#dc2626]"
              />
              <button
                onClick={() => removeHighlight(idx)}
                className="text-slate-400 hover:text-red-600 p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
