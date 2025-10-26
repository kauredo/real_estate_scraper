import React from "react";

const ListingComplexSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 my-8">
      <div className="relative m-0 shadow-lg flex flex-col md:flex-row bg-white dark:bg-dark animate-pulse">
        {/* Image skeleton */}
        <div className="flex-no-shrink w-full md:w-1/3">
          <div className="w-full h-64 md:h-full bg-gray-300 dark:bg-gray-700"></div>
        </div>

        {/* Content skeleton */}
        <div className="flex-1 relative w-full md:w-2/3">
          <div className="p-6 space-y-4">
            {/* Title skeleton */}
            <div className="h-7 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>

            {/* Description skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingComplexSkeleton;
