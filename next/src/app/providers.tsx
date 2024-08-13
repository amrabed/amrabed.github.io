"use client";

import PortfolioProvider from "@/contexts/portfolio";
import ThemeProvider from "@/contexts/theme";

const Providers = ({ children }) => (
  <PortfolioProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </PortfolioProvider>
);

export default Providers;
