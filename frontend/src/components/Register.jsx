import React, { useState } from "react";
import axios from "../api";
import "./Register.css"; // External CSS for styling
import Google from "../assets/google.png";
const Register = ({ onOtpSent }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post("/auth/register", { email, password });
      onOtpSent(email);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <h3 className="subtitle">Join us and get started</h3>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input-field"
        />

        <div className="button-stack">
          <button type="submit" className="register-button">
            Register
          </button>

          <button
            onClick={() =>
              window.open("http://localhost:5000/auth/google", "_self")
            }
            className="google-button"
            type="button"
          >
            <img src={Google} alt="Google logo" className="google-icon" />
            Login with Google
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}
        <p>
          Already an existing user?{" "}
          <span
            className="login-link"
            onClick={() => (window.location.pathname = "/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
