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
  FileSpreadsheet,
  MapPin,
  Battery,
  Navigation,
  Cpu
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
    <div className="py-6 sm:py-8 space-y-8 text-slate-900 dark:text-slate-100">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold mb-2">
            <Radio className="w-3.5 h-3.5 text-slate-500 animate-pulse" />
            <span>EXECUTIVE COMMAND CENTER</span>
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
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 shadow-md transition-all flex items-center gap-2"
          >
            <Play className="w-4 h-4 text-slate-300" />
            <span>Deploy AUV Swarm Drone</span>
          </button>

          <button
            onClick={() => exportDatasetAsFile('Mission_Control_Telemetry', 'CSV')}
            className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs hover:bg-slate-300 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition-all flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-slate-400" />
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        
        <div className="p-4 sm:p-5 rounded-3xl glass-card text-center border border-slate-200 dark:border-slate-800">
          <Droplets className="w-5 h-5 mx-auto text-sky-500 mb-1.5" />
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Acidity (pH Level)</span>
          <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono mt-1">
            {systemOverview.waterQualityMetrics.ph.value}
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl glass-card text-center border border-slate-200 dark:border-slate-800">
          <Thermometer className="w-5 h-5 mx-auto text-amber-500 mb-1.5" />
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Mean Water Temp</span>
          <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono mt-1">
            {systemOverview.waterQualityMetrics.temperatureCelsius.value}°C
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl glass-card text-center border border-slate-200 dark:border-slate-800">
          <Zap className="w-5 h-5 mx-auto text-emerald-500 mb-1.5" />
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Dissolved Oxygen</span>
          <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono mt-1">
            {systemOverview.waterQualityMetrics.dissolvedOxygenMgL.value} mg/L
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl glass-card text-center border border-slate-200 dark:border-slate-800">
          <Radio className="w-5 h-5 mx-auto text-slate-400 mb-1.5 animate-pulse" />
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Active Drones</span>
          <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono mt-1">
            {droneFleet.length} / 14 Units
          </p>
        </div>

      </div>

      {/* SECTION: AUTONOMOUS DRONE FLEET TELEMETRY (UPGRADED MATTE CARDS & NUMBERS) */}
      <div className="space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-300 dark:border-slate-700 uppercase tracking-wider">
              AUV SWARM CONTROL
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Autonomous Drone Fleet Telemetry
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Real-time depth telemetry, sonar frequency monitoring, and battery states for active deep-sea patrol units.
            </p>
          </div>

          <button
            onClick={() => setIsDeployModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all flex items-center gap-2 shrink-0 shadow-md"
          >
            <Plus className="w-4 h-4 text-slate-300" />
            <span>Deploy Swarm Unit</span>
          </button>
        </div>

        {/* DRONE FLEET CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {droneFleet.map((drone) => (
            <div
              key={drone.id}
              onClick={() => setSelectedDrone(drone)}
              className={`p-6 rounded-3xl glass-panel border transition-all space-y-4 shadow-xl ${
                selectedDrone.id === drone.id
                  ? 'border-slate-500 bg-slate-900/90 text-white'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-600'
              }`}
            >
              
              {/* Header Badges */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg bg-slate-800 text-white border border-slate-700">
                    {drone.id}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                    {drone.type}
                  </span>
                </div>

                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  {drone.status}
                </span>
              </div>

              {/* Title & Target Sector */}
              <div>
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">{drone.name}</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono block mt-0.5">
                  Target Sector: <strong className="text-slate-800 dark:text-slate-200">{drone.targetSector || 'SEC-01'}</strong> • Last Ping: {drone.lastPing}
                </span>
              </div>

              {/* 3 Telemetry Metrics Display Boxes */}
              <div className="grid grid-cols-3 gap-2.5 pt-2">
                
                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono block">Depth</span>
                  <strong className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white font-mono">{drone.depthMeters}m</strong>
                </div>

                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono block">Battery Level</span>
                  <strong className="text-base sm:text-lg font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{drone.battery}%</strong>
                </div>

                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono block">Patrol Speed</span>
                  <strong className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white font-mono">{drone.speedKnots || 4.2} kn</strong>
                </div>

              </div>

              {/* Battery Progress Meter Bar */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400">
                  <span>Lithium-Sulfur Power Cell</span>
                  <span className="font-bold text-slate-900 dark:text-white">{drone.battery}% Remaining</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${drone.battery}%` }}
                  />
                </div>
              </div>

              {/* Card Actions */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
                <span className="text-[10px] font-mono text-slate-400 truncate">
                  Sensor: {drone.scanType}
                </span>

                <Link
                  href="/map"
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all flex items-center gap-1"
                >
                  <MapPin className="w-3.5 h-3.5 text-slate-300" />
                  <span>View on Map →</span>
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Main Hydro-Chemistry Live Stream Graph */}
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
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#18202c', borderColor: '#475569', borderRadius: '12px', color: '#fff' }} />
              <Area type="monotone" dataKey="ph" name="pH Level" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.2} />
              <Area type="monotone" dataKey="do" name="Dissolved Oxygen (mg/L)" stroke="#10B981" fill="#10B981" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
