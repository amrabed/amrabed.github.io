"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

// Custom hook to use the theme context
export const useTheme: () => ThemeContextType = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  const toggleTheme = React.useCallback(() => {
    if (theme === "dark") {
      setTheme("light");
      localStorage.setItem("currentTheme", "light");
    } else {
      setTheme("dark");
      localStorage.setItem("currentTheme", "dark");
    }
  }, [theme]);

  // Get Theme Value From LocalStorage
  useEffect(() => {
    setMounted(true);
    const getTheme = localStorage.getItem("currentTheme");
    if (!getTheme) {
      return;
    }
    setTheme(getTheme);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme, mounted]);

  const contextValue = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
