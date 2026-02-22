import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('abhyuday_admin') === 'true');

  const login = (email: string, password: string) => {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();
    if (trimmedEmail === 'admin@abhyuday.com' && trimmedPassword === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('abhyuday_admin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('abhyuday_admin');
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
