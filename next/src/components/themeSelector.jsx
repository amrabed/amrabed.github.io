import React from "react";

import { SunIcon } from "@heroicons/react/24/outline";
import { MoonIcon } from "@heroicons/react/24/solid";
import { Switch } from "@nextui-org/react";

const ThemeSelector = ({ theme, toggleTheme }) => (
  <Switch
    defaultSelected
    size="lg"
    value={theme === "dark"}
    onChange={toggleTheme}
    startContent={<SunIcon color="white" />}
    endContent={<MoonIcon />}
  />
);

export default ThemeSelector;
