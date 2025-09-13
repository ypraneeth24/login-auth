import React, { useState, useEffect } from "react";
import Register from "./components/Register";
import OTPVerification from "./components/OTPVerification";
import Login from "./components/Login";
import Home from "./components/Home";
import AuthSuccess from "./components/AuthSuccess";
import GoogleRedirectHandler from "./components/GoogleRedirectHandler";
import AdminRegister from "./components/AdminRegister";
import AdminLogin from "./components/AdminLogin";

const App = () => {
  const [page, setPage] = useState("register");
  const [emailForOtp, setEmailForOtp] = useState(null);

  useEffect(() => {
    const currentPath = window.location.pathname;

    if (currentPath === "/google") {
      setPage("google");
    } else if (currentPath === "/login") {
      setPage("login");
    } else if (currentPath === "/admin-register") {
      setPage("admin-register");
    } else if (currentPath === "/admin-login") {
      setPage("admin-login");
    }
  }, []);

  const handleOtpSent = (email) => {
    setEmailForOtp(email);
    setPage("otp");
  };

  const handleVerified = () => setPage("login");
  const handleLogin = () => setPage("home");

  return (
    <>
      {page === "register" && <Register onOtpSent={handleOtpSent} />}
      {page === "otp" && (
        <OTPVerification email={emailForOtp} onVerified={handleVerified} />
      )}
      {page === "login" && <Login onLogin={handleLogin} />}
      {page === "home" && <Home />}
      {page === "authsuccess" && (
        <AuthSuccess onSuccess={() => setPage("login")} />
      )}
      {page === "google" && <GoogleRedirectHandler onLogin={handleLogin} />}
      {page === 'admin-register' && <AdminRegister onRegistered={() => setPage('admin-login')} />}
      {page === 'admin-login' && <AdminLogin onLogin={() => setPage('home')} />}
    </>
  );
};

export default App;
