import React from "react";

const ClubStorySkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-dark shadow-md border border-gray-200 dark:border-gray-700 rounded-lg w-full h-full flex flex-col animate-pulse">
      {/* Image skeleton */}
      <div className="w-full rounded-t-lg aspect-video bg-gray-300 dark:bg-gray-700"></div>

      {/* Content skeleton */}
      <div className="p-5 flex flex-col flex-grow space-y-4">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>

        {/* Sample text skeleton */}
        <div className="space-y-2 flex-grow">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
        </div>

        {/* Button skeleton */}
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
      </div>
    </div>
  );
};

export default ClubStorySkeleton;
