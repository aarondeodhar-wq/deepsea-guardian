'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Mail,
  Lock,
  UserCheck,
  Building2,
  User,
  X,
  ArrowRight,
  ShieldCheck,
  Waves,
  Eye,
  EyeOff,
  Sparkles,
  Github,
} from 'lucide-react';
import { useAuth, UserRole } from '@/lib/auth-context';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'signup';
}

export const FloatingAuthModal: React.FC<Props> = ({ isOpen, onClose, initialTab = 'login' }) => {
  const { login } = useAuth();
  const [tab, setTab] = useState<'login' | 'signup'>(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState('');

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginRole, setLoginRole] = useState<UserRole>('Researcher');

  // Signup state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupOrg, setSignupOrg] = useState('');
  const [signupRole, setSignupRole] = useState<UserRole>('Researcher');

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTab(initialTab);
    setError('');
    setSuccessMsg('');
  }, [initialTab, isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Lock body scroll while modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!loginEmail.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!loginPassword.trim()) {
      setError('Please enter your password.');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    login(loginEmail, loginRole);
    setSuccessMsg(`Welcome back! Signed in as ${loginRole}.`);
    setLoading(false);
    setTimeout(() => { setSuccessMsg(''); onClose(); }, 1200);
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!signupName.trim() || !signupEmail.trim() || !signupOrg.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    login(signupEmail, signupRole);
    setSuccessMsg(`Account created! Welcome, ${signupName.split(' ')[0]}.`);
    setLoading(false);
    setTimeout(() => { setSuccessMsg(''); onClose(); }, 1200);
  };

  const handleSSO = async (provider: string) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    login(`${provider.toLowerCase()}@deepsea-guardian.org`, 'Researcher');
    setSuccessMsg(`Signed in via ${provider}.`);
    setLoading(false);
    setTimeout(() => { setSuccessMsg(''); onClose(); }, 1000);
  };

  const roleOptions: { value: UserRole; label: string; color: string; desc: string }[] = [
    { value: 'Researcher', label: 'Researcher', color: '#2dd4bf', desc: 'Full telemetry read' },
    { value: 'Conservation Organization', label: 'NGO', color: '#34d399', desc: 'Threat alerts' },
    { value: 'Administrator', label: 'Admin', color: '#a78bfa', desc: 'Fleet command' },
  ];

  const inputClass =
    'w-full pl-9 pr-3 py-2.5 rounded-xl text-sm font-medium outline-none transition-all duration-200';
  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'rgba(255,255,255,0.9)',
  };
  const inputFocusStyle = `focus:ring-2 focus:ring-teal-400/20`;

  return (
    // z-[100] ensures it sits above navbar (z-40) and chatbox (z-60)
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={modalRef}
        className="w-full max-w-md rounded-3xl relative animate-bubble"
        style={{
          background: 'rgba(8, 14, 26, 0.95)',
          backdropFilter: 'blur(60px) saturate(200%)',
          WebkitBackdropFilter: 'blur(60px) saturate(200%)',
          border: '1px solid rgba(255,255,255,0.10)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 8px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
          overflow: 'visible',
        }}
      >
        {/* Ambient gradient top-left */}
        <div
          className="absolute top-0 left-0 w-48 h-48 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(45,212,191,0.08) 0%, transparent 70%)',
            transform: 'translate(-30%, -30%)',
          }}
        />
        {/* Ambient gradient bottom-right */}
        <div
          className="absolute bottom-0 right-0 w-48 h-48 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)',
            transform: 'translate(30%, 30%)',
          }}
        />

        {/* Close button — positioned cleanly inside top-4 right-4 */}
        <button
          onClick={onClose}
          aria-label="Close sign in modal"
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center ios-bubble z-20 transition-all"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)' }}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="rounded-3xl overflow-hidden">
        <div className="p-7 relative z-10">

          {/* Header */}
          <div className="text-center mb-6">
            <div
              className="w-14 h-14 mx-auto rounded-3xl flex items-center justify-center mb-3 relative"
              style={{
                background: 'linear-gradient(135deg, rgba(45,212,191,0.15), rgba(6,182,212,0.1))',
                border: '1px solid rgba(45,212,191,0.2)',
                boxShadow: '0 0 30px rgba(45,212,191,0.12)',
              }}
            >
              <ShieldCheck className="w-7 h-7" style={{ color: '#2dd4bf' }} />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              {tab === 'login' ? 'Welcome Back' : 'Join the Mission'}
            </h2>
            <p className="text-xs text-white/35 mt-1 font-medium">
              {tab === 'login'
                ? 'Sign in to access mission-critical ocean telemetry'
                : 'Create your institutional research account'}
            </p>
          </div>

          {/* Tab Switcher */}
          <div
            className="flex rounded-2xl p-1 mb-6"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            {(['login', 'signup'] as const).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(''); }}
                className="flex-1 py-2.5 rounded-xl text-xs font-black transition-all duration-300 ios-spring"
                style={
                  tab === t
                    ? {
                        background: 'linear-gradient(135deg, rgba(45,212,191,0.25), rgba(6,182,212,0.18))',
                        border: '1px solid rgba(45,212,191,0.35)',
                        color: '#2dd4bf',
                        boxShadow: '0 0 16px rgba(45,212,191,0.2)',
                      }
                    : { color: 'rgba(240, 244, 255, 0.85)', background: 'transparent' }
                }
              >
                {t === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          {/* Success Message */}
          {successMsg && (
            <div
              className="mb-4 p-3 rounded-2xl flex items-center gap-2 animate-slide-up"
              style={{
                background: 'rgba(52,211,153,0.1)',
                border: '1px solid rgba(52,211,153,0.2)',
              }}
            >
              <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: '#34d399' }} />
              <span className="text-xs font-bold" style={{ color: '#34d399' }}>{successMsg}</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div
              className="mb-4 p-3 rounded-2xl flex items-center gap-2 animate-slide-up"
              style={{
                background: 'rgba(251,113,133,0.1)',
                border: '1px solid rgba(251,113,133,0.2)',
              }}
            >
              <X className="w-4 h-4 shrink-0" style={{ color: '#fb7185' }} />
              <span className="text-xs font-bold" style={{ color: '#fb7185' }}>{error}</span>
            </div>
          )}

          {/* ── LOGIN FORM ── */}
          {tab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-white/50 mb-1.5 uppercase tracking-wider">
                  Institutional Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-white/25" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="dr.researcher@noaa.gov"
                    className={`${inputClass} ${inputFocusStyle}`}
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-white/50 mb-1.5 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-3 text-white/25" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className={`${inputClass} pr-10 ${inputFocusStyle}`}
                    style={inputStyle}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-white/25 hover:text-white/60 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-xs font-bold text-white/50 mb-2 uppercase tracking-wider">
                  Account Role
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {roleOptions.map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setLoginRole(r.value)}
                      className="p-2.5 rounded-xl text-left text-[11px] font-bold ios-spring"
                      style={
                        loginRole === r.value
                          ? {
                              background: `${r.color}15`,
                              border: `1px solid ${r.color}30`,
                              color: r.color,
                              boxShadow: `0 0 12px ${r.color}15`,
                            }
                          : {
                              background: 'rgba(255,255,255,0.03)',
                              border: '1px solid rgba(255,255,255,0.06)',
                              color: 'rgba(255,255,255,0.4)',
                            }
                      }
                    >
                      <div>{r.label}</div>
                      <div className="text-[9px] opacity-60 mt-0.5 font-medium">{r.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 ios-spring mt-2"
                style={{
                  background: loading
                    ? 'rgba(45,212,191,0.3)'
                    : 'linear-gradient(135deg, #2dd4bf, #06b6d4)',
                  color: '#040d14',
                  boxShadow: loading ? 'none' : '0 8px 24px rgba(45,212,191,0.3)',
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span
                      className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
                    />
                    Authenticating...
                  </span>
                ) : (
                  <>
                    <span>Sign In to Mission Control</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* ── SIGNUP FORM ── */}
          {tab === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="space-y-3.5">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-white/50 mb-1.5 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3 text-white/25" />
                  <input
                    type="text"
                    required
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="Dr. Elena Rostova"
                    className={`${inputClass} ${inputFocusStyle}`}
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-white/50 mb-1.5 uppercase tracking-wider">
                  Institutional Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-white/25" />
                  <input
                    type="email"
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="elena.r@oceanresearch.org"
                    className={`${inputClass} ${inputFocusStyle}`}
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Organization */}
              <div>
                <label className="block text-xs font-bold text-white/50 mb-1.5 uppercase tracking-wider">
                  Organization
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 absolute left-3 top-3 text-white/25" />
                  <input
                    type="text"
                    required
                    value={signupOrg}
                    onChange={(e) => setSignupOrg(e.target.value)}
                    placeholder="Woods Hole Oceanographic Institution"
                    className={`${inputClass} ${inputFocusStyle}`}
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-xs font-bold text-white/50 mb-2 uppercase tracking-wider">
                  Account Role
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {roleOptions.map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setSignupRole(r.value)}
                      className="p-2.5 rounded-xl text-left text-[11px] font-bold ios-spring"
                      style={
                        signupRole === r.value
                          ? {
                              background: `${r.color}15`,
                              border: `1px solid ${r.color}30`,
                              color: r.color,
                              boxShadow: `0 0 12px ${r.color}15`,
                            }
                          : {
                              background: 'rgba(255,255,255,0.03)',
                              border: '1px solid rgba(255,255,255,0.06)',
                              color: 'rgba(255,255,255,0.4)',
                            }
                      }
                    >
                      <div>{r.label}</div>
                      <div className="text-[9px] opacity-60 mt-0.5 font-medium">{r.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 ios-spring mt-2"
                style={{
                  background: loading
                    ? 'rgba(167,139,250,0.3)'
                    : 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
                  color: '#040d14',
                  boxShadow: loading ? 'none' : '0 8px 24px rgba(167,139,250,0.3)',
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Creating Account...
                  </span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Create Free Account</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <span className="text-[10px] text-white/25 font-bold uppercase tracking-widest">or continue with</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          </div>

          {/* SSO Buttons */}
          <div className="grid grid-cols-3 gap-2">
            {[
              {
                name: 'Google',
                icon: (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.25 21.3 7.31 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  </svg>
                ),
              },
              {
                name: 'GitHub',
                icon: <Github className="w-4 h-4 text-white" />,
              },
              {
                name: 'Azure',
                icon: (
                  <svg className="w-4 h-4" viewBox="0 0 23 23">
                    <path fill="#f35325" d="M1 1h10v10H1z"/>
                    <path fill="#81bc06" d="M12 1h10v10H12z"/>
                    <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                    <path fill="#ffba08" d="M12 12h10v10H12z"/>
                  </svg>
                ),
              },
            ].map(({ name, icon }) => (
              <button
                key={name}
                onClick={() => handleSSO(name)}
                disabled={loading}
                className="py-2.5 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 ios-spring"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  color: 'rgba(255,255,255,0.6)',
                }}
              >
                {icon}
                <span>{name}</span>
              </button>
            ))}
          </div>
        </div>
        </div>{/* end rounded-3xl overflow-hidden */}
      </div>
    </div>
  );
};
