'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { 
  Layers, 
  Search, 
  MapPin, 
  Radio, 
  Filter, 
  ShieldAlert, 
  TrendingUp, 
  Eye, 
  FileText, 
  X, 
  Compass,
  Globe,
  Grid,
  Satellite,
  Activity,
  CheckCircle2,
  Download,
  Navigation,
  Target
} from 'lucide-react';
import { oceanSectors, droneFleet, aiDetections, marineSpecies, OceanSector, exportDatasetAsFile } from '@/lib/mock-data';

// Dynamically import Leaflet components to prevent SSR errors
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const CircleMarker = dynamic(
  () => import('react-leaflet').then((mod) => mod.CircleMarker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

export const GISMap: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<OceanSector | null>(oceanSectors[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const [L, setL] = useState<any>(null);

  // Map Tile Basemap Selector: Satellite vs Dark Carto vs Voyager Bathymetry
  const [mapStyle, setMapStyle] = useState<'satellite' | 'dark' | 'voyager'>('satellite');

  // Lat/Lng Grid Overlay Toggle
  const [showGrid, setShowGrid] = useState(true);

  // Scan Type Filter
  const [selectedScanType, setSelectedScanType] = useState<string>('All');

  // Layer Visibility Toggles
  const [layers, setLayers] = useState({
    pollution: true,
    species: true,
    coral: true,
    drones: true,
  });

  useEffect(() => {
    setMounted(true);
    import('leaflet').then((leaflet) => {
      setL(leaflet);
    });
  }, []);

  const toggleLayer = (layerKey: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const filteredSectors = oceanSectors.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.oceanBasin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesScan = selectedScanType === 'All' || s.scanType === selectedScanType;
    return matchesSearch && matchesScan;
  });

  const handleSectorDataDownload = (secName: string) => {
    exportDatasetAsFile(`GIS_${secName.replace(/\s+/g, '_')}`, 'CSV');
  };

  return (
    <div className="relative w-full h-[850px] md:h-[780px] rounded-3xl overflow-hidden glass-panel border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col md:flex-row">
      
      {/* Sidebar Controls Panel */}
      <div className="w-full md:w-80 p-4 bg-slate-100/95 dark:bg-slate-950/95 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between z-20 shrink-0">
        
        <div className="space-y-4">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-sky-500 animate-spin" style={{ animationDuration: '35s' }} />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Google Maps Ocean Pro</h3>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/10 text-sky-700 dark:text-sky-300 font-mono font-bold border border-sky-500/20">
              English Labels
            </span>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ocean basin or sector..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 text-xs focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Map Tile Layer Selector */}
          <div>
            <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Satellite className="w-3.5 h-3.5 text-sky-500" />
              <span>Google Maps Style View</span>
            </p>
            <div className="grid grid-cols-3 gap-1 rounded-xl bg-slate-200 dark:bg-slate-900 p-1 border border-slate-300 dark:border-slate-800 text-[10px] font-bold">
              <button
                onClick={() => setMapStyle('satellite')}
                className={`py-1.5 rounded-lg transition-all ${
                  mapStyle === 'satellite' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Satellite
              </button>
              <button
                onClick={() => setMapStyle('dark')}
                className={`py-1.5 rounded-lg transition-all ${
                  mapStyle === 'dark' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Dark Ocean
              </button>
              <button
                onClick={() => setMapStyle('voyager')}
                className={`py-1.5 rounded-lg transition-all ${
                  mapStyle === 'voyager' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Voyager
              </button>
            </div>
          </div>

          {/* Scan Telemetry Type Filter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Scan Telemetry Type:</label>
              <button
                onClick={() => setShowGrid(!showGrid)}
                className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-colors flex items-center gap-1 ${
                  showGrid ? 'bg-sky-500/20 text-sky-600 dark:text-sky-300 border-sky-500/40 font-bold' : 'text-slate-400 border-slate-700'
                }`}
              >
                <Grid className="w-3 h-3" />
                <span>Grid {showGrid ? 'ON' : 'OFF'}</span>
              </button>
            </div>

            <select
              value={selectedScanType}
              onChange={(e) => setSelectedScanType(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 text-xs font-semibold focus:outline-none focus:border-sky-500"
            >
              <option value="All">All Scan Telemetry Types</option>
              <option value="SAR Satellite Radar">SAR Satellite Radar</option>
              <option value="Sonar Bathymetry">Sonar Bathymetry</option>
              <option value="Benthic ROV Visual">Benthic ROV Visual</option>
              <option value="Hydrophone Acoustic">Hydrophone Acoustic</option>
              <option value="IoT Buoy Array">IoT Buoy Array</option>
            </select>
          </div>

          {/* Download Raw GIS Layer Dataset Button */}
          <button
            onClick={() => exportDatasetAsFile('Global_GIS_Overlays', 'CSV')}
            className="w-full py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-300 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-sky-500" />
            <span>Download GIS CSV Layer Data</span>
          </button>

        </div>

        {/* Sectors Quick Selector List */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 hidden md:block">
          <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            Click Sector to Inspect ({filteredSectors.length} Sectors):
          </p>
          <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
            {filteredSectors.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setSelectedSector(sec)}
                className={`w-full px-2.5 py-1.5 rounded-lg text-left text-xs flex items-center justify-between ${
                  selectedSector?.id === sec.id
                    ? 'bg-sky-500/20 text-sky-700 dark:text-sky-300 font-bold border border-sky-500/40'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-900'
                }`}
              >
                <div className="truncate pr-1">
                  <span className="font-bold text-slate-900 dark:text-white block truncate">{sec.name}</span>
                  <span className="text-[9px] text-slate-400 font-mono">{sec.oceanBasin}</span>
                </div>
                <span className={`text-[9px] font-mono px-1 rounded font-bold shrink-0 ${
                  sec.pollutionRisk === 'Critical' ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400' : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                }`}>
                  {sec.healthScore}/100
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Main Map Viewport */}
      <div className="flex-1 relative bg-slate-950">
        
        {mounted && L ? (
          <MapContainer
            center={[10.0, 0.0]}
            zoom={3}
            minZoom={2}
            maxZoom={12}
            scrollWheelZoom={true}
            worldCopyJump={false}
            maxBounds={[[-85, -180], [85, 180]]}
            className="w-full h-full z-10"
          >
            {/* Dynamic Map Basemap Layer */}
            <TileLayer
              attribution='&copy; <a href="https://www.esri.com/">ESRI Satellite / CARTO English</a>'
              url={
                mapStyle === 'satellite'
                  ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                  : mapStyle === 'dark'
                  ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                  : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
              }
            />

            {/* Ocean Sector Markers Distributed Globally */}
            {filteredSectors.map((sec) => (
              <CircleMarker
                key={sec.id}
                center={[sec.lat, sec.lng]}
                radius={sec.pollutionRisk === 'Critical' ? 20 : 15}
                pathOptions={{
                  color: sec.pollutionRisk === 'Critical' ? '#F43F5E' : sec.pollutionRisk === 'High' ? '#F59E0B' : '#10B981',
                  fillColor: sec.pollutionRisk === 'Critical' ? '#F43F5E' : sec.pollutionRisk === 'High' ? '#F59E0B' : '#10B981',
                  fillOpacity: 0.5,
                  weight: 2,
                }}
                eventHandlers={{
                  click: () => setSelectedSector(sec),
                }}
              >
                <Popup>
                  <div className="p-1">
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-700 dark:text-sky-300 block w-max mb-1">
                      {sec.scanType}
                    </span>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">{sec.name}</h4>
                    <p className="text-[10px] text-slate-500 font-mono">{sec.oceanBasin}</p>
                    <p className="text-[11px] text-sky-600 dark:text-sky-400 font-mono mt-0.5 font-bold">
                      Health Score: {sec.healthScore}/100
                    </p>
                    <button
                      onClick={() => setSelectedSector(sec)}
                      className="mt-2 text-[10px] font-bold text-sky-600 dark:text-sky-400 underline block"
                    >
                      Inspect Telemetry Panel
                    </button>
                  </div>
                </Popup>
              </CircleMarker>
            ))}

            {/* Underwater AUV Drones Layer */}
            {layers.drones && droneFleet.map((drone) => (
              <CircleMarker
                key={drone.id}
                center={[drone.lat, drone.lng]}
                radius={9}
                pathOptions={{
                  color: '#38BDF8',
                  fillColor: '#38BDF8',
                  fillOpacity: 0.8,
                  weight: 2,
                }}
              >
                <Popup>
                  <div className="p-1 text-xs">
                    <p className="font-bold text-sky-600 dark:text-sky-400">{drone.name} ({drone.type})</p>
                    <p className="text-[10px]">Scan Type: {drone.scanType}</p>
                    <p className="text-[10px]">Status: {drone.status} • Depth: {drone.depthMeters}m</p>
                  </div>
                </Popup>
              </CircleMarker>
            ))}

            {/* Pollution Hotspots Layer */}
            {layers.pollution && aiDetections.map((det) => (
              <CircleMarker
                key={det.id}
                center={det.coordinates}
                radius={11}
                pathOptions={{
                  color: '#F43F5E',
                  fillColor: '#F43F5E',
                  fillOpacity: 0.7,
                  weight: 1.5,
                }}
              >
                <Popup>
                  <div className="p-1 text-xs">
                    <span className="text-[9px] font-mono font-bold text-rose-600 dark:text-rose-400 block">{det.scanType}</span>
                    <p className="font-bold text-slate-900 dark:text-white">{det.title}</p>
                    <p className="text-[10px] text-slate-500">{det.oceanBasin} • Depth: {det.depth}m</p>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sky-500 font-mono text-xs">
            <Radio className="w-6 h-6 animate-spin mr-2" />
            <span>Initializing Google Maps Satellite GIS Engine...</span>
          </div>
        )}

        {/* Selected Sector Panel Overlay */}
        {selectedSector && (
          <div className="absolute bottom-4 right-4 sm:top-4 z-30 w-[90vw] sm:w-96 rounded-3xl glass-panel border border-sky-500/50 p-5 shadow-2xl animate-in fade-in slide-in-from-right-4">
            
            <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-mono font-extrabold text-sky-600 dark:text-sky-400 px-2 py-0.5 rounded bg-sky-500/20 border border-sky-500/30">
                  {selectedSector.id} • {selectedSector.oceanBasin}
                </span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white mt-1">
                  {selectedSector.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedSector(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">Scan Sensor Type:</span>
                <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-300">{selectedSector.scanType}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">Ocean Health Score:</span>
                <span className="text-sm font-extrabold text-slate-900 dark:text-white font-mono">{selectedSector.healthScore} / 100</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">Pollution Risk Level:</span>
                <span className={`text-xs font-extrabold px-2 py-0.5 rounded ${
                  selectedSector.pollutionRisk === 'Critical' ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/40' :
                  selectedSector.pollutionRisk === 'High' ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40' : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40'
                }`}>
                  {selectedSector.pollutionRisk}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">Patrol Depth:</span>
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">{selectedSector.depthMeters} meters</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">AI Confidence:</span>
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">{selectedSector.aiConfidence}%</span>
              </div>
            </div>

            {/* Action Buttons with Download Option */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-2 text-[11px]">
              <button
                onClick={() => handleSectorDataDownload(selectedSector.name)}
                className="p-2 rounded-xl bg-sky-600 text-white hover:bg-sky-700 font-bold flex items-center justify-center gap-1 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Sector CSV</span>
              </button>

              <a
                href="/predictive-map"
                className="p-2 rounded-xl bg-slate-800 text-white hover:bg-slate-700 text-center font-bold flex items-center justify-center gap-1 shadow-sm"
              >
                <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
                <span>30-Day Risk</span>
              </a>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
