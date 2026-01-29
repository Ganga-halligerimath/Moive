

import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../auth/authContext";

export default function Navbar({ onSearch }) {
  const {  user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  

 

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px",
        borderBottom: "1px solid #ccc",
        flexWrap: "wrap"
      }}
    >
      {/* Search bar only on movies page */}
      {location.pathname === "/movies" && (
        <input
          type="text"
          placeholder="Search movies..."
          onChange={(e) => onSearch && onSearch(e.target.value)}
          style={{ flex: 1, padding: "6px", borderRadius: "5px" }}
        />
      )}

   

      {/* Admin buttons */}
      {user?.role === "admin" && location.pathname === "/movies" && (
        <button
          onClick={() => navigate("/admin/add")}
          style={{
            padding: "6px 12px",
            borderRadius: "5px",
            cursor: "pointer",
            background: "#1976d2",
            color: "white",
            border: "none"
          }}
        >
          + Add Movie
        </button>
      )}

      {user?.role === "admin" && location.pathname === "/admin/add" && (
        <button
          onClick={() => navigate("/movies")}
          style={{
            padding: "6px 12px",
            borderRadius: "5px",
            background: "#2e7d32",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          🎬 Movies
        </button>
      )}

      {/* Logout */}
     
      {user && location.pathname !== "/login" && (
  <button
    onClick={handleLogout}
    style={{
      padding: "6px 12px",
      borderRadius: "5px",
      background: "#d32f2f",
      color: "white",
      border: "none",
      cursor: "pointer",
    }}
  >
    Logout
  </button>
)}

    </nav>
  );
}
