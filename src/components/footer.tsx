"use client";

import { SunIcon } from "@heroicons/react/24/outline";
import { MoonIcon } from "@heroicons/react/24/solid";
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
    defaultSelected
    size="lg"
    value={theme}
    onChange={(e) => toggleTheme(e.target.value)}
    startContent={<SunIcon color="white" />}
    endContent={<MoonIcon />}
  />
);

const Footer = () => {
  const { theme, toggleTheme } = useTheme();

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
