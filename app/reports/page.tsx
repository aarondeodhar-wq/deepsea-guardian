'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  Share2, 
  CheckCircle2, 
  ShieldCheck, 
  Waves, 
  Calendar, 
  Filter, 
  Building2, 
  Clock,
  Sparkles,
  FileSpreadsheet
} from 'lucide-react';
import { oceanSectors, systemOverview, aiDetections, exportDatasetAsFile } from '@/lib/mock-data';

export default function ReportsPage() {
  const [selectedSector, setSelectedSector] = useState(oceanSectors[3]); // Sector 4 Mid-Atlantic
  const [reportType, setReportType] = useState('Full Comprehensive Audit');
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    exportDatasetAsFile(`Executive_Report_${selectedSector.id}`, 'CSV');
    setDownloadSuccess(`Exported report dataset for ${selectedSector.id} in CSV format ✓`);
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Header Controls — Clean Matte Executive */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 no-print">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-700 dark:text-sky-300 text-xs font-semibold mb-2">
            <FileText className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>Automated Environmental Intelligence Audit</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Environmental Report Generator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Configure, preview, and print formal institutional ocean health audit reports.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs hover:bg-slate-300 dark:hover:bg-slate-700 transition-all flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>Export Raw CSV</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 ios-spring"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF Report</span>
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 no-print">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* Report Config Panel */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs no-print">
        <div>
          <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5">Target Sector Audit:</label>
          <select
            value={selectedSector.id}
            onChange={(e) => {
              const sec = oceanSectors.find(s => s.id === e.target.value);
              if (sec) setSelectedSector(sec);
            }}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 font-bold focus:outline-none focus:border-sky-500"
          >
            {oceanSectors.map((sec) => (
              <option key={sec.id} value={sec.id}>
                {sec.id} - {sec.name} ({sec.oceanBasin})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5">Audit Scope & Detail:</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 font-bold focus:outline-none focus:border-sky-500"
          >
            <option value="Full Comprehensive Audit">Full Comprehensive Audit (All Sensors)</option>
            <option value="AUV Swarm Telemetry Log">AUV Swarm Telemetry & Interceptions</option>
            <option value="30-Day Risk Prediction Model">30-Day Hydrodynamic Risk Model</option>
          </select>
        </div>
      </div>

      {/* FORMAL PRINTABLE REPORT CARD (EXPLICIT HIGH-CONTRAST TEXT FOR DAY & NIGHT MODE) */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-8 text-slate-900 dark:text-slate-100">
        
        {/* Report Official Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-bold shadow-md">
              <Waves className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-wider text-slate-900 dark:text-white">
                  DEEPSEA GUARDIAN
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/10 text-sky-700 dark:text-sky-300 font-mono font-bold border border-sky-500/20">
                  OFFICIAL AUDIT REPORT
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                Executive Environmental Risk & Biodiversity Inspection Certificate
              </p>
            </div>
          </div>

          <div className="text-right font-mono text-xs space-y-1">
            <p className="text-slate-900 dark:text-white font-bold">DATE: July 24, 2026</p>
            <p className="text-slate-500 dark:text-slate-400">DOC_ID: DSG-AUD-2026-09</p>
            <p className="text-sky-600 dark:text-sky-400 font-bold">SECTOR_ID: {selectedSector.id}</p>
          </div>
        </div>

        {/* Report Meta Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase block">Sector Name</span>
            <strong className="text-sm font-bold text-slate-900 dark:text-white block mt-0.5 truncate">{selectedSector.name}</strong>
          </div>

          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase block">Ocean Health Score</span>
            <strong className="text-lg font-extrabold text-sky-600 dark:text-sky-400 font-mono block mt-0.5">{selectedSector.healthScore} / 100</strong>
          </div>

          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase block">Pollution Risk</span>
            <strong className={`text-sm font-extrabold block mt-0.5 ${
              selectedSector.pollutionRisk === 'Critical' ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
            }`}>
              {selectedSector.pollutionRisk}
            </strong>
          </div>

          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase block">AI Confidence</span>
            <strong className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 font-mono block mt-0.5">{selectedSector.aiConfidence}%</strong>
          </div>
        </div>

        {/* Section 1: Water Quality Metrics */}
        <div className="space-y-3">
          <h3 className="font-bold text-base text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-slate-800">
            1. Benthic Hydro-Chemistry & Water Quality Audit
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Acidity (pH)</span>
              <strong className="text-slate-900 dark:text-white font-bold">{selectedSector.waterQuality}</strong>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Patrol Depth</span>
              <strong className="text-slate-900 dark:text-white font-bold">{selectedSector.depthMeters} meters</strong>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Primary Sensor</span>
              <strong className="text-sky-600 dark:text-sky-400 font-bold">{selectedSector.scanType}</strong>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Primary Threat</span>
              <strong className="text-rose-600 dark:text-rose-400 font-bold truncate block">{selectedSector.primaryThreat}</strong>
            </div>
          </div>
        </div>

        {/* Section 2: Active Detections List */}
        <div className="space-y-3">
          <h3 className="font-bold text-base text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-slate-800">
            2. Verified AI Computer Vision & Radar Threat Records
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-sans">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-mono">
                  <th className="py-2.5 px-3">RECORD ID</th>
                  <th className="py-2.5 px-3">CLASSIFICATION</th>
                  <th className="py-2.5 px-3">CONFIDENCE</th>
                  <th className="py-2.5 px-3">DEPTH</th>
                  <th className="py-2.5 px-3">COORDINATES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {aiDetections.slice(0, 4).map((det) => (
                  <tr key={det.id} className="text-slate-700 dark:text-slate-300">
                    <td className="py-3 px-3 font-mono font-bold text-sky-600 dark:text-sky-400">{det.id}</td>
                    <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">{det.title}</td>
                    <td className="py-3 px-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">{det.confidence}%</td>
                    <td className="py-3 px-3 font-mono">{det.depth}m</td>
                    <td className="py-3 px-3 font-mono text-slate-500">{det.coordinates.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Official Institutional Certification Seal */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <span>Certified Cryptographic PostGIS Hash • DeepSea Guardian AI Neural Network v2.4</span>
          </div>
          <span className="font-mono text-[10px]">AUTHORIZED EXECUTIVE SIGNATURE: Dr. Researcher</span>
        </div>

      </div>

    </div>
  );
}
