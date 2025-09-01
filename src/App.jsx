import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Layout from "./components/Layout";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1])); // decode JWT
      setUser({ name: payload.name, email: payload.email });
    }
  }, []);

  const handleLoginSuccess = (jwtToken) => {
    console.log("JWT Token:", jwtToken); // optional
    localStorage.setItem("token", jwtToken);

    // decode token payload
    const payload = JSON.parse(atob(jwtToken.split(".")[1]));
    setUser({ name: payload.name, email: payload.email });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <div>
      {user ? (
        <Layout user={user} onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}
