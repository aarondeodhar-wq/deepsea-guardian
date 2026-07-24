'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Waves, Shield, User, Lock, Mail, ArrowRight, CheckCircle2, KeyRound, Github } from 'lucide-react';
import { useAuth, UserRole } from '@/lib/auth-context';

export default function LoginPage() {
  const router = useRouter();
  const { login, switchRole, user } = useAuth();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('dr.rostova@ocean-guardians.org');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole>('Researcher');
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, selectedRole);
    router.push('/dashboard');
  };

  const handleDemoSSO = (provider: string) => {
    login(`${provider.toLowerCase()}.user@deepsea-guardian.org`, selectedRole);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      
      <div className="w-full max-w-md rounded-3xl glass-panel p-8 shadow-2xl relative overflow-hidden">
        
        {/* Header Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-500 p-[2px] shadow-glow-violet mb-3">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Waves className="w-6 h-6 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {isSignUp ? 'Create Guardian Account' : 'Mission Control Login'}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Access AI-Powered Deep Ocean Monitoring Platform
          </p>
        </div>

        {/* Tab Toggle: Sign In vs Sign Up */}
        <div className="flex rounded-xl bg-slate-100 dark:bg-slate-900 p-1 mb-6 border border-slate-200 dark:border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setIsSignUp(false)}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
              !isSignUp ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsSignUp(true)}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
              isSignUp ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Demo User Role Selection */}
        <div className="mb-6">
          <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
            Select Demo Account Role:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['Researcher', 'Conservation Organization', 'Administrator'] as UserRole[]).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setSelectedRole(role)}
                className={`p-2 rounded-xl text-left border text-[10px] font-medium transition-all ${
                  selectedRole === role
                    ? 'border-cyan-500 bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 shadow-glow-cyan font-bold'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="truncate font-semibold">
                  {role === 'Conservation Organization' ? 'NGO' : role}
                </div>
                <div className="text-[9px] opacity-70 mt-0.5 truncate">
                  {role === 'Researcher' && 'Data & AI'}
                  {role === 'Conservation Organization' && 'Threats & Actions'}
                  {role === 'Administrator' && 'Fleet & Sensors'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@organization.org"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Remember me & Magic Link */}
          <div className="flex items-center justify-between text-[11px]">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 dark:border-slate-700 text-cyan-500 focus:ring-cyan-400 bg-slate-100 dark:bg-slate-900"
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => setMagicLinkSent(!magicLinkSent)}
              className="text-cyan-600 dark:text-cyan-400 hover:underline font-semibold"
            >
              Send Magic Link
            </button>
          </div>

          {magicLinkSent && (
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-[11px]">
              ✓ Magic Login link dispatched to your email! Click link to sign in passwordless.
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 via-cyan-500 to-teal-400 text-slate-950 font-bold text-xs shadow-glow-cyan hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            <span>{isSignUp ? 'Create Account & Access Platform' : 'Sign In to Mission Control'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-800" />
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Or Sign In With</span>
          <div className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-800" />
        </div>

        {/* SSO Buttons Grid */}
        <div className="grid grid-cols-3 gap-2">
          {/* Google SSO */}
          <button
            onClick={() => handleDemoSSO('Google')}
            className="py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-cyan-500 text-slate-800 dark:text-slate-200 font-medium text-[11px] flex items-center justify-center gap-1.5 transition-all"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.25 21.3 7.31 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
            </svg>
            <span>Google</span>
          </button>

          {/* GitHub SSO */}
          <button
            onClick={() => handleDemoSSO('GitHub')}
            className="py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-cyan-500 text-slate-800 dark:text-slate-200 font-medium text-[11px] flex items-center justify-center gap-1.5 transition-all"
          >
            <Github className="w-3.5 h-3.5 text-slate-800 dark:text-white" />
            <span>GitHub</span>
          </button>

          {/* Microsoft SSO */}
          <button
            onClick={() => handleDemoSSO('Microsoft')}
            className="py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-cyan-500 text-slate-800 dark:text-slate-200 font-medium text-[11px] flex items-center justify-center gap-1.5 transition-all"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 23 23">
              <path fill="#f35325" d="M1 1h10v10H1z"/>
              <path fill="#81bc06" d="M12 1h10v10H12z"/>
              <path fill="#05a6f0" d="M1 12h10v10H1z"/>
              <path fill="#ffba08" d="M12 12h10v10H12z"/>
            </svg>
            <span>Azure</span>
          </button>
        </div>

      </div>

    </div>
  );
}
