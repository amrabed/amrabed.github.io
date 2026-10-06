"use client";

import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { Switch } from "@heroui/react";

import { useTheme } from "@/contexts/theme";

interface ThemeSwitchProps {
  className?: string;
}

export const ThemeSwitch = ({ className = "" }: ThemeSwitchProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`flex items-center ${className}`}>
      <Switch
        isSelected={theme === "dark"}
        onChange={toggleTheme}
        aria-label="Toggle dark mode"
      >
        <Switch.Content>
          <Switch.Control className="data-[selected=true]:bg-primary">
            <Switch.Thumb className="flex items-center justify-center">
              {theme === "dark" ? (
                <MoonIcon className="size-3 text-primary" />
              ) : (
                <SunIcon className="size-3 text-amber-500" />
              )}
            </Switch.Thumb>
          </Switch.Control>
        </Switch.Content>
      </Switch>
    </div>
  );
};

export default ThemeSwitch;
