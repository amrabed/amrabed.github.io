import React from "react";

import { SunIcon } from "@heroicons/react/24/outline";
import { MoonIcon } from "@heroicons/react/24/solid";

const ToggleThemeButton = ({ theme, toggleTheme }) => (
  <div className="flex items-center gap-4">
    <button
      className="text-primary text-md font-semibold hover:scale-110"
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <SunIcon className="size-5 dark:text-primary-dark" />
      ) : (
        <MoonIcon className="size-5 text-primary" />
      )}
    </button>
  </div>
);

export default ToggleThemeButton;
