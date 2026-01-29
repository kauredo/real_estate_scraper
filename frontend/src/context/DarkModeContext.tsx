import { useState, useEffect, useCallback, ReactNode } from "react";
import { DarkModeContext } from "./DarkModeContextValue";

function getInitialDarkMode(): boolean {
  if (typeof window === "undefined") return false;

  const stored = localStorage.getItem("darkMode");
  if (stored !== null) {
    return stored === "true";
  }

  // Check system preference
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(getInitialDarkMode);

  // Apply dark mode class to root element
  useEffect(() => {
    const root = document.getElementById("root");
    if (isDarkMode) {
      root?.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      root?.classList.remove("dark");
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => {
      const newValue = !prev;
      localStorage.setItem("darkMode", String(newValue));

      // Sync with backend (fire and forget)
      fetch(`${import.meta.env.VITE_API_URL}/toggle_dark_mode`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }).catch((error) => console.error("Error syncing dark mode:", error));

      return newValue;
    });
  }, []);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
