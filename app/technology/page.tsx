'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Cpu, 
  Eye, 
  Layers, 
  Globe, 
  Radio, 
  TrendingUp, 
  UserCheck, 
  Building2, 
  ShieldCheck, 
  Microscope, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function TechnologyPage() {
  const techStack = [
    {
      title: 'Computer Vision (CV)',
      icon: Eye,
      color: 'text-cyan-400',
      description: 'Specialized deep ocean image models trained on underwater turbidity, low-light scattering, and abyssal color shifts to detect plastics, ghost nets, and species taxonomy.',
      metrics: '96.4% Detection Accuracy'
    },
    {
      title: 'Deep Learning & Neural Networks',
      icon: Cpu,
      color: 'text-teal-400',
      description: 'Multi-layer convolutional & transformer neural networks analyzing acoustic hydrophone waveforms, ocean current vector matrices, and thermal anomalies.',
      metrics: '< 120ms Inference Latency'
    },
    {
      title: 'Multi-Modal Data Fusion',
      icon: Layers,
      color: 'text-indigo-400',
      description: 'Unified sensor correlation engine fusing satellite SAR imagery, underwater AUV visual feeds, sonar bathymetry, and AIS vessel trajectories.',
      metrics: 'Real-time Synchronized Ingestion'
    },
    {
      title: 'GIS Mapping & Spatial Analytics',
      icon: Globe,
      color: 'text-emerald-400',
      description: 'PostGIS geo-spatial spatial database rendering interactive sector layers, seamount topography, bathymetric depths, and active drone patrol routes.',
      metrics: 'Sub-meter Coordinate Precision'
    },
    {
      title: 'IoT Deep-Sea Sensor Networks',
      icon: Radio,
      color: 'text-amber-400',
      description: 'Autonomous floating buoys and benthic seafloor stations continuously sampling pH, dissolved oxygen, salinity, turbidity, and micro-vibration data.',
      metrics: '24/7 Telemetry Broadcast'
    },
    {
      title: 'Predictive Analytics Engine (MAIN USP)',
      icon: TrendingUp,
      color: 'text-rose-400',
      description: 'Hydro-dynamic predictive algorithms modeling 30-day pollution dispersion, ghost net drift paths, and coral bleaching risk trajectories.',
      metrics: 'NOW → 7-Day → 30-Day Forecasts'
    }
  ];

  const personas = [
    {
      role: 'Researchers & Marine Scientists',
      icon: Microscope,
      badge: 'Scientific Research',
      color: 'border-cyan-500/40 bg-cyan-500/10',
      benefits: [
        'Access standardized, continuous deep-sea biodiversity telemetry',
        'Analyze long-term coral bleaching thermal anomaly trends',
        'Track endangered species migration vectors with AI taxonomy verification',
        'Export raw PostGIS geo-spatial datasets for peer-reviewed papers'
      ]
    },
    {
      role: 'Marine Conservation Organizations (NGOs)',
      icon: UserCheck,
      badge: 'Actionable Conservation',
      color: 'border-teal-500/40 bg-teal-500/10',
      benefits: [
        'Pinpoint ghost net locations for fast ROV cutter deployment',
        'Monitor high-risk marine sanctuary buffer perimeters',
        'Receive automated 30-day predictive risk warnings for coral reefs',
        'Generate shareable PDF environmental reports for donors & public'
      ]
    },
    {
      role: 'Governments & Maritime Enforcement',
      icon: ShieldCheck,
      badge: 'Law Enforcement',
      color: 'border-indigo-500/40 bg-indigo-500/10',
      benefits: [
        'Correlate illegal oil bilge discharge with AIS commercial ship tracks',
        'Monitor protected marine zones without expensive manual vessel patrols',
        'Enforce vessel speed caps near migrating whale pods',
        'Automate legal compliance & ocean health auditing'
      ]
    },
    {
      role: 'Environmental Protection Agencies',
      icon: Building2,
      badge: 'Policy & Management',
      color: 'border-emerald-500/40 bg-emerald-500/10',
      benefits: [
        'Prioritize emergency response resources based on AI risk rankings',
        'Track water quality metrics (Dissolved Oxygen, pH, Turbidity)',
        'Formulate evidence-based marine protected area (MPA) boundaries',
        'Audit long-term marine ecosystem restoration progress'
      ]
    }
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-4">
          <Cpu className="w-4 h-4" />
          <span>Technology & Impact Matrix</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Pioneering Technology for Ocean Intelligence
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
          How our AI fusion engine and predictive analytics empower researchers, conservation NGOs, and governments worldwide.
        </p>
      </div>

      {/* Technology Stack Breakdown */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <Cpu className="w-6 h-6 text-cyan-400" />
          <span>Core AI & Sensor Technologies</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStack.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <div key={idx} className="p-6 rounded-3xl glass-card border border-cyan-500/30 hover:border-cyan-400 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Icon className={`w-8 h-8 ${tech.color}`} />
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-mono">
                      {tech.metrics}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{tech.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{tech.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stakeholder Impact & Benefits */}
      <section className="pt-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl font-bold text-white">Who Benefits from DeepSea Guardian?</h2>
          <p className="text-xs text-slate-400 mt-2">
            Tailored intelligence workflows designed specifically for ocean conservation stakeholders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {personas.map((persona, idx) => {
            const Icon = persona.icon;
            return (
              <div key={idx} className={`p-8 rounded-3xl glass-panel border ${persona.color}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{persona.role}</h3>
                      <span className="text-[10px] text-cyan-400 font-mono">{persona.badge}</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-3 mt-4">
                  {persona.benefits.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Call to action */}
      <div className="p-8 rounded-3xl glass-panel border border-cyan-500/30 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Ready to explore real-time telemetry?</h3>
        <p className="text-xs text-slate-400 mb-6">Launch Mission Control to inspect active ocean health metrics.</p>
        <Link
          href="/dashboard"
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-bold text-xs shadow-glow-cyan hover:opacity-90 inline-flex items-center gap-2"
        >
          <span>Open Mission Control</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
