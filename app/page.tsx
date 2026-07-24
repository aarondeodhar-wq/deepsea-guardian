'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
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
  Lock,
  Building2,
  Anchor,
  Navigation,
  Server,
  Phone,
  Copy,
  Volume2,
  Maximize2
} from 'lucide-react';
import { oceanSectors, aiDetections, marineSpecies, smartAlerts, droneFleet, systemOverview, exportDatasetAsFile } from '@/lib/mock-data';
import { DroneDeploymentModal } from '@/components/drone-deployment-modal';

export default function HomePage() {
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  const handleDownloadCSV = () => {
    exportDatasetAsFile('Global_Ocean_Health_Telemetry', 'CSV');
    setDownloadSuccess('Exported Global Ocean Telemetry Dataset in CSV format ✓');
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  const handleCopyNumber = (num: string, agency: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(`Copied ${agency} hotline (${num}) to clipboard! ✓`);
    setTimeout(() => setCopiedNumber(null), 3000);
  };

  const partnerOrgs = [
    { 
      name: 'NOAA Ocean Sciences', 
      role: 'Satellite SAR & Thermal Calibration', 
      category: 'Federal Agency',
      badge: 'Live SAR Stream',
      icon: Globe 
    },
    { 
      name: 'UNESCO Oceanographic Commission', 
      role: 'Global Marine Biodiversity Data', 
      category: 'UN Intergovernmental',
      badge: 'Global Taxonomy',
      icon: Building2 
    },
    { 
      name: 'Woods Hole Institution', 
      role: 'Subsea Autonomous AUV Engineering', 
      category: 'Research Institute',
      badge: 'AUV Swarm Tech',
      icon: Anchor 
    },
    { 
      name: 'NASA Earth Observing System', 
      role: 'Ocean Surface Altimetry Feeds', 
      category: 'Space Agency',
      badge: 'Altimetry SAR',
      icon: Navigation 
    },
  ];

  const hardwareSpecs = [
    {
      title: 'DeepGuardian AUV Swarm',
      badge: '4,500m Depth Rated',
      status: 'Active Unit',
      metric: '72h Battery',
      desc: 'Lithium-sulfur powered autonomous gliders with sub-centimeter optical cameras and deep benthic sonar.',
      icon: Cpu
    },
    {
      title: 'Benthic Hydrophone Arrays',
      badge: '192kHz Acoustic Sampling',
      status: 'Live Stream',
      metric: '24/7 Monitoring',
      desc: 'Deep-water hydrophone buoys recording cetacean acoustic spectrograms and vessel engine cavitation.',
      icon: Radio
    },
    {
      title: 'SAR Satellite Synthetic Radar',
      badge: 'C-Band Radar Echo',
      status: 'Calibrated',
      metric: '10m Resolution',
      desc: 'Polar-orbiting synthetic aperture radar piercing cloud cover to detect illegal bilge oil slicks.',
      icon: Zap
    },
    {
      title: 'PostGIS Spatial Engine',
      badge: 'Sub-Second Indexing',
      status: 'Database Online',
      metric: '150+ Scan Records',
      desc: 'High-performance spatial database linking 150+ bio-acoustic telemetry scans directly to marine sanctuaries.',
      icon: Server
    }
  ];

  const emergencyHotlines = [
    { agency: 'US Coast Guard Command', number: '+1 (800) 424-8802', region: 'Americas & Atlantic', code: 'US Command' },
    { agency: 'UN Environment Program', number: '+41 22 917 8111', region: 'Global Marine Crisis', code: 'UN Global' },
    { agency: 'EMSA European Safety Agency', number: '+351 21 120 9200', region: 'Europe & Med', code: 'EU Safety' },
    { agency: 'AMSA Maritime Safety Authority', number: '+61 2 6279 5000', region: 'Indo-Pacific & Reefs', code: 'AU Pacific' },
    { agency: 'Japan Coast Guard Crisis Line', number: '+81 3 3591 6361', region: 'Pacific Trench Sector', code: 'JP Trench' },
    { agency: 'UK Maritime & Coastguard', number: '+44 20 3817 2000', region: 'North Sea & Ridge', code: 'UK Agency' },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-6 sm:py-10 text-slate-900 dark:text-slate-100">
      
      {/* Drone Deployment Modal */}
      <DroneDeploymentModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
      />

      {/* SECTION 0: HERO BANNER (DEEP GRADIENT & iOS SPRING CARDS) */}
      <section className="relative p-6 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-800 text-center space-y-6 sm:space-y-8 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-200 text-[11px] sm:text-xs font-semibold backdrop-blur-md">
          <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>Real-Time Subsea Autonomous Risk Prediction System</span>
        </div>

        <h1 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
          Deep Sea Marine Pollution & Biodiversity Platform
        </h1>

        <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Integrating AUV drone swarms, SAR satellite radar imagery, sonar bathymetry, and hydrophone buoys into an executive environmental risk prediction platform.
        </p>

        {/* Hero Action Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/map"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 shadow-xl transition-all flex items-center justify-center gap-2 ios-spring"
          >
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>Explore Interactive GIS Map</span>
          </Link>

          <button
            onClick={() => setIsDeployModalOpen(true)}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm border border-slate-700 shadow-md transition-all flex items-center justify-center gap-2 ios-spring"
          >
            <Play className="w-4 h-4 text-sky-400" />
            <span>Deploy AUV Swarm Drone</span>
          </button>
        </div>

        {downloadSuccess && (
          <div className="max-w-md mx-auto p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{downloadSuccess}</span>
          </div>
        )}

        {/* Key Metrics Counter Bar */}
        <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto text-left">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 shadow-lg">
            <Globe className="w-5 h-5 text-sky-400 mb-1.5" />
            <span className="text-xl sm:text-3xl font-extrabold text-white font-mono block">420,000</span>
            <span className="text-[11px] sm:text-xs text-slate-400 font-medium">Monitored Ocean (km²)</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 shadow-lg">
            <Fish className="w-5 h-5 text-emerald-400 mb-1.5" />
            <span className="text-xl sm:text-3xl font-extrabold text-white font-mono block">1,420</span>
            <span className="text-[11px] sm:text-xs text-slate-400 font-medium">Observed Species</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 shadow-lg">
            <ShieldAlert className="w-5 h-5 text-rose-400 mb-1.5" />
            <span className="text-xl sm:text-3xl font-extrabold text-white font-mono block">14</span>
            <span className="text-[11px] sm:text-xs text-slate-400 font-medium">Threat Interceptions</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 shadow-lg">
            <Radio className="w-5 h-5 text-amber-400 mb-1.5 animate-pulse" />
            <span className="text-xl sm:text-3xl font-extrabold text-white font-mono block">14</span>
            <span className="text-[11px] sm:text-xs text-slate-400 font-medium">Active Swarm Units</span>
          </div>

        </div>

      </section>

      {/* SECTION 1: SUBSEA BATHYMETRY & TRENCH PROFILER (DARK SLATE GLASS SHADE) */}
      <section className="p-6 sm:p-10 rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/30 uppercase tracking-wider">
              BENTHIC TRENCH DEPTH PROFILER
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white mt-1">
              Mariana Trench & Abyssal Plain Bathymetry
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Live sonar depth profiling down to 10,920 meters, measuring hydrostatic pressure and benthic currents.
            </p>
          </div>

          <Link
            href="/map"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 shadow-md transition-all flex items-center gap-2 shrink-0"
          >
            <Compass className="w-4 h-4 text-sky-400" />
            <span>Launch Depth Map →</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs text-white">
          
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="text-slate-400 text-[10px] block">Max Benthic Depth</span>
            <strong className="text-2xl font-extrabold text-white">10,920 m</strong>
            <span className="text-emerald-400 text-[10px] block">Mariana Trench Challenger Deep</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="text-slate-400 text-[10px] block">Hydrostatic Pressure</span>
            <strong className="text-2xl font-extrabold text-amber-400">1,086 bar</strong>
            <span className="text-slate-400 text-[10px] block">1,071x Atmospheric Sea Level</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="text-slate-400 text-[10px] block">Acoustic Sonar Frequency</span>
            <strong className="text-2xl font-extrabold text-sky-400">192 kHz</strong>
            <span className="text-sky-300 text-[10px] block">Sub-centimeter Resolution</span>
          </div>

        </div>
      </section>

      {/* SECTION 2: GLOBAL DEEP OCEAN BASIN MATRIX (ALTERNATING SLATE-950 BACKGROUND) */}
      <section className="p-6 sm:p-10 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 uppercase tracking-wider">
              REAL-TIME BASIN MATRIX
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white mt-1">
              Deep Ocean Basin Sector Grid
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Live pH acidity, patrol depth, and microplastic density across 10 monitored oceanic sectors.
            </p>
          </div>

          <button
            onClick={handleDownloadCSV}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all flex items-center gap-1.5 shrink-0"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export CSV Dataset</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {oceanSectors.slice(0, 6).map((sector) => (
            <div
              key={sector.id}
              className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 hover:border-slate-600 transition-all shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-200 bg-slate-800 px-2.5 py-0.5 rounded border border-slate-700">
                  {sector.id}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  sector.pollutionRisk === 'Critical' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {sector.pollutionRisk} Risk
                </span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">{sector.name}</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{sector.oceanBasin}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-3 border-t border-slate-800 font-mono">
                <div>
                  <span className="text-slate-400 text-[10px] block">Health Index</span>
                  <strong className="text-white text-xs sm:text-sm">{sector.healthScore} / 100</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Depth</span>
                  <strong className="text-slate-300 text-xs sm:text-sm">{sector.depthMeters}m</strong>
                </div>
              </div>

              <Link
                href="/map"
                className="w-full py-2 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-700 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Inspect GIS Map Layer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: AI NEURAL COMPUTER VISION INTERCEPTIONS */}
      <section className="p-6 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6 sm:space-y-8 shadow-xl">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-mono font-bold text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/30 uppercase tracking-wider">
              YOLOV8 SUBSEA RETICLES
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white mt-1">
              Subsea Optical Reticle Feed
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Subsea optical camera interceptions detecting microplastics, ghost nets, and chemical barrels.
            </p>
          </div>

          <Link
            href="/ai-detection"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 shadow-md transition-all flex items-center gap-2 shrink-0"
          >
            <Eye className="w-4 h-4 text-rose-400" />
            <span>Open Vision Lab</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aiDetections.slice(0, 2).map((detection) => (
            <div
              key={detection.id}
              className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-between"
            >
              <div className="relative h-48 sm:h-56 w-full bg-slate-950">
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

              <div className="p-4 sm:p-5 text-xs space-y-2">
                <h4 className="font-bold text-sm text-white">{detection.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{detection.details}</p>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* SECTION 4: BIO-ACOUSTIC CETACEAN MAMMAL TRACKING (NEW RICH CONTENT) */}
      <section className="p-6 sm:p-10 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 uppercase tracking-wider">
              BIO-ACOUSTIC SPECTROGRAM TELEMETRY
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white mt-1">
              Marine Species Taxonomy & Cetacean Acoustic Tracking
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              192kHz hydrophone buoys tracking endangered Blue Whales, Sperm Whales, and deep benthic organisms.
            </p>
          </div>

          <Link
            href="/biodiversity"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 shadow-md transition-all flex items-center gap-2 shrink-0"
          >
            <Fish className="w-4 h-4 text-amber-400" />
            <span>Explore Biodiversity Catalog →</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {marineSpecies.slice(0, 4).map((species) => (
            <div key={species.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="relative h-32 w-full rounded-xl overflow-hidden bg-slate-950">
                <img src={species.imageUrl} alt={species.name} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-950/80 text-emerald-400 font-mono text-[9px] font-bold">
                  {species.status}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-sm text-white">{species.name}</h4>
                <span className="text-[10px] font-mono text-slate-400 block">{species.scientificName}</span>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-800">
                <span>Depth: {species.depthRange}</span>
                <span className="text-amber-400 font-bold">Observed: {species.observedCount}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: HARDWARE ARCHITECTURE */}
      <section className="p-6 sm:p-10 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-6 shadow-xl">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-mono font-bold text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/30 uppercase tracking-wider">
            HARDWARE ARCHITECTURE
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white">
            Multi-Modal Subsea Sensor Swarm Specs
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Autonomous AUV drones, SAR synthetic radar satellites, and deep-sea benthic hydrophone arrays.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {hardwareSpecs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 hover:border-slate-600 transition-all flex flex-col justify-between shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-slate-800 text-white border border-slate-700">
                      <Icon className="w-6 h-6 text-sky-400" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {item.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-base text-white">{item.title}</h3>
                    <span className="text-[10px] font-mono font-bold text-slate-400 block mt-0.5">{item.badge}</span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">Spec Metric:</span>
                  <strong className="text-white font-bold">{item.metric}</strong>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 6: INSTITUTIONAL PARTNERS CONSORTIUM */}
      <section className="p-6 sm:p-10 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-6 shadow-xl">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
            INTERGOVERNMENTAL CONSORTIUM
          </span>
          <h2 className="text-lg sm:text-2xl font-extrabold text-white">
            Institutional Research & Conservation Partners
          </h2>
          <p className="text-xs text-slate-400">
            Calibrated with global oceanographic centers and satellite altimetry relays.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {partnerOrgs.map((partner, idx) => {
            const Icon = partner.icon;
            return (
              <div 
                key={idx} 
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-left space-y-3 hover:border-slate-600 transition-all shadow-md flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-2xl bg-slate-800 text-white border border-slate-700">
                      <Icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {partner.badge}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-sm text-white">{partner.name}</h4>
                    <span className="text-[10px] font-mono text-slate-400 block">{partner.category}</span>
                  </div>

                  <p className="text-xs text-slate-400 leading-normal">{partner.role}</p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Telemetry Partner</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 7: MATTE SLATE EMERGENCY HELPLINES */}
      <section className="p-6 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 text-white space-y-8 shadow-2xl">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
                24/7 EMERGENCY CRISIS DISPATCH HOTLINES
              </span>
            </div>
            <h3 className="text-xl sm:text-3xl font-extrabold text-white">
              Global Ocean Emergency Response Network
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Direct dispatch numbers to report active chemical spills, illegal deep-sea mining, or ocean oil slicks to regional maritime coast guard commands.
            </p>
          </div>

          <Link
            href="/contact"
            className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 shadow-md transition-all shrink-0"
          >
            Contact Full Incident Desk →
          </Link>
        </div>

        {copiedNumber && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{copiedNumber}</span>
          </div>
        )}

        {/* 6 INTERNATIONAL HOTLINE NUMBERS GRID (MATTE SLATE STYLING) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {emergencyHotlines.map((hotline, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                  {hotline.code}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {hotline.region}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-xs text-slate-200">{hotline.agency}</h4>
                <span className="font-mono text-base sm:text-lg font-extrabold text-rose-400 block mt-1">
                  {hotline.number}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-900 flex items-center justify-between gap-2">
                <a
                  href={`tel:${hotline.number.replace(/[^0-9+]/g, '')}`}
                  className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all border border-slate-700 text-center flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-rose-400" />
                  <span>Call Hotline</span>
                </a>

                <button
                  onClick={() => handleCopyNumber(hotline.number, hotline.agency)}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all border border-slate-700"
                  title="Copy Phone Number"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Incident Reporting Protocol */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Required Incident Telemetry: Lat/Lng Coordinates, Threat Type & Plume Area</span>
          </div>
          <Link
            href="/reports"
            className="text-white hover:text-slate-300 font-bold underline whitespace-nowrap"
          >
            Generate Official Audit Report →
          </Link>
        </div>

      </section>

    </div>
  );
}
