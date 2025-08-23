import { Navigate, Outlet } from "react-router";

import { useAuthContext } from "@/context/auth-context";
import { useAutoRefresh } from "@/hooks/use-auto-refresh";

export const ProtectedRoute = () => {
  useAutoRefresh();
  const isAuth = useAuthContext();
  return isAuth.token ? <Outlet /> : <Navigate to="/login" replace />;
};

export const GuestRoute = () => {
  const isAuth = useAuthContext();
  return !isAuth.token ? <Outlet /> : <Navigate to="/dashboard" replace />;
};
