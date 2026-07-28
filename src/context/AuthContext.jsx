import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const MOCK_USER = {
  id: '1',
  firstName: 'Alex',
  lastName: 'Doe',
  email: 'alex.doe@nexus.com',
  phone: '+1 555 123 4567',
  avatar: 'AD',
  memberSince: '2023',
  tier: 'Premium',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for persisted session
    const stored = localStorage.getItem('nexus_auth');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API call delay
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password.length >= 6) {
          const userData = { ...MOCK_USER, email };
          setUser(userData);
          localStorage.setItem('nexus_auth', JSON.stringify(userData));
          setIsLoading(false);
          resolve(userData);
        } else {
          setIsLoading(false);
          reject(new Error('Invalid credentials. Password must be at least 6 characters.'));
        }
      }, 1200);
    });
  };

  const signup = async (firstName, lastName, email, password) => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password.length >= 6 && firstName && lastName) {
          const userData = {
            ...MOCK_USER,
            firstName,
            lastName,
            email,
            avatar: `${firstName[0]}${lastName[0]}`.toUpperCase(),
          };
          setUser(userData);
          localStorage.setItem('nexus_auth', JSON.stringify(userData));
          setIsLoading(false);
          resolve(userData);
        } else {
          setIsLoading(false);
          reject(new Error('Please fill all fields. Password must be at least 6 characters.'));
        }
      }, 1200);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nexus_auth');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
