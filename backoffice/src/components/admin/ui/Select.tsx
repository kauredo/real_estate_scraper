/* eslint-disable no-restricted-syntax */
import React, { SelectHTMLAttributes, forwardRef } from "react";

export type SelectVariant = "default" | "error" | "success";
export type SelectSize = "sm" | "md" | "lg";

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string | React.ReactNode;
  helperText?: string;
  errorMessage?: string;
  variant?: SelectVariant;
  selectSize?: SelectSize;
  options?: SelectOption[];
  placeholder?: string;
  children?: React.ReactNode;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      variant = "default",
      selectSize = "md",
      options,
      placeholder,
      className = "",
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "w-full rounded-lg border transition-colors focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-gray-800 appearance-none";

    const variantStyles = {
      default:
        "border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500",
      error:
        "border-red-500 dark:border-red-500 focus:border-red-500 focus:ring-red-500",
      success:
        "border-green-500 dark:border-green-500 focus:border-green-500 focus:ring-green-500",
    };

    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm pr-10",
      md: "px-4 py-2 text-base pr-10",
      lg: "px-5 py-3 text-lg pr-12",
    };

    const displayVariant = errorMessage ? "error" : variant;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            {label}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            className={`${baseStyles} ${variantStyles[displayVariant]} ${sizeStyles[selectSize]} ${className} text-gray-900 dark:text-gray-100`}
            disabled={disabled}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options
              ? options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </option>
                ))
              : children}
          </select>

          {/* Custom dropdown arrow */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 dark:text-gray-500">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {errorMessage && (
          <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
            {errorMessage}
          </p>
        )}

        {!errorMessage && helperText && (
          <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
