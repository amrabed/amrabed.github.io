"use client";

import { Providers as UiProviders } from "@amrabed/ui";

import { FilterProvider } from "@/contexts/filter";
import { SearchProvider } from "@/contexts/search";
import ThemeProvider from "@/contexts/theme";

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <UiProviders>
    <ThemeProvider>
      <FilterProvider>
        <SearchProvider>{children}</SearchProvider>
      </FilterProvider>
    </ThemeProvider>
  </UiProviders>
);

export default Providers;
