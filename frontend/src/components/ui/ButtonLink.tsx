import { forwardRef } from "react";
import { Link, LinkProps } from "react-router-dom";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "./buttonVariants";
import { cn } from "@/utils/functions";

export interface ButtonLinkProps
  extends Omit<LinkProps, "className">,
    VariantProps<typeof buttonVariants> {
  className?: string;
}

const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <Link
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

ButtonLink.displayName = "ButtonLink";

export { ButtonLink };
