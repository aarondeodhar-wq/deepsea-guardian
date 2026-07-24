'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Waves, 
  ShieldCheck, 
  Globe, 
  Cpu, 
  CheckCircle2, 
  ArrowRight, 
  Award, 
  Users, 
  Activity,
  Heart
} from 'lucide-react';

export default function AboutPage() {
  const milestones = [
    { year: '2024', title: 'Swarm Telemetry Prototype', desc: 'Deployed initial 4 AUV autonomous hydro-acoustic swarm in Pacific Margins.' },
    { year: '2025', title: 'Multi-Modal Vision Engine', desc: 'Trained custom YOLOv8 computer vision model on 150,000 deep ocean debris frames.' },
    { year: '2026', title: '30-Day Predictive Hydrodynamic Risk Mapping', desc: 'Integrated 3D advection-diffusion-reaction equations to forecast microplastic plume spread.' }
  ];

  const coreValues = [
    { title: 'Predictive Intervention', desc: 'Shift from reactive ocean cleanup to proactive 30-day threat forecasting.', icon: Activity },
    { title: 'Multi-Sensor Fusion', desc: 'Synchronize satellite radar, sonar bathymetry, AUV visual feeds, and hydrophones.', icon: Cpu },
    { title: 'Open Scientific Data', desc: 'Provide standardized PostGIS datasets to researchers, marine NGOs, and environmental agencies.', icon: Globe },
    { title: 'Endangered Species Protection', desc: 'Monitor migration corridors for Blue Whales, Leatherback Turtles, and Coral Crests.', icon: Heart }
  ];

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-700 dark:text-violet-300 text-xs font-semibold mb-4">
          <Waves className="w-4 h-4 text-cyan-500" />
          <span>About DeepSea Guardian</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Protecting the Deep Ocean with AI & Telemetry
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
          DeepSea Guardian is an autonomous environmental intelligence platform designed to continuously monitor deep ocean ecosystems, detect illegal dumping and ghost nets, protect endangered species, and generate 30-day predictive risk maps.
        </p>
      </div>

      {/* Mission & Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="p-8 rounded-3xl glass-panel space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-cyan-500" />
            <span>Our Conservation Mission</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Over 80% of the world’s ocean floor remains unmonitored and unexplored. Deep-sea ocean dumping, abandoned ghost fishing nets, and rapid thermal bleaching threaten fragile abyssal ecosystems before human observers even discover them.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            DeepSea Guardian bridges this gap by fusing autonomous AUV drone swarms, satellite radar imagery, sonar bathymetry, and hydrophone buoys into a single predictive mission control dashboard.
          </p>
        </div>

        <div className="p-8 rounded-3xl glass-panel space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Cpu className="w-6 h-6 text-violet-500" />
            <span>The Pipeline Workflow</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-mono font-semibold text-cyan-600 dark:text-cyan-400">
            Monitor → Detect → Understand → Predict → Alert → Act
          </p>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Real-time computer vision bounding boxes for microplastics & ghost nets</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>30-day hydrodynamic advection-diffusion risk forecast models</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Actionable emergency alert dispatch for Coast Guards & NGOs</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Core Pillars */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-8">
          Core Conservation Pillars
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div key={idx} className="p-6 rounded-3xl glass-card text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-bold">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">{val.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Milestones */}
      <div className="p-8 rounded-3xl glass-panel space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white text-center">
          Platform Milestones & Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {milestones.map((m, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/20">
                {m.year}
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{m.title}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="p-8 rounded-3xl glass-panel text-center space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Ready to partner or request telemetry access?</h3>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-slate-950 font-bold text-xs shadow-glow-cyan hover:opacity-90 transition-all flex items-center gap-2"
          >
            <span>Contact Support & Helplines</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-xl glass-card text-slate-900 dark:text-white font-semibold text-xs border border-cyan-500/40 hover:bg-cyan-500/10 transition-all"
          >
            Open Mission Control
          </Link>
        </div>
      </div>

    </div>
  );
}
