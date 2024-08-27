import type { Config } from "tailwindcss";

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
            primary: "#07d0e5",
            secondary: "#333333",
          },
        },
        light: {
          colors: {
            primary: "#006994",
            secondary: "#f7f7f7",
          },
        },
      },
    }),
  ],
};
export default config;
