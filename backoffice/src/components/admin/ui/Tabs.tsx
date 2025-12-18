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
    container: "border-b border-gray-200 dark:border-gray-700",
    button: "px-4 py-2 -mb-px border-b-2 transition-colors",
    active:
      "border-primary-500 text-primary-600 dark:text-primary-400 font-medium",
    inactive:
      "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600",
    disabled: "opacity-50 cursor-not-allowed",
  };

  const pillsVariantStyles = {
    container: "bg-gray-100 dark:bg-gray-800 p-1 rounded-lg inline-flex gap-1",
    button: "px-4 py-2 rounded-md transition-all",
    active:
      "bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm font-medium",
    inactive:
      "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200",
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
