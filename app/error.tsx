'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ShieldAlert, RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Next.js App Error Catch:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center text-slate-900 dark:text-slate-100 space-y-6">
      <div className="p-4 rounded-3xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400">
        <ShieldAlert className="w-12 h-12 mx-auto animate-pulse" />
      </div>

      <div className="space-y-2 max-w-md">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Subsea Telemetry Error Encountered
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          An unexpected component rendering error occurred. The application remains stable and safe.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => reset()}
          className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 ios-spring"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reset & Re-try Route</span>
        </button>

        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs hover:bg-slate-300 dark:hover:bg-slate-700 transition-all flex items-center gap-2"
        >
          <Home className="w-4 h-4 text-sky-500" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
