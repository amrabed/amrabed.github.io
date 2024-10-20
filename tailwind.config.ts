import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "selector",
  plugins: [
    nextui({
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
