import React, { ReactNode } from "react";

export type BadgeVariant = "success" | "warning" | "error" | "info" | "neutral";
export type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  variant = "neutral",
  size = "md",
  children,
  className = "",
  icon,
}) => {
  const baseStyles =
    "inline-flex items-center font-medium rounded-full whitespace-nowrap";

  const variantStyles = {
    success:
      "bg-success-100 text-success-600 dark:bg-success-500/20 dark:text-success-500",
    warning:
      "bg-warning-100 text-warning-600 dark:bg-warning-500/20 dark:text-warning-500",
    error: "bg-error-100 text-error-600 dark:bg-error-500/20 dark:text-error-500",
    info: "bg-primary-100 text-primary-700 dark:bg-primary-500/20 dark:text-primary-400",
    neutral: "bg-neutral-100 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-2.5 py-1 text-sm gap-1.5",
    lg: "px-3 py-1.5 text-base gap-2",
  };

  return (
    <span
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;
