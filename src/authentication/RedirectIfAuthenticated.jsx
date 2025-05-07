import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./Auth";

const RedirectIfAuthenticated = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }
  console.log(location.state);
  return children;
};

export default RedirectIfAuthenticated;
