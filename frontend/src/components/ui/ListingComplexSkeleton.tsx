import React from "react";

const ListingComplexSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-pulse">
      {/* Image skeleton - 16:9 aspect ratio */}
      <div className="relative pb-[56.25%]">
        <div className="absolute inset-0 w-full h-full bg-gray-300 dark:bg-gray-700"></div>
      </div>

      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>

        {/* Location skeleton */}
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>

        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        </div>

        {/* Price skeleton */}
        <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
      </div>
    </div>
  );
};

export default ListingComplexSkeleton;
