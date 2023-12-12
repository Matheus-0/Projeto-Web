/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }: any) => {
  const userTokenData = localStorage.getItem("userTokenData");

  if (!userTokenData) {
    return <Navigate to="/" />;
  }

  return children;
};

export const RequireNoAuth = ({ children }: any) => {
  const userTokenData = localStorage.getItem("userTokenData");

  if (userTokenData) {
    return <Navigate to="/tasks" />;
  }

  return children;
};
