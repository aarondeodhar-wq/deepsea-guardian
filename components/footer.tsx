'use client';

import React from 'react';
import Link from 'next/link';
import { Waves, PhoneCall, Mail, MapPin, Globe, ShieldAlert, FileText, Info } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-[#18202c] text-slate-700 dark:text-slate-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Top Emergency Helplines Special Area */}
        <div className="p-6 sm:p-8 rounded-3xl glass-card border border-rose-500/40 bg-rose-500/5 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-rose-600 text-white shrink-0">
                <PhoneCall className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-extrabold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">
                  EMERGENCY MARITIME CRISIS LINE
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  24/7 International Coast Guard Dispatch Hotline
                </h3>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 font-mono text-xs font-bold text-rose-600 dark:text-rose-400">
              <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-rose-500/30">
                US Coast Guard: +1 (800) 424-8802
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-rose-500/30">
                UN Environmental: +41 22 917 8111
              </span>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-sky-600 flex items-center justify-center text-white font-bold">
                <Waves className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-slate-900 dark:text-white tracking-wider">
                DEEPSEA GUARDIAN
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
              Official Deep Ocean Environmental Risk Prediction & AUV Telemetry Platform.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 text-[11px]">
              Platform Modules
            </h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-sky-500 transition-colors">Executive Overview</Link></li>
              <li><Link href="/dashboard" className="hover:text-sky-500 transition-colors">Mission Control Dashboard</Link></li>
              <li><Link href="/map" className="hover:text-sky-500 transition-colors">Google Maps Ocean GIS</Link></li>
              <li><Link href="/predictive-map" className="hover:text-sky-500 transition-colors">30-Day Risk Prediction</Link></li>
              <li><Link href="/ai-detection" className="hover:text-sky-500 transition-colors">AI Computer Vision Lab</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 text-[11px]">
              Datasets & Audit
            </h4>
            <ul className="space-y-2">
              <li><Link href="/datasets" className="hover:text-sky-500 transition-colors">Open Datasets Hub (CSV / NetCDF)</Link></li>
              <li><Link href="/biodiversity" className="hover:text-sky-500 transition-colors">Endangered Species Registry</Link></li>
              <li><Link href="/digital-twin" className="hover:text-sky-500 transition-colors">Digital Twin Subsea Telemetry</Link></li>
              <li><Link href="/alerts" className="hover:text-sky-500 transition-colors">Live Smart Alerts Feed</Link></li>
              <li><Link href="/reports" className="hover:text-sky-500 transition-colors">Executive PDF Reports</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 text-[11px]">
              Institutional & Support
            </h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-sky-500 transition-colors">About Us & Research Partners</Link></li>
              <li><Link href="/contact" className="hover:text-sky-500 transition-colors">Contact Us & Helplines</Link></li>
              <li><Link href="/login" className="hover:text-sky-500 transition-colors">Institutional Login & API Access</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <span>© 2026 DeepSea Guardian • All Rights Reserved</span>
          <span>PostGIS GIS Engine v2.4 • English (US)</span>
        </div>

      </div>
    </footer>
  );
};
