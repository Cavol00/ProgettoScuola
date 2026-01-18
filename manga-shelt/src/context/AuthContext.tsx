// pagina che gestisce l'autenticazione (login e registrazione).


import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Al caricamento, controlliamo se c'è un utente salvato nel browser
  useEffect(() => {
    const savedUser = localStorage.getItem('mangaUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch(`http://localhost:3001/users?email=${email}&password=${password}`);
    const users = await res.json();

    if (users.length > 0) {
      const loggedUser = users[0];
      setUser(loggedUser);
      localStorage.setItem('mangaUser', JSON.stringify(loggedUser)); // Salviamo nel browser
    } else {
      alert('Email o password errati!');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    const checkRes = await fetch(`http://localhost:3001/users?email=${email}`);
    const existingUsers = await checkRes.json();

    if (existingUsers.length > 0) {
      alert('Questa email è già registrata!');
      return;
    }

    const newUser = { name, email, password, id: crypto.randomUUID() };
    
    await fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });

    setUser(newUser);
    localStorage.setItem('mangaUser', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mangaUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}