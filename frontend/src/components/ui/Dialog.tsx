import React, { useEffect, useRef, useCallback, useId } from "react";
import { cn } from "@/utils/functions";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}

interface DialogHeaderProps {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
  closeLabel?: string;
}

interface DialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

interface DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-full mx-4",
};

export function Dialog({
  isOpen,
  onClose,
  children,
  size = "md",
  className,
  "aria-labelledby": ariaLabelledby,
  "aria-describedby": ariaDescribedby,
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  // Focus trap: get all focusable elements within dialog
  const getFocusableElements = useCallback(() => {
    if (!dialogRef.current) return [];
    const focusableSelectors = [
      'button:not([disabled])',
      'a[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');
    return Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(focusableSelectors)
    );
  }, []);

  // Handle keyboard navigation for focus trap
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
        return;
      }

      if (e.key !== "Tab") return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Shift + Tab on first element -> go to last
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
      // Tab on last element -> go to first
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    },
    [isOpen, onClose, getFocusableElements]
  );

  // Lock body scroll and set up focus trap
  useEffect(() => {
    if (isOpen) {
      // Store currently focused element
      previouslyFocusedRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";

      // Focus first focusable element in dialog
      const timer = setTimeout(() => {
        const focusableElements = getFocusableElements();
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        } else {
          dialogRef.current?.focus();
        }
      }, 50);

      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, getFocusableElements]);

  // Restore focus when dialog closes
  useEffect(() => {
    if (!isOpen && previouslyFocusedRef.current) {
      previouslyFocusedRef.current.focus();
    }
  }, [isOpen]);

  // Keyboard event listener
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200 ease-out animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        tabIndex={-1}
        className={cn(
          "relative w-full bg-white dark:bg-dark rounded-lg shadow-xl",
          "border border-gray-200 dark:border-gray-700",
          "animate-in fade-in-0 zoom-in-95 duration-200",
          "focus:outline-none",
          sizeClasses[size],
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({ children, className, onClose, closeLabel = "Close" }: DialogHeaderProps) {
  return (
    <div
      className={cn(
        "px-6 py-4 border-b border-gray-200 dark:border-gray-700",
        onClose && "flex items-start justify-between gap-4",
        className,
      )}
    >
      <div className="flex-1">{children}</div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="flex-shrink-0 p-1 rounded-md text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beige-default focus-visible:ring-offset-2"
          aria-label={closeLabel}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export function DialogFooter({ children, className }: DialogFooterProps) {
  return (
    <div
      className={cn(
        "px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-end gap-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function DialogTitle({ children, className, id }: DialogTitleProps) {
  const generatedId = useId();
  const titleId = id || `dialog-title-${generatedId}`;

  return (
    <h2
      id={titleId}
      className={cn(
        "text-xl font-semibold text-dark dark:text-light",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function DialogDescription({
  children,
  className,
  id,
}: DialogDescriptionProps) {
  const generatedId = useId();
  const descriptionId = id || `dialog-description-${generatedId}`;

  return (
    <p
      id={descriptionId}
      className={cn("text-sm text-gray-600 dark:text-gray-400 mt-1", className)}
    >
      {children}
    </p>
  );
}

export function DialogContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("px-6 py-4", className)}>{children}</div>;
}
