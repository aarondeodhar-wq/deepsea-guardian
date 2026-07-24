'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'Researcher' | 'Conservation Organization' | 'Administrator';

export interface UserProfile {
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  organization: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Start as null — user must explicitly sign in
  const [user, setUser] = useState<UserProfile | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only restore from localStorage — no default user
    const savedUser = localStorage.getItem('deepsea_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse saved user state', e);
        localStorage.removeItem('deepsea_user');
      }
    }
    setMounted(true);
  }, []);

  const login = (email: string, role: UserRole) => {
    const firstName = email.split('@')[0].replace(/[._]/g, ' ');
    const formattedName = firstName
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    const newUser: UserProfile = {
      name: formattedName || 'Ocean Researcher',
      email,
      role,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(formattedName)}&backgroundColor=0f172a&textColor=64ffda`,
      organization:
        role === 'Administrator'
          ? 'Global Ocean Security HQ'
          : role === 'Conservation Organization'
          ? 'Ocean Conservation Alliance'
          : 'Oceanic Research Initiative',
    };
    setUser(newUser);
    localStorage.setItem('deepsea_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('deepsea_user');
  };

  const switchRole = (role: UserRole) => {
    if (user) {
      const updated = { ...user, role };
      setUser(updated);
      localStorage.setItem('deepsea_user', JSON.stringify(updated));
    }
  };

  // Prevent SSR mismatch
  if (!mounted) {
    return (
      <AuthContext.Provider value={{ user: null, isLoggedIn: false, login, logout, switchRole }}>
        {children}
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
