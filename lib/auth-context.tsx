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
  const [user, setUser] = useState<UserProfile | null>({
    name: 'Dr. Elena Rostova',
    email: 'elena.rostova@ocean-guardians.org',
    role: 'Researcher',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    organization: 'Deep Ocean Conservation Initiative'
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('deepsea_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse saved user state', e);
      }
    }
  }, []);

  const login = (email: string, role: UserRole) => {
    const newUser: UserProfile = {
      name: email.split('@')[0].replace('.', ' ').toUpperCase() || 'Commander Sea',
      email,
      role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      organization: role === 'Administrator' ? 'Global Ocean Security HQ' : 'Oceanic Research Alliance'
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
