'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { UserCheck, ShieldCheck, Mail, Lock, Building2, User, ArrowRight, Waves } from 'lucide-react';
import { useAuth, UserRole } from '@/lib/auth-context';

export default function SignUpPage() {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState<UserRole>('Researcher');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, role);
    setSuccess(true);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-slate-900 dark:text-slate-100">
      
      <div className="max-w-md w-full p-8 sm:p-10 rounded-3xl glass-panel border border-sky-500/30 space-y-6 shadow-2xl">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-sky-600 text-white flex items-center justify-center font-bold shadow-md">
            <Waves className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2">
            Create Institutional Account
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Register for PostGIS raw telemetry download keys & Coast Guard alert privileges.
          </p>
        </div>

        {success ? (
          <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
            <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto" />
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Registration Complete!</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Logged in as <strong>{name}</strong> ({role}).
              </p>
            </div>
            <Link
              href="/datasets"
              className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs block transition-all shadow-sm"
            >
              Go to Datasets Hub →
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Full Name:</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dr. Alex Rivera"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-sky-500 font-medium"
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.rivera@noaa.gov"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-sky-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Organization / Institute:</label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="NOAA Ocean Science Institute"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-sky-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Account Privileges Role:</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-sky-500 font-bold"
              >
                <option value="Researcher">Researcher (Full Telemetry Read Access)</option>
                <option value="Conservation Organization">Conservation Organization / NGO</option>
                <option value="Administrator">Administrator (Coast Guard Command)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 ios-spring mt-2"
            >
              <span>Complete Institutional Registration</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
          Already have an account?{' '}
          <Link href="/login" className="font-bold text-sky-600 dark:text-sky-400 hover:underline">
            Log In →
          </Link>
        </div>

      </div>

    </div>
  );
}
