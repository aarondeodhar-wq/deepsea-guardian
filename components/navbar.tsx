'use client';

import React, { useState, useEffect } from 'react';
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
  Grid,
  X,
  PhoneCall,
  Activity,
  Radio
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

  // Floating Auth Modal state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    const handleOpenAuth = () => {
      setAuthTab('login');
      setAuthModalOpen(true);
    };

    window.addEventListener('open-auth-modal', handleOpenAuth);

    if (controlCenterOpen || authModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      window.removeEventListener('open-auth-modal', handleOpenAuth);
      document.body.style.overflow = 'auto';
    };
  }, [controlCenterOpen, authModalOpen]);

  const openAuthModal = (tab: 'login' | 'signup') => {
    setAuthTab(tab);
    setAuthModalOpen(true);
  };

  const mainNavLinks = [
    { href: '/', label: 'Overview', icon: Waves },
    { href: '/dashboard', label: 'Mission Control', icon: LayoutDashboard },
    { href: '/map', label: 'Ocean Map', icon: MapPin },
    { href: '/predictive-map', label: 'Predictive Risk', icon: TrendingUp },
    { href: '/ai-detection', label: 'Vision Lab', icon: Eye },
    { href: '/biodiversity', label: 'Biodiversity', icon: Fish },
    { href: '/datasets', label: 'Datasets', icon: Database },
  ];

  const allPageCatalog = [
    { href: '/', label: 'Overview & Story', category: 'Main Hub', icon: Waves, desc: 'Executive environmental risk dashboard & 3D telemetry' },
    { href: '/dashboard', label: 'Mission Control', category: 'Main Hub', icon: LayoutDashboard, desc: 'Real-time AUV fleet & water chemistry monitors' },
    { href: '/map', label: 'Ocean GIS Map', category: 'GIS & Maps', icon: MapPin, desc: 'Google Maps Pro Satellite & depth layers' },
    { href: '/predictive-map', label: '30-Day Risk Prediction', category: 'GIS & Maps', icon: TrendingUp, desc: 'Hydrodynamic plume dispersion model' },
    { href: '/ai-detection', label: 'Vision Lab', category: 'Neural Vision', icon: Eye, desc: '150+ Bio-acoustic scans & extinction analytics' },
    { href: '/biodiversity', label: 'Biodiversity Hub', category: 'Neural Vision', icon: Fish, desc: 'Endangered marine species bio-acoustics' },
    { href: '/datasets', label: 'Datasets Center', category: 'Data & Reports', icon: Database, desc: 'Open CSV, GeoJSON, and NetCDF downloads' },
    { href: '/digital-twin', label: 'Digital Twin AUV', category: 'Hardware', icon: Activity, desc: 'Subsea drone sensor 3D telemetry twin' },
    { href: '/alerts', label: 'Live Smart Alerts', category: 'Response', icon: Bell, desc: 'Coast Guard & emergency alert feeds' },
    { href: '/reports', label: 'Executive Reports', category: 'Data & Reports', icon: FileText, desc: 'Generate PDF/CSV institutional audits' },
    { href: '/about', label: 'About Us', category: 'Institutional', icon: Info, desc: 'Platform mission, partners, and research team' },
    { href: '/contact', label: 'Contact & Helplines', category: 'Institutional', icon: Mail, desc: '24/7 Coast Guard crisis emergency lines' },
  ];

  return (
    <>
      {/* Floating Auth Modal over current page */}
      <FloatingAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab={authTab}
      />

      {/* DYNAMIC TELEMETRY STATUS BAR (DESKTOP & TABLET) */}
      <div className="w-full bg-slate-900 text-white text-[11px] font-mono py-1.5 px-4 border-b border-slate-800 hidden md:flex items-center justify-between overflow-x-hidden">
        <div className="flex items-center gap-4 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              AUV Swarm Active
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300">Mariana Trench (10,920m)</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-200">pH 8.12 (Normal)</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-amber-300 font-bold">14 Threat Interceptions Today</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300">Satellite SAR Relay: Active ✓</span>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR - FULLY RESPONSIVE NO-OVERFLOW MOBILE HEADER */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-300 dark:border-slate-800 backdrop-blur-3xl overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
          
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl bg-slate-800 text-white flex items-center justify-center border border-slate-700 shadow-sm">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
            </div>
            <span className="font-extrabold text-sm sm:text-base tracking-wide text-slate-900 dark:text-white">
              DEEPSEA <span className="text-slate-600 dark:text-slate-300">GUARDIAN</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 py-1">
            {mainNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-200' : 'text-slate-500 dark:text-slate-400'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Control Center Button (Desktop) */}
            <button
              onClick={() => setControlCenterOpen(true)}
              className="hidden sm:flex px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs shadow-sm transition-all items-center gap-1.5 border border-slate-700"
              title="Open Navigation Menu"
            >
              <Grid className="w-4 h-4 text-slate-300" />
              <span>Control Center</span>
            </button>

            {/* Notification Center */}
            <NotificationCenter />

            {/* Day / Night Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition-all flex items-center justify-center"
              title={`Switch to ${theme === 'dark' ? 'Day Mode' : 'Night Mode'}`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* User Profile or Auth Trigger */}
            {isLoggedIn && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 p-1 sm:px-3 sm:py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover border border-slate-500"
                  />
                  <span className="font-bold hidden md:inline truncate max-w-[80px]">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
                </button>

                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-60 rounded-2xl glass-panel p-3 border border-slate-300 dark:border-slate-700 shadow-xl z-50 text-xs"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="p-2 border-b border-slate-200 dark:border-slate-700/50">
                      <p className="font-bold text-slate-900 dark:text-white">{user.name}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                    </div>

                    <div className="py-2 space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Role</p>
                      {(['Researcher', 'Conservation Organization', 'Administrator'] as UserRole[]).map((r) => (
                        <button
                          key={r}
                          onClick={() => {
                            switchRole(r);
                            setUserDropdownOpen(false);
                          }}
                          className={`w-full text-left px-2 py-1.5 text-xs rounded-lg flex items-center justify-between ${
                            user.role === r
                              ? 'bg-slate-800 text-white font-bold'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                          }`}
                        >
                          <span>{r}</span>
                          {user.role === r && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
                        </button>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-200 dark:border-slate-700/50">
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-2 py-1.5 text-xs text-rose-600 hover:bg-rose-500/10 rounded-lg font-bold"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs hover:bg-slate-300 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition-all flex items-center gap-1"
                >
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span className="hidden sm:inline">Log In</span>
                </button>

                <button
                  onClick={() => openAuthModal('signup')}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs shadow-md border border-slate-700 transition-all flex items-center gap-1"
                >
                  <UserPlus className="w-3.5 h-3.5 text-slate-300" />
                  <span className="hidden sm:inline">Sign Up</span>
                </button>
              </div>
            )}

          </div>
        </div>
      </header>

      {/* PLATFORM CONTROL CENTER OVERLAY MODAL */}
      {controlCenterOpen && (
        <div className="fixed inset-0 z-50 bg-[#141b24]/90 backdrop-blur-2xl p-4 sm:p-8 flex flex-col justify-between overflow-y-auto animate-in fade-in">
          
          <div className="flex items-center justify-between max-w-6xl mx-auto w-full pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-slate-800 text-white border border-slate-700 shadow-md">
                <Grid className="w-6 h-6 text-slate-300" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-wide">Platform Control Center</h2>
                <p className="text-xs text-slate-400 font-mono">Access all 12 platform modules & emergency helplines</p>
              </div>
            </div>

            <button
              onClick={() => setControlCenterOpen(false)}
              className="p-2 rounded-2xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="max-w-6xl mx-auto w-full my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allPageCatalog.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setControlCenterOpen(false)}
                  className="p-4 sm:p-5 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-600 hover:bg-slate-800/90 transition-all flex items-start gap-4 group shadow-xl"
                >
                  <div className="p-3 rounded-2xl bg-slate-800 text-slate-300 group-hover:bg-slate-700 group-hover:text-white transition-all shrink-0 border border-slate-700">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-extrabold text-slate-400 uppercase tracking-wider block mb-0.5">
                      {item.category}
                    </span>
                    <h3 className="font-extrabold text-sm sm:text-base text-white group-hover:text-slate-200 transition-colors">
                      {item.label}
                    </h3>
                    <p className="text-xs text-slate-300 font-medium mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="max-w-6xl mx-auto w-full p-4 rounded-3xl bg-rose-500/10 border border-rose-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs shadow-lg">
            <div className="flex items-center gap-3">
              <PhoneCall className="w-5 h-5 text-rose-400 shrink-0 animate-pulse" />
              <div>
                <span className="font-bold text-white text-sm block">24/7 Coast Guard Emergency Pollution Line</span>
                <span className="text-rose-300 font-mono font-bold">+1 (800) 424-8802 • Immediate Subsea Interventions</span>
              </div>
            </div>
            <Link
              href="/contact"
              onClick={() => setControlCenterOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold whitespace-nowrap shadow-md"
            >
              Contact Helplines →
            </Link>
          </div>

        </div>
      )}

      {/* MOBILE BOTTOM FLOATING NAVIGATION DOCK - PERFECT FIT & NO OVERLAP */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 lg:hidden w-[94vw] max-w-md rounded-full bg-slate-900/95 backdrop-blur-2xl border border-slate-700 p-1.5 shadow-2xl flex items-center justify-around text-white">
        <Link
          href="/"
          className={`p-2 rounded-full flex flex-col items-center text-[10px] font-bold transition-all ${
            pathname === '/' ? 'text-white bg-slate-800 border border-slate-700' : 'text-slate-400'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Home</span>
        </Link>

        <Link
          href="/map"
          className={`p-2 rounded-full flex flex-col items-center text-[10px] font-bold transition-all ${
            pathname === '/map' ? 'text-white bg-slate-800 border border-slate-700' : 'text-slate-400'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Map</span>
        </Link>

        <Link
          href="/ai-detection"
          className={`p-2 rounded-full flex flex-col items-center text-[10px] font-bold transition-all ${
            pathname === '/ai-detection' ? 'text-white bg-slate-800 border border-slate-700' : 'text-slate-400'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>Vision</span>
        </Link>

        <Link
          href="/datasets"
          className={`p-2 rounded-full flex flex-col items-center text-[10px] font-bold transition-all ${
            pathname === '/datasets' ? 'text-white bg-slate-800 border border-slate-700' : 'text-slate-400'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Datasets</span>
        </Link>

        <button
          onClick={() => setControlCenterOpen(true)}
          className="p-2 rounded-full flex flex-col items-center text-[10px] font-bold text-white bg-slate-800 border border-slate-700"
        >
          <Grid className="w-4 h-4" />
          <span>Menu</span>
        </button>
      </div>
    </>
  );
};
