"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
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
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      localStorage.setItem("currentTheme", "light");
    } else {
      setTheme("dark");
      localStorage.setItem("currentTheme", "dark");
    }
  };

  // Get Theme Value From LocalStorage
  useEffect(() => {
    const getTheme = localStorage.getItem("currentTheme");
    if (!getTheme) {
      return;
    }
    setTheme(getTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: toggleTheme }}>
      <div className={theme === "dark" ? "dark" : ""}>
        <div className="dark:text-slate-400 dark:bg-background">{children}</div>
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
