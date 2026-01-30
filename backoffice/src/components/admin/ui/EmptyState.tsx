/* eslint-disable no-restricted-syntax */
import React from "react";

interface EmptyStateProps {
  message: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Default illustration - a simple, friendly empty box
const DefaultIllustration = () => (
  <svg
    className="w-24 h-24 text-neutral-300 dark:text-neutral-600"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
    />
  </svg>
);

const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  icon,
  action,
}) => {
  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-neutral-100 dark:bg-neutral-800 mb-6">
        {icon || <DefaultIllustration />}
      </div>
      <p className="text-neutral-600 dark:text-neutral-400 text-lg mb-6 max-w-md mx-auto">
        {message}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 px-5 rounded-lg transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
