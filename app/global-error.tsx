'use client';

import React from 'react';
import { ShieldAlert, RefreshCw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-white font-sans flex flex-col items-center justify-center p-6 text-center space-y-6">
        <div className="p-4 rounded-3xl bg-rose-500/20 border border-rose-500/40 text-rose-400">
          <ShieldAlert className="w-12 h-12 mx-auto animate-pulse" />
        </div>

        <div className="space-y-2 max-w-md">
          <h1 className="text-2xl font-extrabold text-white">
            System Global Telemetry Exception
          </h1>
          <p className="text-xs text-slate-400">
            A root layout exception occurred. Click below to reset global state.
          </p>
        </div>

        <button
          onClick={() => reset()}
          className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reload Application</span>
        </button>
      </body>
    </html>
  );
}
