/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./layout/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      primary: "#006994", //"#665DC3",
      darkPrimary: "#07d0e5", // "#87ceeb",
      // secondary: colors.white,
      // darkSecondary: colors.black,
      background: colors.gray[100],
      zinc: colors.zinc,
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
    },
    extend: {},
  },
  plugins: [],
}