import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
 
export const AuthContext = createContext(null);
 
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
 
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = jwtDecode(token);
      setCurrentUser(decodedUser);
    }
  }, []);
 
  const login = (token) => {
    localStorage.setItem('token', token);
    const decodedUser = jwtDecode(token);
    setCurrentUser(decodedUser);
  };
 
  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };
 
  const value = { currentUser, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};