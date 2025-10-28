import React from "react";
import Spinner from "./Spinner";
import mainLogo from "../../assets/logos/main.webp";
import mainWhiteLogo from "../../assets/logos/main_white.webp";

interface ListingsLoadingOverlayProps {
  isLoading: boolean;
}

const ListingsLoadingOverlay: React.FC<ListingsLoadingOverlayProps> = ({
  isLoading,
}) => {
  if (!isLoading) return null;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-white/70 dark:bg-black/70 backdrop-blur-sm">
      <div className="flex items-center gap-6 animate-pulse">
        {/* Logo */}
        <img
          src={mainLogo}
          alt="Loading"
          className="h-16 w-auto dark:hidden opacity-80"
        />
        <img
          src={mainWhiteLogo}
          alt="Loading"
          className="h-16 w-auto hidden dark:block opacity-80"
        />

        {/* Spinner */}
        <Spinner size="lg" />
      </div>
    </div>
  );
};

export default ListingsLoadingOverlay;
