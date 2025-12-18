import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  login as apiLogin,
  logout as apiLogout,
  getCurrentUser,
} from "../services/api";

interface CurrentAdmin {
  id: number;
  email: string;
  isSuperAdmin: boolean;
  tenantId: number | null;
  isAuthenticated: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  currentAdmin: CurrentAdmin | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState<CurrentAdmin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const user = getCurrentUser();
      setIsAuthenticated(!!user);
      setCurrentAdmin(user);
    } catch {
      setError("Failed to check authentication status");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const response = await apiLogin(email, password);
      const user = getCurrentUser();
      setIsAuthenticated(true);
      setCurrentAdmin(user);
      return response;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: string } } };
      setError(error.response?.data?.error || "Failed to login");
      throw err;
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
      setIsAuthenticated(false);
      setCurrentAdmin(null);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: string } } };
      setError(error.response?.data?.error || "Failed to logout");
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, currentAdmin, login, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
