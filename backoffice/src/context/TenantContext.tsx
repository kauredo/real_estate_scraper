import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  getCurrentTenant,
  getTenants,
  setSelectedTenantId as setApiTenantId,
} from "../services/api";
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

interface TenantOption {
  id: number;
  name: string;
  slug: string;
  domain: string;
}

interface TenantContextType {
  tenant: CurrentTenant | null;
  features: TenantFeatures | null;
  isLoading: boolean;
  refreshTenant: () => Promise<void>;
  // Super admin tenant filtering
  availableTenants: TenantOption[];
  selectedTenantId: number | null; // null means "All Tenants"
  setSelectedTenantId: (tenantId: number | null) => void;
  isSuperAdmin: boolean;
}

const TenantContext = createContext<TenantContextType | null>(null);

export const TenantProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading: authLoading, currentAdmin } = useAuth();
  const [tenant, setTenant] = useState<CurrentTenant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [availableTenants, setAvailableTenants] = useState<TenantOption[]>([]);

  // Load selected tenant from localStorage on mount
  const [selectedTenantId, setSelectedTenantId] = useState<number | null>(() => {
    const stored = localStorage.getItem("selectedTenantId");
    return stored ? parseInt(stored) : null;
  });

  const isSuperAdmin = currentAdmin?.isSuperAdmin === true;

  // Sync selected tenant ID with API and localStorage
  const handleSetSelectedTenantId = (tenantId: number | null) => {
    setSelectedTenantId(tenantId);
    setApiTenantId(tenantId);

    // Persist to localStorage
    if (tenantId === null) {
      localStorage.removeItem("selectedTenantId");
    } else {
      localStorage.setItem("selectedTenantId", tenantId.toString());
    }
  };

  // Set API tenant ID on mount if exists
  useEffect(() => {
    if (selectedTenantId !== null) {
      setApiTenantId(selectedTenantId);
    }
  }, []);

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

      // If super admin, fetch all tenants for filtering
      if (isSuperAdmin) {
        try {
          const tenantsResponse = await getTenants();
          setAvailableTenants(tenantsResponse.data.tenants);
        } catch (error) {
          console.error("Failed to fetch tenants:", error);
        }
      }
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
        availableTenants,
        selectedTenantId,
        setSelectedTenantId: handleSetSelectedTenantId,
        isSuperAdmin,
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
