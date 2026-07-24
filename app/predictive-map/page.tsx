'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  MapPin, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight, 
  Calendar, 
  Wind, 
  Droplets, 
  Activity, 
  Download, 
  Play, 
  CheckCircle2, 
  HelpCircle,
  Radio,
  Layers,
  Globe
} from 'lucide-react';
import { oceanSectors, exportDatasetAsFile } from '@/lib/mock-data';

export default function PredictiveMapPage() {
  const [selectedTimeline, setSelectedTimeline] = useState<'now' | '7days' | '30days'>('now');
  const [selectedSectorId, setSelectedSectorId] = useState<string>('SEC-04');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const activeSector = oceanSectors.find(s => s.id === selectedSectorId) || oceanSectors[3];

  // Hydrodynamic plume predictions based on selected timeline
  const plumeMetrics = {
    now: {
      timelineLabel: 'NOW (Baseline Data)',
      spreadKm2: 14.5,
      riskScore: 88,
      riskLevel: 'Critical',
      radiusMeters: 80000,
      color: '#f43f5e',
      factors: [
        'Seasonal Atlantic Gyre Current Vectors (0.82 m/s SW)',
        'Uncontrolled Illegal Cargo Vessel Fuel Discharge',
        'Low Dissolved Oxygen Trends (3.1 mg/L)'
      ],
      recommendation: 'Deploy autonomous containment boom & dispatch AUV fleet for robotic trash retrieval before plume intersects Marine Sanctuary.'
    },
    '7days': {
      timelineLabel: '7-DAY FORECAST (+168 hrs)',
      spreadKm2: 48.2,
      riskScore: 92,
      riskLevel: 'Critical',
      radiusMeters: 180000,
      color: '#e11d48',
      factors: [
        'Accelerated Surface Current Drift (+1.2 m/s)',
        'Plume Intersection with Seamount Coral Nursery',
        'Thermal Upwelling Anomaly Spreading East'
      ],
      recommendation: 'Issue Coast Guard Notice to Mariners & deploy secondary benthic ROV barrier.'
    },
    '30days': {
      timelineLabel: '30-DAY FORECAST (+720 hrs)',
      spreadKm2: 185.0,
      riskScore: 96,
      riskLevel: 'Severe Emergency',
      radiusMeters: 420000,
      color: '#9f1239',
      factors: [
        'Pelagic Gyre Trapping 185 km² Microplastic Mass',
        'Irreversible Coral Bleaching Exposure Risk',
        'Trans-Oceanic Migration Corridor Impact'
      ],
      recommendation: 'Execute Intergovernmental Disaster Response & initiate AUV Autonomous Clean-up.'
    }
  }[selectedTimeline];

  const handleExecuteAction = () => {
    setActionSuccess(`Initiated Autonomous AUV Containment Intervention for ${activeSector.name} ✓`);
    setTimeout(() => setActionSuccess(null), 4000);
  };

  return (
    <div className="space-y-8 py-6 sm:py-8 text-slate-900 dark:text-slate-100">
      
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-mono font-bold mb-2">
            <Radio className="w-3.5 h-3.5 text-slate-400 animate-pulse" />
            <span>HYDRODYNAMIC PLUME FORECAST MODEL</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            30-Day Subsea Pollution Plume Prediction
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Simulating microplastic & oil slick dispersion using NOAA current vectors and satellite SAR altimetry.
          </p>
        </div>

        <button
          onClick={() => exportDatasetAsFile(`Predictive_Model_${selectedSectorId}`, 'CSV')}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 shadow-md transition-all flex items-center gap-2 shrink-0"
        >
          <Download className="w-4 h-4 text-slate-300" />
          <span>Export Forecast CSV</span>
        </button>
      </div>

      {actionSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* TIMELINE CONTROL BAR */}
      <div className="p-4 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>Interactive Forecast Timeline:</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Select timeline horizon to simulate hydrodynamic plume dispersion.
          </p>
        </div>

        <div className="flex rounded-2xl bg-slate-200 dark:bg-slate-950 p-1 font-bold text-xs border border-slate-300 dark:border-slate-800 shrink-0 w-full sm:w-auto">
          <button
            onClick={() => setSelectedTimeline('now')}
            className={`flex-1 sm:flex-none px-5 py-2 rounded-xl transition-all ${
              selectedTimeline === 'now'
                ? 'bg-slate-800 text-white border border-slate-700 shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-white'
            }`}
          >
            NOW (Baseline)
          </button>
          <button
            onClick={() => setSelectedTimeline('7days')}
            className={`flex-1 sm:flex-none px-5 py-2 rounded-xl transition-all ${
              selectedTimeline === '7days'
                ? 'bg-slate-800 text-white border border-slate-700 shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-white'
            }`}
          >
            7 DAYS
          </button>
          <button
            onClick={() => setSelectedTimeline('30days')}
            className={`flex-1 sm:flex-none px-5 py-2 rounded-xl transition-all ${
              selectedTimeline === '30days'
                ? 'bg-slate-800 text-white border border-slate-700 shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-white'
            }`}
          >
            30 DAYS
          </button>
        </div>
      </div>

      {/* MAIN REAL GIS MAP DISPERSION CANVAS & RISK ANALYSIS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* REAL GIS MAP CANVAS WITH HIGH-VISIBILITY DISPERSION RING */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-3xl glass-panel border border-slate-300 dark:border-slate-800 overflow-hidden shadow-2xl bg-slate-950">
            
            {/* Map Top Bar */}
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-white">
              <span className="font-extrabold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-400 animate-pulse" />
                <span>{activeSector.name} ({activeSector.oceanBasin})</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 font-mono font-bold text-[10px]">
                {plumeMetrics.timelineLabel} • RISK: {plumeMetrics.riskLevel.toUpperCase()}
              </span>
            </div>

            {/* REAL LEAFLET MAP WITH PLUME HEAT RING */}
            <div className="relative h-[420px] sm:h-[480px] w-full bg-slate-950">
              <iframe
                title="Real GIS Map Plume Dispersion Simulation"
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
                      .leaflet-popup-content-wrapper { background: #18202c; color: #fff; border-radius: 12px; border: 1px solid #475569; }
                      .leaflet-popup-tip { background: #18202c; }
                    </style>
                  </head>
                  <body>
                    <div id="map"></div>
                    <script>
                      var map = L.map('map', { zoomControl: false }).setView([${activeSector.lat}, ${activeSector.lng}], 4);
                      L.control.zoom({ position: 'bottomright' }).addTo(map);

                      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                        maxZoom: 18,
                        attribution: 'ESRI Satellite'
                      }).addTo(map);

                      // Plume Dispersion Outer Ring
                      var plumeCircle = L.circle([${activeSector.lat}, ${activeSector.lng}], {
                        color: '${plumeMetrics.color}',
                        fillColor: '${plumeMetrics.color}',
                        fillOpacity: 0.45,
                        radius: ${plumeMetrics.radiusMeters},
                        weight: 3
                      }).addTo(map);

                      // Inner Core High-Density Ring
                      var coreCircle = L.circle([${activeSector.lat}, ${activeSector.lng}], {
                        color: '#ffffff',
                        fillColor: '#f43f5e',
                        fillOpacity: 0.75,
                        radius: ${plumeMetrics.radiusMeters * 0.3},
                        weight: 2
                      }).addTo(map);

                      // Sector Pin Marker
                      var marker = L.circleMarker([${activeSector.lat}, ${activeSector.lng}], {
                        radius: 10,
                        fillColor: '#ffffff',
                        color: '#f43f5e',
                        weight: 4,
                        opacity: 1,
                        fillOpacity: 1
                      }).addTo(map);

                      marker.bindTooltip("<div style='font-family:sans-serif; padding:4px;'><b>${activeSector.name}</b><br/>Plume Dispersion: ${plumeMetrics.spreadKm2} km²<br/>Risk Level: ${plumeMetrics.riskLevel} (${plumeMetrics.riskScore}/100)</div>", { permanent: true, direction: 'top' });
                    </script>
                  </body>
                  </html>
                `}
                className="w-full h-full border-none"
              />

              {/* FLOATING OVERLAY: PLUME CONTAMINATION METRICS CARD */}
              <div className="absolute top-4 left-4 z-20 p-4 rounded-2xl bg-slate-900/95 backdrop-blur-2xl border border-slate-700 shadow-2xl text-white space-y-1 font-mono">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">PLUME CONTAMINATION AREA</span>
                <span className="text-3xl font-extrabold text-white block">{plumeMetrics.spreadKm2} <span className="text-sm text-slate-400 font-sans">km²</span></span>
                <div className="pt-1 text-[11px] space-y-0.5 border-t border-slate-800">
                  <span className="text-rose-400 font-bold block">Risk Score: {plumeMetrics.riskScore} / 100</span>
                  <span className="text-slate-300 block">Depth: {activeSector.depthMeters}m</span>
                </div>
              </div>
            </div>

            {/* Bottom Full Sector Switcher Bar */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 space-y-2">
              <span className="font-mono text-slate-400 text-[10px] uppercase tracking-wider block font-bold">
                Select Monitored Ocean Sector:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {oceanSectors.slice(0, 6).map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => setSelectedSectorId(sec.id)}
                    className={`p-2 rounded-xl text-xs font-bold text-left transition-all border ${
                      selectedSectorId === sec.id
                        ? 'bg-slate-800 text-white border-slate-700 shadow-sm'
                        : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800'
                    }`}
                  >
                    <span className="font-mono text-[10px] text-rose-400 block">{sec.id}</span>
                    <span className="truncate block text-slate-200">{sec.name.split(' ')[0]} {sec.name.split(' ')[1]}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE: CONTRIBUTING FACTORS & RECOMMENDED ACTION */}
        <div className="space-y-4">
          
          {/* Contributing Factors Card */}
          <div className="p-5 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Wind className="w-5 h-5 text-slate-400" />
                <span>Contributing Factors</span>
              </h3>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                96% Confidence
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              {plumeMetrics.factors.map((factor, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{factor}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Action Card */}
          <div className="p-5 rounded-3xl bg-rose-500/10 border border-rose-500/30 space-y-4">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <AlertTriangle className="w-5 h-5 shrink-0 animate-pulse" />
              <h4 className="font-extrabold text-sm">Recommended Intervention</h4>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {plumeMetrics.recommendation}
            </p>

            <button
              onClick={handleExecuteAction}
              className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Execute Intervention Protocol</span>
              <ArrowRight className="w-4 h-4 text-slate-300" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
