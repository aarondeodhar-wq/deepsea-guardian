'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Bell,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Radio,
  X,
  ArrowRight,
  Zap,
  Sparkles,
  Newspaper,
  Activity,
  RefreshCw,
  Globe,
  Satellite,
  Compass,
} from 'lucide-react';
import { smartAlerts } from '@/lib/mock-data';

const platformUpdates = [
  {
    id: 'upd-1',
    title: 'SAR Satellite Echo: 4.2 km² Oil Slick',
    desc: 'Polar satellite radar intercepted unregistered tanker discharge in Sector 4.',
    time: '8m ago',
    tag: 'Live SAR Stream',
    color: '#fb7185',
  },
  {
    id: 'upd-2',
    title: 'AUV DeepGuardian-Alpha Hydrophone Stream',
    desc: 'Acoustic hydrophone recorded 192kHz Blue Whale spectrogram in Sector 5.',
    time: '24m ago',
    tag: 'Bio-Acoustic',
    color: '#2dd4bf',
  },
  {
    id: 'upd-3',
    title: 'Microplastic Plume Density Spike (+34%)',
    desc: 'Sargasso Sea gyre density surpassed 45,000 particles/m³. AUV swarm dispatched.',
    time: '1h ago',
    tag: 'AI Alert',
    color: '#fbbf24',
  },
  {
    id: 'upd-4',
    title: 'GIS Real-Time Leaflet Layer Active',
    desc: 'Subsea bathymetry, AIS vessel tracking & sanctuaries enabled on interactive map.',
    time: '2h ago',
    tag: 'GIS System',
    color: '#22d3ee',
  },
  {
    id: 'upd-5',
    title: '24/7 International Emergency Desk Live',
    desc: 'Integrated 12+ emergency crisis hotlines with US, UN, EU, AU & JP coast guards.',
    time: '4h ago',
    tag: 'Emergency Desk',
    color: '#a78bfa',
  },
];

type Tab = 'alerts' | 'updates';

export const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [alerts, setAlerts] = useState(smartAlerts);
  const [tab, setTab] = useState<Tab>('alerts');
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const unreadCount = alerts.length;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const markAllRead = () => setAlerts([]);

  const severityStyle = (severity: string) => {
    if (severity === 'Critical') return { bg: 'rgba(251,113,133,0.08)', border: 'rgba(251,113,133,0.2)', icon: '#fb7185' };
    if (severity === 'High') return { bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.2)', icon: '#fbbf24' };
    return { bg: 'rgba(34,211,238,0.08)', border: 'rgba(34,211,238,0.15)', icon: '#22d3ee' };
  };

  return (
    <div className="relative">
      {/* ── Bell Trigger Button ── */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen((o) => !o)}
        className="relative p-2 rounded-xl ios-bubble transition-all"
        style={{
          background: isOpen ? 'rgba(251,113,133,0.14)' : 'var(--inner-border)',
          border: `1px solid ${isOpen ? 'rgba(251,113,133,0.3)' : 'var(--inner-border)'}`,
        }}
        title="Live Alerts & Mission Intel"
      >
        <Bell
          className="w-4 h-4"
          style={{ color: unreadCount > 0 ? '#fb7185' : 'var(--txt-secondary)' }}
        />
        {unreadCount > 0 && (
          <span
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white font-black text-[9px] flex items-center justify-center animate-pulse shadow-md"
            style={{ background: '#fb7185', boxShadow: '0 0 8px rgba(251,113,133,0.6)' }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {/* ── Notification Dropdown Panel ── */}
      {isOpen && (
        <div
          ref={panelRef}
          className="absolute right-0 mt-2 w-80 sm:w-96 rounded-3xl overflow-hidden z-[100] animate-bubble glass-panel shadow-2xl border border-slate-300 dark:border-white/10"
        >
          {/* Header */}
          <div
            className="px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-white/10"
          >
            <div className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 animate-pulse" style={{ color: '#fb7185' }} />
              <span className="font-black text-sm text-slate-900 dark:text-white">Live Mission Intel</span>
            </div>
            <div className="flex items-center gap-2">
              {tab === 'alerts' && unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full ios-spring"
                  style={{
                    background: 'rgba(52,211,153,0.14)',
                    border: '1px solid rgba(52,211,153,0.3)',
                    color: '#10b981',
                  }}
                >
                  Clear All
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 rounded-full flex items-center justify-center ios-bubble text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white"
                style={{ background: 'rgba(128,128,128,0.12)' }}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Tab Switcher */}
          <div
            className="flex gap-1 px-3 py-2 border-b border-slate-200 dark:border-white/10"
          >
            {([
              { id: 'alerts', label: 'Threat Alerts', icon: ShieldAlert, count: unreadCount, color: '#fb7185' },
              { id: 'updates', label: 'Live News & Updates', icon: Sparkles, count: platformUpdates.length, color: '#0d9488' },
            ] as const).map(({ id, label, icon: Icon, count, color }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold flex-1 justify-center ios-spring"
                style={
                  tab === id
                    ? {
                        background: `${color}18`,
                        border: `1px solid ${color}35`,
                        color,
                      }
                    : { color: 'var(--txt-secondary)' }
                }
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{label}</span>
                <span
                  className="px-1.5 py-0.2 rounded-full text-[9px] font-black"
                  style={
                    tab === id
                      ? { background: `${color}25`, color }
                      : { background: 'rgba(128,128,128,0.12)', color: 'var(--txt-muted)' }
                  }
                >
                  {count}
                </span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="max-h-80 overflow-y-auto p-3 space-y-2.5">
            {tab === 'alerts' ? (
              alerts.length === 0 ? (
                <div className="py-8 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto animate-bounce" />
                  <p className="text-xs font-bold text-slate-900 dark:text-white">All Threats Clear</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 max-w-[200px] mx-auto">
                    AUV swarms reporting 0 active critical risks in monitored sectors.
                  </p>
                </div>
              ) : (
                alerts.map((alert) => {
                  const s = severityStyle(alert.severity);
                  return (
                    <div
                      key={alert.id}
                      className="p-3 rounded-2xl border text-xs space-y-1.5 transition-all ios-spring bg-slate-100/90 dark:bg-slate-900/60"
                      style={{ borderColor: s.border }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" style={{ color: s.icon }} />
                          <span className="font-bold text-slate-900 dark:text-white text-[11px]">{alert.title}</span>
                        </div>
                        <span
                          className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded"
                          style={{ background: `${s.icon}20`, color: s.icon }}
                        >
                          {alert.severity}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-normal">{alert.description}</p>

                      <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-1 font-mono">
                        <span>📍 {alert.location}</span>
                        <span>{alert.timestamp}</span>
                      </div>

                      <div className="pt-1.5 flex items-center justify-between">
                        <span
                          className="text-[10px] font-mono font-bold text-teal-600 dark:text-teal-400"
                        >
                          Action: {alert.recommendedAction}
                        </span>
                        <Link
                          href="/alerts"
                          onClick={() => setIsOpen(false)}
                          className="text-[10px] font-bold flex items-center gap-1 hover:underline"
                          style={{ color: s.icon }}
                        >
                          Details <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  );
                })
              )
            ) : (
              /* Updates & Live News Feed */
              platformUpdates.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl text-xs space-y-1.5 transition-all ios-spring bg-slate-100/90 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: `${item.color}15`,
                        border: `1px solid ${item.color}30`,
                        color: item.color,
                      }}
                    >
                      {item.tag}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">{item.time}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs leading-snug">{item.title}</h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div
            className="p-3 flex items-center justify-between text-xs"
            style={{
              background: 'rgba(0,0,0,0.3)',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <Link
              href="/alerts"
              onClick={() => setIsOpen(false)}
              className="text-[11px] font-bold flex items-center gap-1.5 ios-spring"
              style={{ color: '#2dd4bf' }}
            >
              <span>View Full Threat Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/reports"
              onClick={() => setIsOpen(false)}
              className="text-[11px] font-medium text-white/40 hover:text-white/80"
            >
              Export Report
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
