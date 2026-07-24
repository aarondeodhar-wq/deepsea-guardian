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
} from 'lucide-react';
import { smartAlerts } from '@/lib/mock-data';

const platformUpdates = [
  {
    id: 'upd-1',
    title: 'Real GIS Satellite Map Upgraded',
    desc: 'Leaflet integration now shows live ocean AIS vessel tracking layers.',
    time: '2h ago',
    tag: 'Feature',
    color: '#2dd4bf',
  },
  {
    id: 'upd-2',
    title: 'AI Vision Lab: 150+ Species Scans',
    desc: 'Bio-acoustic neural model trained on 150 endangered marine species.',
    time: '5h ago',
    tag: 'AI',
    color: '#a78bfa',
  },
  {
    id: 'upd-3',
    title: 'Drone Fleet Telemetry Upgraded',
    desc: 'Battery meters, depth gauges & patrol speed indicators added.',
    time: '1d ago',
    tag: 'Hardware',
    color: '#34d399',
  },
  {
    id: 'upd-4',
    title: 'Global Emergency Hotline Network',
    desc: 'Added 12+ international Coast Guard crisis lines across 6 regions.',
    time: '2d ago',
    tag: 'Safety',
    color: '#fb7185',
  },
  {
    id: 'upd-5',
    title: 'Night Mode Multi-Color Palette',
    desc: 'Dark mode now features teal, violet, emerald & amber accent zones.',
    time: '3d ago',
    tag: 'Design',
    color: '#fbbf24',
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

  // Close on outside click — not on mouse leave
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

  // Close on Escape
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
      {/* ── Bell Button ── */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen((o) => !o)}
        className="relative p-2 rounded-xl ios-bubble"
        style={{
          background: isOpen ? 'rgba(251,113,133,0.12)' : 'rgba(255,255,255,0.05)',
          border: `1px solid ${isOpen ? 'rgba(251,113,133,0.25)' : 'rgba(255,255,255,0.08)'}`,
        }}
        title="Live Alerts & Platform Updates"
      >
        <Bell
          className="w-4 h-4"
          style={{ color: unreadCount > 0 ? '#fb7185' : 'rgba(255,255,255,0.5)' }}
        />
        {unreadCount > 0 && (
          <span
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white font-black text-[9px] flex items-center justify-center animate-pulse"
            style={{ background: '#fb7185', boxShadow: '0 0 8px rgba(251,113,133,0.5)' }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {/* ── Notification Panel ── */}
      {isOpen && (
        <div
          ref={panelRef}
          className="absolute right-0 mt-2 w-80 sm:w-96 rounded-3xl overflow-hidden z-50 animate-slide-in"
          style={{
            background: 'rgba(8, 14, 26, 0.95)',
            backdropFilter: 'blur(40px) saturate(200%)',
            WebkitBackdropFilter: 'blur(40px) saturate(200%)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.7), 0 8px 20px rgba(0,0,0,0.5)',
          }}
        >
          {/* Header */}
          <div
            className="px-4 py-3 flex items-center justify-between"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 animate-pulse" style={{ color: '#fb7185' }} />
              <span className="font-black text-sm text-white">Mission Intel</span>
            </div>
            <div className="flex items-center gap-2">
              {tab === 'alerts' && unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full ios-spring"
                  style={{
                    background: 'rgba(52,211,153,0.1)',
                    border: '1px solid rgba(52,211,153,0.2)',
                    color: '#34d399',
                  }}
                >
                  Clear All
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 rounded-full flex items-center justify-center ios-bubble"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                <X className="w-3.5 h-3.5 text-white/40" />
              </button>
            </div>
          </div>

          {/* Tab Switcher */}
          <div
            className="flex gap-1 px-3 py-2"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
          >
            {([
              { id: 'alerts', label: 'Alerts', icon: ShieldAlert, count: unreadCount, color: '#fb7185' },
              { id: 'updates', label: 'Updates', icon: Sparkles, count: platformUpdates.length, color: '#2dd4bf' },
            ] as const).map(({ id, label, icon: Icon, count, color }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold flex-1 justify-center ios-spring"
                style={
                  tab === id
                    ? {
                        background: `${color}12`,
                        border: `1px solid ${color}25`,
                        color,
                      }
                    : { color: 'rgba(255,255,255,0.3)' }
                }
              >
                <Icon className="w-3 h-3" />
                <span>{label}</span>
                <span
                  className="text-[9px] font-black px-1.5 py-0.5 rounded-full"
                  style={{
                    background: tab === id ? `${color}20` : 'rgba(255,255,255,0.06)',
                    color: tab === id ? color : 'rgba(255,255,255,0.3)',
                  }}
                >
                  {count}
                </span>
              </button>
            ))}
          </div>

          {/* ── ALERTS TAB ── */}
          {tab === 'alerts' && (
            <div className="max-h-80 overflow-y-auto p-3 space-y-2">
              {alerts.length === 0 ? (
                <div className="py-8 text-center space-y-3">
                  <div
                    className="w-12 h-12 mx-auto rounded-2xl flex items-center justify-center"
                    style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)' }}
                  >
                    <CheckCircle2 className="w-6 h-6" style={{ color: '#34d399' }} />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-white">All Clear</p>
                    <p className="text-xs text-white/30 mt-0.5">No active subsea threats detected</p>
                  </div>
                </div>
              ) : (
                alerts.map((alert) => {
                  const s = severityStyle(alert.severity);
                  return (
                    <div
                      key={alert.id}
                      className="p-3 rounded-2xl space-y-1.5"
                      style={{ background: s.bg, border: `1px solid ${s.border}` }}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider"
                          style={{ color: s.icon }}
                        >
                          {alert.severity === 'Critical' ? (
                            <ShieldAlert className="w-3 h-3" />
                          ) : (
                            <AlertTriangle className="w-3 h-3" />
                          )}
                          {alert.severity}
                        </span>
                        <span className="text-[10px] text-white/25 font-mono">{alert.timestamp}</span>
                      </div>
                      <p className="font-bold text-xs text-white">{alert.title}</p>
                      <p className="text-[11px] text-white/45 leading-relaxed">{alert.description}</p>
                      <Link
                        href="/alerts"
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-1 text-[10px] font-bold mt-1"
                        style={{ color: s.icon }}
                      >
                        Inspect Alert <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* ── UPDATES TAB ── */}
          {tab === 'updates' && (
            <div className="max-h-80 overflow-y-auto p-3 space-y-2">
              {platformUpdates.map((upd) => (
                <div
                  key={upd.id}
                  className="p-3 rounded-2xl flex items-start gap-3"
                  style={{
                    background: `${upd.color}06`,
                    border: `1px solid ${upd.color}15`,
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: `${upd.color}15`, border: `1px solid ${upd.color}25` }}
                  >
                    <Zap className="w-3.5 h-3.5" style={{ color: upd.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span
                        className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full"
                        style={{ background: `${upd.color}15`, color: upd.color }}
                      >
                        {upd.tag}
                      </span>
                      <span className="text-[10px] text-white/25 font-mono shrink-0">{upd.time}</span>
                    </div>
                    <p className="font-bold text-xs text-white">{upd.title}</p>
                    <p className="text-[11px] text-white/40 mt-0.5 leading-relaxed">{upd.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          <div
            className="px-4 py-3"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
          >
            <Link
              href="/alerts"
              onClick={() => setIsOpen(false)}
              className="text-xs font-bold flex items-center justify-center gap-1.5 ios-spring"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              <Activity className="w-3.5 h-3.5" />
              Open Full Alert Center →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
