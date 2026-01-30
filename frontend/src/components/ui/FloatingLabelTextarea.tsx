import { forwardRef, useState, useId } from "react";
import { cn } from "@/utils/functions";

interface FloatingLabelTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: boolean;
}

const FloatingLabelTextarea = forwardRef<HTMLTextAreaElement, FloatingLabelTextareaProps>(
  ({ className, label, error, id: providedId, value, defaultValue, ...props }, ref) => {
    const generatedId = useId();
    const id = providedId || `floating-textarea-${generatedId}`;
    const [isFocused, setIsFocused] = useState(false);

    // Check if textarea has value (controlled or uncontrolled)
    const hasValue = value !== undefined ? Boolean(value) : Boolean(defaultValue);
    const isFloating = isFocused || hasValue;

    return (
      <div className="relative">
        <textarea
          id={id}
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          className={cn(
            "peer flex w-full rounded-md border bg-white dark:bg-dark text-foreground dark:text-light px-3 pt-6 pb-2 text-sm transition-all duration-200 ease-out resize-none",
            "border-input dark:border-gray-600",
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
            "text-muted-foreground",
            isFloating
              ? "top-2 text-xs text-beige-default dark:text-beige-medium"
              : "top-4 text-sm",
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

FloatingLabelTextarea.displayName = "FloatingLabelTextarea";

export { FloatingLabelTextarea };
