"use client";

import { Switch } from "@heroui/react";

import { useTheme } from "@/contexts/theme";

import profiles from "@/data/profiles";

import Social from "./social";

const Footer = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <footer className="w-full bg-white dark:bg-slate-950 transition-colors duration-500 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2 order-2 md:order-1">
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
            © {new Date().getFullYear()} Amr Abed
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Built with Next.js 16, Tailwind CSS 4, and HeroUI 3
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 order-1 md:order-2">
          <Social profiles={profiles} />
        </div>

        <div className="flex items-center gap-3 order-3">
          <Switch
            isSelected={theme === "dark"}
            onChange={toggleTheme}
            className="data-[selected=true]:bg-primary"
          >
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
          </Switch>
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400 min-w-20">
            {theme === "dark" ? "Dark Mode" : "Light Mode"}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
