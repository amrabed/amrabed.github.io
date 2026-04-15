"use client";

import { FilterProvider } from "@/contexts/filter";
import { SearchProvider } from "@/contexts/search";
import ThemeProvider from "@/contexts/theme";

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <ThemeProvider>
    <FilterProvider>
      <SearchProvider>{children}</SearchProvider>
    </FilterProvider>
  </ThemeProvider>
);

export default Providers;
