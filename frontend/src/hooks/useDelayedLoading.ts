import { useState, useEffect } from "react";

/**
 * Hook to delay showing loading state to prevent flash for quick loads
 * @param isLoading - The actual loading state
 * @param delay - Delay in milliseconds before showing loading (default: 700ms)
 * @returns Whether to show the loading state
 */
export const useDelayedLoading = (
  isLoading: boolean,
  delay: number = 700,
): boolean => {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      // Only show loading state after delay
      const timer = setTimeout(() => {
        setShowLoading(true);
      }, delay);

      return () => clearTimeout(timer);
    } else {
      // Immediately hide loading when done
      setShowLoading(false);
    }
  }, [isLoading, delay]);

  return showLoading;
};
