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
  Radio,
  Sparkles
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
    if (controlCenterOpen || authModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
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
    { href: '/ai-detection', label: 'AI Vision Lab', icon: Eye },
    { href: '/biodiversity', label: 'Biodiversity', icon: Fish },
    { href: '/datasets', label: 'Datasets', icon: Database },
  ];

  const allPageCatalog = [
    { href: '/', label: 'Overview & Story', category: 'Main Hub', icon: Waves, desc: 'Executive environmental risk dashboard & 3D telemetry' },
    { href: '/dashboard', label: 'Mission Control', category: 'Main Hub', icon: LayoutDashboard, desc: 'Real-time AUV fleet & water chemistry monitors' },
    { href: '/map', label: 'Ocean GIS Map', category: 'GIS & Maps', icon: MapPin, desc: 'Google Maps Pro Satellite & depth layers' },
    { href: '/predictive-map', label: '30-Day Risk Prediction', category: 'GIS & Maps', icon: TrendingUp, desc: 'Hydrodynamic plume dispersion model' },
    { href: '/ai-detection', label: 'AI Vision Lab', category: 'AI & Neural', icon: Eye, desc: '150+ Bio-acoustic scans & extinction analytics' },
    { href: '/biodiversity', label: 'Biodiversity Hub', category: 'AI & Neural', icon: Fish, desc: 'Endangered marine species bio-acoustics' },
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

      {/* APPLE iOS DYNAMIC ISLAND FLOATING STATUS BAR */}
      <div className="w-full bg-slate-900 text-white text-[11px] font-mono py-1.5 px-4 border-b border-slate-800 hidden sm:flex items-center justify-between">
        <div className="flex items-center gap-4 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              AUV Swarm Active
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300">Mariana Trench (10,920m)</span>
            <span className="text-slate-400">|</span>
            <span className="text-sky-300">pH 8.12 (Normal)</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-amber-300 font-bold">14 Threat Interceptions Today</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300">Satellite SAR Relay: Active ✓</span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-300 dark:border-slate-800 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 rounded-2xl bg-slate-800 text-white p-[2px] shadow-sm flex items-center justify-center ios-spring border border-slate-700">
              <Waves className="w-5 h-5 text-slate-200" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-wider text-slate-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                  DEEPSEA <span className="text-slate-700 dark:text-slate-300">GUARDIAN</span>
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono font-bold border border-slate-300 dark:border-slate-700">
                  OFFICIAL
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
            {mainNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ios-spring ${
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
          <div className="flex items-center gap-2 shrink-0">
            
            {/* Control Center Button */}
            <button
              onClick={() => setControlCenterOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 ios-spring border border-slate-700"
              title="Open All Pages & Features"
            >
              <Grid className="w-4 h-4 text-slate-300" />
              <span className="hidden sm:inline">Control Center</span>
            </button>

            {/* Notification Drawer */}
            <NotificationCenter />

            {/* Day / Night Mode Switcher Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition-all ios-spring flex items-center justify-center"
              title={`Switch to ${theme === 'dark' ? 'Day Mode' : 'Slate Night Mode'}`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* User Account OR Floating Log In / Sign Up Modal Triggers */}
            {isLoggedIn && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white hover:border-slate-500 transition-all"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover border border-slate-500"
                  />
                  <span className="font-bold hidden md:inline truncate max-w-[90px]">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-64 rounded-2xl glass-panel p-3 border border-slate-300 dark:border-slate-700 shadow-xl z-50 animate-in fade-in slide-in-from-top-2"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="p-2 border-b border-slate-200 dark:border-slate-700/50">
                      <p className="font-bold text-sm text-slate-900 dark:text-white">{user.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                    </div>

                    <div className="py-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1">
                        Demo Role Switcher
                      </p>
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
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs hover:bg-slate-300 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition-all flex items-center gap-1 ios-spring"
                >
                  <User className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                  <span>Log In</span>
                </button>

                <button
                  onClick={() => openAuthModal('signup')}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs shadow-md border border-slate-700 transition-all flex items-center gap-1 ios-spring"
                >
                  <UserPlus className="w-3.5 h-3.5 text-slate-300" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}

          </div>
        </div>
      </header>

      {/* APPLE iOS FULL CONTROL CENTER OVERLAY MODAL */}
      {controlCenterOpen && (
        <div className="fixed inset-0 z-50 bg-[#141b24]/90 backdrop-blur-3xl p-4 sm:p-8 flex flex-col justify-between overflow-y-auto animate-in fade-in zoom-in-95">
          
          <div className="flex items-center justify-between max-w-6xl mx-auto w-full pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-slate-800 text-white border border-slate-700 shadow-md">
                <Grid className="w-6 h-6 text-slate-300" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-white tracking-wide">Apple iOS Control Center</h2>
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
                  className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-600 hover:bg-slate-800/90 transition-all flex items-start gap-4 group shadow-xl ios-spring"
                >
                  <div className="p-3 rounded-2xl bg-slate-800 text-slate-300 group-hover:bg-slate-700 group-hover:text-white transition-all shrink-0 border border-slate-700">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-extrabold text-slate-400 uppercase tracking-wider block mb-0.5">
                      {item.category}
                    </span>
                    <h3 className="font-extrabold text-base text-white group-hover:text-slate-200 transition-colors">
                      {item.label}
                    </h3>
                    <p className="text-xs text-slate-300 font-medium mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="max-w-6xl mx-auto w-full p-4.5 rounded-3xl bg-rose-500/10 border border-rose-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs shadow-lg">
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

      {/* APPLE iOS BOTTOM DOCK */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 md:hidden w-[92vw] max-w-md rounded-full glass-panel border border-slate-300 dark:border-slate-800 p-2 shadow-2xl flex items-center justify-around">
        <Link
          href="/"
          className={`p-2.5 rounded-full flex flex-col items-center text-[10px] font-bold ${
            pathname === '/' ? 'text-slate-900 dark:text-white bg-slate-300/50 dark:bg-slate-800' : 'text-slate-500'
          }`}
        >
          <Waves className="w-5 h-5" />
          <span>Home</span>
        </Link>

        <Link
          href="/map"
          className={`p-2.5 rounded-full flex flex-col items-center text-[10px] font-bold ${
            pathname === '/map' ? 'text-slate-900 dark:text-white bg-slate-300/50 dark:bg-slate-800' : 'text-slate-500'
          }`}
        >
          <MapPin className="w-5 h-5" />
          <span>Map</span>
        </Link>

        <Link
          href="/ai-detection"
          className={`p-2.5 rounded-full flex flex-col items-center text-[10px] font-bold ${
            pathname === '/ai-detection' ? 'text-slate-900 dark:text-white bg-slate-300/50 dark:bg-slate-800' : 'text-slate-500'
          }`}
        >
          <Eye className="w-5 h-5" />
          <span>AI Vision</span>
        </Link>

        <Link
          href="/datasets"
          className={`p-2.5 rounded-full flex flex-col items-center text-[10px] font-bold ${
            pathname === '/datasets' ? 'text-slate-900 dark:text-white bg-slate-300/50 dark:bg-slate-800' : 'text-slate-500'
          }`}
        >
          <Database className="w-5 h-5" />
          <span>Datasets</span>
        </Link>

        <button
          onClick={() => setControlCenterOpen(true)}
          className="p-2.5 rounded-full flex flex-col items-center text-[10px] font-bold text-slate-900 dark:text-white bg-slate-300 dark:bg-slate-800"
        >
          <Grid className="w-5 h-5" />
          <span>Menu</span>
        </button>
      </div>
    </>
  );
};
