"use client";

import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  // Toggle Theme
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
        <div className="dark:text-white dark:bg-black">{children}</div>
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
