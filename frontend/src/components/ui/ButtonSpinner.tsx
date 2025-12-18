import React from "react";

interface ButtonSpinnerProps {
  className?: string;
}

const ButtonSpinner: React.FC<ButtonSpinnerProps> = ({ className = "" }) => {
  return (
    <div
      className={`inline-block animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-current ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default ButtonSpinner;
