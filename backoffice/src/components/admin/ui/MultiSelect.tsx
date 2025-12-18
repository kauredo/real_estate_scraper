/* eslint-disable no-restricted-syntax, i18next/no-literal-string */
import React, { useState } from "react";

export interface MultiSelectOption {
  value: string | number;
  label: string;
}

interface MultiSelectProps {
  label: string;
  options: MultiSelectOption[];
  selectedValues: (string | number)[];
  onChange: (values: (string | number)[]) => void;
  placeholder?: string;
  description?: string;
  className?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  selectedValues,
  onChange,
  placeholder = "Select items...",
  description,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOption = (value: string | number) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  const handleRemove = (value: string | number) => {
    onChange(selectedValues.filter((v) => v !== value));
  };

  const selectedLabels = options
    .filter((opt) => selectedValues.includes(opt.value))
    .map((opt) => opt.label);

  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
        {label}
      </label>
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          {description}
        </p>
      )}

      {/* Selected Tags */}
      {selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedLabels.map((label, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm"
            >
              {label}
              <button
                type="button"
                onClick={() => handleRemove(selectedValues[index])}
                className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100 focus:outline-none"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 text-left border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {selectedValues.length === 0 ? (
            <span className="text-gray-400 dark:text-gray-500">
              {placeholder}
            </span>
          ) : (
            <span>{selectedValues.length} selected</span>
          )}
        </button>

        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown Menu */}
            <div className="absolute z-20 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
              {options.length === 0 ? (
                <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                  No options available
                </div>
              ) : (
                options.map((option) => {
                  const isSelected = selectedValues.includes(option.value);
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleToggleOption(option.value)}
                      className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 ${
                        isSelected
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                          : "text-gray-900 dark:text-gray-100"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        readOnly
                        className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-600"
                      />
                      {option.label}
                    </button>
                  );
                })
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
