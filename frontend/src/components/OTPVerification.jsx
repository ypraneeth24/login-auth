import React, { useState } from "react";
import axios from "../api";
import "./OTPVerification.css"; // External CSS for styling

const OTPVerification = ({ email, onVerified }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/auth/verify-otp", { email, otp });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);

        const dashboardRes = await axios.get("/api/dashboard", {
          headers: {
            Authorization: `Bearer ${response.data.token}`,
          },
        });
        console.log("Dashboard:", dashboardRes.data);
      }

      onVerified();
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="otp-container">
      <h2 className="otp-title">Verify Your Email</h2>
      <form className="otp-form" onSubmit={handleVerify}>
        <input
          type="text"
          className="otp-input"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit" className="otp-button">
          Verify OTP
        </button>
        {error && <p className="otp-error">{error}</p>}
      </form>
    </div>
  );
};

export default OTPVerification;