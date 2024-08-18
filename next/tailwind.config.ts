import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "selector",
  theme: {
    colors: {
      primary: {
        DEFAULT: "#006994", //"#665DC3",
        dark: "#07d0e5", // "#87ceeb",
      },
      secondary: {
        DEFAULT: "#f7f7f7", // colors.white
        dark: "#333333", // colors.black
      },
      background: colors.gray[100],
      zinc: colors.zinc,
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
