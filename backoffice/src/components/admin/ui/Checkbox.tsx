/* eslint-disable no-restricted-syntax */
import React from "react";

interface CheckboxProps {
  id?: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  description?: string;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  label,
  checked,
  onChange,
  disabled = false,
  description,
  className = "",
}) => {
  const checkboxId = id || name;

  return (
    <div className={`relative flex items-start ${className}`}>
      <div className="flex h-6 items-center">
        <input
          id={checkboxId}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="h-4 w-4 rounded border-neutral-300 dark:border-neutral-600 text-primary-600 focus:ring-primary-500 dark:bg-neutral-700 dark:checked:bg-primary-600 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      <div className="ml-3 text-sm leading-6">
        <label
          htmlFor={checkboxId}
          className="font-medium text-neutral-900 dark:text-neutral-100 cursor-pointer"
        >
          {label}
        </label>
        {description && (
          <p className="text-neutral-500 dark:text-neutral-400">{description}</p>
        )}
      </div>
    </div>
  );
};

export default Checkbox;
