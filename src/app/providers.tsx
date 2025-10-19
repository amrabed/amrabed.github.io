import { HeroUIProvider } from "@heroui/react";

import { FilterProvider } from "@/contexts/filter";
import { SearchProvider } from "@/contexts/search";
import ThemeProvider from "@/contexts/theme";

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <HeroUIProvider>
    <ThemeProvider>
      <FilterProvider>
        <SearchProvider>{children}</SearchProvider>
      </FilterProvider>
    </ThemeProvider>
  </HeroUIProvider>
);

export default Providers;
