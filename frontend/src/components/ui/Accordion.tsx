import React, { useState } from "react";
import { cn } from "@/utils/functions";

interface AccordionItemProps {
  value: string;
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

interface AccordionProps {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  children: React.ReactNode;
  className?: string;
}

interface AccordionContextValue {
  openItems: string[];
  toggleItem: (value: string) => void;
  type: "single" | "multiple";
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(
  undefined,
);

export function Accordion({
  type = "single",
  defaultValue,
  children,
  className,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(() => {
    if (defaultValue) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return [];
  });

  const toggleItem = (value: string) => {
    setOpenItems((prev) => {
      if (type === "single") {
        return prev.includes(value) ? [] : [value];
      } else {
        return prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value];
      }
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
      <div
        className={cn(
          "divide-y divide-gray-200 dark:divide-gray-700",
          className,
        )}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  value,
  title,
  children,
  className,
}: AccordionItemProps) {
  const context = React.useContext(AccordionContext);

  if (!context) {
    throw new Error("AccordionItem must be used within Accordion");
  }

  const { openItems, toggleItem } = context;
  const isOpen = openItems.includes(value);

  return (
    <div
      className={cn("border-b border-gray-200 dark:border-gray-700", className)}
    >
      <button
        onClick={() => toggleItem(value)}
        className="flex w-full items-center justify-between py-4 text-left font-medium transition-colors duration-200 ease-out hover:text-beige-default dark:hover:text-beige-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beige-default focus-visible:ring-offset-2 rounded-sm"
        aria-expanded={isOpen}
      >
        <span className="text-dark dark:text-light">{title}</span>
        <svg
          className={cn(
            "h-5 w-5 shrink-0 text-gray-500 dark:text-gray-400 transition-transform duration-300 ease-out",
            isOpen ? "rotate-180" : "",
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-out",
          isOpen ? "max-h-[1000px] pb-4 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="text-gray-700 dark:text-gray-300">{children}</div>
      </div>
    </div>
  );
}
