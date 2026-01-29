import { createContext } from "react";

export interface DarkModeContextValue {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const DarkModeContext = createContext<DarkModeContextValue | undefined>(
  undefined
);
