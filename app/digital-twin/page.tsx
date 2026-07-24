'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Radio, ArrowRight, ShieldCheck } from 'lucide-react';
import { droneFleet } from '@/lib/mock-data';

export default function DigitalTwinPage() {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-500 dark:text-cyan-400 text-xs font-semibold mb-2">
          <Radio className="w-4 h-4 animate-ping" />
          <span>AUV Swarm Telemetry Control</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Autonomous Drone Fleet Telemetry
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Real-time depth telemetry, sonar frequency monitoring, and battery states for active deep-sea patrol units.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {droneFleet.map((drone) => (
          <div key={drone.id} className="p-6 rounded-3xl glass-panel space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-600 dark:text-cyan-300">
                  {drone.type}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">{drone.name}</h3>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40">
                ● {drone.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 text-[10px] block">Depth</span>
                <strong className="text-slate-900 dark:text-white text-sm">{drone.depthMeters}m</strong>
              </div>

              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 text-[10px] block">Battery</span>
                <strong className="text-emerald-500 text-sm">{drone.battery}%</strong>
              </div>

              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 text-[10px] block">Patrol Speed</span>
                <strong className="text-cyan-500 text-sm">{drone.speedKnots} kn</strong>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-2">
              <span className="text-slate-500 dark:text-slate-400">Target Sector: <strong>{drone.targetSector}</strong></span>
              <Link href="/map" className="text-cyan-500 dark:text-cyan-400 font-bold hover:underline flex items-center gap-1">
                <span>View on Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
