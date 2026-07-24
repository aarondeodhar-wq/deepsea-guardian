'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Radio, 
  Compass, 
  ShieldCheck, 
  X, 
  CheckCircle2, 
  Play, 
  Activity, 
  Cpu, 
  Layers,
  MapPin,
  Zap,
  Volume2,
  RefreshCw,
  ArrowRight
} from 'lucide-react';
import { droneFleet, oceanSectors, AUVDrone } from '@/lib/mock-data';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const DroneDeploymentModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [selectedDrone, setSelectedDrone] = useState<AUVDrone>(droneFleet[0]);
  const [selectedSectorId, setSelectedSectorId] = useState(oceanSectors[0].id);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanLogs, setScanLogs] = useState<string[]>([]);

  const selectedSector = oceanSectors.find(s => s.id === selectedSectorId) || oceanSectors[0];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    let interval: any;
    if (isScanning) {
      interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            setIsScanning(false);
            setScanLogs((logs) => [
              `[${new Date().toLocaleTimeString()}] ✅ SUCCESS: Subsea Scan complete for ${selectedDrone.name} in Sector ${selectedSectorId}. Bathymetry map updated ✓`,
              ...logs
            ]);
            return 100;
          }
          const next = prev + 10;
          if (next === 20) {
            setScanLogs((logs) => [`[${new Date().toLocaleTimeString()}] 🌊 Submerging to target ${selectedDrone.depthMeters}m depth...`, ...logs]);
          } else if (next === 50) {
            setScanLogs((logs) => [`[${new Date().toLocaleTimeString()}] 🎯 Calibrating optical neural bounding box cameras (192kHz Acoustic Sonar)...`, ...logs]);
          } else if (next === 80) {
            setScanLogs((logs) => [`[${new Date().toLocaleTimeString()}] 📡 Transmitting PostGIS spatial telemetry to NOAA satellite relay...`, ...logs]);
          }
          return next;
        });
      }, 350);
    }
    return () => clearInterval(interval);
  }, [isScanning, selectedDrone, selectedSectorId]);

  const handleStartDeployment = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanLogs([`[${new Date().toLocaleTimeString()}] 🚀 Deploying ${selectedDrone.name} to target sector ${selectedSectorId} (${selectedSector.name})...`]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-2xl p-4 sm:p-6 flex items-center justify-center animate-in fade-in overflow-y-auto">
      <div className="max-w-2xl w-full rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden text-slate-100 my-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-slate-800 text-white border border-slate-700">
              <Radio className="w-6 h-6 animate-pulse text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                AUV Swarm Drone Deployment & Mission Control
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Initiate autonomous subsea scanner & optical vision sweep
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Configuration Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          
          {/* Pick Drone */}
          <div>
            <label className="font-bold text-slate-300 block mb-1.5">Select AUV Drone Unit:</label>
            <select
              value={selectedDrone.id}
              onChange={(e) => {
                const found = droneFleet.find(d => d.id === e.target.value);
                if (found) setSelectedDrone(found);
              }}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-white border border-slate-800 font-bold focus:outline-none focus:border-slate-600"
            >
              {droneFleet.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.type}) — {d.battery}% Battery
                </option>
              ))}
            </select>
          </div>

          {/* Pick Target Sector */}
          <div>
            <label className="font-bold text-slate-300 block mb-1.5">Target Deployment Sector:</label>
            <select
              value={selectedSectorId}
              onChange={(e) => setSelectedSectorId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 text-white border border-slate-800 font-bold focus:outline-none focus:border-slate-600"
            >
              {oceanSectors.map((sec) => (
                <option key={sec.id} value={sec.id}>
                  {sec.id} - {sec.name} ({sec.oceanBasin})
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Dynamic Telemetry Metrics Box */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono pt-1">
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 block">Patrol Depth</span>
            <strong className="text-white text-sm font-extrabold">{selectedDrone.depthMeters}m</strong>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 block">Acoustic Freq</span>
            <strong className="text-emerald-400 text-sm font-extrabold">192 kHz</strong>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 block">Battery Cell</span>
            <strong className="text-amber-400 text-sm font-extrabold">{selectedDrone.battery}%</strong>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 block">Sector Risk</span>
            <strong className="text-rose-400 text-sm font-extrabold">{selectedSector.pollutionRisk}</strong>
          </div>
        </div>

        {/* Live Subsea Scanning Area with Sonar Radar Animation */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 relative overflow-hidden">
          
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-white flex items-center gap-2">
              <Activity className={`w-4 h-4 text-emerald-400 ${isScanning ? 'animate-spin' : ''}`} />
              <span>Scanning Telemetry Console</span>
            </span>
            <span className="font-bold text-emerald-400">{scanProgress}%</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
            <div
              className="h-full bg-emerald-500 transition-all duration-300 ease-out"
              style={{ width: `${scanProgress}%` }}
            />
          </div>

          {/* Live Log Console Output */}
          <div className="h-28 overflow-y-auto no-scrollbar font-mono text-[11px] space-y-1.5 text-slate-300 p-3 rounded-xl bg-slate-900 border border-slate-800">
            {scanLogs.length === 0 ? (
              <div className="flex items-center gap-2 text-slate-500">
                <Compass className="w-4 h-4 text-slate-500 animate-pulse" />
                <span>Ready to initiate subsea AUV drone scan sweep...</span>
              </div>
            ) : (
              scanLogs.map((log, i) => (
                <div key={i} className="text-slate-300 leading-relaxed">{log}</div>
              ))
            )}
          </div>

          {scanProgress === 100 && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Bathymetry & AI Vision layer updated for {selectedSector.name}!</span>
              </span>
              <Link
                href="/map"
                onClick={onClose}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-bold border border-slate-700 flex items-center gap-1"
              >
                <span>Inspect Map →</span>
              </Link>
            </div>
          )}

        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition-all"
          >
            Cancel
          </button>
          
          <button
            disabled={isScanning}
            onClick={handleStartDeployment}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 ios-spring"
          >
            <Play className="w-4 h-4 text-emerald-400" />
            <span>{isScanning ? 'Scanning in Progress...' : 'Execute Drone Deployment Scan'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
