import React, { ReactNode } from "react";

interface AdminCardProps {
  title: string;
  subtitle?: string;
  image?: string;
  imagePlaceholder?: ReactNode;
  status?: {
    label: string;
    variant: "success" | "warning" | "error" | "info";
  };
  actions: ReactNode;
  children?: ReactNode;
}

const AdminCard: React.FC<AdminCardProps> = ({
  title,
  subtitle,
  image,
  imagePlaceholder,
  status,
  actions,
  children,
}) => {
  const statusColors = {
    success:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    warning:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-shadow hover:shadow-lg">
      {/* Image */}
      {(image || imagePlaceholder) && (
        <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
              {imagePlaceholder}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-1 line-clamp-2">
          {title}
        </h3>

        {subtitle && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
            {subtitle}
          </p>
        )}

        {children}

        {/* Status and Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2 mt-4">
          <div className="flex flex-wrap gap-2 flex-1">{actions}</div>
          {status && (
            <span
              className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[status.variant]}`}
            >
              {status.label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
