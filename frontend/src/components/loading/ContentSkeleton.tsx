import React from "react";

const ContentSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      {/* Cards Section Skeleton */}
      <div className="container mx-auto px-4 py-16">
        <div className="space-y-16">
          {/* Geography Section 1 */}
          <div>
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-64 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-dark shadow-lg rounded-lg overflow-hidden"
                >
                  <div className="w-full h-64 bg-gray-300 dark:bg-gray-700" />
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full" />
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Geography Section 2 */}
          <div>
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-64 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-dark shadow-lg rounded-lg overflow-hidden"
                >
                  <div className="w-full h-64 bg-gray-300 dark:bg-gray-700" />
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full" />
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Section Skeleton */}
      <div className="bg-gray-100 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="text-center">
                <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-32 mx-auto mb-2" />
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-24 mx-auto" />
              </div>
            ))}
          </div>

          {/* Testimonials Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-dark p-6 rounded-lg shadow-lg"
              >
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2" />
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-4" />
                <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-32" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section Skeleton */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-64 mx-auto mb-4" />
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-96 mx-auto mb-8" />
          <div className="flex gap-4 max-w-md mx-auto">
            <div className="flex-1 h-12 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-12 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSkeleton;
