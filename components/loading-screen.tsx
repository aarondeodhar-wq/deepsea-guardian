'use client';

import React, { useState, useEffect } from 'react';

export const LoadingScreen: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-800 overflow-hidden pointer-events-none">
      <div className="h-full bg-gradient-to-r from-sky-500 via-emerald-400 to-sky-400 w-full animate-pulse" />
    </div>
  );
};
