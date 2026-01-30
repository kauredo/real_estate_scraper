import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AdminPageHeaderProps {
  title: string;
  subtitle?: string;
  count?: number;
  countLabel?: string;
  actionButton?: {
    label: string;
    href: string;
  };
  children?: ReactNode;
}

const AdminPageHeader: React.FC<AdminPageHeaderProps> = ({
  title,
  subtitle,
  count,
  countLabel,
  actionButton,
  children,
}) => {
  return (
    <div className="mb-6 space-y-4">
      {/* Action Button Row */}
      {actionButton && (
        <div className="flex justify-between items-center">
          <Link
            to={actionButton.href}
            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            {actionButton.label}
          </Link>
        </div>
      )}

      {/* Title and Count */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-neutral-600 dark:text-neutral-400">
            {subtitle}
          </p>
        )}
        {count !== undefined && countLabel && (
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            {countLabel.replace("{count}", count.toString())}
          </p>
        )}
      </div>

      {/* Optional children (filters, search, etc.) */}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default AdminPageHeader;
