import { forwardRef, HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/functions";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 transition-all duration-200 ease-out [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default:
          "bg-background text-foreground border-gray-200 dark:border-gray-700",
        destructive:
          "border-red-500/50 text-red-600 dark:border-red-500 [&>svg]:text-red-600 dark:text-red-400 dark:[&>svg]:text-red-400 bg-red-50 dark:bg-red-950/30",
        success:
          "border-green-500/50 text-green-700 dark:border-green-500 [&>svg]:text-green-700 dark:text-green-400 dark:[&>svg]:text-green-400 bg-green-50 dark:bg-green-950/30",
        warning:
          "border-yellow-500/50 text-yellow-800 dark:border-yellow-500 [&>svg]:text-yellow-800 dark:text-yellow-400 dark:[&>svg]:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/30",
        info: "border-blue-500/50 text-blue-700 dark:border-blue-500 [&>svg]:text-blue-700 dark:text-blue-400 dark:[&>svg]:text-blue-400 bg-blue-50 dark:bg-blue-950/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Alert = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
