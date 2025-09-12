import { useEffect } from 'react';

const GoogleRedirectHandler = ({ onLogin }) => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token); // Store token
      onLogin(); // Move to home page
    } else {
      console.error("No token found in URL");
    }
  }, []);

  return <p>Logging you in via Google...</p>;
};

export default GoogleRedirectHandler;