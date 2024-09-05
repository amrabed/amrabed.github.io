"use client";

import { SunIcon } from "@heroicons/react/24/outline";
import { MoonIcon } from "@heroicons/react/24/outline";
import { Switch } from "@nextui-org/react";

import { useTheme } from "@/contexts/theme";

const ThemeSelector = ({
  theme,
  toggleTheme,
}: {
  theme: string | undefined;
  toggleTheme: (theme: string) => void;
}) => (
  <Switch
    size="lg"
    color="primary"
    value={theme}
    onChange={(e) => toggleTheme(e.target.value)}
    thumbIcon={theme == "dark" ? <MoonIcon /> : <SunIcon />}
  />
);

const Footer = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-row justify-between content-center items-center h-[100px]">
      <div className="text-sm p-4">
        &copy; {new Date().getFullYear()} Amr Abed - Built with{" "}
        <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
          Next.js
        </a>
      </div>
      <div className="p-4">
        <ThemeSelector theme={theme} toggleTheme={toggleTheme} />
      </div>
    </div>
  );
};

export default Footer;
