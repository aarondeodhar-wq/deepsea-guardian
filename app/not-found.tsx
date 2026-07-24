'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center text-slate-900 dark:text-slate-100 space-y-6">
      <div className="p-4 rounded-3xl bg-sky-500/10 border border-sky-500/30 text-sky-600 dark:text-sky-400">
        <Compass className="w-12 h-12 mx-auto animate-spin" />
      </div>

      <div className="space-y-2 max-w-md">
        <span className="text-[10px] font-mono font-bold text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded border border-sky-500/20 uppercase tracking-wider">
          404 - UNCHARTED OCEAN SECTOR
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Telemetry Coordinates Not Found
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          The requested subsea telemetry URL does not exist or has moved outside our patrol grid.
        </p>
      </div>

      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 ios-spring"
      >
        <Home className="w-4 h-4" />
        <span>Return to Mission Overview</span>
      </Link>
    </div>
  );
}
