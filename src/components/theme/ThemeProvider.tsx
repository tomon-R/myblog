"use client";

import { themes, type Theme, type ThemeName } from "@/lib/color/colorConfig";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface ThemeContextValue {
  themeName: ThemeName;
  setThemeName: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  themeName: "warm-dark",
  setThemeName: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  for (const [key, value] of Object.entries(theme)) {
    root.style.setProperty(`--${key}`, value);
  }
}

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeName;
}

export function ThemeProvider({
  children,
  defaultTheme = "warm-dark",
}: ThemeProviderProps) {
  const [themeName, setThemeName] = useState<ThemeName>(defaultTheme);

  useEffect(() => {
    applyTheme(themes[themeName]);
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName }}>
      {children}
    </ThemeContext.Provider>
  );
}
