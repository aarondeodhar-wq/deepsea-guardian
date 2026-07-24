'use client';

import React, { useState } from 'react';
import { 
  Fish, 
  TrendingUp, 
  ShieldAlert, 
  MapPin, 
  Compass, 
  Activity, 
  Search, 
  Filter,
  CheckCircle2,
  Waves
} from 'lucide-react';
import { marineSpecies } from '@/lib/mock-data';

export default function BiodiversityPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  const filteredSpecies = marineSpecies.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.scientificName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-2">
            <Fish className="w-4 h-4 text-emerald-500" />
            <span>Abyssal Biodiversity Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Endangered Marine Species & Habitat Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Real-time bio-acoustic hydrophone tracking, taxonomy verification, and population trend analysis.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search species..."
              className="pl-9 pr-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 text-xs focus:outline-none focus:border-sky-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs focus:outline-none focus:border-sky-500 font-medium"
          >
            <option value="All">All IUCN Statuses</option>
            <option value="Endangered">Endangered</option>
            <option value="Critically Endangered">Critically Endangered</option>
            <option value="Vulnerable">Vulnerable</option>
            <option value="Least Concern">Least Concern</option>
          </select>
        </div>
      </div>

      {/* Overview Stat Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        
        <div className="p-6 rounded-3xl glass-card border border-emerald-500/30">
          <Fish className="w-6 h-6 text-emerald-500 mb-2" />
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">1,420</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Observed Individuals Today</p>
        </div>

        <div className="p-6 rounded-3xl glass-card border border-rose-500/30">
          <ShieldAlert className="w-6 h-6 text-rose-500 mb-2" />
          <h3 className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 font-mono">8 Species</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Under Active IUCN Threat Patrol</p>
        </div>

        <div className="p-6 rounded-3xl glass-card border border-sky-500/30">
          <TrendingUp className="w-6 h-6 text-sky-500 mb-2" />
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">92%</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Biodiversity Health Index</p>
        </div>

        <div className="p-6 rounded-3xl glass-card border border-indigo-500/30">
          <Activity className="w-6 h-6 text-indigo-500 mb-2" />
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">96.8%</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">AI Taxonomy Accuracy</p>
        </div>

      </div>

      {/* Species Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSpecies.map((spec) => (
          <div
            key={spec.id}
            className="rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col justify-between group hover:border-sky-500 transition-all shadow-md"
          >
            {/* Image Container */}
            <div className="relative h-56 w-full overflow-hidden bg-slate-900">
              {!failedImages[spec.id] ? (
                <img
                  src={spec.imageUrl}
                  alt={spec.name}
                  onError={() => handleImageError(spec.id)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-900 via-sky-950/60 to-slate-900 flex flex-col items-center justify-center p-6 text-center">
                  <Fish className="w-12 h-12 text-sky-400 animate-pulse mb-1" />
                  <span className="text-[10px] text-sky-300 font-mono tracking-widest uppercase">AUV Visual Telemetry</span>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none" />

              {/* Status Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border shadow-sm ${
                  spec.status.includes('Endangered') ? 'bg-rose-500/80 text-white border-rose-400' :
                  spec.status === 'Vulnerable' ? 'bg-amber-500/80 text-white border-amber-400' : 'bg-emerald-500/80 text-white border-emerald-400'
                }`}>
                  {spec.status}
                </span>
              </div>

              <div className="absolute bottom-3 left-4 right-4 z-10">
                <h3 className="text-xl font-bold text-white tracking-wide">{spec.name}</h3>
                <p className="text-xs text-sky-300 font-mono italic">{spec.scientificName}</p>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-4 text-xs">
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Population Trend</span>
                  <strong className={`font-mono text-xs ${
                    spec.populationTrend === 'Increasing' ? 'text-emerald-600 dark:text-emerald-400' :
                    spec.populationTrend === 'Declining' ? 'text-rose-600 dark:text-rose-400' : 'text-sky-600 dark:text-sky-400'
                  }`}>
                    {spec.populationTrend === 'Increasing' ? '▲ Increasing' :
                     spec.populationTrend === 'Declining' ? '▼ Declining' : '▬ Stable'}
                  </strong>
                </div>

                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Last Detected</span>
                  <strong className="text-slate-900 dark:text-white font-mono text-xs">{spec.lastDetected}</strong>
                </div>
              </div>

              <div className="space-y-1.5 text-slate-700 dark:text-slate-300 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Depth Preference:</span>
                  <span className="font-mono text-sky-600 dark:text-sky-400 font-bold">{spec.depthRange}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Observed Today:</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{spec.observedCount} Units</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Primary Habitat:</span>
                  <span className="text-slate-900 dark:text-slate-200 font-medium truncate max-w-[140px]">{spec.primaryHabitat}</span>
                </div>
              </div>

            </div>

            {/* Card Footer */}
            <div className="px-6 py-3 bg-slate-100 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[10px] font-mono text-sky-600 dark:text-sky-400 font-bold">
              <span>AI Match Accuracy: {spec.aiAccuracy}%</span>
              <span>ID: {spec.id}</span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
