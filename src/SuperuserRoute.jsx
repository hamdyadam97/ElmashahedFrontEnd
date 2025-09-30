import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

const SuperuserRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />; // لو مش داخل أصلاً
  }

  if (!user.is_superuser) {
    return <Navigate to="/" replace />; // لو مش superuser
  }

  return children;
};

export default SuperuserRoute;
