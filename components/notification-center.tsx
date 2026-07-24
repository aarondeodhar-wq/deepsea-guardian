'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bell, ShieldAlert, CheckCircle2, AlertTriangle, Radio, X, ArrowRight } from 'lucide-react';
import { smartAlerts } from '@/lib/mock-data';

export const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [alerts, setAlerts] = useState(smartAlerts);
  const unreadCount = alerts.length;

  const markAllRead = () => {
    setAlerts([]);
  };

  return (
    <div className="relative">
      
      {/* Bell Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition-all ios-spring"
        title="Live Smart Telemetry Alerts"
      >
        <Bell className="w-4 h-4 text-slate-700 dark:text-slate-300" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white font-mono text-[9px] font-bold flex items-center justify-center shadow-sm">
            {unreadCount}
          </span>
        )}
      </button>

      {/* SOLID OPAQUE NOTIFICATION DRAWER DROPDOWN */}
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-80 sm:w-96 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 text-slate-900 dark:text-slate-100"
          onMouseLeave={() => setIsOpen(false)}
        >
          
          {/* Header */}
          <div className="p-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-sky-600 dark:text-sky-400 animate-pulse" />
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Live Telemetry & Alerts</h3>
            </div>

            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-[10px] font-bold text-sky-600 dark:text-sky-400 hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Alerts List */}
          <div className="p-3 max-h-[380px] overflow-y-auto space-y-2.5">
            {alerts.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500 space-y-2">
                <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500" />
                <p className="font-bold text-slate-900 dark:text-white">All Clear!</p>
                <p>No active subsea emergency threats detected.</p>
              </div>
            ) : (
              alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3.5 rounded-2xl border transition-all space-y-1.5 ${
                    alert.severity === 'Critical'
                      ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/60'
                      : alert.severity === 'High'
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/60'
                      : 'bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                      {alert.severity === 'Critical' ? (
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      )}
                      <span className="uppercase">{alert.severity} THREAT</span>
                    </span>
                    <span className="text-slate-400">{alert.timestamp}</span>
                  </div>

                  <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">{alert.title}</h4>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">{alert.description}</p>

                  <Link
                    href="/alerts"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-sky-600 dark:text-sky-400 hover:underline pt-1"
                  >
                    <span>Inspect Alert</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))
            )}
          </div>

          {/* Footer Link */}
          <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-center">
            <Link
              href="/alerts"
              onClick={() => setIsOpen(false)}
              className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline"
            >
              Open Smart Alert Center →
            </Link>
          </div>

        </div>
      )}

    </div>
  );
};
