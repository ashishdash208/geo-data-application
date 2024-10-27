import { Navigate } from 'react-router-dom';
import TokenValidator from './TokenValidator';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if the user has a token

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Otherwise, render the children
  return <>
    <TokenValidator>
      {children}
    </TokenValidator>
  </>;
};

export default ProtectedRoute;
