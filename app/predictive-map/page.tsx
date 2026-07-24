'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, 
  Clock, 
  ShieldAlert, 
  Wind, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Compass,
  AlertTriangle
} from 'lucide-react';
import { predictiveRiskData } from '@/lib/mock-data';

export default function PredictiveRiskMapPage() {
  const [timeframe, setTimeframe] = useState<'NOW' | '7_DAYS' | '30_DAYS'>('NOW');
  const [selectedSectorId, setSelectedSectorId] = useState<string>('SEC-04');

  const selectedData = predictiveRiskData.find(d => d.sectorId === selectedSectorId) || predictiveRiskData[0];

  const getRiskDetails = () => {
    if (timeframe === 'NOW') {
      return {
        label: 'Current Status (NOW)',
        riskLevel: selectedData.currentRisk,
        score: selectedData.currentRiskScore,
        spread: selectedData.currentSpreadKm2,
        color: selectedData.currentRisk === 'Critical' ? 'text-coral-600 dark:text-coral-400 bg-coral-500/20 border-coral-500/40' : 'text-amber-600 dark:text-amber-400 bg-amber-500/20 border-amber-500/40',
        heatmapOpacity: 0.3,
        scale: 1,
      };
    } else if (timeframe === '7_DAYS') {
      return {
        label: '7-Day Forecast Horizon',
        riskLevel: selectedData.sevenDayRisk,
        score: selectedData.sevenDayRiskScore,
        spread: selectedData.sevenDaySpreadKm2,
        color: 'text-amber-600 dark:text-amber-400 bg-amber-500/20 border-amber-500/40',
        heatmapOpacity: 0.65,
        scale: 1.6,
      };
    } else {
      return {
        label: '30-Day Critical Forecast Horizon',
        riskLevel: selectedData.thirtyDayRisk,
        score: selectedData.thirtyDayRiskScore,
        spread: selectedData.thirtyDaySpreadKm2,
        color: 'text-coral-600 dark:text-coral-400 bg-coral-500/20 border-coral-500/40',
        heatmapOpacity: 0.9,
        scale: 2.5,
      };
    }
  };

  const currentRiskState = getRiskDetails();

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* USP Banner Header */}
      <div className="p-8 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-semibold mb-4">
          <Sparkles className="w-4 h-4 text-cyan-500 animate-pulse" />
          <span>KEY DIFFERENTIATING FEATURE — MAIN USP</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight max-w-4xl mx-auto">
          DeepSea Guardian does not just detect today’s threats.{' '}
          <span className="bg-gradient-to-r from-violet-600 via-cyan-500 to-amber-500 bg-clip-text text-transparent">
            It predicts tomorrow’s environmental risks.
          </span>
        </h1>

        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl mx-auto mt-4">
          Interactive hydrodynamic modeling simulating 30-day ocean currents, thermal gradients, and microplastic plume dispersion.
        </p>
      </div>

      {/* Interactive Timeline Controls (NOW → 7 DAYS → 30 DAYS) */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-cyan-500 dark:text-cyan-400" />
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Interactive Forecast Timeline</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Drag timeline slider to project plume expansion</p>
          </div>
        </div>

        {/* Timeline Slider Buttons */}
        <div className="flex rounded-2xl bg-slate-100 dark:bg-slate-900 p-1.5 border border-slate-200 dark:border-slate-800 max-w-md w-full text-xs font-bold">
          <button
            onClick={() => setTimeframe('NOW')}
            className={`flex-1 py-3 rounded-xl transition-all ${
              timeframe === 'NOW'
                ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            NOW (Baseline)
          </button>

          <button
            onClick={() => setTimeframe('7_DAYS')}
            className={`flex-1 py-3 rounded-xl transition-all ${
              timeframe === '7_DAYS'
                ? 'bg-amber-500 text-slate-950 shadow-glow-amber'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            7 DAYS
          </button>

          <button
            onClick={() => setTimeframe('30_DAYS')}
            className={`flex-1 py-3 rounded-xl transition-all ${
              timeframe === '30_DAYS'
                ? 'bg-coral-500 text-slate-950 shadow-glow-coral'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            30 DAYS
          </button>
        </div>

      </div>

      {/* Main Interactive Simulation Viewport & Contributing Factors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Simulation Map Viewport Canvas */}
        <div className="lg:col-span-2 p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 relative overflow-hidden flex flex-col justify-between min-h-[480px]">
          
          <div className="flex items-center justify-between mb-4 z-10">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${timeframe === '30_DAYS' ? 'bg-coral-500 animate-ping' : 'bg-cyan-400'}`} />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">{selectedData.sectorName}</h3>
            </div>
            <span className={`text-xs font-mono font-extrabold px-3 py-1 rounded-full border ${currentRiskState.color}`}>
              {currentRiskState.label} — Risk Level: {currentRiskState.riskLevel}
            </span>
          </div>

          {/* Dynamic Visual Hydrodynamic Dispersion Map Simulation */}
          <div className="relative flex-1 w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center p-8">
            
            {/* Background Bathymetry Grid */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Dynamic Expanding Plume Layer */}
            <div
              className="absolute rounded-full bg-gradient-to-r from-coral-500 via-rose-600 to-amber-500 blur-2xl transition-all duration-1000 ease-out"
              style={{
                width: `${120 * currentRiskState.scale}px`,
                height: `${120 * currentRiskState.scale}px`,
                opacity: currentRiskState.heatmapOpacity,
              }}
            />

            {/* Center Sector Marker */}
            <div className="relative z-10 p-4 rounded-2xl glass-panel border border-cyan-400 text-center shadow-2xl bg-slate-950/80">
              <span className="text-xs font-mono font-bold text-cyan-400 block mb-1">
                PLUME CONTAMINATION AREA
              </span>
              <span className="text-3xl font-extrabold text-white font-mono">
                {currentRiskState.spread} <span className="text-sm font-normal text-slate-300">km²</span>
              </span>
              <p className="text-[10px] text-coral-400 font-mono mt-1 font-bold">
                Risk Score: {currentRiskState.score} / 100
              </p>
            </div>

          </div>

          {/* Sector Selector Tabs */}
          <div className="mt-4 flex items-center gap-2 overflow-x-auto text-xs z-10 pt-2">
            <span className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase shrink-0">Select Sector:</span>
            {predictiveRiskData.map((d) => (
              <button
                key={d.sectorId}
                onClick={() => setSelectedSectorId(d.sectorId)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-mono text-[11px] transition-all ${
                  selectedSectorId === d.sectorId
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-glow-cyan'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {d.sectorId}
              </button>
            ))}
          </div>

        </div>

        {/* Contributing Factors & Recommended Interventions */}
        <div className="p-6 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6">
          
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Wind className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                <span>Contributing Factors</span>
              </h3>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                {selectedData.aiConfidence}% AI Confidence
              </span>
            </div>

            <ul className="space-y-3 mt-4 text-xs">
              {selectedData.primaryDrivers.map((driver, idx) => (
                <li key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-slate-800 dark:text-slate-300 font-medium">{driver}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Conservation Action */}
          <div className="p-4 rounded-2xl bg-coral-500/10 border border-coral-500/30">
            <h4 className="text-xs font-bold text-coral-600 dark:text-coral-400 flex items-center gap-1.5 mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Recommended Action</span>
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {selectedData.recommendedMitigation}
            </p>
          </div>

          <button
            onClick={() => alert(`Executing preventative AUV mission to ${selectedData.sectorName}...`)}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-slate-950 font-bold text-xs shadow-glow-cyan hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            <span>Execute Recommended Intervention</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

      </div>

    </div>
  );
}
