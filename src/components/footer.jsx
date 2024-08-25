"use client";

import { useContext } from "react";

import ThemeSelector from "@/components/themeSelector";
import { ThemeContext } from "@/contexts/theme";

const Footer = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="flex flex-row justify-between p-2">
      <div className="p-2 text-sm left-15 bottom-0 gap-4">
        &copy; {new Date().getFullYear()} Amr Abed - Built with{" "}
        <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
          Next.js
        </a>
      </div>
      <ThemeSelector theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
};

export default Footer;
