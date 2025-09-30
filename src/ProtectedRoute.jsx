// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("access"); // أو جيبها من Redux لو عندك
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
