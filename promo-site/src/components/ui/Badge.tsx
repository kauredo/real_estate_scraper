import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-lg border border-neutral-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-neutral-900 text-white shadow hover:bg-neutral-800",
        secondary:
          "border-transparent bg-neutral-100 text-neutral-800 hover:bg-neutral-200",
        primary:
          "border-transparent bg-primary-100 text-primary-700 hover:bg-primary-200",
        warm:
          "border-transparent bg-warm-100 text-warm-700 hover:bg-warm-200",
        success:
          "border-transparent bg-green-100 text-green-700 hover:bg-green-200",
        destructive:
          "border-transparent bg-red-100 text-red-700 shadow hover:bg-red-200",
        outline: "text-neutral-900 border-neutral-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
