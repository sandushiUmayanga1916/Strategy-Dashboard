import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state to prevent flash redirect

  useEffect(() => {
    const checkToken = () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (token) {
        try {
          // Decode JWT to get user info
          const base64Url = token.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
              .join("")
          );
          const userData = JSON.parse(jsonPayload);

          // Save token and user in localStorage
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(userData));
          setUser(userData);
        } catch (err) {
          console.error("JWT decode error:", err);
        } finally {
          // Remove token from URL after setting user
          window.history.replaceState({}, document.title, "/dashboard");
          setLoading(false);
        }
      } else {
        // Fallback: check localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  if (loading) return <div className="text-white text-center mt-20">Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/dashboard"
          element={user ? <Layout user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
