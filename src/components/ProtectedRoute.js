// ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/authContext";

export default function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    // not logged in
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    // not admin
    return <Navigate to="/" replace />;
  }

  return children; // admin can access
}
