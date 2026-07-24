'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Eye, 
  MapPin, 
  Download, 
  RefreshCw, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck,
  Layers,
  Activity,
  Maximize2,
  FileText,
  Lock,
  Compass,
  Radio,
  Sparkles
} from 'lucide-react';
import { aiDetections, oceanSectors, exportDatasetAsFile } from '@/lib/mock-data';
import { useAuth } from '@/lib/auth-context';

export default function AIDetectionPage() {
  const { isLoggedIn } = useAuth();
  const [selectedDetection, setSelectedDetection] = useState(aiDetections[0]);
  const [activeViewMode, setActiveViewMode] = useState<'optical' | 'gis'>('optical');
  const [confidenceFilter, setConfidenceFilter] = useState<number>(50);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const categories = ['All', 'Microplastics', 'Ghost Nets', 'Chemical Pollution', 'Vessel Slicks'];

  const filteredDetections = aiDetections.filter(d => {
    const categoryMatch = selectedCategory === 'All' || d.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const confidenceMatch = d.confidence >= confidenceFilter;
    return categoryMatch && confidenceMatch;
  });

  const handleExportCSV = () => {
    exportDatasetAsFile(`YOLOv8_Detection_${selectedDetection.id}`, 'CSV');
    setDownloadNotice(`Exported YOLOv8 telemetry dataset for ${selectedDetection.title} ✓`);
    setTimeout(() => setDownloadNotice(null), 4000);
  };

  return (
    <div className="space-y-8 py-6 sm:py-8 text-slate-900 dark:text-slate-100">
      
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-mono font-bold mb-2">
            <Radio className="w-3.5 h-3.5 text-slate-400 animate-pulse" />
            <span>YOLOV8 COMPUTER VISION LAB</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Subsea Optical Target Vision & GIS Telemetry
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Subsea optical camera interceptions detecting microplastics, ghost nets, and chemical pollution.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 shadow-md transition-all flex items-center gap-2 shrink-0"
        >
          <Download className="w-4 h-4 text-slate-300" />
          <span>Export Vision CSV</span>
        </button>
      </div>

      {downloadNotice && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* VIEWPORT CONTROLS & EXPLAINER BANNER */}
      <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
        <div className="space-y-0.5">
          <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-slate-500" />
            <span>Inspection Display Mode:</span>
          </span>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {activeViewMode === 'optical' 
              ? 'Displaying Subsea Camera Feed with YOLOv8 Neural Target Reticle'
              : 'Displaying Live GIS Satellite Radar Map Pin at Target Coordinates'}
          </p>
        </div>

        {/* View Mode Switcher Buttons - Matte Slate Charcoal */}
        <div className="flex rounded-xl bg-slate-200 dark:bg-slate-950 p-1 font-bold border border-slate-300 dark:border-slate-800 shrink-0">
          <button
            onClick={() => setActiveViewMode('optical')}
            className={`px-4 py-2 rounded-lg text-xs transition-all flex items-center gap-1.5 ${
              activeViewMode === 'optical'
                ? 'bg-slate-800 text-white shadow-md border border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Optical Neural Frame</span>
          </button>

          <button
            onClick={() => setActiveViewMode('gis')}
            className={`px-4 py-2 rounded-lg text-xs transition-all flex items-center gap-1.5 ${
              activeViewMode === 'gis'
                ? 'bg-slate-800 text-white shadow-md border border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Real GIS Map Layer</span>
          </button>
        </div>
      </div>

      {/* MAIN RETICLE TARGET CANVAS & TELEMETRY PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CANVAS AREA (OPTICAL FRAME VS REAL GIS MAP SCAN) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-3xl glass-panel border border-slate-300 dark:border-slate-800 overflow-hidden shadow-2xl bg-slate-950">
            
            {/* Top Reticle Bar */}
            <div className="p-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-white">
              <span className="font-bold flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                Selected Target: {selectedDetection.title}
              </span>
              <span className="font-mono text-[10px] text-slate-400">
                LAT: 28.52° N | LNG: -68.45° W
              </span>
            </div>

            {/* CANVAS CONTENT: OPTICAL FRAME OR REAL GIS MAP SCAN */}
            {activeViewMode === 'optical' ? (
              /* VIEW 1: OPTICAL NEURAL CAMERA FRAME WITH YOLO RETICLE */
              <div className="relative h-[420px] sm:h-[480px] w-full bg-slate-950">
                <img
                  src={selectedDetection.imageUrl}
                  alt={selectedDetection.title}
                  className="w-full h-full object-cover brightness-95"
                />

                {/* YOLO RETICLE OVERLAY */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
                  {/* Bounding Box Corner Indicators */}
                  <div className="flex justify-between">
                    <div className="w-6 h-6 border-t-2 border-l-2 border-slate-200" />
                    <div className="w-6 h-6 border-t-2 border-r-2 border-slate-200" />
                  </div>

                  {/* Center Target Box */}
                  <div className="relative mx-auto w-4/5 sm:w-3/4 h-3/5 rounded-2xl border-2 border-rose-500/80 bg-rose-500/10 flex flex-col justify-between p-3 animate-pulse">
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold text-white bg-slate-900/90 p-2 rounded-xl border border-slate-800">
                      <span className="text-rose-400">{selectedDetection.category.toUpperCase()}: {selectedDetection.confidence}% MATCH</span>
                      <span>BOUNDS: [{selectedDetection.boundingBox}]</span>
                    </div>

                    {/* Crosshair reticle */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full border border-rose-400 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-rose-500" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-white bg-slate-900/90 p-2 rounded-xl border border-slate-800">
                      <span className="text-slate-300">TARGET LOCKED: {selectedDetection.depth}m Depth</span>
                      <span className="text-emerald-400 font-bold">Optical Camera</span>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div className="w-6 h-6 border-b-2 border-l-2 border-slate-200" />
                    <div className="w-6 h-6 border-b-2 border-r-2 border-slate-200" />
                  </div>
                </div>
              </div>
            ) : (
              /* VIEW 2: REAL GIS MAP WITH RADAR SCAN RETICLE */
              <div className="relative h-[420px] sm:h-[480px] w-full bg-slate-950">
                <iframe
                  title="Real GIS Map Target Scan"
                  srcDoc={`
                    <!DOCTYPE html>
                    <html>
                    <head>
                      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
                      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
                      <style>
                        body { margin: 0; padding: 0; background: #0f172a; }
                        #map { width: 100vw; height: 100vh; }
                        .leaflet-container { background: #0f172a; }
                        .radar-pulse {
                          width: 40px;
                          height: 40px;
                          background: rgba(225, 29, 72, 0.4);
                          border: 2px solid #f43f5e;
                          border-radius: 50%;
                          animation: radar 2s infinite ease-out;
                        }
                        @keyframes radar {
                          0% { transform: scale(0.5); opacity: 1; }
                          100% { transform: scale(2.5); opacity: 0; }
                        }
                      </style>
                    </head>
                    <body>
                      <div id="map"></div>
                      <script>
                        var map = L.map('map', { zoomControl: false }).setView([28.52, -68.45], 7);
                        L.control.zoom({ position: 'bottomright' }).addTo(map);

                        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                          maxZoom: 18,
                          attribution: 'ESRI Satellite'
                        }).addTo(map);

                        // Target scan pin
                        var marker = L.circleMarker([28.52, -68.45], {
                          radius: 14,
                          fillColor: '#f43f5e',
                          color: '#ffffff',
                          weight: 3,
                          opacity: 1,
                          fillOpacity: 0.9
                        }).addTo(map);

                        marker.bindTooltip("TARGET LOCK: " + "${selectedDetection.title}" + " (28.52° N, -68.45° W)", { permanent: true, direction: 'top' });
                      </script>
                    </body>
                    </html>
                  `}
                  className="w-full h-full border-none"
                />

                {/* Target overlay tag */}
                <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-xl bg-slate-900/90 text-white text-xs font-mono font-bold border border-slate-700 shadow-lg">
                  📍 GIS SCAN LOCATION: 28.52° N, -68.45° W (Sector 2 - Sargasso Sea)
                </div>
              </div>
            )}

            {/* Bottom Target Specs Data Bar */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div>
                <span className="text-slate-400 text-[10px] block">PostGIS Coordinates</span>
                <strong className="text-white text-xs">28.52°, -68.45°</strong>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Patrol Depth</span>
                <strong className="text-slate-300 text-xs">{selectedDetection.depth} meters</strong>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Ocean Sector</span>
                <strong className="text-white text-xs truncate block">{selectedDetection.sectorName}</strong>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Sensor Unit</span>
                <strong className="text-emerald-400 text-xs">Optical AUV Camera</strong>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE: DETECTION SELECTION & FILTERS */}
        <div className="space-y-4">
          
          {/* Category Filter Pills */}
          <div className="p-4 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              Filter Target Interceptions:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    selectedCategory === cat
                      ? 'bg-slate-800 text-white border-slate-700 shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-800 hover:border-slate-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Interceptions List */}
          <div className="p-4 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              Neural Detections Catalog ({filteredDetections.length})
            </span>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto no-scrollbar">
              {filteredDetections.map((detection) => (
                <button
                  key={detection.id}
                  onClick={() => setSelectedDetection(detection)}
                  className={`w-full text-left p-3 rounded-2xl transition-all border flex items-center gap-3 ${
                    selectedDetection.id === detection.id
                      ? 'bg-slate-800 text-white border-slate-700 shadow-md'
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-slate-600'
                  }`}
                >
                  <img
                    src={detection.imageUrl}
                    alt={detection.title}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono font-bold text-rose-500 block uppercase">
                      {detection.category} • {detection.confidence}% Match
                    </span>
                    <h4 className="font-bold text-xs truncate">{detection.title}</h4>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                      {detection.depth}m Depth
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
