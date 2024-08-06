import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDashboard } from "../store/cars-context";

const ProtectedRoute: React.FC = () => {
  const { status } = useDashboard();

  if (status === 401) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
