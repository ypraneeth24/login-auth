import React, { useState, useEffect } from 'react';
import Register from './components/Register';
import OTPVerification from './components/OTPVerification';
import Login from './components/Login';
import Home from './components/Home';
import AuthSuccess from './components/AuthSuccess';
import GoogleRedirectHandler from './components/GoogleRedirectHandler';

const App = () => {
  const [page, setPage] = useState('register');
  const [emailForOtp, setEmailForOtp] = useState(null);

  useEffect(() => {
  const currentPath = window.location.pathname;

  if (currentPath === '/google') {
    setPage('google');
  } else if (currentPath === '/login') {
    setPage('login');
  }
}, []);

  const handleOtpSent = (email) => {
    setEmailForOtp(email);
    setPage('otp');
  };

  const handleVerified = () => setPage('login');
  const handleLogin = () => setPage('home');

  return (
    <>
      {page === 'register' && <Register onOtpSent={handleOtpSent} />}
      {page === 'otp' && <OTPVerification email={emailForOtp} onVerified={handleVerified} />}
      {page === 'login' && <Login onLogin={handleLogin} />}
      {page === 'home' && <Home />}
      {page === 'authsuccess' && <AuthSuccess onSuccess={() => setPage('login')} />}
      {page === 'google' && <GoogleRedirectHandler onLogin={handleLogin} />}
    </>
  );
};

export default App;
