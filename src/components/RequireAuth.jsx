import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function RequireAuth({ children }) {
  const token = useContext(AuthContext).token;

  // if no token, navi back to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
