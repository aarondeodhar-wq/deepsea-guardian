'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, RefreshCw, Volume2, VolumeX, ShieldAlert, Cpu, CheckCircle2, Lock, HelpCircle, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { searchKnowledgeBase, AI_KNOWLEDGE_BASE, KnowledgeItem } from '@/lib/ai-knowledge-base';
import { useAuth } from '@/lib/auth-context';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  topic?: string;
  timestamp: string;
}

export const GuardianAI: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showGuideDrawer, setShowGuideDrawer] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        id: 'msg-0',
        sender: 'ai',
        text: 'Greetings! 👋 I am Guardian AI, trained over 150+ subsea telemetry prompts. Ask me any basic greeting, how to use the site, how to deploy AUV drones, or inspect GIS maps!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, []);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const speakText = (text: string) => {
    if (soundEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.replace(/[*#]/g, ''));
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);
    setShowGuideDrawer(false);

    setTimeout(() => {
      const match = searchKnowledgeBase(text);
      
      let aiResponseText = '';
      let matchTopic = '';

      if (match) {
        aiResponseText = match.answer;
        matchTopic = match.topic;
      } else {
        aiResponseText = `Diagnostic for "${text}": Sector 4 Mid-Atlantic Ridge remains at Critical Risk (Health 38/100) due to 45,000 particles/m³ polyethylene microplastics. AUV DeepGuardian-Alpha is actively patrolling.`;
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponseText,
        topic: matchTopic,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
      speakText(aiResponseText);
    }, 400);
  };

  const categories = [
    { name: '👋 Greetings', items: AI_KNOWLEDGE_BASE.filter(k => k.category === 'Greeting') },
    { name: '🚀 Getting Started', items: AI_KNOWLEDGE_BASE.filter(k => k.category === 'Getting Started') },
    { name: '🌊 AUV Drones & GIS', items: AI_KNOWLEDGE_BASE.filter(k => k.category === 'AUV Swarm' || k.category === 'GIS & Map') },
    { name: '📊 Datasets & Reports', items: AI_KNOWLEDGE_BASE.filter(k => k.category === 'Datasets') },
    { name: '⚠️ Helplines', items: AI_KNOWLEDGE_BASE.filter(k => k.category === 'Helplines') },
  ];

  return (
    <>
      {/* Floating Trigger Button - Matte Slate Charcoal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-5 lg:bottom-6 lg:right-6 z-40 px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 shadow-xl transition-all flex items-center gap-2.5 ios-spring"
        title="Open Guardian AI Assistant"
      >
        <div className="relative">
          <Bot className="w-5 h-5 text-slate-200 animate-pulse" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-900 animate-ping" />
        </div>
        <span className="font-bold text-xs tracking-wide hidden sm:inline">
          Guardian AI Assistant
        </span>
      </button>

      {/* Glassmorphism Chat Drawer Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 lg:bottom-20 lg:right-6 z-50 w-[94vw] sm:w-[460px] h-[580px] rounded-3xl glass-panel border border-slate-300 dark:border-slate-700 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          
          {/* Header */}
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-800 text-slate-300 border border-slate-700">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  Guardian AI Assistant
                </h3>
                <p className="text-[10px] text-slate-400 font-mono">Trained on 150+ Subsea Prompts</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowGuideDrawer(!showGuideDrawer)}
                className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 text-[10px] font-bold ${
                  showGuideDrawer ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white bg-slate-800'
                }`}
                title="View All Suggested Questions & Instructions"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Guide</span>
              </button>

              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-1.5 rounded-lg transition-colors ${
                  soundEnabled ? 'text-emerald-400 bg-slate-800' : 'text-slate-400 hover:text-white'
                }`}
                title={soundEnabled ? 'Mute AI Voice' : 'Enable AI Speech Output'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* EXPANDABLE ALL SUGGESTED QUESTIONS & INSTRUCTIONS GUIDE */}
          {showGuideDrawer && (
            <div className="p-4 bg-slate-900 border-b border-slate-800 max-h-[300px] overflow-y-auto space-y-3 text-xs animate-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-bold text-slate-200 text-xs">All Suggested Questions & Platform Guide</span>
                <button
                  onClick={() => setShowGuideDrawer(false)}
                  className="text-slate-400 hover:text-white text-[10px]"
                >
                  Close Guide ✕
                </button>
              </div>

              {categories.map((cat, i) => (
                <div key={i} className="space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                    {cat.name}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(item.question)}
                        className="text-left px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-300 text-[10px] transition-all font-medium border border-slate-700"
                      >
                        {item.question}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Prompt Chips (Top Carousel) */}
          <div className="p-2.5 bg-slate-950/80 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px]">
            {[
              'Hello / Hi',
              'What is DeepSea Guardian?',
              'Deploy AUV Swarm Drone',
              'How to download CSV/NetCDF?',
              'Why is Sector 4 critical?',
              'Coast Guard Helpline'
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 transition-all text-[10px] font-medium"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-slate-100/50 dark:bg-slate-950/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm border border-slate-700">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[86%] p-3.5 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-slate-800 text-white font-medium rounded-br-none shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.topic && (
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 block w-max mb-1">
                      TOPIC: {msg.topic.toUpperCase()}
                    </span>
                  )}
                  <p className="leading-relaxed text-xs whitespace-pre-line">{msg.text}</p>
                  <span className="text-[9px] block text-right mt-1.5 opacity-60 font-mono">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-slate-500 dark:text-slate-400 text-xs">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span className="font-mono text-[11px]">Searching subsea prompt index...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask hi, hello, drone deployment, GIS maps, datasets..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 text-xs focus:outline-none focus:border-slate-500 transition-all placeholder:text-slate-500"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim()}
              className="p-2.5 rounded-xl bg-slate-800 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700 transition-all shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
};
