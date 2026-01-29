import { forwardRef, useState, useId } from "react";
import { cn } from "@/utils/functions";

interface FloatingLabelInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
}

const FloatingLabelInput = forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ className, label, error, id: providedId, value, defaultValue, ...props }, ref) => {
    const generatedId = useId();
    const id = providedId || `floating-input-${generatedId}`;
    const [isFocused, setIsFocused] = useState(false);

    // Check if input has value (controlled or uncontrolled)
    const hasValue = value !== undefined ? Boolean(value) : Boolean(defaultValue);
    const isFloating = isFocused || hasValue;

    return (
      <div className="relative">
        <input
          id={id}
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          className={cn(
            "peer flex h-12 w-full rounded-md border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 pt-5 pb-2 text-sm transition-all duration-200 ease-out",
            "border-gray-300 dark:border-gray-600",
            "hover:border-beige-default dark:hover:border-beige-medium",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beige-default focus-visible:ring-offset-1 focus-visible:border-beige-default",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "placeholder:text-transparent",
            error && "border-red-500 focus-visible:ring-red-500",
            className,
          )}
          placeholder={label}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
        <label
          htmlFor={id}
          className={cn(
            "absolute left-3 transition-all duration-200 ease-out pointer-events-none",
            "text-gray-500 dark:text-gray-400",
            isFloating
              ? "top-1.5 text-xs text-beige-default dark:text-beige-medium"
              : "top-1/2 -translate-y-1/2 text-sm",
            error && isFloating && "text-red-500",
          )}
        >
          {label}
          {props.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      </div>
    );
  }
);

FloatingLabelInput.displayName = "FloatingLabelInput";

export { FloatingLabelInput };
