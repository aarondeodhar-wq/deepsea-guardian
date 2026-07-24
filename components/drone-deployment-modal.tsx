'use client';

import React, { useState, useEffect } from 'react';
import { Radio, Compass, ShieldCheck, X, CheckCircle2, Play, Activity, Cpu, Layers } from 'lucide-react';
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

  useEffect(() => {
    let interval: any;
    if (isScanning) {
      interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            setIsScanning(false);
            setScanLogs((logs) => [
              `[${new Date().toLocaleTimeString()}] SUCCESS: Subsea Scan complete for ${selectedDrone.name} in Sector ${selectedSectorId}. Bathymetry map updated ✓`,
              ...logs
            ]);
            return 100;
          }
          const next = prev + 10;
          if (next === 30) {
            setScanLogs((logs) => [`[${new Date().toLocaleTimeString()}] Submerging to ${selectedDrone.depthMeters}m depth...`, ...logs]);
          } else if (next === 60) {
            setScanLogs((logs) => [`[${new Date().toLocaleTimeString()}] Calibrating optical neural bounding box cameras...`, ...logs]);
          } else if (next === 90) {
            setScanLogs((logs) => [`[${new Date().toLocaleTimeString()}] Transmitting PostGIS telemetry to satellite relay...`, ...logs]);
          }
          return next;
        });
      }, 400);
    }
    return () => clearInterval(interval);
  }, [isScanning, selectedDrone, selectedSectorId]);

  const handleStartDeployment = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanLogs([`[${new Date().toLocaleTimeString()}] Deploying ${selectedDrone.name} to target sector ${selectedSectorId}...`]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#141b24]/90 backdrop-blur-2xl p-4 sm:p-6 flex items-center justify-center animate-in fade-in">
      <div className="max-w-2xl w-full rounded-3xl glass-panel border border-slate-300 dark:border-slate-700 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden text-slate-900 dark:text-slate-100">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-slate-800 text-white border border-slate-700">
              <Radio className="w-6 h-6 animate-pulse text-slate-300" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                AUV Swarm Drone Deployment & Mission Control
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Initiate autonomous subsea scanner & optical vision sweep
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Configuration Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          
          {/* Pick Drone */}
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5">Select AUV Drone Unit:</label>
            <select
              value={selectedDrone.id}
              onChange={(e) => {
                const found = droneFleet.find(d => d.id === e.target.value);
                if (found) setSelectedDrone(found);
              }}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 font-bold focus:outline-none focus:border-slate-500"
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
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5">Target Deployment Sector:</label>
            <select
              value={selectedSectorId}
              onChange={(e) => setSelectedSectorId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 font-bold focus:outline-none focus:border-slate-500"
            >
              {oceanSectors.map((sec) => (
                <option key={sec.id} value={sec.id}>
                  {sec.id} - {sec.name} ({sec.oceanBasin})
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Live Subsea Scanning Area */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white flex items-center gap-2">
              <Activity className={`w-4 h-4 text-slate-400 ${isScanning ? 'animate-spin' : ''}`} />
              <span>Scanning Telemetry Status</span>
            </span>
            <span className="font-mono font-bold text-emerald-400">{scanProgress}%</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
            <div
              className="h-full bg-slate-400 transition-all duration-300 ease-out"
              style={{ width: `${scanProgress}%` }}
            />
          </div>

          {/* Live Log Console Output */}
          <div className="h-28 overflow-y-auto no-scrollbar font-mono text-[10px] space-y-1 text-slate-300 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
            {scanLogs.length === 0 ? (
              <span className="text-slate-500">Ready to initiate AUV drone scan deployment...</span>
            ) : (
              scanLogs.map((log, i) => (
                <div key={i} className="text-slate-300">{log}</div>
              ))
            )}
          </div>
        </div>

        {/* Action Trigger Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-300 dark:hover:bg-slate-700 transition-all"
          >
            Cancel
          </button>
          
          <button
            disabled={isScanning}
            onClick={handleStartDeployment}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 ios-spring"
          >
            <Play className="w-4 h-4 text-slate-300" />
            <span>{isScanning ? 'Scanning in Progress...' : 'Execute Drone Deployment Scan'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
