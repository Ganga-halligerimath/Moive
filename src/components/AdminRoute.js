import { useContext } from "react";
import { AuthContext } from "../auth/authContext";
import { Navigate } from "react-router-dom";



export default function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (user?.role !== "admin") {
    return <Navigate to="/movies" />;
  }
  
  return children;
}
