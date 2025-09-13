import React, { useState } from "react";
import axios from "../api";
import "./Login.css";

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/auth/admin/login", { email, password });
      localStorage.setItem("token", res.data.token);
      onLogin(); // Redirect to admin dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Admin login failed");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        <p className="subtitle">Access your admin dashboard</p>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input-field"
        />

        <button type="submit" className="login-button">Login as Admin</button>

        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;