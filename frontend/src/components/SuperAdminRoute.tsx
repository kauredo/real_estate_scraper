import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface SuperAdminRouteProps {
  children: React.ReactNode;
}

const SuperAdminRoute = ({ children }: SuperAdminRouteProps) => {
  const { currentAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentAdmin?.isSuperAdmin) {
    return <Navigate to="/backoffice" replace />;
  }

  return <>{children}</>;
};

export default SuperAdminRoute;
