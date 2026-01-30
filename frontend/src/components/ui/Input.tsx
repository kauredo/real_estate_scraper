import { forwardRef } from "react";

import { cn } from "@/utils/functions";

const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-md border border-input dark:border-gray-600 bg-white dark:bg-dark text-foreground dark:text-light px-3 py-2 text-sm transition-all duration-200 ease-out placeholder:text-muted-foreground hover:border-beige-default dark:hover:border-beige-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beige-default focus-visible:ring-offset-1 focus-visible:border-beige-default disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
