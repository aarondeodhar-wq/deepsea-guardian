'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Bot, X, Send, Sparkles, RefreshCw, Volume2, VolumeX,
  ShieldAlert, Cpu, CheckCircle2, HelpCircle, ChevronDown,
  Waves, Minimize2, Maximize2
} from 'lucide-react';
import { searchKnowledgeBase, AI_KNOWLEDGE_BASE } from '@/lib/ai-knowledge-base';
import { useAuth } from '@/lib/auth-context';

import Link from 'next/link';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  topic?: string;
  actionLink?: string;
  actionLabel?: string;
  timestamp: string;
}

const ACCENT = '#2dd4bf';
const VIOLET = '#a78bfa';

export const GuardianAI: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimised, setIsMinimised] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMessages([{
      id: 'msg-0',
      sender: 'ai',
      text: 'Hi! 👋 I\'m Guardian AI, trained on 150+ subsea telemetry prompts. Ask me about AUV drones, GIS maps, datasets, or how to use this platform!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);
  }, []);

  useEffect(() => {
    if (isOpen && !isMinimised) {
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    }
  }, [messages, isOpen, isMinimised]);

  useEffect(() => {
    if (isOpen && !isMinimised) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, isMinimised]);

  // Lock body scroll when open on mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    if (isOpen && !isMinimised && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, isMinimised]);

  const speakText = (text: string) => {
    if (soundEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text.replace(/[*#]/g, ''));
      u.rate = 1.0;
      window.speechSynthesis.speak(u);
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);
    setShowGuide(false);

    setTimeout(() => {
      const match = searchKnowledgeBase(text);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: match
          ? match.answer
          : `Scanning subsea index for "${text}"... Sector 4 Mid-Atlantic Ridge remains Critical (Health 38/100) — 45,000 particles/m³ microplastics detected. AUV DeepGuardian-Alpha patrolling.`,
        topic: match?.topic,
        actionLink: match?.actionLink,
        actionLabel: match?.actionLabel,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
      speakText(aiMsg.text);
    }, 600);
  };

  const quickChips = [
    'Hello 👋', 'Blue Whale 🐋', 'Leatherback Turtle 🐢', 'Deploy AUV Drone',
    'GIS Map', 'Download CSV', 'Sector 4 critical?', 'Coast Guard Line'
  ];

  const categories = [
    { name: '👋 Greetings', items: AI_KNOWLEDGE_BASE.filter(k => k.category === 'Greeting') },
    { name: '🚀 Getting Started', items: AI_KNOWLEDGE_BASE.filter(k => k.category === 'Getting Started') },
    { name: '🌊 AUV & GIS', items: AI_KNOWLEDGE_BASE.filter(k => k.category === 'AUV Swarm' || k.category === 'GIS & Map') },
    { name: '📊 Datasets', items: AI_KNOWLEDGE_BASE.filter(k => k.category === 'Datasets') },
    { name: '⚠️ Helplines', items: AI_KNOWLEDGE_BASE.filter(k => k.category === 'Helplines') },
  ];

  return (
    <>
      {/* ── Floating Trigger Button ── */}
      <button
        onClick={() => { setIsOpen(true); setIsMinimised(false); }}
        aria-label="Open Guardian AI Assistant"
        className="fixed bottom-20 right-4 lg:bottom-8 lg:right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-2xl ios-spring"
        style={{
          background: 'linear-gradient(135deg, rgba(4,8,20,0.92), rgba(8,14,28,0.92))',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${ACCENT}30`,
          boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px ${ACCENT}15`,
          display: isOpen ? 'none' : 'flex',
        }}
      >
        <div className="relative">
          <Bot className="w-5 h-5" style={{ color: ACCENT }} />
          <span
            className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full animate-ping"
            style={{ background: '#34d399' }}
          />
        </div>
        <span className="font-bold text-xs text-white/80 hidden sm:inline">Guardian AI</span>
      </button>

      {/* ── Chat Window ── */}
      {isOpen && (
        <>
          {/* Mobile full-screen backdrop */}
          <div
            className="fixed inset-0 z-[55] sm:hidden"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
            onClick={() => setIsOpen(false)}
          />

          <div
            className="fixed z-[60] flex flex-col overflow-hidden animate-bubble"
            style={{
              /* Mobile: full screen inset; Desktop: bottom-right panel */
              bottom: 'env(safe-area-inset-bottom, 0)',
              right: 0,
              left: 0,
              top: 0,
              borderRadius: 0,
              // Override for sm+ screens
              ...(typeof window !== 'undefined' && window.innerWidth >= 640
                ? {
                    bottom: 24,
                    right: 24,
                    left: 'auto',
                    top: 'auto',
                    width: 420,
                    height: isMinimised ? 64 : 580,
                    borderRadius: 24,
                  }
                : {}),
              background: 'rgba(4, 8, 20, 0.92)',
              backdropFilter: 'blur(40px) saturate(200%)',
              WebkitBackdropFilter: 'blur(40px) saturate(200%)',
              border: `1px solid ${ACCENT}18`,
              boxShadow: `0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px ${ACCENT}10`,
              transition: 'height 0.4s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 shrink-0"
              style={{ borderBottom: `1px solid rgba(255,255,255,0.06)` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-2xl flex items-center justify-center"
                  style={{ background: `${ACCENT}15`, border: `1px solid ${ACCENT}25` }}
                >
                  <Sparkles className="w-4 h-4 animate-pulse" style={{ color: ACCENT }} />
                </div>
                <div>
                  <h3 className="font-black text-sm text-white">Guardian AI</h3>
                  <p className="text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    150+ Subsea Prompts · Online
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Guide toggle */}
                <button
                  onClick={() => setShowGuide(!showGuide)}
                  className="p-2 rounded-xl ios-bubble"
                  style={{
                    background: showGuide ? `${VIOLET}20` : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${showGuide ? `${VIOLET}30` : 'rgba(255,255,255,0.06)'}`,
                    color: showGuide ? VIOLET : 'rgba(255,255,255,0.4)',
                  }}
                  title="Suggested Questions"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>

                {/* Sound toggle */}
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-2 rounded-xl ios-bubble"
                  style={{
                    background: soundEnabled ? 'rgba(52,211,153,0.12)' : 'rgba(255,255,255,0.04)',
                    color: soundEnabled ? '#34d399' : 'rgba(255,255,255,0.4)',
                  }}
                  title={soundEnabled ? 'Mute AI voice' : 'Enable AI voice'}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                {/* Minimise (desktop only) */}
                <button
                  onClick={() => setIsMinimised(!isMinimised)}
                  className="p-2 rounded-xl ios-bubble hidden sm:flex"
                  style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)' }}
                  title={isMinimised ? 'Expand' : 'Minimise'}
                >
                  {isMinimised ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>

                {/* Close */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl ios-bubble"
                  style={{ background: 'rgba(251,113,133,0.08)', border: '1px solid rgba(251,113,133,0.15)', color: '#fb7185' }}
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimised && (
              <>
                {/* Guide Drawer */}
                {showGuide && (
                  <div
                    className="p-3 max-h-48 overflow-y-auto space-y-3 animate-slide-up shrink-0"
                    style={{ borderBottom: `1px solid rgba(255,255,255,0.05)`, background: 'rgba(0,0,0,0.2)' }}
                  >
                    <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      Suggested Questions
                    </p>
                    {categories.map((cat, i) => (
                      <div key={i} className="space-y-1.5">
                        <span className="text-[9px] font-black uppercase tracking-widest block" style={{ color: 'rgba(255,255,255,0.25)' }}>
                          {cat.name}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {cat.items.map((item, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSendMessage(item.question)}
                              className="text-left px-2.5 py-1 rounded-xl text-[10px] font-medium ios-spring"
                              style={{
                                background: `${ACCENT}08`,
                                border: `1px solid ${ACCENT}18`,
                                color: `${ACCENT}cc`,
                              }}
                            >
                              {item.question}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Quick Chips */}
                <div
                  className="flex items-center gap-1.5 px-3 py-2 overflow-x-auto no-scrollbar shrink-0"
                  style={{ borderBottom: `1px solid rgba(255,255,255,0.04)` }}
                >
                  {quickChips.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(chip)}
                      className="whitespace-nowrap px-3 py-1.5 rounded-full text-[10px] font-bold ios-spring shrink-0"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: 'rgba(255,255,255,0.5)',
                      }}
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
                  {messages.map((msg, i) => (
                    <div
                      key={msg.id}
                      className={`flex gap-2.5 animate-slide-up ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      style={{ animationDelay: `${i * 0.02}s` }}
                    >
                      {msg.sender === 'ai' && (
                        <div
                          className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: `${ACCENT}15`, border: `1px solid ${ACCENT}25` }}
                        >
                          <Bot className="w-3.5 h-3.5" style={{ color: ACCENT }} />
                        </div>
                      )}
                      <div
                        className="max-w-[85%] p-3 rounded-2xl text-xs"
                        style={
                          msg.sender === 'user'
                            ? {
                                background: `linear-gradient(135deg, ${VIOLET}25, ${VIOLET}15)`,
                                border: `1px solid ${VIOLET}25`,
                                color: 'rgba(255,255,255,0.9)',
                                borderBottomRightRadius: 4,
                              }
                            : {
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                color: 'rgba(255,255,255,0.8)',
                                borderBottomLeftRadius: 4,
                              }
                        }
                      >
                        {msg.topic && (
                          <span
                            className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded block w-max mb-1.5"
                            style={{ background: `${ACCENT}15`, color: ACCENT }}
                          >
                            {msg.topic}
                          </span>
                        )}
                        <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                        {msg.actionLink && (
                          <Link
                            href={msg.actionLink}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-xl text-[10px] font-bold ios-spring"
                            style={{
                              background: `${ACCENT}18`,
                              border: `1px solid ${ACCENT}35`,
                              color: ACCENT,
                            }}
                          >
                            <span>{msg.actionLabel || 'Inspect Module'}</span>
                            <span>→</span>
                          </Link>
                        )}
                        <span className="text-[9px] block text-right mt-1.5 opacity-40 font-mono">
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-2.5 items-center">
                      <div
                        className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${ACCENT}15`, border: `1px solid ${ACCENT}25` }}
                      >
                        <Bot className="w-3.5 h-3.5" style={{ color: ACCENT }} />
                      </div>
                      <div
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full animate-bounce"
                            style={{ background: ACCENT, animationDelay: `${i * 0.15}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Input */}
                <div
                  className="px-3 py-3 flex items-center gap-2 shrink-0"
                  style={{ borderTop: `1px solid rgba(255,255,255,0.06)` }}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about AUV drones, maps, datasets..."
                    className="flex-1 px-4 py-2.5 rounded-2xl text-xs outline-none"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: `1px solid rgba(255,255,255,0.08)`,
                      color: 'rgba(255,255,255,0.85)',
                    }}
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim()}
                    className="w-10 h-10 rounded-2xl flex items-center justify-center ios-bubble shrink-0"
                    style={{
                      background: inputValue.trim()
                        ? `linear-gradient(135deg, ${ACCENT}, #06b6d4)`
                        : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${inputValue.trim() ? `${ACCENT}40` : 'rgba(255,255,255,0.06)'}`,
                      color: inputValue.trim() ? '#040d14' : 'rgba(255,255,255,0.2)',
                      boxShadow: inputValue.trim() ? `0 4px 14px ${ACCENT}30` : 'none',
                      transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                    }}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};
