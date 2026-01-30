import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary-600 text-white shadow-sm hover:bg-primary-700 focus-visible:ring-primary-500",
        secondary:
          "bg-neutral-100 text-neutral-800 shadow-sm hover:bg-neutral-200 focus-visible:ring-neutral-400",
        outline:
          "border border-neutral-300 bg-white shadow-sm hover:bg-neutral-50 hover:border-neutral-400 text-neutral-700 focus-visible:ring-neutral-400",
        ghost:
          "hover:bg-neutral-100 text-neutral-700 focus-visible:ring-neutral-400",
        link:
          "text-primary-600 underline-offset-4 hover:underline focus-visible:ring-primary-500",
        destructive:
          "bg-red-600 text-white shadow-sm hover:bg-red-700 focus-visible:ring-red-500",
        warm:
          "bg-warm-500 text-white shadow-sm hover:bg-warm-600 focus-visible:ring-warm-400",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }));

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        className: cn(classes, children.props.className),
        ref,
      } as React.HTMLAttributes<HTMLElement>);
    }

    return (
      <button className={classes} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
