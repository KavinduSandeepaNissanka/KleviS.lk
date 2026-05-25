import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthService } from '../../services/api';

const ProtectedRoute = ({ children, requiredRole }) => {
  const user = AuthService.getCurrentUser();

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Logged in but not the right role
    return <Navigate to="/profile" replace />;
  }

  // Authorized
  return children;
};

export default ProtectedRoute;
