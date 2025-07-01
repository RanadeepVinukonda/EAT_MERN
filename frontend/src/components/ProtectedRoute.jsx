import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const ProtectRoute = ({ children }) => {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectRoute;
