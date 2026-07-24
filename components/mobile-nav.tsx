'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MapPin, Eye, Bell, User, TrendingUp } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export const MobileNav: React.FC = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  const mobileTabs = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/map', label: 'GIS Map', icon: MapPin },
    { href: '/predictive-map', label: 'Risk USP', icon: TrendingUp },
    { href: '/ai-detection', label: 'AI Vision', icon: Eye },
    { href: '/alerts', label: 'Alerts', icon: Bell },
    { href: '/login', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden glass-panel border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-around">
        {mobileTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-2xl text-[10px] font-semibold transition-all ios-spring ${
                isActive
                  ? 'text-cyan-600 dark:text-cyan-300 bg-cyan-500/15 border border-cyan-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-cyan-500'
              }`}
            >
              <div className="relative">
                <Icon className="w-4 h-4" />
                {isActive && (
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-cyan-400" />
                )}
              </div>
              <span className="truncate max-w-[50px]">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
