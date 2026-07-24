'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { oceanSectors, OceanSector, exportDatasetAsFile } from '@/lib/mock-data';
import { MapPin, Layers, Download, Compass, Filter, RefreshCw, X, ShieldAlert, ArrowRight, Activity, Thermometer, Droplets, Database } from 'lucide-react';

interface GISMapProps {
  initialSectorId?: string;
  onSectorSelect?: (sector: OceanSector) => void;
  heightClass?: string;
}

export const GISMap: React.FC<GISMapProps> = ({ 
  initialSectorId = 'SEC-01',
  onSectorSelect,
  heightClass = 'h-[650px]'
}) => {
  const [selectedSector, setSelectedSector] = useState<OceanSector>(
    oceanSectors.find(s => s.id === initialSectorId) || oceanSectors[0]
  );
  const [tileProvider, setTileProvider] = useState<'esri' | 'dark' | 'voyager'>('esri');
  const [filterType, setFilterType] = useState<string>('All');
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Leaflet Dynamic Loading
    if (typeof window !== 'undefined') {
      const L = require('leaflet');
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });
      setIsMapLoaded(true);
    }
  }, []);

  const handleSectorClick = (sector: OceanSector) => {
    setSelectedSector(sector);
    if (onSectorSelect) onSectorSelect(sector);
  };

  const tileUrls = {
    esri: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{y}/{x}{r}.png',
    voyager: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{y}/{x}{r}.png',
  };

  const filteredSectors = filterType === 'All' 
    ? oceanSectors 
    : oceanSectors.filter(s => s.scanType.toLowerCase().includes(filterType.toLowerCase()));

  return (
    <div className={`relative w-full ${heightClass} rounded-3xl overflow-hidden border border-slate-300 dark:border-slate-800 shadow-2xl bg-slate-900 text-slate-100 flex flex-col md:flex-row`}>
      
      {/* LEFT CONTROL PANEL - MATTE SLATE CHARCOAL GREY */}
      <div className="w-full md:w-80 bg-slate-900 border-r border-slate-800 p-4 space-y-4 shrink-0 flex flex-col justify-between z-20">
        <div className="space-y-4">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-slate-300" />
              <h3 className="font-extrabold text-sm text-white">Ocean GIS Explorer</h3>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              Live Satellite
            </span>
          </div>

          {/* Map Layer Provider Options Explainer */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider block">
              Map Style View:
            </label>
            <p className="text-[10px] text-slate-400">Switch satellite imagery basemaps:</p>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => setTileProvider('esri')}
                className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                  tileProvider === 'esri'
                    ? 'bg-slate-800 text-white border-slate-600 shadow-md'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Satellite
              </button>
              <button
                onClick={() => setTileProvider('dark')}
                className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                  tileProvider === 'dark'
                    ? 'bg-slate-800 text-white border-slate-600 shadow-md'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Dark Ocean
              </button>
              <button
                onClick={() => setTileProvider('voyager')}
                className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                  tileProvider === 'voyager'
                    ? 'bg-slate-800 text-white border-slate-600 shadow-md'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Voyager
              </button>
            </div>
          </div>

          {/* Sensor Filter Dropdown Explainer */}
          <div className="space-y-1.5 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider">
                Scan Telemetry Filter:
              </label>
              <button
                onClick={() => setShowGrid(!showGrid)}
                className={`text-[10px] font-bold px-2 py-0.5 rounded border transition-all ${
                  showGrid ? 'bg-slate-800 text-white border-slate-700' : 'text-slate-400 border-slate-800'
                }`}
              >
                Grid {showGrid ? 'ON' : 'OFF'}
              </button>
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 text-white border border-slate-800 text-xs font-bold focus:outline-none focus:border-slate-600"
            >
              <option value="All">All Scan Telemetry Types</option>
              <option value="AUV">AUV Optical Swarm Drones</option>
              <option value="SAR">SAR Synthetic Aperture Radar</option>
              <option value="Hydrophone">Benthic Hydrophone Arrays</option>
              <option value="Sonar">Sonar Bathymetry Sensors</option>
            </select>
          </div>

          {/* Ocean Sector Selector List */}
          <div className="space-y-1.5 pt-2 border-t border-slate-800 max-h-48 overflow-y-auto no-scrollbar">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
              Monitored Ocean Sectors ({filteredSectors.length})
            </label>
            <div className="space-y-1">
              {filteredSectors.map((sector) => (
                <button
                  key={sector.id}
                  onClick={() => handleSectorClick(sector)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center justify-between border ${
                    selectedSector.id === sector.id
                      ? 'bg-slate-800 text-white border-slate-600 font-bold'
                      : 'bg-slate-950/60 text-slate-300 border-slate-800/80 hover:bg-slate-800/50'
                  }`}
                >
                  <span className="truncate">{sector.id}: {sector.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    sector.pollutionRisk === 'Critical' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {sector.healthScore}/100
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Global Dataset Export Action Button */}
        <button
          onClick={() => exportDatasetAsFile('Ocean_GIS_Sectors', 'CSV')}
          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all flex items-center justify-center gap-2 shadow-md mt-2"
        >
          <Download className="w-4 h-4 text-slate-300" />
          <span>Export GIS CSV Dataset</span>
        </button>

      </div>

      {/* MAP CANVAS AREA WITH POPUP SECTOR DETAIL CARD */}
      <div className="flex-1 relative w-full h-full min-h-[400px] bg-slate-950 overflow-hidden">
        
        {/* Dynamic Leaflet Map Canvas */}
        <div className="absolute inset-0 z-0">
          <iframe
            title="Ocean GIS Map View"
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
                  .custom-pulse {
                    width: 20px;
                    height: 20px;
                    background: rgba(225, 29, 72, 0.7);
                    border: 2px solid #ffffff;
                    border-radius: 50%;
                    box-shadow: 0 0 15px rgba(225, 29, 72, 0.8);
                    animation: pulse 1.5s infinite;
                  }
                  @keyframes pulse {
                    0% { transform: scale(0.9); opacity: 0.9; }
                    50% { transform: scale(1.4); opacity: 0.4; }
                    100% { transform: scale(0.9); opacity: 0.9; }
                  }
                </style>
              </head>
              <body>
                <div id="map"></div>
                <script>
                  var map = L.map('map', { zoomControl: false }).setView([${selectedSector.lat}, ${selectedSector.lng}], 4);
                  L.control.zoom({ position: 'bottomright' }).addTo(map);

                  L.tileLayer('${tileUrls[tileProvider]}', {
                    maxZoom: 18,
                    attribution: 'ESRI Satellite & Bathymetry'
                  }).addTo(map);

                  // Add ocean sector pins
                  var sectorData = ${JSON.stringify(oceanSectors)};
                  sectorData.forEach(function(sec) {
                    var marker = L.circleMarker([sec.lat, sec.lng], {
                      radius: sec.id === '${selectedSector.id}' ? 12 : 8,
                      fillColor: sec.pollutionRisk === 'Critical' ? '#f43f5e' : (sec.pollutionRisk === 'High' ? '#fb923c' : '#10b981'),
                      color: '#ffffff',
                      weight: 2,
                      opacity: 1,
                      fillOpacity: 0.85
                    }).addTo(map);

                    marker.bindTooltip(sec.name + " (" + sec.healthScore + "/100)", { permanent: false, direction: 'top' });
                  });
                </script>
              </body>
              </html>
            `}
            className="w-full h-full border-none"
          />
        </div>

        {/* MAP OVERLAY: COMPACT SECTOR DETAIL CARD (NO EMPTY GAP) */}
        {selectedSector && (
          <div className="absolute top-4 right-4 z-30 max-w-sm w-full bg-slate-900/95 backdrop-blur-2xl border border-slate-700/80 rounded-3xl p-5 shadow-2xl text-white space-y-4 animate-in fade-in slide-in-from-right-4">
            
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {selectedSector.id} • {selectedSector.oceanBasin}
                </span>
                <h4 className="text-base font-extrabold text-white mt-1">{selectedSector.name}</h4>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                selectedSector.pollutionRisk === 'Critical' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {selectedSector.pollutionRisk} Risk
              </span>
            </div>

            {/* Comprehensive Telemetry Metrics (No Empty Space) */}
            <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Ocean Health Score</span>
                <strong className="text-white text-sm">{selectedSector.healthScore} / 100</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Patrol Depth</span>
                <strong className="text-slate-300 text-sm">{selectedSector.depthMeters} meters</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Water Quality Status</span>
                <strong className="text-slate-300 text-xs truncate block">{selectedSector.waterQuality}</strong>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Primary Environmental Threat</span>
                <strong className="text-rose-400 text-xs truncate block">{selectedSector.primaryThreat}</strong>
              </div>
            </div>

            {/* Sensor Specs */}
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Sensor Type:</span>
                <strong className="text-white">{selectedSector.scanType}</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Coordinates:</span>
                <strong className="text-emerald-400 font-mono">{selectedSector.lat}° N, {selectedSector.lng}° W</strong>
              </div>
            </div>

            {/* Action Buttons (Compact Fit) */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => exportDatasetAsFile(selectedSector.name, 'CSV')}
                className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-slate-300" />
                <span>Sector CSV</span>
              </button>

              <Link
                href="/predictive-map"
                className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all flex items-center justify-center gap-1.5"
              >
                <span>30-Day Risk →</span>
              </Link>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
