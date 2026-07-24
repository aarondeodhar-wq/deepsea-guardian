'use client';

import React, { useState } from 'react';
import { 
  Download, 
  FileSpreadsheet, 
  Database, 
  Layers, 
  Filter, 
  Search, 
  CheckCircle2, 
  Globe, 
  Activity, 
  ShieldAlert, 
  Eye, 
  Radio,
  Lock
} from 'lucide-react';
import { oceanSectors, aiDetections, marineSpecies, smartAlerts } from '@/lib/mock-data';
import { useAuth } from '@/lib/auth-context';
import { AuthModal } from '@/components/auth-modal';

export default function DatasetsPage() {
  const { isLoggedIn } = useAuth();
  const [search, setSearch] = useState('');
  const [downloadFormat, setDownloadFormat] = useState<'CSV' | 'JSON' | 'GeoJSON' | 'NetCDF'>('CSV');
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingDataset, setPendingDataset] = useState('');

  const filteredDetections = aiDetections.filter(d => 
    d.title.toLowerCase().includes(search.toLowerCase()) || 
    d.category.toLowerCase().includes(search.toLowerCase()) ||
    d.sectorName.toLowerCase().includes(search.toLowerCase())
  );

  const triggerDownload = (datasetName: string) => {
    if (!isLoggedIn) {
      setPendingDataset(datasetName);
      setIsAuthModalOpen(true);
      return;
    }

    let content = '';
    let mimeType = 'text/csv';
    let extension = 'csv';

    if (downloadFormat === 'CSV') {
      content = `ID,Title,Category,Confidence,Depth,Coordinates,Sector\n` +
        aiDetections.map(d => `"${d.id}","${d.title}","${d.category}",${d.confidence},${d.depth},"${d.coordinates.join(',')}", "${d.sectorName}"`).join('\n');
      mimeType = 'text/csv';
      extension = 'csv';
    } else if (downloadFormat === 'JSON') {
      content = JSON.stringify(aiDetections, null, 2);
      mimeType = 'application/json';
      extension = 'json';
    } else if (downloadFormat === 'GeoJSON') {
      const geojson = {
        type: 'FeatureCollection',
        features: aiDetections.map(d => ({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [d.coordinates[1], d.coordinates[0]] },
          properties: { id: d.id, title: d.title, category: d.category, confidence: d.confidence, depth: d.depth }
        }))
      };
      content = JSON.stringify(geojson, null, 2);
      mimeType = 'application/geo+json';
      extension = 'geojson';
    } else {
      content = `# NOAA NetCDF Standard Export Header\n# Dataset: ${datasetName}\n` + JSON.stringify(aiDetections);
      mimeType = 'text/plain';
      extension = 'nc';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DeepSea_Guardian_${datasetName.replace(/\s+/g, '_')}_${Date.now()}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadStatus(`Downloaded ${datasetName} in ${downloadFormat} format ✓`);
    setTimeout(() => setDownloadStatus(null), 4000);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        datasetName={pendingDataset}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-700 dark:text-sky-300 text-xs font-semibold mb-2">
            <Database className="w-4 h-4 text-sky-500" />
            <span>Open Oceanographic Data Repository</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Scan Telemetry & Datasets Download Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Standardized PostGIS, GeoJSON, CSV, and NOAA NetCDF datasets for marine researchers and NGOs.
          </p>
        </div>

        {/* Export Format Controls */}
        <div className="p-3 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 flex items-center gap-3 shrink-0 text-xs">
          <Download className="w-4 h-4 text-sky-500" />
          <span className="text-slate-700 dark:text-slate-300 font-medium">Export Format:</span>
          <div className="flex rounded-xl bg-slate-200 dark:bg-slate-900 p-1 font-bold">
            {(['CSV', 'JSON', 'GeoJSON', 'NetCDF'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setDownloadFormat(fmt)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  downloadFormat === fmt ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {downloadStatus && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{downloadStatus}</span>
        </div>
      )}

      {/* Dataset Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">AI Vision Scan Detections</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Bounding box telemetry for microplastics, ghost nets, bilge oil slicks, and chemical barrels.
          </p>
          <button
            onClick={() => triggerDownload('AI_Vision_Scans')}
            className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            {!isLoggedIn && <Lock className="w-3.5 h-3.5" />}
            <Download className="w-3.5 h-3.5" />
            <span>Download ({downloadFormat})</span>
          </button>
        </div>

        <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Ocean Sector Health Grid</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            10 global deep ocean sectors with pH, DO, salinity, turbidity, and health composite scores.
          </p>
          <button
            onClick={() => triggerDownload('Sector_Health_Grid')}
            className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            {!isLoggedIn && <Lock className="w-3.5 h-3.5" />}
            <Download className="w-3.5 h-3.5" />
            <span>Download ({downloadFormat})</span>
          </button>
        </div>

        <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="w-10 h-10 rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold">
            <Activity className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Bio-Acoustic Species Logs</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Hydrophone acoustic spectrogram detections for Blue Whales, Leatherback Turtles, and Manta Rays.
          </p>
          <button
            onClick={() => triggerDownload('Species_Bio_Acoustics')}
            className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            {!isLoggedIn && <Lock className="w-3.5 h-3.5" />}
            <Download className="w-3.5 h-3.5" />
            <span>Download ({downloadFormat})</span>
          </button>
        </div>

      </div>

      {/* Main Dataset Table */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-4">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Active Scan Telemetry Records</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Real-time ocean scan telemetry log</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search scan logs..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 text-xs focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-mono">
                <th className="py-3 px-3 font-semibold">SCAN ID</th>
                <th className="py-3 px-3 font-semibold">TITLE</th>
                <th className="py-3 px-3 font-semibold">CATEGORY</th>
                <th className="py-3 px-3 font-semibold">CONFIDENCE</th>
                <th className="py-3 px-3 font-semibold">DEPTH</th>
                <th className="py-3 px-3 font-semibold">OCEAN BASIN</th>
                <th className="py-3 px-3 font-semibold">SENSOR TYPE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
              {filteredDetections.map((det) => (
                <tr key={det.id} className="hover:bg-slate-100/60 dark:hover:bg-slate-900/60 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-sky-600 dark:text-sky-400">{det.id}</td>
                  <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">{det.title}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-600 dark:text-rose-400 font-mono font-bold text-[10px]">
                      {det.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">{det.confidence}%</td>
                  <td className="py-3 px-3 font-mono text-slate-700 dark:text-slate-300">{det.depth}m</td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-400">{det.oceanBasin}</td>
                  <td className="py-3 px-3 font-mono text-sky-600 dark:text-sky-300 font-medium">{det.scanType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
