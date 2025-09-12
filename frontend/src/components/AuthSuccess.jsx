import { useEffect } from 'react';

const AuthSuccess = ({ onSuccess }) => {
  useEffect(() => {
    // Simulate success or wait for actual verification
    const timer = setTimeout(() => {
      onSuccess(); // ✅ Navigate to login
    }, 2000); // Delay for UX, optional

    return () => clearTimeout(timer);
  }, [onSuccess]);

  return (
    <div>
      <h2>Authentication Successful!</h2>
      <p>Redirecting to login...</p>
    </div>
  );
};

export default AuthSuccess;