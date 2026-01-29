import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beige-default focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-white dark:bg-dark text-dark dark:text-light border border-grey dark:border-light/20 hover:bg-grey/50 dark:hover:bg-light/10 hover:shadow-sm",
        primary:
          "bg-beige-default text-dark hover:bg-beige-medium hover:shadow-md transform hover:scale-[1.02]",
        destructive: "bg-red-500 text-white hover:bg-red-600 hover:shadow-md",
        outline:
          "border border-beige-default text-beige-default hover:bg-beige-default hover:text-dark hover:shadow-sm",
        secondary: "bg-indigo text-white hover:bg-indigo/90 hover:shadow-md",
        ghost:
          "hover:bg-grey/30 dark:hover:bg-light/10 hover:text-dark dark:hover:text-light",
        link: "text-beige-default underline-offset-4 hover:underline hover:text-beige-medium",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
