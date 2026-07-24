'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Waves,
  LayoutDashboard,
  MapPin,
  Eye,
  Fish,
  TrendingUp,
  Bell,
  FileText,
  Sun,
  Moon,
  ShieldCheck,
  User,
  UserPlus,
  ChevronDown,
  Mail,
  Info,
  Database,
  X,
  PhoneCall,
  Activity,
  Radio,
  Satellite,
  Zap,
  BarChart3,
  Search,
  LogOut,
  Settings,
  ChevronRight,
} from 'lucide-react';
import { useTheme } from '@/lib/theme-context';
import { useAuth, UserRole } from '@/lib/auth-context';
import { NotificationCenter } from '@/components/notification-center';
import { FloatingAuthModal } from '@/components/floating-auth-modal';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { user, isLoggedIn, logout, switchRole } = useAuth();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [controlCenterOpen, setControlCenterOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Floating Auth Modal state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleOpenAuth = () => {
      setAuthTab('login');
      setAuthModalOpen(true);
    };
    window.addEventListener('open-auth-modal', handleOpenAuth);

    // Lock body scroll when modals open
    if (controlCenterOpen || authModalOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      window.removeEventListener('open-auth-modal', handleOpenAuth);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [controlCenterOpen, authModalOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const openAuthModal = (tab: 'login' | 'signup') => {
    setAuthTab(tab);
    setAuthModalOpen(true);
  };

  const mainNavLinks = [
    { href: '/', label: 'Overview', icon: Waves, color: 'teal' },
    { href: '/dashboard', label: 'Mission Control', icon: LayoutDashboard, color: 'violet' },
    { href: '/map', label: 'Ocean Map', icon: MapPin, color: 'cyan' },
    { href: '/predictive-map', label: 'Predictive', icon: TrendingUp, color: 'amber' },
    { href: '/ai-detection', label: 'Vision Lab', icon: Eye, color: 'emerald' },
    { href: '/biodiversity', label: 'Biodiversity', icon: Fish, color: 'teal' },
    { href: '/datasets', label: 'Datasets', icon: Database, color: 'violet' },
  ];

  const allPageCatalog = [
    { href: '/', label: 'Overview & Story', category: 'Main Hub', icon: Waves, desc: 'Executive environmental risk dashboard', color: 'teal', colorHex: '#2dd4bf' },
    { href: '/dashboard', label: 'Mission Control', category: 'Main Hub', icon: LayoutDashboard, desc: 'Real-time AUV fleet & water chemistry', color: 'violet', colorHex: '#a78bfa' },
    { href: '/map', label: 'Ocean GIS Map', category: 'GIS & Maps', icon: MapPin, desc: 'Satellite & depth layer mapping', color: 'cyan', colorHex: '#22d3ee' },
    { href: '/predictive-map', label: '30-Day Risk Prediction', category: 'GIS & Maps', icon: TrendingUp, desc: 'Hydrodynamic plume dispersion model', color: 'amber', colorHex: '#fbbf24' },
    { href: '/ai-detection', label: 'Vision Lab', category: 'Neural Vision', icon: Eye, desc: '150+ Bio-acoustic scans & extinction analytics', color: 'emerald', colorHex: '#34d399' },
    { href: '/biodiversity', label: 'Biodiversity Hub', category: 'Neural Vision', icon: Fish, desc: 'Endangered marine species bio-acoustics', color: 'teal', colorHex: '#2dd4bf' },
    { href: '/datasets', label: 'Datasets Center', category: 'Data & Reports', icon: Database, desc: 'Open CSV, GeoJSON, and NetCDF downloads', color: 'violet', colorHex: '#a78bfa' },
    { href: '/digital-twin', label: 'Digital Twin AUV', category: 'Hardware', icon: Activity, desc: 'Subsea drone sensor 3D telemetry twin', color: 'rose', colorHex: '#fb7185' },
    { href: '/alerts', label: 'Live Smart Alerts', category: 'Response', icon: Bell, desc: 'Coast Guard & emergency alert feeds', color: 'rose', colorHex: '#fb7185' },
    { href: '/reports', label: 'Executive Reports', category: 'Data & Reports', icon: FileText, desc: 'Generate PDF/CSV institutional audits', color: 'amber', colorHex: '#fbbf24' },
    { href: '/about', label: 'About Us', category: 'Institutional', icon: Info, desc: 'Platform mission, partners & research team', color: 'emerald', colorHex: '#34d399' },
    { href: '/contact', label: 'Contact & Helplines', category: 'Institutional', icon: Mail, desc: '24/7 Coast Guard crisis emergency lines', color: 'rose', colorHex: '#fb7185' },
  ];

  const filteredPages = searchQuery.trim()
    ? allPageCatalog.filter(
        (p) =>
          p.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allPageCatalog;

  const roleColors: Record<string, string> = {
    Researcher: '#2dd4bf',
    'Conservation Organization': '#34d399',
    Administrator: '#a78bfa',
  };

  return (
    <>
      {/* Floating Auth Modal */}
      <FloatingAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab={authTab}
      />

      {/* ─── STICKY WRAPPER: Telemetry bar + Nav stuck together at top ─── */}
      <div className="sticky top-0 z-40 w-full flex flex-col">

      {/* ─── TELEMETRY STATUS TICKER ─── */}
      <div className="w-full text-[11px] font-mono py-1.5 px-4 hidden md:flex items-center justify-between overflow-hidden" style={{ background: '#04080f', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-bold" style={{ color: '#2dd4bf' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping inline-block" />
            AUV Swarm Online
          </span>
          <span className="text-white/20">│</span>
          <span className="text-white/50">Mariana Trench · 10,920m depth</span>
          <span className="text-white/20">│</span>
          <span className="text-white/70">pH 8.12 · Temp 1.8°C</span>
        </div>
        <div className="flex items-center gap-4">
          <span style={{ color: '#fbbf24' }} className="font-bold">
            14 Threats Intercepted Today
          </span>
          <span className="text-white/20">│</span>
          <span className="text-white/50">SAR Satellite Relay: Active ✓</span>
        </div>
      </div>

      {/* ─── MAIN NAVBAR ─── */}
      <header
        className={`w-full transition-all duration-300 ${
          scrolled
            ? 'glass-panel border-b border-slate-200 dark:border-white/10 shadow-xl'
            : 'bg-white/70 dark:bg-[#06090f]/85 backdrop-blur-2xl border-b border-slate-200/60 dark:border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 ios-spring">
            <div
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)', border: '1px solid rgba(45,212,191,0.2)' }}
            >
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#2dd4bf' }} />
            </div>
            <div className="flex flex-col leading-none">
              <div className="flex items-center gap-1">
                <span className="font-black text-xs sm:text-sm tracking-wider text-slate-900 dark:text-white">DEEPSEA</span>
                <span className="font-bold text-[10px] sm:text-[11px] tracking-widest" style={{ color: '#2dd4bf' }}>GUARDIAN</span>
              </div>
              <span className="text-[9px] font-mono text-emerald-500 font-bold flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="hidden min-[380px]:inline">14 AUV Swarm Active</span>
                <span className="min-[380px]:hidden">14 AUVs</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {mainNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              const colorMap: Record<string, string> = {
                teal: '#2dd4bf', violet: '#a78bfa', cyan: '#22d3ee',
                amber: '#fbbf24', emerald: '#34d399', rose: '#fb7185',
              };
              const c = colorMap[link.color] || '#2dd4bf';
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap ios-spring ${
                    isActive
                      ? 'text-slate-900 dark:text-white font-extrabold'
                      : 'text-slate-700 dark:text-white/60 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  style={
                    isActive
                      ? {
                          background: `linear-gradient(135deg, ${c}22, ${c}12)`,
                          border: `1px solid ${c}40`,
                          boxShadow: `0 0 12px ${c}25`,
                        }
                      : {}
                  }
                >
                  <Icon
                    className="w-3.5 h-3.5"
                    style={{ color: isActive ? c : undefined }}
                  />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">

            {/* Control Center Button */}
            <button
              onClick={() => setControlCenterOpen(true)}
              className="hidden sm:flex px-3 py-1.5 rounded-xl font-bold text-xs items-center gap-1.5 ios-spring"
              style={{
                background: 'rgba(45,212,191,0.1)',
                border: '1px solid rgba(45,212,191,0.2)',
                color: '#2dd4bf',
              }}
            >
              <Satellite className="w-3.5 h-3.5" />
              <span>Control Center</span>
            </button>

            {/* Notifications */}
            <NotificationCenter />

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl ios-bubble"
              style={{
                background: theme === 'dark' ? 'rgba(251,191,36,0.1)' : 'rgba(100,116,139,0.1)',
                border: `1px solid ${theme === 'dark' ? 'rgba(251,191,36,0.2)' : 'rgba(100,116,139,0.2)'}`,
              }}
              title={`Switch to ${theme === 'dark' ? 'Day' : 'Night'} Mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" style={{ color: '#fbbf24' }} />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* User Profile / Auth */}
            {isLoggedIn && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-2xl ios-spring"
                  style={{
                    background: 'rgba(167,139,250,0.1)',
                    border: '1px solid rgba(167,139,250,0.2)',
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black"
                    style={{
                      background: `linear-gradient(135deg, ${roleColors[user.role] || '#a78bfa'}30, ${roleColors[user.role] || '#a78bfa'}15)`,
                      border: `1.5px solid ${roleColors[user.role] || '#a78bfa'}40`,
                      color: roleColors[user.role] || '#a78bfa',
                    }}
                  >
                    {user.name.charAt(0)}
                  </div>
                  <span className="font-bold text-xs hidden md:inline text-white/80 max-w-[70px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3 h-3 text-white/30 hidden sm:inline" />
                </button>

                {/* User Dropdown */}
                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-64 rounded-2xl p-3 z-50 animate-slide-in"
                    style={{
                      background: 'rgba(10, 15, 28, 0.95)',
                      backdropFilter: 'blur(40px)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      boxShadow: '0 24px 60px rgba(0,0,0,0.6), 0 8px 20px rgba(0,0,0,0.4)',
                    }}
                  >
                    {/* Profile Header */}
                    <div className="p-2 mb-2">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-lg"
                          style={{
                            background: `linear-gradient(135deg, ${roleColors[user.role] || '#a78bfa'}25, ${roleColors[user.role] || '#a78bfa'}10)`,
                            border: `1.5px solid ${roleColors[user.role] || '#a78bfa'}35`,
                            color: roleColors[user.role] || '#a78bfa',
                          }}
                        >
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-white">{user.name}</p>
                          <p className="text-[10px] text-white/40 truncate max-w-[140px]">{user.email}</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{
                            background: `${roleColors[user.role] || '#a78bfa'}20`,
                            color: roleColors[user.role] || '#a78bfa',
                            border: `1px solid ${roleColors[user.role] || '#a78bfa'}30`,
                          }}
                        >
                          {user.role}
                        </span>
                      </div>
                    </div>

                    <div className="h-px bg-white/5 mb-2" />

                    {/* Role Switcher */}
                    <p className="text-[9px] font-black text-white/30 uppercase tracking-widest px-2 mb-1">
                      Switch Role
                    </p>
                    {(['Researcher', 'Conservation Organization', 'Administrator'] as UserRole[]).map((r) => (
                      <button
                        key={r}
                        onClick={() => { switchRole(r); setUserDropdownOpen(false); }}
                        className="w-full text-left px-2.5 py-2 text-xs rounded-xl flex items-center justify-between ios-spring mb-0.5"
                        style={
                          user.role === r
                            ? {
                                background: `${roleColors[r]}15`,
                                border: `1px solid ${roleColors[r]}25`,
                                color: roleColors[r],
                              }
                            : { color: 'rgba(255,255,255,0.5)' }
                        }
                      >
                        <span className="font-semibold">{r}</span>
                        {user.role === r && (
                          <ShieldCheck className="w-3.5 h-3.5" style={{ color: roleColors[r] }} />
                        )}
                      </button>
                    ))}

                    <div className="h-px bg-white/5 my-2" />

                    <button
                      onClick={() => { logout(); setUserDropdownOpen(false); }}
                      className="w-full text-left px-2.5 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl font-bold flex items-center gap-2 ios-spring"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-3 py-1.5 rounded-xl font-bold text-xs ios-spring"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.75)',
                  }}
                >
                  <span className="hidden sm:inline">Log In</span>
                  <User className="w-3.5 h-3.5 sm:hidden" />
                </button>
                <button
                  onClick={() => openAuthModal('signup')}
                  className="px-3 py-1.5 rounded-xl font-bold text-xs ios-spring text-[#0d1117]"
                  style={{
                    background: 'linear-gradient(135deg, #2dd4bf, #06b6d4)',
                    boxShadow: '0 4px 14px rgba(45,212,191,0.3)',
                  }}
                >
                  <span className="hidden sm:inline">Sign Up</span>
                  <UserPlus className="w-3.5 h-3.5 sm:hidden" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      </div>{/* end sticky wrapper */}

      {/* ─── CONTROL CENTER MODAL ─── */}
      {controlCenterOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col"
          style={{ background: 'rgba(0,0,0,0.80)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setControlCenterOpen(false); }}
        >
          <div
            className="w-full h-full overflow-y-auto"
            style={{ padding: '24px 16px 80px' }}
          >
            {/* Header */}
            <div className="max-w-5xl mx-auto flex items-center justify-between mb-8 animate-slide-up">
              <div className="flex items-center gap-4">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #2dd4bf20, #06b6d420)',
                    border: '1px solid rgba(45,212,191,0.25)',
                    boxShadow: '0 0 20px rgba(45,212,191,0.15)',
                  }}
                >
                  <Satellite className="w-5 h-5" style={{ color: '#2dd4bf' }} />
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">Platform Control Center</h2>
                  <p className="text-xs text-slate-500 dark:text-white/40 font-mono mt-0.5">12 modules · All ocean systems</p>
                </div>
              </div>
              <button
                onClick={() => setControlCenterOpen(false)}
                className="p-2.5 rounded-2xl ios-bubble text-slate-600 dark:text-white/60"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search */}
            <div className="max-w-5xl mx-auto mb-6 animate-slide-up" style={{ animationDelay: '0.05s' }}>
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <Search className="w-4 h-4 text-white/30" />
                <input
                  type="text"
                  placeholder="Search modules..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-sm text-white/80 placeholder-white/25 outline-none flex-1 font-medium"
                />
              </div>
            </div>

            {/* Module Grid */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
              {filteredPages.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setControlCenterOpen(false)}
                    className="p-4 sm:p-5 rounded-2xl flex items-start gap-4 ios-float animate-slide-up group"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      backdropFilter: 'blur(20px)',
                      animationDelay: `${0.05 + idx * 0.03}s`,
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                      style={{
                        background: `${item.colorHex}15`,
                        border: `1px solid ${item.colorHex}25`,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: item.colorHex }} />
                    </div>
                    <div className="min-w-0">
                      <span
                        className="text-[9px] font-black uppercase tracking-widest block mb-0.5"
                        style={{ color: item.colorHex, opacity: 0.7 }}
                      >
                        {item.category}
                      </span>
                      <h3 className="font-bold text-sm text-white/90 group-hover:text-white transition-colors truncate">
                        {item.label}
                      </h3>
                      <p className="text-[11px] text-white/35 mt-0.5 leading-relaxed line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/20 shrink-0 mt-1 group-hover:text-white/50 transition-colors" />
                  </Link>
                );
              })}
            </div>

            {/* Emergency Bar */}
            <div
              className="max-w-5xl mx-auto p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-slide-up"
              style={{
                background: 'rgba(251,113,133,0.06)',
                border: '1px solid rgba(251,113,133,0.15)',
                animationDelay: '0.4s',
              }}
            >
              <div className="flex items-center gap-3">
                <PhoneCall className="w-5 h-5 animate-pulse" style={{ color: '#fb7185' }} />
                <div>
                  <span className="font-bold text-white text-sm block">24/7 Coast Guard Emergency</span>
                  <span className="text-xs font-mono font-bold" style={{ color: '#fb7185' }}>
                    +1 (800) 424-8802 · Immediate Subsea Intervention
                  </span>
                </div>
              </div>
              <Link
                href="/contact"
                onClick={() => setControlCenterOpen(false)}
                className="px-5 py-2.5 rounded-xl font-bold text-xs ios-spring whitespace-nowrap"
                style={{
                  background: 'rgba(251,113,133,0.15)',
                  border: '1px solid rgba(251,113,133,0.25)',
                  color: '#fb7185',
                }}
              >
                All Helplines →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ─── MOBILE BOTTOM DOCK ─── */}
      <div
        className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 lg:hidden w-[92vw] max-w-sm rounded-full p-1.5 flex items-center justify-around glass-panel shadow-2xl border border-slate-300 dark:border-white/10"
      >
        {[
          { href: '/', icon: ShieldCheck, label: 'Home', color: '#2dd4bf' },
          { href: '/map', icon: MapPin, label: 'Map', color: '#22d3ee' },
          { href: '/ai-detection', icon: Eye, label: 'Vision', color: '#34d399' },
          { href: '/datasets', icon: Database, label: 'Data', color: '#a78bfa' },
        ].map(({ href, icon: Icon, label, color }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-full ios-bubble"
              style={isActive ? { background: `${color}18`, border: `1px solid ${color}30` } : {}}
            >
              <Icon className="w-4 h-4" style={{ color: isActive ? color : 'var(--txt-muted)' }} />
              <span
                className="text-[9px] font-bold"
                style={{ color: isActive ? color : 'var(--txt-muted)' }}
              >
                {label}
              </span>
            </Link>
          );
        })}
        <button
          onClick={() => setControlCenterOpen(true)}
          className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-full ios-bubble"
          style={{ background: 'rgba(45,212,191,0.16)', border: '1px solid rgba(45,212,191,0.3)' }}
        >
          <Satellite className="w-4 h-4" style={{ color: '#2dd4bf' }} />
          <span className="text-[9px] font-bold" style={{ color: '#2dd4bf' }}>Hub</span>
        </button>
      </div>
    </>
  );
};
