import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  // No user → redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Role not allowed → redirect to login
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  // Allowed → show the component
  return children;
}

export default ProtectedRoute;

