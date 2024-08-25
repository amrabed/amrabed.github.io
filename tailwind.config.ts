import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
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
