import { useContext } from "react";
import { DarkModeContext, DarkModeContextValue } from "@/context/DarkModeContextValue";

export function useDarkMode(): DarkModeContextValue {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
}
