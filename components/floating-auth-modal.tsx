'use client';

import React, { useState } from 'react';
import { Mail, Lock, UserCheck, Building2, User, X, ArrowRight, ShieldCheck, Waves } from 'lucide-react';
import { useAuth, UserRole } from '@/lib/auth-context';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'signup';
}

export const FloatingAuthModal: React.FC<Props> = ({ isOpen, onClose, initialTab = 'login' }) => {
  const { login } = useAuth();
  const [tab, setTab] = useState<'login' | 'signup'>(initialTab);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginRole, setLoginRole] = useState<UserRole>('Researcher');
  
  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupOrg, setSignupOrg] = useState('');
  const [signupRole, setSignupRole] = useState<UserRole>('Researcher');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(loginEmail || 'dr.researcher@noaa.gov', loginRole);
    setSuccessMsg(`Welcome back! Authenticated as ${loginRole}.`);
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 1000);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(signupEmail, signupRole);
    setSuccessMsg(`Account created! Logged in as ${signupName} (${signupRole}).`);
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#141b24]/90 backdrop-blur-2xl p-4 flex items-center justify-center animate-in fade-in">
      <div className="max-w-md w-full rounded-3xl glass-panel border border-slate-300 dark:border-slate-700 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden text-slate-900 dark:text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-800 text-white flex items-center justify-center font-bold shadow-md border border-slate-700">
            <Waves className="w-7 h-7 text-slate-200" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2">
            Institutional Access Portal
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Sign in to unlock PostGIS raw dataset downloads & AUV command rights.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-2xl bg-slate-200 dark:bg-slate-900 p-1 font-bold text-xs">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              tab === 'login' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Log In Existing
          </button>
          <button
            onClick={() => setTab('signup')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              tab === 'signup' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Sign Up New
          </button>
        </div>

        {successMsg && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* TAB 1: LOGIN */}
        {tab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Institutional Email:</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="dr.researcher@noaa.gov"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-slate-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Password:</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  defaultValue="••••••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-slate-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Account Role:</label>
              <select
                value={loginRole}
                onChange={(e) => setLoginRole(e.target.value as UserRole)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 font-bold focus:outline-none focus:border-slate-500"
              >
                <option value="Researcher">Researcher (Full Telemetry Read)</option>
                <option value="Conservation Organization">Conservation NGO</option>
                <option value="Administrator">Administrator (Coast Guard Command)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs shadow-md border border-slate-700 transition-all flex items-center justify-center gap-2 ios-spring mt-2"
            >
              <span>Authenticate & Sign In</span>
              <ArrowRight className="w-4 h-4 text-slate-300" />
            </button>
          </form>
        )}

        {/* TAB 2: SIGN UP */}
        {tab === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Full Name:</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  placeholder="Dr. Sarah Jenkins"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-slate-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Institutional Email:</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="sarah.j@whoi.edu"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-slate-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Organization:</label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={signupOrg}
                  onChange={(e) => setSignupOrg(e.target.value)}
                  placeholder="Woods Hole Oceanographic Institution"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-slate-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Account Role:</label>
              <select
                value={signupRole}
                onChange={(e) => setSignupRole(e.target.value as UserRole)}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 font-bold focus:outline-none focus:border-slate-500"
              >
                <option value="Researcher">Researcher</option>
                <option value="Conservation Organization">Conservation NGO</option>
                <option value="Administrator">Administrator</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs shadow-md border border-slate-700 transition-all flex items-center justify-center gap-2 ios-spring mt-2"
            >
              <span>Create Free Account</span>
              <UserCheck className="w-4 h-4 text-slate-300" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
