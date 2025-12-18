/* eslint-disable no-restricted-syntax */
import { TextareaHTMLAttributes, forwardRef } from "react";

export type TextareaVariant = "default" | "error" | "success";
export type TextareaSize = "sm" | "md" | "lg";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  variant?: TextareaVariant;
  textareaSize?: TextareaSize;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      variant = "default",
      textareaSize = "md",
      className = "",
      disabled,
      rows = 4,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "w-full rounded-lg border transition-colors focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-gray-800 resize-vertical";

    const variantStyles = {
      default:
        "border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500",
      error:
        "border-red-500 dark:border-red-500 focus:border-red-500 focus:ring-red-500",
      success:
        "border-green-500 dark:border-green-500 focus:border-green-500 focus:ring-green-500",
    };

    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-5 py-3 text-lg",
    };

    const displayVariant = errorMessage ? "error" : variant;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          rows={rows}
          className={`${baseStyles} ${variantStyles[displayVariant]} ${sizeStyles[textareaSize]} ${className} text-gray-900 dark:text-gray-100`}
          disabled={disabled}
          {...props}
        />

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

Textarea.displayName = "Textarea";

export default Textarea;
