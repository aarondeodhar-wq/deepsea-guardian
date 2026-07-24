'use client';

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Filter, 
  ArrowRight, 
  MapPin, 
  Activity, 
  AlertTriangle,
  Send,
  Radio
} from 'lucide-react';
import { smartAlerts, SmartAlert } from '@/lib/mock-data';

export default function AlertsPage() {
  const [severityFilter, setSeverityFilter] = useState<string>('All');
  const [alertList, setAlertList] = useState<SmartAlert[]>(smartAlerts);
  const [selectedAlert, setSelectedAlert] = useState<SmartAlert>(smartAlerts[0]);

  const handleResolveAlert = (id: string) => {
    setAlertList(prev => prev.map(a => a.id === id ? { ...a, status: 'Resolved' as const } : a));
    if (selectedAlert.id === id) {
      setSelectedAlert(prev => ({ ...prev, status: 'Resolved' as const }));
    }
  };

  const filteredAlerts = alertList.filter(a => severityFilter === 'All' || a.severity === severityFilter);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold mb-2">
            <Radio className="w-4 h-4 text-rose-500 animate-ping" />
            <span>Autonomous Smart Alert & Emergency Dispatch</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Environmental Smart Alert Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Real-time threat detection, AI confidence verification, and automated Coast Guard intervention routing.
          </p>
        </div>

        {/* Severity Filter */}
        <div className="flex items-center gap-2 shrink-0">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 text-xs focus:outline-none focus:border-sky-500 font-medium"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
          </select>
        </div>
      </div>

      {/* Main Alert Center Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Alerts List */}
        <div className="space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-500" />
            <span>Active Incident Log</span>
          </h3>

          <div className="space-y-3">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                onClick={() => setSelectedAlert(alert)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                  selectedAlert.id === alert.id
                    ? 'border-sky-500 bg-sky-500/10 font-semibold shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    alert.severity === 'Critical' ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30' :
                    alert.severity === 'High' ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30' : 'bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30'
                  }`}>
                    {alert.severity.toUpperCase()}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{alert.timestamp}</span>
                </div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white mt-1">{alert.title}</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 truncate">{alert.location}</p>
                
                <div className="mt-2 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{alert.aiConfidence}% AI Accuracy</span>
                  <span className={`font-bold ${alert.status === 'Resolved' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                    ● {alert.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Incident Detail Drawer */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-6 flex flex-col justify-between">
          
          <div className="space-y-5">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 block mb-1">
                  INCIDENT ID: {selectedAlert.id} • SECTOR: {selectedAlert.sectorId}
                </span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{selectedAlert.title}</h2>
              </div>
              <span className={`px-3 py-1 rounded-full font-mono text-xs font-bold shrink-0 ${
                selectedAlert.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30'
              }`}>
                {selectedAlert.status}
              </span>
            </div>

            {/* Telemetry Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <p className="text-slate-500 dark:text-slate-400 font-medium">Incident Location:</p>
                <p className="text-slate-900 dark:text-white font-mono font-bold mt-1">{selectedAlert.location}</p>
                <p className="text-slate-500 dark:text-slate-400 font-medium mt-3">Telemetry Description:</p>
                <p className="text-slate-700 dark:text-slate-300 mt-1">{selectedAlert.description}</p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300">
                <p className="font-bold flex items-center gap-1 mb-1">
                  <AlertTriangle className="w-4 h-4" />
                  Recommended Conservation Intervention:
                </p>
                <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed mt-2">
                  {selectedAlert.recommendedAction}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
              AI Verification Confidence: {selectedAlert.aiConfidence}%
            </span>

            <div className="flex items-center gap-3">
              {selectedAlert.status !== 'Resolved' && (
                <button
                  onClick={() => handleResolveAlert(selectedAlert.id)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mark Incident Resolved</span>
                </button>
              )}
              <a
                href="/contact"
                className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>Dispatch Coast Guard / Helplines</span>
              </a>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
