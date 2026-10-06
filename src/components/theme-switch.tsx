"use client";

import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";

import { useTheme, type ThemeMode } from "@/contexts/theme";

interface ThemeSwitchProps {
  className?: string;
}

const OPTIONS: { mode: ThemeMode; label: string; icon: typeof SunIcon }[] = [
  { mode: "light", label: "Light theme", icon: SunIcon },
  { mode: "dark", label: "Dark theme", icon: MoonIcon },
  { mode: "system", label: "System theme", icon: ComputerDesktopIcon },
];

export const ThemeSwitch = ({ className = "" }: ThemeSwitchProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Theme selector"
      className={`inline-flex items-center rounded-full bg-slate-200/80 dark:bg-slate-800/80 p-0.5 border border-slate-300/60 dark:border-slate-700/60 shadow-inner ${className}`}
    >
      {OPTIONS.map(({ mode, label, icon: Icon }) => {
        const isSelected = theme === mode;
        return (
          <button
            key={mode}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={label}
            onClick={() => setTheme(mode)}
            className={`relative flex items-center justify-center p-1.5 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              isSelected
                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            <Icon className="size-4" />
          </button>
        );
      })}
    </div>
  );
};

export default ThemeSwitch;
