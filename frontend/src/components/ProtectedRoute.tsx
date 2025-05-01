import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Routes from "../utils/routes";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // You can replace this with a loading spinner component if you have one
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={Routes.auth.login} replace />;
  }

  return <>{children}</>;
}
