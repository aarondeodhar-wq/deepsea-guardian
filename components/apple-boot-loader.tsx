'use client';

import React, { useState, useEffect } from 'react';
import { Waves, ShieldCheck, Activity, Cpu, Radio } from 'lucide-react';

export const AppleBootLoader: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(10);
  const [statusText, setStatusText] = useState('Initializing DeepSea Telemetry Grid...');

  useEffect(() => {
    setMounted(true);

    const t1 = setTimeout(() => {
      setProgress(30);
      setStatusText('Connecting PostGIS Geospatial Database...');
    }, 800);

    const t2 = setTimeout(() => {
      setProgress(60);
      setStatusText('Ingesting 150+ Bio-Acoustic Sonar Scans...');
    }, 1600);

    const t3 = setTimeout(() => {
      setProgress(85);
      setStatusText('Calibrating AUV Drone Swarm Coordinates...');
    }, 2400);

    const t4 = setTimeout(() => {
      setProgress(100);
      setStatusText('System Fully Calibrated & Ready');
    }, 3100);

    const t5 = setTimeout(() => {
      setVisible(false);
    }, 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  if (!mounted || !visible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0f172a] text-white flex flex-col items-center justify-center p-6 text-center transition-opacity duration-700 ease-out">
      
      <div className="space-y-8 max-w-md w-full p-8 rounded-3xl bg-slate-900/90 border border-sky-500/30 shadow-2xl backdrop-blur-2xl">
        
        {/* Glowing Logo */}
        <div className="relative mx-auto w-20 h-20">
          <div className="absolute inset-0 rounded-3xl bg-sky-500 blur-xl opacity-50 animate-pulse" />
          <div className="relative w-full h-full rounded-3xl bg-gradient-to-tr from-sky-600 to-cyan-400 p-[2px] shadow-2xl flex items-center justify-center text-white">
            <Waves className="w-10 h-10 animate-bounce" style={{ animationDuration: '3s' }} />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-extrabold tracking-wider text-white">DEEPSEA GUARDIAN</h2>
          <p className="text-xs text-sky-400 font-mono mt-1 font-bold tracking-widest uppercase">
            OFFICIAL OCEAN ENVIRONMENTAL PLATFORM v2.4
          </p>
        </div>

        {/* Progress Bar & Status Display */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-300">
            <span className="flex items-center gap-1.5 text-sky-400 font-bold">
              <Activity className="w-3.5 h-3.5 animate-spin" />
              <span>{statusText}</span>
            </span>
            <span className="font-extrabold text-white">{progress}%</span>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-sky-500 via-emerald-400 to-cyan-400 transition-all duration-700 ease-out shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="pt-2 text-[11px] font-mono text-slate-400 flex items-center justify-center gap-2 border-t border-slate-800">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>PostGIS Telemetry • 150+ Bio-Acoustic Neural Scans Loaded</span>
        </div>

      </div>

    </div>
  );
};
