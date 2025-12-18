import React from "react";

const DetailPageSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      {/* Hero image skeleton */}
      <div className="w-full h-96 bg-gray-300 dark:bg-gray-700 rounded-lg mb-8"></div>

      {/* Content container */}
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Title skeleton */}
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>

        {/* Metadata skeleton (date, author, etc) */}
        <div className="flex space-x-4">
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
        </div>

        {/* Content paragraphs skeleton */}
        <div className="space-y-4 mt-8">
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
          </div>

          <div className="space-y-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/5"></div>
          </div>

          <div className="space-y-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPageSkeleton;
