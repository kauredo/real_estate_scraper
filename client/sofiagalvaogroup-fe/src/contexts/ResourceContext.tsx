import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface Resource {
  path: string;
  name: string;
}

const ResourceContext = createContext<{
  resource: Resource | null;
  setResource: React.Dispatch<React.SetStateAction<Resource | null>>;
}>({
  resource: null,
  setResource: () => {}, // Placeholder function
});

export const useResource = () => useContext(ResourceContext);

export const ResourceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [resource, setResource] = useState<Resource | null>(null);
  const location = useLocation();

  useEffect(() => {
    setResource(null);
  }, [location]);

  return (
    <ResourceContext.Provider value={{ resource, setResource }}>
      {children}
    </ResourceContext.Provider>
  );
};
