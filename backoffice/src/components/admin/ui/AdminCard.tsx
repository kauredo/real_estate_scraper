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
      "bg-success-100 text-success-600 dark:bg-success-500/20 dark:text-success-500",
    warning:
      "bg-warning-100 text-warning-600 dark:bg-warning-500/20 dark:text-warning-500",
    error: "bg-error-100 text-error-600 dark:bg-error-500/20 dark:text-error-500",
    info: "bg-primary-100 text-primary-700 dark:bg-primary-500/20 dark:text-primary-400",
  };

  return (
    <div className="bg-white dark:bg-neutral-800 shadow-sm border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden transition-shadow hover:shadow-md">
      {/* Image */}
      {(image || imagePlaceholder) && (
        <div className="w-full h-48 bg-neutral-100 dark:bg-neutral-700 overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-400 dark:text-neutral-500">
              {imagePlaceholder}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <h3 className="text-neutral-900 dark:text-white font-bold text-lg mb-1 line-clamp-2">
          {title}
        </h3>

        {subtitle && (
          <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3 line-clamp-3 max-h-16 overflow-hidden">
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
