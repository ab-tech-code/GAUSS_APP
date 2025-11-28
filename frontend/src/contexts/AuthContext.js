// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [vendor, setVendor] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const savedVendor = localStorage.getItem("vendor");
    if (savedVendor) {
      setVendor(JSON.parse(savedVendor));
    }

    setLoading(false);
  }, [token]);

  const login = (vendorData, accessToken) => {
    setVendor(vendorData);
    setToken(accessToken);

    localStorage.setItem("vendor", JSON.stringify(vendorData));
    localStorage.setItem("token", accessToken);
  };

  const logout = () => {
    setVendor(null);
    setToken(null);
    localStorage.removeItem("vendor");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ vendor, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
