/* eslint-disable no-restricted-syntax */
import React, { InputHTMLAttributes, forwardRef } from "react";

export type InputVariant = "default" | "error" | "success";
export type InputSize = "sm" | "md" | "lg";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  variant?: InputVariant;
  inputSize?: InputSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      variant = "default",
      inputSize = "md",
      leftIcon,
      rightIcon,
      className = "",
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "w-full rounded-lg border transition-colors focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-neutral-800";

    const variantStyles = {
      default:
        "border-neutral-300 dark:border-neutral-600 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500",
      error:
        "border-error-500 dark:border-error-500 focus:border-error-500 focus:ring-error-500",
      success:
        "border-success-500 dark:border-success-500 focus:border-success-500 focus:ring-success-500",
    };

    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-5 py-3 text-lg",
    };

    const paddingWithIcons = leftIcon ? "pl-10" : rightIcon ? "pr-10" : "";

    const displayVariant = errorMessage ? "error" : variant;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            className={`${baseStyles} ${variantStyles[displayVariant]} ${sizeStyles[inputSize]} ${paddingWithIcons} ${className} text-neutral-900 dark:text-neutral-100`}
            disabled={disabled}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500">
              {rightIcon}
            </div>
          )}
        </div>

        {errorMessage && (
          <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
            {errorMessage}
          </p>
        )}

        {!errorMessage && helperText && (
          <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
