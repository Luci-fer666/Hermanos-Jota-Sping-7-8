import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
 
// 1. Crear el Contexto
export const AuthContext = createContext(null);
 
// 2. Crear el componente Proveedor
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
 
  // La lógica que antes estaba en App.js ahora vive aquí
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedUser = jwtDecode(token);
      setCurrentUser(decodedUser);
    }
  }, []);
 
  const login = (token) => {
    localStorage.setItem('authToken', token);
    const decodedUser = jwtDecode(token);
    setCurrentUser(decodedUser);
  };
 
  const logout = () => {
    localStorage.removeItem('authToken');
    setCurrentUser(null);
  };
 
  // 3. Pasamos el estado y las funciones a través del 'value' del Provider
  const value = { currentUser, login, logout };
 
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};