import React from "react";
import { cn } from "@/utils/functions";

interface RadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
  name?: string;
}

interface RadioGroupItemProps {
  value: string;
  id: string;
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

interface RadioGroupContextValue {
  value: string;
  onValueChange: (value: string) => void;
  name?: string;
}

const RadioGroupContext = React.createContext<
  RadioGroupContextValue | undefined
>(undefined);

export function RadioGroup({
  value,
  onValueChange,
  children,
  className,
  name,
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange, name }}>
      <div role="radiogroup" className={cn("space-y-2", className)}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export function RadioGroupItem({
  value,
  id,
  children,
  disabled,
  className,
}: RadioGroupItemProps) {
  const context = React.useContext(RadioGroupContext);

  if (!context) {
    throw new Error("RadioGroupItem must be used within RadioGroup");
  }

  const { value: selectedValue, onValueChange, name } = context;
  const isChecked = selectedValue === value;

  return (
    <div className={cn("flex items-center", className)}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={isChecked}
        onChange={() => onValueChange(value)}
        disabled={disabled}
        className="sr-only peer"
      />
      <label
        htmlFor={id}
        className={cn(
          "flex items-center cursor-pointer",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <div
          className={cn(
            "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors",
            "border-gray-300 dark:border-gray-600",
            isChecked && "border-beige-default dark:border-beige-medium",
            !disabled &&
              "hover:border-beige-default dark:hover:border-beige-medium",
          )}
        >
          {isChecked && (
            <div className="w-2 h-2 rounded-full bg-beige-default dark:bg-beige-medium" />
          )}
        </div>
        {children && (
          <span className="ml-2 text-sm text-dark dark:text-light">
            {children}
          </span>
        )}
      </label>
    </div>
  );
}
