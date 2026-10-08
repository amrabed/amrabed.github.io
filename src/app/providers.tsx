"use client";

import { ThemeProvider } from "@amrabed/ui";

import { FilterProvider } from "@/contexts/filter";
import { SearchProvider } from "@/contexts/search";

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
