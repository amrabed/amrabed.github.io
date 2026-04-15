"use client";

import { useTheme } from "next-themes";

import { Switch } from "@heroui/react";

import profiles from "@/data/profiles";

import Social from "./social";

const Footer = () => {
  const { theme, setTheme } = useTheme();

  return (
    <footer className="w-full flex flex-col items-center justify-center p-10 gap-5 bg-white dark:bg-slate-950 transition-colors duration-500">
      <Social profiles={profiles} />
      <Switch
        isSelected={theme === "dark"}
        onChange={(isSelected) => setTheme(isSelected ? "dark" : "light")}
        className="data-[selected=true]:bg-primary"
      >
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Content>
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {theme === "dark" ? "Dark Mode" : "Light Mode"}
          </span>
        </Switch.Content>
      </Switch>
      <div className="flex flex-col items-center gap-1">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} Amr Abed
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Built with Next.js 16, Tailwind CSS 4, and HeroUI 3
        </p>
      </div>
    </footer>
  );
};

export default Footer;
