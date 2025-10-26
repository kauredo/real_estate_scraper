import React from "react";

const ListingSkeleton: React.FC = () => {
  return (
    <div className="w-full lg:w-1/2 max-w-7xl mx-auto px-4 my-8">
      <div className="md:h-80 relative m-0 shadow-lg flex flex-col sm:flex-row bg-white dark:bg-dark dark:border-beige-medium dark:border-2 animate-pulse">
        {/* Image skeleton */}
        <div className="relative flex-no-shrink w-full sm:w-1/3">
          <div className="w-full h-56 md:h-full bg-gray-300 dark:bg-gray-700"></div>
        </div>

        {/* Content skeleton */}
        <div className="flex-1 relative w-full md:w-2/3 p-6 flex flex-col space-y-4">
          {/* Title skeleton */}
          <div className="h-7 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>

          {/* Description skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
          </div>

          {/* Icons skeleton */}
          <div className="flex space-x-4 mt-auto">
            <div className="h-5 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-5 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-5 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingSkeleton;
