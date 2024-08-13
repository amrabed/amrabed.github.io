"use client";

import PortfolioProvider from "@/contexts/portfolio";
import ThemeProvider from "@/contexts/theme";

const Providers = ({ children }) => (
  <ThemeProvider>
    <PortfolioProvider>{children}</PortfolioProvider>
  </ThemeProvider>
);

export default Providers;
