import React from "react";

const BlogPostSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-dark shadow-md border border-gray-200 rounded-lg max-w-sm w-96 mb-5 mx-auto animate-pulse">
      {/* Image skeleton */}
      <div className="w-full rounded-t-lg aspect-video bg-gray-300 dark:bg-gray-700"></div>

      {/* Content skeleton */}
      <div className="p-5 space-y-4">
        {/* Title skeleton */}
        <div className="h-7 bg-gray-300 dark:bg-gray-700 rounded w-4/5"></div>

        {/* Sample text skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        </div>

        {/* Button skeleton */}
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
      </div>
    </div>
  );
};

export default BlogPostSkeleton;
