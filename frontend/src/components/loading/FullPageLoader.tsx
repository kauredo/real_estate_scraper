import React from "react";
import Spinner from "./Spinner";
import mainLogo from "../../assets/logos/main.webp";
import mainWhiteLogo from "../../assets/logos/main_white.webp";

interface FullPageLoaderProps {
  message?: string;
}

const FullPageLoader: React.FC<FullPageLoaderProps> = ({ message }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-black z-50">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <img src={mainLogo} alt="Logo" className="h-20 w-auto dark:hidden" />
          <img
            src={mainWhiteLogo}
            alt="Logo"
            className="h-20 w-auto hidden dark:block"
          />

          {/* Spinner */}
          <Spinner size="lg" />
        </div>
        {/* Optional message */}
        {message && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default FullPageLoader;
