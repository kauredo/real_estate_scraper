/* eslint-disable no-restricted-syntax */
import React, { useState, ReactNode } from "react";

export interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export type TabVariant = "line" | "pills";

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  variant?: TabVariant;
  onChange?: (tabId: string) => void;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  variant = "line",
  onChange,
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState(
    defaultTab || (tabs.length > 0 ? tabs[0].id : ""),
  );

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  const lineVariantStyles = {
    container: "border-b border-neutral-200 dark:border-neutral-700",
    button: "px-4 py-2 -mb-px border-b-2 transition-colors",
    active:
      "border-neutral-900 text-neutral-900 dark:border-neutral-100 dark:text-neutral-100 font-medium",
    inactive:
      "border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600",
    disabled: "opacity-50 cursor-not-allowed",
  };

  const pillsVariantStyles = {
    container: "bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg inline-flex gap-1",
    button: "px-4 py-2 rounded-lg transition-all",
    active:
      "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-sm font-medium",
    inactive:
      "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200",
    disabled: "opacity-50 cursor-not-allowed",
  };

  const styles = variant === "line" ? lineVariantStyles : pillsVariantStyles;

  return (
    <div className={className}>
      {/* Tab buttons */}
      <div className={styles.container}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && handleTabChange(tab.id)}
            disabled={tab.disabled}
            className={`${styles.button} ${
              activeTab === tab.id ? styles.active : styles.inactive
            } ${tab.disabled ? styles.disabled : ""}`}
          >
            <div className="inline-flex items-center gap-2">
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-4">{activeTabContent}</div>
    </div>
  );
};

export default Tabs;
