import { ReactNode } from "react";
import { cn } from "@/utils/functions";

export interface Tab {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: "line" | "pills";
  centered?: boolean;
  className?: string;
}

const Tabs = ({
  tabs,
  activeTab,
  onTabChange,
  variant = "line",
  centered = false,
  className = "",
}: TabsProps) => {
  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  const lineVariantStyles = {
    container: cn(
      "border-b border-gray-200 dark:border-gray-700",
      centered && "flex justify-center",
    ),
    button:
      "inline-flex items-center gap-2 px-4 py-2 border-b-2 font-medium text-sm transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beige-default focus-visible:ring-offset-2",
    active:
      "border-beige-default dark:border-beige-medium text-beige-default dark:text-beige-medium",
    inactive:
      "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600",
    disabled: "opacity-50 cursor-not-allowed",
  };

  const pillsVariantStyles = {
    container: cn(
      "bg-gray-100 dark:bg-gray-800 p-1 rounded-lg inline-flex gap-1",
      centered && "justify-center",
    ),
    button: "px-4 py-2 rounded-md transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beige-default focus-visible:ring-offset-2",
    active:
      "bg-white dark:bg-gray-700 text-beige-default dark:text-beige-medium shadow-sm font-medium",
    inactive:
      "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50",
    disabled: "opacity-50 cursor-not-allowed",
  };

  const styles = variant === "line" ? lineVariantStyles : pillsVariantStyles;

  return (
    <div className={className}>
      {/* Tab buttons */}
      <div className={styles.container} role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => !tab.disabled && onTabChange(tab.id)}
            disabled={tab.disabled}
            className={cn(
              styles.button,
              activeTab === tab.id ? styles.active : styles.inactive,
              tab.disabled && styles.disabled,
            )}
          >
            {tab.icon && <span aria-hidden="true">{tab.icon}</span>}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="mt-4"
      >
        {activeTabContent}
      </div>
    </div>
  );
};

export default Tabs;
export type { TabsProps };
