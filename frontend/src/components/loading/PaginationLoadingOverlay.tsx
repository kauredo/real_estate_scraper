import React from "react";
import Spinner from "./Spinner";

const PaginationLoadingOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-white/70 dark:bg-black/70 flex items-center justify-center z-40 transition-opacity duration-200">
      <div className="flex flex-col items-center gap-3">
        <Spinner size="lg" />
        <p className="text-gray-600 dark:text-gray-400 text-sm">Loading...</p>
      </div>
    </div>
  );
};

export default PaginationLoadingOverlay;
