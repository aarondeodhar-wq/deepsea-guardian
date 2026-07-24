'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { MapPin, Globe, Compass, Radio, Filter, Download } from 'lucide-react';
import { oceanSectors, exportDatasetAsFile } from '@/lib/mock-data';

const GISMap = dynamic(
  () => import('@/components/gis-map').then((mod) => mod.GISMap),
  { ssr: false }
);

export default function MapPage() {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header — Explicit High Contrast Day & Night Text */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-700 dark:text-sky-300 text-xs font-semibold mb-2">
            <MapPin className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>Interactive Ocean GIS Environment</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Deep Ocean GIS Map Control
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Toggle multi-modal layers, track AUV swarms in real time, and inspect high-risk sector glassmorphism panels.
          </p>
        </div>

        <button
          onClick={() => exportDatasetAsFile('Full_GIS_Map_Layers', 'CSV')}
          className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 shrink-0 ios-spring"
        >
          <Download className="w-4 h-4" />
          <span>Download GIS CSV Layer Data</span>
        </button>
      </div>

      {/* Main Map Canvas Component */}
      <GISMap />

    </div>
  );
}
