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
          className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-600 dark:bg-gray-700 dark:checked:bg-blue-600 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      <div className="ml-3 text-sm leading-6">
        <label
          htmlFor={checkboxId}
          className="font-medium text-gray-900 dark:text-gray-100 cursor-pointer"
        >
          {label}
        </label>
        {description && (
          <p className="text-gray-500 dark:text-gray-400">{description}</p>
        )}
      </div>
    </div>
  );
};

export default Checkbox;
