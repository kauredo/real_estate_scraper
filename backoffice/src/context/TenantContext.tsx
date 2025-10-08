import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getCurrentTenant } from "../services/api";
import { useAuth } from "./AuthContext";

interface TenantFeatures {
  blog_enabled: boolean;
  club_enabled: boolean;
  testimonials_enabled: boolean;
  newsletter_enabled: boolean;
  listing_complexes_enabled: boolean;
}

interface CurrentTenant {
  id: number | null;
  name: string;
  slug: string;
  domain?: string;
  features: TenantFeatures;
}

interface TenantContextType {
  tenant: CurrentTenant | null;
  features: TenantFeatures | null;
  isLoading: boolean;
  refreshTenant: () => Promise<void>;
}

const TenantContext = createContext<TenantContextType | null>(null);

export const TenantProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [tenant, setTenant] = useState<CurrentTenant | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTenant = async () => {
    if (!isAuthenticated) {
      setTenant(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await getCurrentTenant();
      setTenant(response.data.tenant);
    } catch (error) {
      console.error("Failed to fetch tenant:", error);
      setTenant(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      fetchTenant();
    }
  }, [isAuthenticated, authLoading]);

  return (
    <TenantContext.Provider
      value={{
        tenant,
        features: tenant?.features || null,
        isLoading,
        refreshTenant: fetchTenant,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error("useTenant must be used within a TenantProvider");
  }
  return context;
};
