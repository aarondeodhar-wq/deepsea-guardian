'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Waves, 
  ShieldAlert, 
  Activity, 
  Compass, 
  ArrowRight, 
  CheckCircle2, 
  Download, 
  MapPin, 
  Eye, 
  Fish, 
  TrendingUp, 
  Play, 
  Database, 
  PhoneCall, 
  Radio, 
  Cpu, 
  Layers, 
  Zap, 
  Droplets, 
  Thermometer, 
  Globe, 
  ShieldCheck, 
  Lock,
  Building2
} from 'lucide-react';
import { oceanSectors, aiDetections, smartAlerts, droneFleet, systemOverview, exportDatasetAsFile } from '@/lib/mock-data';
import { DroneDeploymentModal } from '@/components/drone-deployment-modal';

export default function HomePage() {
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownloadCSV = () => {
    exportDatasetAsFile('Global_Ocean_Health_Telemetry', 'CSV');
    setDownloadSuccess('Exported Global Ocean Telemetry Dataset in CSV format ✓');
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const partnerOrgs = [
    { name: 'NOAA Ocean Sciences', role: 'Satellite SAR & Thermal Calibration', logo: '🌐' },
    { name: 'UNESCO Oceanographic Commission', role: 'Global Marine Biodiversity Data', logo: '🏛️' },
    { name: 'Woods Hole Institution', role: 'Subsea Autonomous AUV Engineering', logo: '⚓' },
    { name: 'NASA Earth Observing System', role: 'Ocean Surface Altimetry Feeds', logo: '🚀' },
  ];

  return (
    <div className="space-y-16 pb-16 text-slate-900 dark:text-slate-100">
      
      {/* Drone Deployment Modal */}
      <DroneDeploymentModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
      />

      {/* HERO SECTION - MATTE CHARCOAL GREY */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold">
          <Radio className="w-4 h-4 text-slate-500 animate-pulse" />
          <span>Real-Time Subsea Autonomous Risk Prediction System</span>
        </div>

        <h1 className="text-3xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight max-w-4xl mx-auto">
          Deep Sea Marine Pollution & Biodiversity Platform
        </h1>

        <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Integrating AUV drone swarms, SAR satellite radar imagery, sonar bathymetry, and hydrophone buoys into an executive environmental risk prediction platform.
        </p>

        {/* Hero CTA Action Row - Matte Executive Tones */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/map"
            className="px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 shadow-xl transition-all flex items-center gap-2 ios-spring"
          >
            <MapPin className="w-4 h-4 text-slate-300" />
            <span>Explore Interactive GIS Map</span>
          </Link>

          <button
            onClick={() => setIsDeployModalOpen(true)}
            className="px-6 py-3.5 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs sm:text-sm border border-slate-300 dark:border-slate-700 shadow-md transition-all flex items-center gap-2 ios-spring"
          >
            <Play className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            <span>Deploy AUV Swarm Drone</span>
          </button>
        </div>

        {downloadSuccess && (
          <div className="max-w-md mx-auto p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{downloadSuccess}</span>
          </div>
        )}

        {/* Key Metrics Counter Bar */}
        <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
          
          <div className="p-5 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
            <Globe className="w-6 h-6 text-slate-600 dark:text-slate-400 mb-2" />
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono block">420,000</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Monitored Ocean (km²)</span>
          </div>

          <div className="p-5 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
            <Fish className="w-6 h-6 text-emerald-500 mb-2" />
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono block">1,420</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Observed Species Individuals</span>
          </div>

          <div className="p-5 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
            <ShieldAlert className="w-6 h-6 text-rose-500 mb-2" />
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono block">14</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Threat Interceptions Today</span>
          </div>

          <div className="p-5 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
            <Radio className="w-6 h-6 text-slate-500 dark:text-slate-400 mb-2 animate-pulse" />
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono block">14</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Active Patrol Swarm Units</span>
          </div>

        </div>

      </section>

      {/* SECTION 1: GLOBAL DEEP OCEAN BASIN MATRIX */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-300 dark:border-slate-700 uppercase tracking-wider">
              REAL-TIME BASIN MATRIX
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Deep Ocean Basin Sector Grid
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Live pH acidity, patrol depth, and microplastic density across 10 monitored oceanic sectors.
            </p>
          </div>

          <button
            onClick={handleDownloadCSV}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all flex items-center gap-1.5 shrink-0"
          >
            <Download className="w-4 h-4 text-slate-300" />
            <span>Export CSV Dataset</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {oceanSectors.slice(0, 6).map((sector) => (
            <div
              key={sector.id}
              className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-4 hover:border-slate-500 transition-all card-3d-tilt"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-800 px-2.5 py-0.5 rounded border border-slate-300 dark:border-slate-700">
                  {sector.id}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  sector.pollutionRisk === 'Critical' ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400' : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                }`}>
                  {sector.pollutionRisk} Risk
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{sector.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">{sector.oceanBasin}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-3 border-t border-slate-200 dark:border-slate-800 font-mono">
                <div>
                  <span className="text-slate-400 text-[10px] block">Health Index</span>
                  <strong className="text-slate-900 dark:text-white text-sm">{sector.healthScore} / 100</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Depth</span>
                  <strong className="text-slate-700 dark:text-slate-300 text-sm">{sector.depthMeters}m</strong>
                </div>
              </div>

              <Link
                href="/map"
                className="w-full py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-bold hover:bg-slate-800 hover:text-white dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Inspect GIS Map Layer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: AI NEURAL COMPUTER VISION INTERCEPTIONS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-slate-300 dark:border-slate-800 space-y-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/30 uppercase tracking-wider">
                YOLOV8 SUBSEA RETICLES
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                AI Computer Vision & Tactical Reticle Feed
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Subsea optical camera interceptions detecting microplastic clusters, ghost fishing nets, and chemical barrels.
              </p>
            </div>

            <Link
              href="/ai-detection"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 shadow-md transition-all flex items-center gap-2 shrink-0 ios-spring"
            >
              <Eye className="w-4 h-4 text-slate-300" />
              <span>Open AI Vision Lab</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiDetections.slice(0, 2).map((detection) => (
              <div
                key={detection.id}
                className="rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col justify-between"
              >
                <div className="relative h-56 w-full bg-slate-950">
                  <img src={detection.imageUrl} alt={detection.title} className="w-full h-full object-cover brightness-95" />
                  <div className="absolute inset-0 bg-slate-950/20 p-4 flex flex-col justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-mono font-bold text-[10px] w-max">
                      {detection.category.toUpperCase()}: {detection.confidence}% MATCH
                    </span>
                    <div className="p-2 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[10px] font-mono text-white flex items-center justify-between">
                      <span className="text-rose-400 font-bold">BOUNDS: {detection.boundingBox}</span>
                      <span className="text-slate-300">{detection.depth}m Depth</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 text-xs space-y-2">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{detection.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">{detection.details}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 3: SUBSEA HARDWARE & SENSOR SPECS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-300 dark:border-slate-700 uppercase tracking-wider">
            HARDWARE ARCHITECTURE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Multi-Modal Subsea Sensor Swarm Specs
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Autonomous AUV drones, SAR synthetic radar satellites, and deep-sea benthic hydrophone arrays.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-3">
            <Cpu className="w-8 h-8 text-slate-700 dark:text-slate-300" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white">DeepGuardian AUV</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              4,500m depth rating, 72-hour lithium-sulfur battery endurance, sub-centimeter optical vision cameras.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-3">
            <Radio className="w-8 h-8 text-emerald-500 animate-pulse" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Hydrophone Buoys</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Real-time 192kHz acoustic spectrogram sampling to track cetacean bio-acoustics and vessel cavitation.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-3">
            <Zap className="w-8 h-8 text-amber-500" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white">SAR Radar Satellite</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              C-band synthetic aperture radar piercing cloud cover to detect illegal vessel bilge oil slicks.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-3">
            <Database className="w-8 h-8 text-slate-700 dark:text-slate-300" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white">PostGIS Spatial Database</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Sub-second spatial queries linking 150+ bio-acoustic telemetry scans directly to marine protection zones.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 4: INSTITUTIONAL PARTNERS CONSORTIUM */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
              INTERGOVERNMENTAL CONSORTIUM
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Institutional Research & Conservation Partners
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {partnerOrgs.map((partner, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2">
                <span className="text-3xl block">{partner.logo}</span>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">{partner.name}</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">{partner.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: HELPLINE & AUDIT GENERATION DIRECTIVES */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-slate-800">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-rose-400 animate-pulse" />
              <h3 className="text-xl font-extrabold">24/7 Coast Guard Emergency Subsea Crisis Line</h3>
            </div>
            <p className="text-xs text-slate-300 max-w-xl">
              Report active marine chemical barrel leaks, illegal trawling in seamount sanctuaries, or oil slicks directly to the Coast Guard Command.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all ios-spring"
            >
              Contact Emergency Helplines
            </Link>
            <Link
              href="/reports"
              className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all"
            >
              Generate Audit Report
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
