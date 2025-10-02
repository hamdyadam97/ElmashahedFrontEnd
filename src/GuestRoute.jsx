// src/GuestRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const GuestRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user); // أو token حسب حالتك

  if (user) {
    // لو المستخدم مسجل دخول، يرجع للصفحة الرئيسية
    return <Navigate to="/" replace />;
  }

  return children;
};

export default GuestRoute;
