import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

import { heroui } from "@heroui/react";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "selector",
  plugins: [
    heroui({
      addCommonColors: true,
      themes: {
        dark: {
          colors: {
            primary: colors.indigo[300],
            secondary: colors.zinc[400],
            foreground: colors.slate[400],
            background: colors.slate[950],
          },
        },
        light: {
          colors: {
            primary: colors.indigo[600],
            secondary: colors.zinc[600],
            foreground: colors.slate[600],
            background: colors.white,
          },
        },
      },
    }),
  ],
};
export default config;
