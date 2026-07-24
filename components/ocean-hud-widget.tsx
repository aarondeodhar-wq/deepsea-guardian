'use client';

import React from 'react';
import { Compass, ShieldAlert, Activity, Radio, CheckCircle2, Globe } from 'lucide-react';
import { systemOverview } from '@/lib/mock-data';

export const OceanHUDWidget: React.FC = () => {
  return (
    <div className="w-full rounded-2xl glass-panel p-5 border border-slate-200 dark:border-slate-800 shadow-executive my-6">
      
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-200 dark:border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
            Official Telemetry Grid
          </span>
          <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-700 dark:text-sky-300 font-mono font-bold text-[10px] border border-sky-500/20">
            Node #PAC-4
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400 font-mono text-[11px]">
          <span>Coordinates: <strong>13.45°N, 143.90°E</strong></span>
          <span>Patrol Depth: <strong className="text-sky-600 dark:text-sky-400">3,420m</strong></span>
        </div>
      </div>

      {/* Main Professional Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
        
        <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block">Monitored Sectors</span>
            <span className="font-bold text-slate-900 dark:text-white text-sm">6 Active Sectors</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block">Swarm Fleet Patrol</span>
            <span className="font-bold text-slate-900 dark:text-white text-sm">14 AUV Drones Active</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block">Threat Interceptions</span>
            <span className="font-bold text-rose-600 dark:text-rose-400 text-sm">{systemOverview.threatsDetectedToday} Threats Today</span>
          </div>
        </div>

      </div>

    </div>
  );
};
