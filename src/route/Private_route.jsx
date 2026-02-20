import { useContext } from "react";
import { Authcontext } from "../context/Authcontext";
import { Navigate, Outlet } from "react-router-dom";

export function PrivateRoute() {
  const { user, loading } = useContext(Authcontext);

  // auth check hone tak kuch mat dikhao
  if (loading) return null;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}