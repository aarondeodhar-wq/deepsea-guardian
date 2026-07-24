'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  ShieldAlert, 
  Globe, 
  MessageSquare,
  Clock,
  Radio
} from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    inquiryType: 'Emergency Threat Dispatch',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-semibold mb-3">
          <Radio className="w-4 h-4 text-cyan-500 animate-ping" />
          <span>24/7 Ocean Conservation & Technical Support</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Contact DeepSea Guardian
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
          Connect with our marine intelligence team, request emergency AUV drone dispatches, or partner on deep ocean biodiversity research.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Contact Info Cards */}
        <div className="space-y-4">
          
          <div className="p-6 rounded-3xl glass-panel space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-coral-500/20 text-coral-600 dark:text-coral-400 flex items-center justify-center font-bold">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Emergency Pollution Dispatch</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Report active oil slicks or ghost nets requiring immediate AUV/ROV deployment.
            </p>
            <p className="font-mono text-xs text-coral-600 dark:text-coral-400 font-bold">
              Hotline: +1 (800) 555-OCEAN
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-panel space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Research & Data Partnerships</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Inquire about PostGIS dataset access, hydrophone acoustic feeds, or custom AI vision models.
            </p>
            <p className="font-mono text-xs text-cyan-600 dark:text-cyan-400 font-bold">
              research@deepsea-guardian.org
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-panel space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Global Command Center</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Deep Ocean Monitoring Station 4, Pacific Basin Operations.
            </p>
            <p className="font-mono text-xs text-slate-700 dark:text-slate-300">
              Coordinates: 13.45° N, 143.90° E
            </p>
          </div>

        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 p-8 rounded-3xl glass-panel">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Dispatch Request Submitted</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                Thank you. Your message has been logged into the Guardian AI dispatch queue. A technical specialist will review your request within 15 minutes.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-sm hover:opacity-90 transition-all"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Send an Inquiry or Incident Report</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Dr. Sarah Connor"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sarah@ocean-research.org"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Organization / Agency</label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="Marine NGO / Research Institute"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Inquiry Type</label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-cyan-500 font-medium"
                  >
                    <option value="Emergency Threat Dispatch">Emergency Threat Dispatch</option>
                    <option value="Research Data Access">Research Data Access</option>
                    <option value="AUV Fleet Integration">AUV Fleet Integration</option>
                    <option value="General Support">General Support</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">Message / Telemetry Details</label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Provide incident coordinates, target sector details, or partnership inquiries..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-cyan-500 to-teal-400 text-slate-950 font-bold text-xs shadow-glow-cyan hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry to Guardian AI Dispatch</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
