import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router";

const ProtectRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role))
    return <Navigate to="/" />;
  return children;
};

export default ProtectRoute;
