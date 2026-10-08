"use client";

import { Providers as UiProviders } from "@amrabed/ui";

import { FilterProvider } from "@/contexts/filter";
import { SearchProvider } from "@/contexts/search";

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <UiProviders>
    <FilterProvider>
      <SearchProvider>{children}</SearchProvider>
    </FilterProvider>
  </UiProviders>
);

export default Providers;
