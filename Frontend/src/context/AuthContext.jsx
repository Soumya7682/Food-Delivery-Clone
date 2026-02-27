import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    try {
      const stored = localStorage.getItem('auth');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    if (auth) {
      localStorage.setItem('auth', JSON.stringify(auth));
    } else {
      localStorage.removeItem('auth');
    }
  }, [auth]);

  const logout = async () => {
    try {
      // attempt to clear cookie on server; endpoint varies depending on type
      if (auth?.type === 'foodPartner') {
        await axios.get('/api/auth/food-partner/logout');
      } else if (auth?.type === 'user') {
        await axios.get('/api/auth/user/logout');
      }
    } catch (e) {
      // ignore
    }
    setAuth(null);
  };

  const value = { auth, setAuth, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};
