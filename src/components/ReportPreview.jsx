import React, { useRef, useState } from 'react';
import { Download, FileText, Image as ImageIcon, Check } from 'lucide-react';
import EditorialTemplate from './templates/EditorialTemplate';
import NightMatchTemplate from './templates/NightMatchTemplate';
import TournamentTemplate from './templates/TournamentTemplate';
import { downloadAsImage, downloadAsPDF } from '../utils/exporter';

export default function ReportPreview({ data }) {
  const [selectedTemplate, setSelectedTemplate] = useState('editorial');
  const [aspectRatio, setAspectRatio] = useState('a4');
  const [isExporting, setIsExporting] = useState(false);

  const reportRef = useRef(null);

  const handleExportImage = async (format = 'png') => {
    if (!reportRef.current) return;
    setIsExporting(true);
    await downloadAsImage(reportRef.current, `MATCHDAY-${data.matchTitle || 'Report'}.${format}`, format);
    setIsExporting(false);
  };

  const handleExportPDF = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);
    await downloadAsPDF(reportRef.current, `MATCHDAY-${data.matchTitle || 'Report'}.pdf`);
    setIsExporting(false);
  };

  const getAspectRatioClasses = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square max-w-[800px]';
      case 'portrait':
        return 'aspect-[4/5] max-w-[700px]';
      case 'landscape':
        return 'aspect-[16/9] max-w-[1000px]';
      case 'a4':
      default:
        return 'max-w-[794px] min-h-[1050px]';
    }
  };

  return (
    <div className="space-y-6">
      {/* STUDIO TOOLBAR: Templates & Exporter */}
      <div className="bg-white border-2 border-slate-900 p-4 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-200">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#dc2626] font-mono">
              OUTPUT CONTROL
            </span>
            <h3 className="text-sm font-black uppercase tracking-wider text-[#0f172a] font-display">
              REPORT CANVAS & EXPORT
            </h3>
          </div>

          {/* DOWNLOAD BUTTONS */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleExportImage('png')}
              disabled={isExporting}
              className="px-4 py-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-black text-xs uppercase tracking-wider transition flex items-center space-x-1.5 disabled:opacity-50"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>DOWNLOAD PNG</span>
            </button>

            <button
              onClick={() => handleExportImage('jpeg')}
              disabled={isExporting}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-[#0f172a] font-bold text-xs uppercase tracking-wider border border-slate-300 transition disabled:opacity-50"
            >
              <span>JPG</span>
            </button>

            <button
              onClick={handleExportPDF}
              disabled={isExporting}
              className="px-4 py-2 bg-[#0f172a] hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider transition flex items-center space-x-1.5 disabled:opacity-50"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>DOWNLOAD PDF</span>
            </button>
          </div>
        </div>

        {/* TEMPLATE PICKER */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'editorial', label: '01 EDITORIAL', desc: 'Magazine White' },
            { id: 'night', label: '02 NIGHT MATCH', desc: 'Dark Minimal' },
            { id: 'tournament', label: '03 TOURNAMENT', desc: 'Structured Bulletin' },
          ].map((temp) => (
            <button
              key={temp.id}
              onClick={() => setSelectedTemplate(temp.id)}
              className={`p-3 text-left border-2 transition relative ${
                selectedTemplate === temp.id
                  ? 'border-[#dc2626] bg-red-50/50'
                  : 'border-slate-300 bg-slate-50 hover:border-slate-800'
              }`}
            >
              <div className="text-xs font-black uppercase tracking-wider text-[#0f172a] font-display">
                {temp.label}
              </div>
              <div className="text-[10px] text-slate-500 font-medium">{temp.desc}</div>
              {selectedTemplate === temp.id && (
                <div className="absolute top-2 right-2 w-3.5 h-3.5 rounded-full bg-[#dc2626] text-white flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* RATIO SWITCHER */}
        <div className="flex items-center space-x-2 pt-2 border-t border-slate-200 text-xs">
          <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider mr-2">FORMAT RATIO:</span>
          {[
            { id: 'a4', label: 'A4 PAGE' },
            { id: 'portrait', label: '4:5 SOCIAL' },
            { id: 'square', label: '1:1 SQUARE' },
            { id: 'landscape', label: '16:9 TV' },
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => setAspectRatio(r.id)}
              className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider border transition ${
                aspectRatio === r.id
                  ? 'border-[#0f172a] bg-[#0f172a] text-white'
                  : 'border-slate-300 bg-white text-slate-600 hover:border-slate-800'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* DOMINANT REPORT PREVIEW CANVAS */}
      <div className="bg-slate-200 border-2 border-slate-900 p-4 sm:p-8 flex justify-center items-center min-h-[700px] overflow-x-auto">
        <div 
          ref={reportRef}
          className={`w-full bg-white shadow-2xl transition-all duration-300 ${getAspectRatioClasses()}`}
        >
          {selectedTemplate === 'editorial' && (
            <EditorialTemplate data={data} />
          )}
          {selectedTemplate === 'night' && (
            <NightMatchTemplate data={data} />
          )}
          {selectedTemplate === 'tournament' && (
            <TournamentTemplate data={data} />
          )}
        </div>
      </div>
    </div>
  );
}
