import React, { createContext, useContext, useEffect, useState } from "react";

// إنشاء السياق
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // تحميل المستخدم من localStorage عند تشغيل التطبيق
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // تسجيل الدخول
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // تسجيل الخروج
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// hook مخصص للاستخدام
export const useAuth = () => useContext(AuthContext);
