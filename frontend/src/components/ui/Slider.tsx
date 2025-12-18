import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/utils/functions";

interface SliderProps {
  value: number | number[];
  onValueChange: (value: number | number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
}

export function Slider({
  value: controlledValue,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  className,
}: SliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeThumb, setActiveThumb] = useState<number | null>(null);

  const values = Array.isArray(controlledValue)
    ? controlledValue
    : [controlledValue];
  const isRange = Array.isArray(controlledValue);

  const getPercentage = (val: number) => {
    return ((val - min) / (max - min)) * 100;
  };

  const getValueFromPosition = (clientX: number) => {
    if (!sliderRef.current) return min;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(
      0,
      Math.min(1, (clientX - rect.left) / rect.width),
    );
    const rawValue = min + percentage * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    return Math.max(min, Math.min(max, steppedValue));
  };

  const handleMouseDown = (index: number) => (e: React.MouseEvent) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragging(true);
    setActiveThumb(index);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || activeThumb === null || disabled) return;

    const newValue = getValueFromPosition(e.clientX);

    if (isRange) {
      const newValues = [...values];
      newValues[activeThumb] = newValue;

      // Ensure thumbs don't cross
      if (activeThumb === 0 && newValue <= values[1]) {
        onValueChange(newValues);
      } else if (activeThumb === 1 && newValue >= values[0]) {
        onValueChange(newValues);
      }
    } else {
      onValueChange(newValue);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setActiveThumb(null);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, activeThumb, values]);

  return (
    <div
      ref={sliderRef}
      className={cn(
        "relative flex items-center w-full h-5 cursor-pointer",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      {/* Track */}
      <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
        {/* Fill */}
        <div
          className="absolute h-full bg-beige-default dark:bg-beige-medium rounded-full"
          style={{
            left: isRange ? `${getPercentage(values[0])}%` : "0%",
            right: isRange
              ? `${100 - getPercentage(values[1])}%`
              : `${100 - getPercentage(values[0])}%`,
          }}
        />
      </div>

      {/* Thumbs */}
      {values.map((value, index) => (
        <div
          key={index}
          className={cn(
            "absolute w-5 h-5 bg-white border-2 border-beige-default dark:border-beige-medium rounded-full shadow-md",
            "transition-transform hover:scale-110 focus:scale-110",
            isDragging && activeThumb === index && "scale-110",
            !disabled && "cursor-grab active:cursor-grabbing",
          )}
          style={{
            left: `${getPercentage(value)}%`,
            transform: "translateX(-50%)",
          }}
          onMouseDown={handleMouseDown(index)}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          tabIndex={disabled ? -1 : 0}
        />
      ))}
    </div>
  );
}
