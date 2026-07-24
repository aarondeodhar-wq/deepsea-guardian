'use client';

import React from 'react';
import Link from 'next/link';
import { Lock, UserCheck, ShieldAlert, X, ArrowRight } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  datasetName?: string;
}

export const AuthModal: React.FC<Props> = ({ isOpen, onClose, datasetName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xl p-4 flex items-center justify-center animate-in fade-in">
      <div className="max-w-md w-full rounded-3xl glass-panel border border-sky-500/40 p-6 sm:p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 mx-auto rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
          <Lock className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded border border-sky-500/20 uppercase tracking-wider">
            INSTITUTIONAL AUTHENTICATION REQUIRED
          </span>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Sign In to Download Raw Datasets
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Downloading raw oceanographic telemetry ({datasetName || 'CSV/NetCDF'}) requires an authorized Researcher or NGO institutional account.
          </p>
        </div>

        <div className="flex flex-col gap-2.5 pt-2">
          <Link
            href="/login"
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 ios-spring"
          >
            <span>Log In Existing Account</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/signup"
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs hover:bg-slate-300 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
          >
            <UserCheck className="w-4 h-4 text-sky-500" />
            <span>Register New Free Account</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
