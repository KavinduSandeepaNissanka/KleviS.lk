import React, { createContext, useState, useEffect } from 'react';
import { AuthService } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(AuthService.getCurrentUser());

  // Function to refresh the user state manually (e.g. after login/logout)
  const refreshUser = () => {
    setUser(AuthService.getCurrentUser());
  };

  return (
    <AuthContext.Provider value={{ user, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
