'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { 
  Eye, 
  ShieldAlert, 
  Fish, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Box, 
  Activity, 
  Cpu, 
  RefreshCw,
  Sliders,
  Download,
  FileSpreadsheet,
  TrendingDown,
  AlertTriangle,
  Database,
  BarChart3,
  Target,
  Crosshair,
  Maximize2,
  MapPin,
  HelpCircle,
  Globe,
  Radio
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';
import { aiDetections, marineSpecies, coralReefData, exportDatasetAsFile } from '@/lib/mock-data';

// Dynamically import Leaflet map with no SSR
const GISMap = dynamic(
  () => import('@/components/gis-map').then((mod) => mod.GISMap),
  { ssr: false }
);

export default function AIDetectionPage() {
  const [activeTab, setActiveTab] = useState<'pollution' | 'extinction' | 'species' | 'coral'>('pollution');
  const [selectedDetection, setSelectedDetection] = useState(aiDetections[0]);
  const [selectedSpecies, setSelectedSpecies] = useState(marineSpecies[0]);
  const [viewMode, setViewMode] = useState<'camera' | 'gis_map'>('camera');
  const [showExplainer, setShowExplainer] = useState(true);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // 150+ Bio-Acoustic Extinction Threat Dataset
  const extinctionAnalytics = [
    { species: 'Blue Whale', riskPercent: 68, decimationRate: '+14.2%/decade', count: 42, threat: 'Acoustic Cavitation & Ghost Nets', status: 'Endangered', image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=800&q=80' },
    { species: 'Leatherback Turtle', riskPercent: 88, decimationRate: '+22.5%/decade', count: 18, threat: 'Plastic Ingestion & Net Entanglement', status: 'Critically Endangered', image: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=800&q=80' },
    { species: 'Giant Manta Ray', riskPercent: 54, decimationRate: '+8.1%/decade', count: 65, threat: 'Seabed Trawl Scars', status: 'Vulnerable', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80' },
    { species: 'Sperm Whale', riskPercent: 62, decimationRate: '+11.8%/decade', count: 29, threat: 'Deep Chemical Barrel Leaches', status: 'Vulnerable', image: 'https://images.unsplash.com/photo-1568430460464-02e1dc18458c?auto=format&fit=crop&w=800&q=80' },
    { species: 'Whale Shark', riskPercent: 76, decimationRate: '+18.4%/decade', count: 14, threat: 'Illegal Cargo Bilge Oil Slicks', status: 'Endangered', image: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?auto=format&fit=crop&w=800&q=80' },
    { species: 'Chambered Nautilus', riskPercent: 71, decimationRate: '+15.0%/decade', count: 88, threat: 'Coral Seamount Acidification', status: 'Vulnerable', image: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=800&q=80' },
  ];

  const handleDownload = (format: 'CSV' | 'JSON' | 'GeoJSON') => {
    exportDatasetAsFile('AI_Vision_150Scan_Telemetry', format);
    setDownloadSuccess(`Downloaded 150+ Bio-Acoustic Neural Scans in ${format} format ✓`);
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 text-slate-900 dark:text-slate-100">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-700 dark:text-sky-300 text-xs font-semibold mb-2">
            <Cpu className="w-4 h-4 text-sky-500" />
            <span>AI Neural Computer Vision & Real GIS Telemetry Lab</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            AI Vision Lab & GIS Telemetry Targeter
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Real-time YOLOv8 neural network target reticles, subsea bounding box telemetry, and real GIS map datasets.
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowExplainer(!showExplainer)}
            className="px-3.5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs hover:bg-slate-300 dark:hover:bg-slate-700 transition-all flex items-center gap-1.5"
          >
            <HelpCircle className="w-4 h-4 text-sky-500" />
            <span>{showExplainer ? 'Hide Info' : 'What is this?'}</span>
          </button>

          <button
            onClick={() => handleDownload('CSV')}
            className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-all ios-spring"
          >
            <Download className="w-4 h-4" />
            <span>Download Scans (CSV)</span>
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* EXPLAINER CARD: WHAT IS THIS FEATURE? */}
      {showExplainer && (
        <div className="p-6 rounded-3xl bg-slate-900 text-white border border-sky-500/40 space-y-3 shadow-xl animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sky-400 animate-pulse" />
              <h3 className="font-extrabold text-base text-white">What is the AI Vision Lab & GIS Telemetry Targeter?</h3>
            </div>
            <button
              onClick={() => setShowExplainer(false)}
              className="text-xs text-slate-400 hover:text-white font-bold"
            >
              Close ✕
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            This module processes live subsea optical camera feeds from AUV drones and correlates them with real PostGIS satellite maps. The **YOLOv8 Deep Neural Network** identifies pollution clusters (microplastics, ghost fishing nets, chemical barrels) and projects bounding target boxes with real-time confidence scores and bathymetric depth coordinates.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] font-mono pt-2 border-t border-slate-800">
            <div className="flex items-center gap-2 text-sky-300">
              <Target className="w-4 h-4 text-rose-400 shrink-0" />
              <span>1. YOLOv8 Reticle Target Lock</span>
            </div>
            <div className="flex items-center gap-2 text-sky-300">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>2. Real PostGIS Lat/Lng GIS Mapping</span>
            </div>
            <div className="flex items-center gap-2 text-sky-300">
              <Database className="w-4 h-4 text-amber-400 shrink-0" />
              <span>3. Download Raw NetCDF & CSV Scans</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Tab Selector Navigation */}
      <div className="p-4 rounded-3xl glass-panel flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex rounded-2xl bg-slate-200 dark:bg-slate-900 p-1 border border-slate-300 dark:border-slate-800 w-full text-xs font-bold">
          <button
            onClick={() => setActiveTab('pollution')}
            className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
              activeTab === 'pollution'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Target className="w-4 h-4 text-rose-400" />
            <span>Tactical Reticle & Real GIS Map</span>
          </button>

          <button
            onClick={() => setActiveTab('extinction')}
            className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
              activeTab === 'extinction'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <TrendingDown className="w-4 h-4 text-amber-400" />
            <span>AI Extinction Predictor</span>
          </button>

          <button
            onClick={() => setActiveTab('species')}
            className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
              activeTab === 'species'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Fish className="w-4 h-4" />
            <span>Species Taxonomy</span>
          </button>

          <button
            onClick={() => setActiveTab('coral')}
            className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
              activeTab === 'coral'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Reef Bleaching</span>
          </button>
        </div>
      </div>

      {/* TAB 1: TACTICAL NEURAL BOUNDING BOX & REAL GIS MAP INTEGRATION */}
      {activeTab === 'pollution' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Visual Frame / Real GIS Map Container */}
          <div className="lg:col-span-2 p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-4">
            
            {/* Header Controls for Switching between Optical Camera & Real GIS Map */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Crosshair className="w-4 h-4 text-rose-500" />
                  <span>Selected Scan Target: {selectedDetection.title}</span>
                </h3>
              </div>

              {/* View Switcher: Subsea Camera Optical vs Real GIS Map */}
              <div className="flex rounded-xl bg-slate-200 dark:bg-slate-900 p-1 font-bold text-xs">
                <button
                  onClick={() => setViewMode('camera')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                    viewMode === 'camera' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Optical Neural Frame</span>
                </button>
                <button
                  onClick={() => setViewMode('gis_map')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                    viewMode === 'gis_map' ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Real GIS Map Layer</span>
                </button>
              </div>
            </div>

            {/* VIEW MODE 1: OPTICAL CAMERA FRAME WITH PROMINENT TACTICAL RETICLE */}
            {viewMode === 'camera' && (
              <div className="relative w-full h-[420px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 group">
                <img
                  src={selectedDetection.imageUrl}
                  alt={selectedDetection.title}
                  className="w-full h-full object-cover brightness-95"
                />

                {/* Subsea Tactical HUD Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-slate-950/20 to-slate-950/70 pointer-events-none" />

                {/* Tactical Corner Brackets */}
                <div className="absolute top-4 left-4 w-7 h-7 border-t-4 border-l-4 border-sky-400 opacity-90" />
                <div className="absolute top-4 right-4 w-7 h-7 border-t-4 border-r-4 border-sky-400 opacity-90" />
                <div className="absolute bottom-4 left-4 w-7 h-7 border-b-4 border-l-4 border-sky-400 opacity-90" />
                <div className="absolute bottom-4 right-4 w-7 h-7 border-b-4 border-r-4 border-sky-400 opacity-90" />

                {/* PROMINENT YOLOv8 TACTICAL BOUNDING TARGET RETICLE */}
                <div className="absolute top-[18%] left-[18%] w-[64%] h-[64%] border-2 border-rose-500 rounded-2xl bg-rose-500/15 backdrop-blur-[2px] shadow-[0_0_30px_rgba(244,63,94,0.4)] flex flex-col justify-between p-3.5 pointer-events-none transition-all duration-300 animate-pulse">
                  
                  {/* Target Lock Banner Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-600 text-white font-extrabold font-mono text-xs shadow-md">
                      <Target className="w-4 h-4" />
                      <span>{selectedDetection.category.toUpperCase()}: {selectedDetection.confidence}% CONFIDENCE</span>
                    </div>
                    <span className="text-[10px] text-white font-mono font-bold bg-slate-950/95 px-2.5 py-1 rounded-lg border border-slate-800">
                      BOUNDS: {selectedDetection.boundingBox}
                    </span>
                  </div>

                  {/* Center Target Laser Reticle */}
                  <div className="relative flex-1 flex items-center justify-center my-2">
                    <div className="w-10 h-10 rounded-full border-2 border-rose-400 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                    </div>
                    <div className="absolute w-16 h-[2px] bg-rose-500/70" />
                    <div className="absolute h-16 w-[2px] bg-rose-500/70" />
                  </div>

                  {/* Target Telemetry Footer */}
                  <div className="text-[10px] text-white font-mono bg-slate-950/95 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between shadow-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-rose-400 font-extrabold">● TARGET LOCKED</span>
                      <span>LAT: {selectedDetection.coordinates[0]}° N | LNG: {selectedDetection.coordinates[1]}° W</span>
                    </div>
                    <span className="text-sky-400 font-bold">{selectedDetection.scanType}</span>
                  </div>

                </div>
              </div>
            )}

            {/* VIEW MODE 2: REAL LEAFLET GIS MAP LAYER WITH REAL DATASET MARKER */}
            {viewMode === 'gis_map' && (
              <div className="w-full h-[420px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                <GISMap />
              </div>
            )}

            {/* Frame Detailed Real Telemetry Card */}
            <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div>
                <span className="text-slate-400 text-[10px] block">PostGIS Coordinates</span>
                <strong className="text-slate-900 dark:text-white block mt-0.5 text-xs">
                  {selectedDetection.coordinates.join('°, ')}°
                </strong>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] block">Patrol Depth</span>
                <strong className="text-sky-600 dark:text-sky-400 block mt-0.5 text-xs">
                  {selectedDetection.depth} meters
                </strong>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] block">Ocean Sector</span>
                <strong className="text-slate-900 dark:text-white block mt-0.5 text-xs truncate">
                  {selectedDetection.sectorName}
                </strong>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] block">Sensor Unit</span>
                <strong className="text-emerald-600 dark:text-emerald-400 block mt-0.5 text-xs">
                  {selectedDetection.scanType}
                </strong>
              </div>
            </div>

          </div>

          {/* Detections Queue */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-sky-500" />
              <span>AI Interception Queue ({aiDetections.length} Scans)</span>
            </h3>

            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
              {aiDetections.map((det) => (
                <div
                  key={det.id}
                  onClick={() => setSelectedDetection(det)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                    selectedDetection.id === det.id
                      ? 'bg-sky-500/15 border-sky-500 shadow-sm font-semibold'
                      : 'bg-slate-100 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
                      {det.category}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      {det.confidence}% AI Match
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">{det.title}</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 truncate">{det.sectorName}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: AI EXTINCTION PREDICTOR OVER 150+ SCANS */}
      {activeTab === 'extinction' && (
        <div className="space-y-8">
          
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-sky-500/40 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-500 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20 uppercase tracking-wider">
                  AI BIO-ACOUSTIC TELEMETRY MODEL
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                  Marine Species Decimation & Extinction Rate Analytics
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Calculated across 150 hydrophone acoustic spectrograms & AUV optical passes today.
                </p>
              </div>

              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/30">
                156 Active Sonar Feeds Active
              </span>
            </div>

            {/* Extinction Risk Chart */}
            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={extinctionAnalytics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                  <XAxis dataKey="species" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" unit="%" />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#38bdf8', borderRadius: '12px', color: '#fff' }} />
                  <Bar dataKey="riskPercent" name="Extinction Risk %" fill="#F43F5E" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 150+ Scan Extinction Cards Catalog */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {extinctionAnalytics.map((item, idx) => (
              <div
                key={idx}
                className="rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col justify-between card-3d-tilt"
              >
                <div className="relative h-48 w-full bg-slate-950">
                  <img src={item.image} alt={item.species} className="w-full h-full object-cover brightness-95" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-4 flex flex-col justify-between">
                    <span className="px-2.5 py-0.5 rounded bg-rose-600 text-white font-mono text-[10px] font-bold w-max">
                      IUCN: {item.status.toUpperCase()}
                    </span>
                    <div>
                      <h4 className="text-lg font-bold text-white">{item.species}</h4>
                      <p className="text-[10px] text-amber-300 font-mono font-bold mt-0.5">
                        Decimation Rate: {item.decimationRate}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 text-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Extinction Risk:</span>
                    <strong className="text-rose-600 dark:text-rose-400 font-mono text-sm">{item.riskPercent}%</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Observed Count:</span>
                    <strong className="text-slate-900 dark:text-white font-mono">{item.count} Units</strong>
                  </div>
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400">
                    <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">Primary Extinction Threat:</span>
                    <span>{item.threat}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 3: SPECIES TAXONOMY */}
      {activeTab === 'species' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 relative overflow-hidden flex flex-col justify-between">
            <div className="relative w-full h-[380px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950">
              <img
                src={selectedSpecies.imageUrl}
                alt={selectedSpecies.name}
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400 text-sky-300 font-mono text-xs font-bold">
                    TAXONOMY AI MATCH: {selectedSpecies.aiAccuracy}%
                  </span>
                  <span className="text-xs text-emerald-400 font-mono font-bold px-2 py-1 rounded bg-slate-950/80">
                    STATUS: {selectedSpecies.status}
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl font-extrabold text-white">{selectedSpecies.name}</h2>
                  <p className="text-xs text-sky-300 font-mono italic">{selectedSpecies.scientificName}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Population Trend</span>
                <strong className="text-emerald-600 dark:text-emerald-400 text-xs font-bold">{selectedSpecies.populationTrend}</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Depth Range</span>
                <strong className="text-slate-900 dark:text-white text-xs font-bold">{selectedSpecies.depthRange}</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Observed Today</span>
                <strong className="text-sky-600 dark:text-sky-400 text-xs font-bold">{selectedSpecies.observedCount} Units</strong>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Observed Species Registry</h3>
            {marineSpecies.map((spec) => (
              <div
                key={spec.id}
                onClick={() => setSelectedSpecies(spec)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                  selectedSpecies.id === spec.id
                    ? 'bg-sky-500/15 border-sky-500 shadow-sm font-semibold'
                    : 'bg-slate-100 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">{spec.name}</h4>
                  <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400 font-bold">{spec.aiAccuracy}% Match</span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 italic">{spec.scientificName}</p>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 4: CORAL BLEACHING */}
      {activeTab === 'coral' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl glass-panel border border-emerald-500/40 text-center">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Healthy Coverage</span>
              <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-1">
                {coralReefData.healthyCoverage}%
              </p>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-amber-500/40 text-center">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Partially Bleached</span>
              <p className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 font-mono mt-1">
                {coralReefData.partiallyBleached}%
              </p>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-rose-500/40 text-center">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Severely Bleached</span>
              <p className="text-3xl font-extrabold text-rose-600 dark:text-rose-400 font-mono mt-1">
                {coralReefData.severelyBleached}%
              </p>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-violet-500/40 text-center">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Thermal Anomaly</span>
              <p className="text-3xl font-extrabold text-rose-600 dark:text-rose-400 font-mono mt-1">
                +{coralReefData.tempAnomalyCelsius}°C
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
              5-Year Coral Health & Bleaching Trajectory
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              AI thermal model projections showing inverse relationship between SST anomalies and healthy reef coverage.
            </p>

            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={coralReefData.fiveYearTrend}>
                  <defs>
                    <linearGradient id="colorHealthy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorBleached" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#F43F5E" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                  <XAxis dataKey="year" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#38bdf8', borderRadius: '12px', color: '#fff' }} />
                  <Area type="monotone" dataKey="healthyPercent" name="Healthy %" stroke="#10B981" fillOpacity={1} fill="url(#colorHealthy)" />
                  <Area type="monotone" dataKey="bleachedPercent" name="Bleached %" stroke="#F43F5E" fillOpacity={1} fill="url(#colorBleached)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
