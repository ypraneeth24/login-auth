import React, { useState } from "react";
import axios from "../api";
import "./Register.css";

const AdminRegister = ({ onRegistered }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post("/auth/admin/register", { email, password });
      onRegistered(); // Redirect to admin login
    } catch (err) {
      setError(err.response?.data?.message || "Admin registration failed");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Admin Registration</h2>
        <h3 className="subtitle">Create an admin account</h3>

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

        <button type="submit" className="register-button">Register as Admin</button>

        {error && <p className="error-message">{error}</p>}
        <p>
          Already an admin?{" "}
          <span
            className="login-link"
            onClick={() => (window.location.pathname = "/admin-login")}
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};

export default AdminRegister;