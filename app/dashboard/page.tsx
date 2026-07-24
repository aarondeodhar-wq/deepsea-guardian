'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Activity, 
  ShieldAlert, 
  Radio, 
  Eye, 
  TrendingUp, 
  Download, 
  Plus, 
  Play, 
  Zap, 
  CheckCircle2, 
  Compass, 
  Droplets,
  Thermometer,
  FileSpreadsheet
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { droneFleet, oceanSectors, smartAlerts, systemOverview, exportDatasetAsFile } from '@/lib/mock-data';
import { DroneDeploymentModal } from '@/components/drone-deployment-modal';

export default function DashboardPage() {
  const [selectedDrone, setSelectedDrone] = useState(droneFleet[0]);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);

  const telemetryData = [
    { time: '08:00', ph: 8.12, temp: 14.1, do: 7.1 },
    { time: '10:00', ph: 8.10, temp: 14.3, do: 6.9 },
    { time: '12:00', ph: 8.08, temp: 14.5, do: 6.8 },
    { time: '14:00', ph: 8.11, temp: 14.2, do: 7.0 },
    { time: '16:00', ph: 8.15, temp: 14.0, do: 7.2 },
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-700 dark:text-sky-300 text-xs font-semibold mb-2">
            <LayoutDashboard className="w-4 h-4 text-sky-500" />
            <span>Executive Command Center</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Mission Control & AUV Swarm Operations
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Real-time AUV drone fleet tracking, hydro-chemistry telemetry stream, and emergency dispatch control.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Drone Deploy Trigger */}
          <button
            onClick={() => setIsDeployModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 ios-spring"
          >
            <Play className="w-4 h-4" />
            <span>Deploy AUV Swarm Drone</span>
          </button>

          <button
            onClick={() => exportDatasetAsFile('Mission_Control_Telemetry', 'CSV')}
            className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs hover:bg-slate-300 dark:hover:bg-slate-700 transition-all flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-sky-500" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Drone Deployment Modal */}
      <DroneDeploymentModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
      />

      {/* Key Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl glass-card text-center">
          <Droplets className="w-6 h-6 mx-auto text-sky-500 mb-2" />
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Acidity (pH Level)</span>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono mt-1">
            {systemOverview.waterQualityMetrics.ph.value}
          </p>
        </div>

        <div className="p-5 rounded-2xl glass-card text-center">
          <Thermometer className="w-6 h-6 mx-auto text-amber-500 mb-2" />
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Mean Water Temp</span>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono mt-1">
            {systemOverview.waterQualityMetrics.temperatureCelsius.value}°C
          </p>
        </div>

        <div className="p-5 rounded-2xl glass-card text-center">
          <Zap className="w-6 h-6 mx-auto text-emerald-500 mb-2" />
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Dissolved Oxygen</span>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono mt-1">
            {systemOverview.waterQualityMetrics.dissolvedOxygenMgL.value} mg/L
          </p>
        </div>

        <div className="p-5 rounded-2xl glass-card text-center">
          <Radio className="w-6 h-6 mx-auto text-sky-400 mb-2 animate-pulse" />
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Active Drones</span>
          <p className="text-2xl font-extrabold text-sky-600 dark:text-sky-400 font-mono mt-1">
            {droneFleet.length} / 14 Units
          </p>
        </div>

      </div>

      {/* Main Grid Operations View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Telemetry Graph & Fleet Cards */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Real-time Hydro-Chemistry Telemetry Graph */}
          <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Subsea Hydro-Chemistry Live Stream
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Automated pH, SST temperature, and dissolved oxygen telemetry
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                ● Live 500ms Feed
              </span>
            </div>

            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={telemetryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                  <XAxis dataKey="time" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#38bdf8', borderRadius: '12px', color: '#fff' }} />
                  <Area type="monotone" dataKey="ph" name="pH Level" stroke="#0284c7" fill="#0284c7" fillOpacity={0.2} />
                  <Area type="monotone" dataKey="do" name="Dissolved Oxygen (mg/L)" stroke="#10B981" fill="#10B981" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Active AUV Patrol Swarm Drones Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <Radio className="w-5 h-5 text-sky-500" />
                <span>Active Patrol Swarm Fleet</span>
              </h3>

              <button
                onClick={() => setIsDeployModalOpen(true)}
                className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                <span>Deploy New Unit</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {droneFleet.map((drone) => (
                <div
                  key={drone.id}
                  onClick={() => setSelectedDrone(drone)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                    selectedDrone.id === drone.id
                      ? 'bg-sky-500/15 border-sky-500 shadow-md'
                      : 'glass-card border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">{drone.id}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                      {drone.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{drone.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{drone.type} • Depth: {drone.depthMeters}m</p>

                  <div className="mt-4 flex items-center justify-between text-xs font-mono pt-3 border-t border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500">Battery: <strong className="text-slate-900 dark:text-white">{drone.battery}%</strong></span>
                    <span className="text-sky-500 font-bold">{drone.scanType}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Emergency Alerts & Action Panel */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-500" />
              <span>Active Emergency Alerts</span>
            </h3>

            <div className="space-y-3">
              {smartAlerts.map((alert) => (
                <div key={alert.id} className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-600 dark:text-rose-400">{alert.severity.toUpperCase()}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{alert.timestamp}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{alert.title}</h4>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">{alert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
