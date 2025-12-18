import { forwardRef } from "react";

import { cn } from "@/utils/functions";

const Select = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, ...props }, ref) => {
  return (
    <select
      className={cn(
        "flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm transition-colors hover:border-beige-default dark:hover:border-beige-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beige-default focus-visible:border-beige-default disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

Select.displayName = "Select";

export { Select };
