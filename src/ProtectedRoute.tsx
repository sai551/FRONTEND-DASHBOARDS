// src/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import NotAuthorized from "./pages/Login/NotFound"
import { roleRoutes } from "./pages/Login";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    const role = decoded.role;

    if (!allowedRoles.includes(role)) {
      // ✅ Show NotAuthorized page instead of redirect
      return <NotAuthorized />;
    }

    return children;
  } catch {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
