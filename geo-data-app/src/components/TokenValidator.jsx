// TokenValidator.jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validateToken } from '../services/api';

const TokenValidator = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null: loading state
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await validateToken(); // Call your validation API
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Token is invalid or expired:", error);
          localStorage.removeItem('token'); // Clear invalid token
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkToken();
  }, []);

  // Redirect to login only if isAuthenticated is explicitly false
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Show loading indicator while checking authentication
  if (isAuthenticated === null) return <div>Loading...</div>;

  // Render children if authenticated, otherwise show "Please Login or Register"
  return isAuthenticated ? children : <div>Please <Link to='login'>Login</Link> or <Link to='/register'>Register</Link></div>;
};

export default TokenValidator;