import React, { useState } from 'react';
import Register from './components/Register';
import OTPVerification from './components/OTPVerification';
import Login from './components/Login';
import Home from './components/Home';
import AuthSuccess from './components/AuthSuccess';
const App = () => {
  const [page, setPage] = useState('register');
  const [emailForOtp, setEmailForOtp] = useState(null);

  const handleOtpSent = (email) => {
    setEmailForOtp(email);
    setPage('otp');
  };

  const handleVerified = () => {
    setPage('login');
  };

  const handleLogin = () => {
    setPage('home');
  };

  return (
    <>
      {page === 'register' && <Register onOtpSent={handleOtpSent} />}
      {page === 'otp' && <OTPVerification email={emailForOtp} onVerified={handleVerified} />}
      {page === 'login' && <Login onLogin={handleLogin} />}
      {page === 'home' && <Home />}
      {page === 'authsuccess' && <AuthSuccess onSuccess={() => setPage('login')} />}
      
    </>
  );
};

export default App;
