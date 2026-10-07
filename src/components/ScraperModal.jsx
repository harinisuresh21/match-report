import React, { useState } from 'react';
import { Globe, FileText, Sparkles, X, Loader2, AlertCircle } from 'lucide-react';

export default function ScraperModal({ isOpen, onClose, onDataFetched }) {
  const [activeTab, setActiveTab] = useState('url');
  const [url, setUrl] = useState('');
  const [rawText, setRawText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/scrape-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const json = await res.json();
      if (!res.ok || json.error) {
        throw new Error(json.error || 'Failed to fetch scorecard');
      }

      onDataFetched(json.data);
      onClose();
    } catch (err) {
      setError(err.message || 'Scraping failed. Try pasting the scorecard text instead.');
    } finally {
      setLoading(false);
    }
  };

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    if (!rawText.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/parse-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: rawText }),
      });

      const json = await res.json();
      if (!res.ok || json.error) {
        throw new Error(json.error || 'Failed to parse text');
      }

      onDataFetched(json.data);
      onClose();
    } catch (err) {
      setError('Could not parse text automatically. You can enter details manually.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 animate-fade-in">
      <div className="bg-white border-2 border-slate-900 w-full max-w-lg overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b-2 border-slate-900 bg-slate-900 text-white">
          <div className="flex items-center space-x-2.5">
            <Sparkles className="w-5 h-5 text-[#dc2626]" />
            <div>
              <h3 className="text-base font-black uppercase font-display tracking-wide">AUTO-PULL SCORECARD DATA</h3>
              <p className="text-[11px] text-slate-400 font-mono">Scrape web link or paste match summary text</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-300 bg-slate-100">
          <button
            onClick={() => setActiveTab('url')}
            className={`flex-1 py-3 px-4 text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-2 border-b-2 transition ${
              activeTab === 'url'
                ? 'border-[#dc2626] text-[#dc2626] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>SCORECARD URL</span>
          </button>
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 py-3 px-4 text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-2 border-b-2 transition ${
              activeTab === 'text'
                ? 'border-[#dc2626] text-[#dc2626] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>PASTE RAW TEXT</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-bold flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {activeTab === 'url' ? (
            <form onSubmit={handleUrlSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  ESPN Cricinfo / Cricbuzz Link
                </label>
                <input
                  type="url"
                  placeholder="https://www.espncricinfo.com/series/..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border-b-2 border-slate-300 text-sm font-medium text-slate-900 focus:border-[#dc2626] outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading || !url.trim()}
                className="w-full py-3 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>SCRAPING SCORECARD...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>AUTO PARSE SCORECARD</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleTextSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Match Summary / Scorecard Text
                </label>
                <textarea
                  rows="5"
                  placeholder="Paste match stats e.g.&#10;Chennai Warriors 186/6 (20) vs Mumbai Strikers 179/8 (20)&#10;Chennai Warriors won by 7 runs&#10;Arjun Kumar 82 (48)&#10;Vikram Raj 4/28"
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border-b-2 border-slate-300 text-xs font-mono text-slate-900 focus:border-[#dc2626] outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading || !rawText.trim()}
                className="w-full py-3 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>PARSING TEXT...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>EXTRACT & POPULATE EDITOR</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
