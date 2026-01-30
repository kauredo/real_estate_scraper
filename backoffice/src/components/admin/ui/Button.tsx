/* eslint-disable no-restricted-syntax */
import React, { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "ghost"
  | "link"
  | "warm";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = "",
  disabled,
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary:
      "bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500 dark:bg-primary-600 dark:hover:bg-primary-700",
    secondary:
      "bg-neutral-100 hover:bg-neutral-200 text-neutral-800 focus:ring-neutral-400 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-100",
    danger:
      "bg-error-600 hover:bg-error-500 text-white focus:ring-error-500 dark:bg-error-600 dark:hover:bg-error-500",
    ghost:
      "bg-transparent hover:bg-neutral-100 text-neutral-700 focus:ring-neutral-400 dark:hover:bg-neutral-800 dark:text-neutral-300",
    link: "bg-transparent underline text-primary-600 hover:text-primary-800 focus:ring-primary-500 dark:text-primary-400 dark:hover:text-primary-300",
    warm: "bg-warm-500 hover:bg-warm-600 text-white focus:ring-warm-400 dark:bg-warm-600 dark:hover:bg-warm-500",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2 text-base gap-2",
    lg: "px-6 py-3 text-lg gap-2.5",
  };

  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!isLoading && leftIcon && <span>{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span>{rightIcon}</span>}
    </button>
  );
};

export default Button;
