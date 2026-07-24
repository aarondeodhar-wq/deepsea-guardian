'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck, ShieldAlert, Activity, Compass, ArrowRight,
  CheckCircle2, Download, MapPin, Eye, Fish, Play, Radio,
  Cpu, Zap, Globe, Building2, Anchor, Navigation, Server,
  Phone, Copy, Waves, ChevronUp, ChevronDown
} from 'lucide-react';
import {
  oceanSectors, aiDetections, marineSpecies,
  exportDatasetAsFile,
} from '@/lib/mock-data';
import { DroneDeploymentModal } from '@/components/drone-deployment-modal';

/* ─── Color tokens (same in both modes — accent colors) ─── */
const C = {
  teal:    '#2dd4bf',  cyan:   '#22d3ee',
  violet:  '#a78bfa',  emerald:'#34d399',
  amber:   '#fbbf24',  rose:   '#fb7185',
  indigo:  '#818cf8',  sky:    '#38bdf8',
};

/* ─── SECTION — glass-panel + colored accent border ─── */
function Section({ id, children, accent = C.teal, className = '' }: {
  id?: string; children: React.ReactNode; accent?: string; className?: string;
}) {
  return (
    <section
      id={id}
      className={`p-6 sm:p-10 rounded-3xl space-y-6 glass-panel transition-all scroll-mt-24 ${className}`}
      style={{ border: `1px solid ${accent}22`, boxShadow: `0 8px 40px rgba(0,0,0,0.18), inset 0 1px 0 ${accent}14` }}
    >
      {children}
    </section>
  );
}

/* ─── CARD — glass-card + colored accent border ─── */
function Card({ children, accent = C.teal, className = '', hover = true }: {
  children: React.ReactNode; accent?: string; className?: string; hover?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-5 glass-card transition-all ${hover ? 'ios-float' : ''} ${className}`}
      style={{ border: `1px solid ${accent}1e` }}
    >
      {children}
    </div>
  );
}

/* ─── PILL badge ─── */
function Pill({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full"
      style={{ background: `${color}16`, border: `1px solid ${color}28`, color }}
    >
      {label}
    </span>
  );
}

/* ─── ACTION BUTTON ─── */
function ActionBtn({ href, onClick, children, accent = C.teal, variant = 'outline' }: {
  href?: string; onClick?: () => void; children: React.ReactNode;
  accent?: string; variant?: 'solid' | 'outline';
}) {
  const style = variant === 'solid'
    ? { background: `linear-gradient(135deg, ${accent}, ${accent}cc)`, color: '#040d14', boxShadow: `0 6px 20px ${accent}35`, border: 'none' }
    : { background: `${accent}12`, border: `1px solid ${accent}28`, color: accent };
  const cls = 'px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 ios-spring shrink-0 whitespace-nowrap';
  if (href) return <Link href={href} className={cls} style={style}>{children}</Link>;
  return <button onClick={onClick} className={cls} style={style}>{children}</button>;
}

/* ─── DIVIDER using CSS var ─── */
const divStyle = { borderTop: '1px solid var(--inner-border)' } as React.CSSProperties;

const sectionsList = [
  { id: 'hero',               label: 'Overview',      color: C.teal    },
  { id: 'bathymetry',         label: 'Bathymetry',    color: C.cyan    },
  { id: 'sector-matrix',      label: 'Basin Grid',    color: C.emerald },
  { id: 'vision-lab',         label: 'Vision Lab',    color: C.rose    },
  { id: 'biodiversity-hub',   label: 'Biodiversity',  color: C.amber   },
  { id: 'hardware-specs',     label: 'Hardware',      color: C.violet  },
  { id: 'partners-consortium',label: 'Partners',      color: C.indigo  },
  { id: 'emergency-hotlines', label: 'Emergency 24/7',color: C.rose    },
];

export default function HomePage() {
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sectionsList.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionsList[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionsList[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  const handleDownloadCSV = () => {
    exportDatasetAsFile('Global_Ocean_Health_Telemetry', 'CSV');
    setDownloadSuccess('Exported Global Ocean Telemetry Dataset in CSV ✓');
    setTimeout(() => setDownloadSuccess(null), 4000);
  };
  const handleCopyNumber = (num: string, agency: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(`Copied ${agency} hotline ✓`);
    setTimeout(() => setCopiedNumber(null), 3000);
  };

  const partnerOrgs = [
    { name: 'NOAA Ocean Sciences',            role: 'Satellite SAR & Thermal Calibration',   category: 'Federal Agency',       badge: 'Live SAR Stream', icon: Globe,      color: C.cyan    },
    { name: 'UNESCO Oceanographic Commission', role: 'Global Marine Biodiversity Data',        category: 'UN Intergovernmental', badge: 'Global Taxonomy', icon: Building2,  color: C.violet  },
    { name: 'Woods Hole Institution',          role: 'Subsea Autonomous AUV Engineering',     category: 'Research Institute',   badge: 'AUV Swarm Tech',  icon: Anchor,     color: C.teal    },
    { name: 'NASA Earth Observing System',     role: 'Ocean Surface Altimetry Feeds',         category: 'Space Agency',         badge: 'Altimetry SAR',   icon: Navigation, color: C.amber   },
  ];

  const hardwareSpecs = [
    { title: 'DeepGuardian AUV Swarm',       badge: '4,500m Depth Rated',       status: 'Active Unit',     metric: '72h Battery',      desc: 'Lithium-sulfur powered autonomous gliders with sub-centimeter optical cameras.', icon: Cpu,    color: C.teal    },
    { title: 'Benthic Hydrophone Arrays',    badge: '192kHz Acoustic Sampling', status: 'Live Stream',     metric: '24/7 Monitoring',  desc: 'Deep-water hydrophone buoys recording cetacean acoustic spectrograms.',         icon: Radio,  color: C.violet  },
    { title: 'SAR Satellite Synthetic Radar',badge: 'C-Band Radar Echo',        status: 'Calibrated',      metric: '10m Resolution',   desc: 'Polar-orbiting synthetic aperture radar detecting illegal bilge oil slicks.',   icon: Zap,    color: C.amber   },
    { title: 'PostGIS Spatial Engine',       badge: 'Sub-Second Indexing',      status: 'Database Online', metric: '150+ Scan Records', desc: 'High-performance spatial database linking 150+ bio-acoustic telemetry scans.',  icon: Server, color: C.emerald },
  ];

  const emergencyHotlines = [
    { agency: 'Indian Coast Guard SAR Command',  number: '1554 / +91 11 2338 4999', region: 'Indian Ocean & Arabian Sea', code: 'IN Guard', color: C.rose    },
    { agency: 'US Coast Guard Command',         number: '+1 (800) 424-8802',       region: 'Americas & Atlantic',       code: 'US Command', color: C.teal    },
    { agency: 'UN Environment Program',         number: '+41 22 917 8111',         region: 'Global Marine Crisis',      code: 'UN Global',  color: C.violet  },
    { agency: 'EMSA European Safety Agency',    number: '+351 21 120 9200',        region: 'Europe & Med',              code: 'EU Safety',  color: C.sky     },
    { agency: 'AMSA Maritime Safety Authority', number: '+61 2 6279 5000',         region: 'Indo-Pacific & Reefs',      code: 'AU Pacific', color: C.amber   },
    { agency: 'Japan Coast Guard Crisis Line',  number: '+81 3 3591 6361',         region: 'Pacific Trench Sector',     code: 'JP Trench',  color: C.emerald },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 py-6 sm:py-10 relative">
      <DroneDeploymentModal isOpen={isDeployModalOpen} onClose={() => setIsDeployModalOpen(false)} />

      {/* ── Floating Side Section Quick Jump Bar ── */}
      <div className="fixed right-3 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-end gap-2 pointer-events-auto">
        <div className="p-2.5 rounded-2xl flex flex-col gap-1.5 glass-panel shadow-2xl transition-all border border-slate-300 dark:border-white/10">
          <span className="text-[9px] font-mono font-black uppercase tracking-widest text-slate-500 dark:text-white/40 px-2 pb-1 border-b border-slate-200 dark:border-white/10">
            Navigation
          </span>
          {sectionsList.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className="group relative flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ios-spring"
                style={
                  isActive
                    ? { background: `${sec.color}22`, border: `1px solid ${sec.color}40`, color: sec.color }
                    : { color: 'var(--txt-primary)' }
                }
              >
                <span
                  className="w-2.5 h-2.5 rounded-full transition-all shrink-0"
                  style={{
                    background: isActive ? sec.color : 'var(--txt-muted)',
                    boxShadow: isActive ? `0 0 10px ${sec.color}` : 'none',
                  }}
                />
                <span className="text-[11px] font-extrabold whitespace-nowrap">
                  {sec.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ══ HERO ══ */}
      <section
        id="hero"
        className="relative p-8 sm:p-14 rounded-3xl text-center space-y-7 overflow-hidden glass-panel scroll-mt-24"
        style={{ border: '1px solid rgba(45,212,191,0.20)', boxShadow: '0 8px 60px rgba(0,0,0,0.2), inset 0 1px 0 rgba(45,212,191,0.12)' }}
      >
        <div className="relative z-10 space-y-7">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold ios-spring"
            style={{ background: `${C.teal}14`, border: `1px solid ${C.teal}28`, color: C.teal }}>
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            Real-Time Subsea Autonomous Risk Prediction System
          </div>

          <h1 className="text-2xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto animated-gradient-text">
            Deep Sea Marine Pollution &amp; Biodiversity Platform
          </h1>

          <p className="text-sm sm:text-base max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--txt-secondary)' }}>
            Integrating AUV drone swarms, SAR satellite radar, sonar bathymetry, and
            hydrophone buoys into an executive environmental risk prediction platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <ActionBtn href="/map" accent={C.teal} variant="solid">
              <MapPin className="w-4 h-4" /> Explore GIS Map
            </ActionBtn>
            <ActionBtn onClick={() => setIsDeployModalOpen(true)} accent={C.violet}>
              <Play className="w-4 h-4" /> Deploy AUV Swarm
            </ActionBtn>
          </div>

          {downloadSuccess && (
            <div className="max-w-md mx-auto p-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold ios-spring"
              style={{ background: `${C.emerald}12`, border: `1px solid ${C.emerald}28`, color: C.emerald }}>
              <CheckCircle2 className="w-4 h-4" />{downloadSuccess}
            </div>
          )}

          {/* Key Metrics */}
          <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
            {[
              { icon: Globe,       value: '420,000', label: 'Monitored Ocean (km²)', color: C.cyan    },
              { icon: Fish,        value: '1,420',   label: 'Observed Species',      color: C.emerald },
              { icon: ShieldAlert, value: '14',      label: 'Threat Interceptions',  color: C.rose    },
              { icon: Radio,       value: '14',      label: 'Active Swarm Units',    color: C.amber, pulse: true },
            ].map(({ icon: Icon, value, label, color, pulse }) => (
              <div key={label} className="p-4 sm:p-5 rounded-2xl glass-card ios-spring"
                style={{ border: `1px solid ${color}20` }}>
                <Icon className={`w-5 h-5 mb-1.5 ${pulse ? 'animate-pulse' : ''}`} style={{ color }} />
                <span className="text-xl sm:text-3xl font-black font-mono block" style={{ color: 'var(--txt-primary)' }}>{value}</span>
                <span className="text-[11px] sm:text-xs font-medium" style={{ color: 'var(--txt-muted)' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BATHYMETRY (cyan) ══ */}
      <Section id="bathymetry" accent={C.cyan}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <Pill label="BENTHIC TRENCH DEPTH PROFILER" color={C.cyan} />
            <h2 className="text-xl sm:text-3xl font-black mt-2" style={{ color: 'var(--txt-primary)' }}>
              Mariana Trench &amp; Abyssal Plain Bathymetry
            </h2>
            <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--txt-secondary)' }}>
              Live sonar depth profiling down to 10,920 meters, measuring hydrostatic pressure and benthic currents.
            </p>
          </div>
          <ActionBtn href="/map" accent={C.cyan}><Compass className="w-4 h-4" />Launch Depth Map →</ActionBtn>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
          {[
            { label: 'Max Benthic Depth',       value: '10,920 m',  sub: 'Mariana Trench Challenger Deep', color: C.teal  },
            { label: 'Hydrostatic Pressure',     value: '1,086 bar', sub: '1,071× Atmospheric Sea Level',  color: C.amber },
            { label: 'Acoustic Sonar Frequency', value: '192 kHz',   sub: 'Sub-centimeter Resolution',     color: C.cyan  },
          ].map(({ label, value, sub, color }) => (
            <Card key={label} accent={color} hover={false}>
              <span className="text-[10px] block mb-1" style={{ color: 'var(--txt-muted)' }}>{label}</span>
              <strong className="text-2xl font-black block" style={{ color }}>{value}</strong>
              <span className="text-[10px] block mt-1" style={{ color: 'var(--txt-faint)' }}>{sub}</span>
            </Card>
          ))}
        </div>
      </Section>

      {/* ══ BASIN MATRIX (emerald) ══ */}
      <Section id="sector-matrix" accent={C.emerald}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <Pill label="REAL-TIME BASIN MATRIX" color={C.emerald} />
            <h2 className="text-xl sm:text-3xl font-black mt-2" style={{ color: 'var(--txt-primary)' }}>Deep Ocean Basin Sector Grid</h2>
            <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--txt-secondary)' }}>
              Live pH acidity, patrol depth, and microplastic density across 10 monitored oceanic sectors.
            </p>
          </div>
          <ActionBtn onClick={handleDownloadCSV} accent={C.emerald}><Download className="w-4 h-4" />Export CSV Dataset</ActionBtn>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {oceanSectors.slice(0, 6).map((sector) => {
            const riskColor = sector.pollutionRisk === 'Critical' ? C.rose : sector.pollutionRisk === 'Moderate' ? C.amber : C.emerald;
            return (
              <Card key={sector.id} accent={C.emerald} className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded"
                    style={{ background: `${C.emerald}14`, border: `1px solid ${C.emerald}28`, color: C.emerald }}>{sector.id}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black"
                    style={{ background: `${riskColor}12`, border: `1px solid ${riskColor}25`, color: riskColor }}>{sector.pollutionRisk} Risk</span>
                </div>
                <div>
                  <h3 className="text-base font-bold" style={{ color: 'var(--txt-primary)' }}>{sector.name}</h3>
                  <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--txt-muted)' }}>{sector.oceanBasin}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs pt-3 font-mono" style={divStyle}>
                  <div>
                    <span className="text-[10px] block" style={{ color: 'var(--txt-muted)' }}>Health Index</span>
                    <strong style={{ color: 'var(--txt-primary)' }}>{sector.healthScore} / 100</strong>
                  </div>
                  <div>
                    <span className="text-[10px] block" style={{ color: 'var(--txt-muted)' }}>Depth</span>
                    <strong style={{ color: C.cyan }}>{sector.depthMeters}m</strong>
                  </div>
                </div>
                <Link href="/map" className="w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 ios-spring"
                  style={{ background: `${C.emerald}12`, border: `1px solid ${C.emerald}22`, color: C.emerald }}>
                  Inspect GIS Map Layer <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* ══ VISION LAB (rose) ══ */}
      <Section id="vision-lab" accent={C.rose}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6" style={divStyle}>
          <div>
            <Pill label="YOLOV8 SUBSEA RETICLES" color={C.rose} />
            <h2 className="text-xl sm:text-3xl font-black mt-2" style={{ color: 'var(--txt-primary)' }}>Subsea Optical Reticle Feed</h2>
            <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--txt-secondary)' }}>
              Subsea optical camera interceptions detecting microplastics, ghost nets, and chemical barrels.
            </p>
          </div>
          <ActionBtn href="/ai-detection" accent={C.rose}><Eye className="w-4 h-4" />Open Vision Lab</ActionBtn>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[aiDetections[0], aiDetections[1], aiDetections[2]].map((detection) => (
            <Card key={detection.id} accent={C.rose} className="overflow-hidden !p-0 space-y-0">
              <div className="relative h-48 sm:h-56 w-full bg-slate-900 overflow-hidden">
                {!failedImages[detection.id] ? (
                  <img
                    src={detection.imageUrl}
                    alt={detection.title}
                    onError={() => handleImageError(detection.id)}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-950 via-rose-950/40 to-slate-950 flex flex-col items-center justify-center p-6 text-center">
                    <Waves className="w-8 h-8 text-rose-400 animate-pulse mb-1.5" />
                    <span className="font-bold text-xs text-white">{detection.title}</span>
                    <span className="text-[10px] text-rose-300 font-mono mt-0.5">{detection.sectorName}</span>
                  </div>
                )}
                <div className="absolute inset-0 p-3.5 flex flex-col justify-between pointer-events-none"
                  style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%)' }}>
                  <span className="px-2.5 py-1 rounded-lg text-white font-mono font-black text-[10px] w-max pointer-events-auto shadow-md" style={{ background: C.rose }}>
                    {detection.category.toUpperCase()}: {detection.confidence}% MATCH
                  </span>
                  <div className="p-2 rounded-xl text-[10px] font-mono flex items-center justify-between pointer-events-auto"
                    style={{ background: 'rgba(0,0,0,0.80)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <span style={{ color: C.rose }} className="font-bold">BOUNDS: {detection.boundingBox}</span>
                    <span className="text-white/70">{detection.depth}m Depth</span>
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-5 space-y-2">
                <span className="text-[10px] font-mono font-bold block" style={{ color: C.rose }}>{detection.sectorName}</span>
                <h4 className="font-bold text-sm leading-snug" style={{ color: 'var(--txt-primary)' }}>{detection.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--txt-secondary)' }}>{detection.details}</p>
                <Link
                  href="/ai-detection"
                  className="inline-flex items-center gap-1 text-[11px] font-bold pt-1 ios-spring"
                  style={{ color: C.rose }}
                >
                  <span>Inspect Neural Reticle</span>
                  <span>→</span>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* ══ BIODIVERSITY (amber) ══ */}
      <Section id="biodiversity-hub" accent={C.amber}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <Pill label="BIO-ACOUSTIC SPECTROGRAM TELEMETRY" color={C.amber} />
            <h2 className="text-xl sm:text-3xl font-black mt-2" style={{ color: 'var(--txt-primary)' }}>
              Marine Species Taxonomy &amp; Cetacean Acoustic Tracking
            </h2>
            <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--txt-secondary)' }}>
              192kHz hydrophone buoys tracking endangered Blue Whales, Sperm Whales, and deep benthic organisms.
            </p>
          </div>
          <ActionBtn href="/biodiversity" accent={C.amber}><Fish className="w-4 h-4" />Explore Biodiversity →</ActionBtn>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {marineSpecies.slice(0, 4).map((species) => {
            const statusColor = species.status === 'Endangered' ? C.rose : species.status === 'Vulnerable' ? C.amber : C.emerald;
            return (
              <Card key={species.id} accent={C.amber} className="space-y-3">
                <div className="relative h-32 w-full rounded-xl overflow-hidden bg-slate-900">
                  {!failedImages[species.id] ? (
                    <img
                      src={species.imageUrl}
                      alt={species.name}
                      onError={() => handleImageError(species.id)}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-amber-950/40 to-slate-900 flex flex-col items-center justify-center p-3 text-center">
                      <Fish className="w-6 h-6 text-amber-400 animate-pulse mb-1" />
                      <span className="font-bold text-xs text-white">{species.name}</span>
                      <span className="text-[9px] text-amber-300 font-mono italic">{species.scientificName}</span>
                    </div>
                  )}
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-black z-10"
                    style={{ background: `${statusColor}dd`, color: '#040d14' }}>{species.status}</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm" style={{ color: 'var(--txt-primary)' }}>{species.name}</h4>
                  <span className="text-[10px] font-mono block" style={{ color: 'var(--txt-muted)' }}>{species.scientificName}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono pt-2" style={{ ...divStyle, color: 'var(--txt-muted)' }}>
                  <span>Depth: {species.depthRange}</span>
                  <span style={{ color: C.amber }} className="font-bold">Observed: {species.observedCount}</span>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* ══ HARDWARE (violet) ══ */}
      <Section id="hardware-specs" accent={C.violet}>
        <div className="text-center space-y-2">
          <Pill label="HARDWARE ARCHITECTURE" color={C.violet} />
          <h2 className="text-xl sm:text-3xl font-black" style={{ color: 'var(--txt-primary)' }}>Multi-Modal Subsea Sensor Swarm Specs</h2>
          <p className="text-xs sm:text-sm max-w-xl mx-auto" style={{ color: 'var(--txt-secondary)' }}>
            Autonomous AUV drones, SAR synthetic radar satellites, and deep-sea benthic hydrophone arrays.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {hardwareSpecs.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} accent={item.color} className="space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center ios-bubble"
                      style={{ background: `${item.color}16`, border: `1px solid ${item.color}28` }}>
                      <Icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full"
                      style={{ background: `${item.color}14`, border: `1px solid ${item.color}24`, color: item.color }}>{item.status}</span>
                  </div>
                  <div>
                    <h3 className="font-black text-sm" style={{ color: 'var(--txt-primary)' }}>{item.title}</h3>
                    <span className="text-[10px] font-mono block mt-0.5" style={{ color: 'var(--txt-muted)' }}>{item.badge}</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--txt-secondary)' }}>{item.desc}</p>
                </div>
                <div className="pt-3 flex items-center justify-between text-[11px] font-mono" style={divStyle}>
                  <span style={{ color: 'var(--txt-muted)' }}>Spec Metric:</span>
                  <strong style={{ color: item.color }}>{item.metric}</strong>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* ══ PARTNERS (indigo) ══ */}
      <Section id="partners-consortium" accent={C.indigo}>
        <div className="text-center space-y-1">
          <Pill label="INTERGOVERNMENTAL CONSORTIUM" color={C.indigo} />
          <h2 className="text-lg sm:text-2xl font-black" style={{ color: 'var(--txt-primary)' }}>Institutional Research &amp; Conservation Partners</h2>
          <p className="text-xs" style={{ color: 'var(--txt-secondary)' }}>Calibrated with global oceanographic centers and satellite altimetry relays.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {partnerOrgs.map((partner) => {
            const Icon = partner.icon;
            return (
              <Card key={partner.name} accent={partner.color} className="space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center ios-bubble"
                      style={{ background: `${partner.color}14`, border: `1px solid ${partner.color}24` }}>
                      <Icon className="w-5 h-5" style={{ color: partner.color }} />
                    </div>
                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full"
                      style={{ background: `${partner.color}14`, border: `1px solid ${partner.color}24`, color: partner.color }}>{partner.badge}</span>
                  </div>
                  <div>
                    <h4 className="font-black text-sm" style={{ color: 'var(--txt-primary)' }}>{partner.name}</h4>
                    <span className="text-[10px] font-mono block" style={{ color: 'var(--txt-muted)' }}>{partner.category}</span>
                  </div>
                  <p className="text-xs leading-normal" style={{ color: 'var(--txt-secondary)' }}>{partner.role}</p>
                </div>
                <div className="pt-2 flex items-center gap-1.5 text-[10px] font-mono font-black" style={{ ...divStyle, color: C.emerald }}>
                  <ShieldCheck className="w-3.5 h-3.5" />Verified Telemetry Partner
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* ══ EMERGENCY (rose) ══ */}
      <Section id="emergency-hotlines" accent={C.rose}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6" style={divStyle}>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ background: C.rose }} />
              <Pill label="24/7 EMERGENCY CRISIS DISPATCH HOTLINES" color={C.rose} />
            </div>
            <h3 className="text-xl sm:text-3xl font-black" style={{ color: 'var(--txt-primary)' }}>Global Ocean Emergency Response Network</h3>
            <p className="text-xs max-w-2xl leading-relaxed" style={{ color: 'var(--txt-secondary)' }}>
              Direct dispatch numbers to report active chemical spills, illegal deep-sea mining, or ocean oil slicks.
            </p>
          </div>
          <ActionBtn href="/contact" accent={C.rose}>Contact Full Incident Desk →</ActionBtn>
        </div>

        {copiedNumber && (
          <div className="p-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold animate-slide-up"
            style={{ background: `${C.emerald}12`, border: `1px solid ${C.emerald}28`, color: C.emerald }}>
            <CheckCircle2 className="w-4 h-4" />{copiedNumber}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {emergencyHotlines.map((hotline, idx) => (
            <Card key={idx} accent={hotline.color} className="space-y-4 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-black px-2.5 py-0.5 rounded"
                  style={{ background: `${hotline.color}14`, border: `1px solid ${hotline.color}24`, color: hotline.color }}>{hotline.code}</span>
                <span className="text-[10px] font-mono" style={{ color: 'var(--txt-muted)' }}>{hotline.region}</span>
              </div>
              <div>
                <h4 className="font-bold text-xs" style={{ color: 'var(--txt-primary)' }}>{hotline.agency}</h4>
                <span className="font-mono text-base sm:text-lg font-black block mt-1" style={{ color: hotline.color }}>{hotline.number}</span>
              </div>
              <div className="pt-3 flex items-center gap-2" style={divStyle}>
                <a href={`tel:${hotline.number.replace(/[^0-9+]/g, '')}`}
                  className="flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 ios-spring"
                  style={{ background: `${hotline.color}14`, border: `1px solid ${hotline.color}28`, color: hotline.color }}>
                  <Phone className="w-3.5 h-3.5" />Call Hotline
                </a>
                <button onClick={() => handleCopyNumber(hotline.number, hotline.agency)}
                  className="p-2.5 rounded-xl ios-bubble"
                  style={{ background: 'rgba(255,255,255,0.05)', border: 'var(--inner-border)' as string, color: 'var(--txt-muted)' }}>
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </Card>
          ))}
        </div>

        <div className="p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono glass-card">
          <div className="flex items-center gap-2" style={{ color: 'var(--txt-secondary)' }}>
            <ShieldAlert className="w-4 h-4 shrink-0" style={{ color: C.amber }} />
            Required Incident Telemetry: Lat/Lng Coordinates, Threat Type &amp; Plume Area
          </div>
          <Link href="/reports" className="font-black whitespace-nowrap ios-spring" style={{ color: C.teal }}>
            Generate Official Audit Report →
          </Link>
        </div>
      </Section>
    </div>
  );
}
