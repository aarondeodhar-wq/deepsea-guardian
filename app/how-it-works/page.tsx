'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Radio, 
  Cpu, 
  Layers, 
  Eye, 
  TrendingUp, 
  Bell, 
  ArrowDown, 
  CheckCircle2, 
  Database,
  Camera,
  Satellite,
  Activity,
  Compass
} from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      id: 1,
      title: 'Multi-Sensor Data Collection',
      subtitle: 'Underwater Drones + Sonar + Satellites + Cameras + IoT Sensors',
      description: 'Continuous ingestion of optical deep-sea video, multi-spectral SAR satellite radar, hydrophone acoustic feeds, and water chemistry sensors.',
      icon: Satellite,
      color: 'from-cyan-500 to-blue-600',
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      details: ['AUV & ROV Autonomous Swarm Navigation', 'Synthetic Aperture Radar Satellite Overflights', 'Hydrophone Acoustic Array Signal Processing']
    },
    {
      id: 2,
      title: 'Data Collection & Preprocessing',
      subtitle: 'Noise Filtering & Geo-Spatial Normalization',
      description: 'Raw sensor feeds pass through acoustic denoising algorithms, optical turbidity correction, and PostGIS coordinate transformation.',
      icon: Database,
      color: 'from-teal-400 to-emerald-500',
      badgeColor: 'text-teal-400 bg-teal-500/10 border-teal-500/30',
      details: ['Turbidity & Light Scattering Correction', 'Time-series Alignment across Multi-Depth Sensors', 'High-throughput Buffer Streams']
    },
    {
      id: 3,
      title: 'AI Data Fusion Engine',
      subtitle: 'Multi-Modal Deep Neural Architectures',
      description: 'Synchronous cross-attention network fuses visual optical bounding boxes with hydro-acoustic frequency signatures and ocean temperature anomalies.',
      icon: Cpu,
      color: 'from-indigo-500 to-purple-600',
      badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
      details: ['YOLOv8 Custom Marine Debris Weights', 'DenseNet Hydro-Acoustic Bio-Signature Classifier', 'Convolutional Thermal Anomaly Network']
    },
    {
      id: 4,
      title: 'Detection & Taxonomy Analysis',
      subtitle: 'Pollution Detection + Species Recognition + Coral Health',
      description: 'Real-time category classification with confidence scores, object bounding overlays, and health segmentation maps.',
      icon: Eye,
      color: 'from-emerald-400 to-teal-500',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      details: ['Ghost Net & Microplastic Quantification', 'IUCN Red List Marine Species Taxonomy', 'Coral Polyp Bleaching Severity Matrix']
    },
    {
      id: 5,
      title: 'Predictive Risk Simulation (MAIN USP)',
      subtitle: 'NOW → 7 DAYS → 30 DAYS Hydrodynamic Modeling',
      description: 'Machine learning forecasting models combine ocean current vectors, thermal gradients, and vessel traffic to project pollution plume spread.',
      icon: TrendingUp,
      color: 'from-amber-400 to-rose-500',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      details: ['30-Day Pollution Dispersion Vectors', 'Ecosystem Bio-accumulation Threat Index', 'Confidence Score Calculation Engine']
    },
    {
      id: 6,
      title: 'Smart Alerts & Targeted Conservation',
      subtitle: 'Alerts, Maps, Reports & Conservation Recommendations',
      description: 'Automated high-priority alert generation dispatched to Coast Guards, Marine NGOs, and Autonomous AUV cleanup fleets.',
      icon: Bell,
      color: 'from-rose-500 to-cyan-500',
      badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
      details: ['Actionable Intervention Recommendations', 'Exportable PDF Environmental Reports', 'Autonomous Drone Re-routing Dispatch']
    }
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-4">
          <Compass className="w-4 h-4" />
          <span>System Process Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          How DeepSea Guardian Operates
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
          From abyssal sonar sweeps to 30-day predictive risk mapping — explore our end-to-end multi-sensor AI pipeline.
        </p>
      </div>

      {/* Visual Step-by-Step Flowchart Pipeline */}
      <div className="relative space-y-8">
        
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <React.Fragment key={step.id}>
              
              <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-cyan-500/30 relative overflow-hidden group hover:border-cyan-400 transition-all">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  
                  {/* Step Icon Badge */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${step.color} p-[2px] shrink-0 shadow-glow-cyan`}>
                    <div className="w-full h-full bg-ocean-950 rounded-[14px] flex items-center justify-center">
                      <Icon className="w-8 h-8 text-cyan-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-bold border ${step.badgeColor}`}>
                        STAGE 0{step.id}
                      </span>
                      <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    </div>

                    <p className="text-xs font-semibold text-cyan-400 mb-2 font-mono">{step.subtitle}</p>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">{step.description}</p>

                    {/* Bullet Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-800">
                      {step.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2 text-[11px] text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Animated Connecting Down Arrow (Except last) */}
              {index < steps.length - 1 && (
                <div className="flex justify-center py-2">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 animate-bounce">
                    <ArrowDown className="w-5 h-5" />
                  </div>
                </div>
              )}

            </React.Fragment>
          );
        })}

      </div>

      {/* CTA Button */}
      <div className="mt-16 text-center">
        <Link
          href="/predictive-map"
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-600 text-slate-950 font-bold text-sm shadow-glow-cyan hover:scale-105 transition-all inline-flex items-center gap-3"
        >
          <span>See Predictive Risk Map in Action</span>
          <TrendingUp className="w-5 h-5" />
        </Link>
      </div>

    </div>
  );
}
