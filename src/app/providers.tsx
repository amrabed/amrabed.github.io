import { NextUIProvider } from "@nextui-org/react";

import { FilterProvider } from "@/contexts/filter";
import { SearchProvider } from "@/contexts/search";
import ThemeProvider from "@/contexts/theme";

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <NextUIProvider>
    <ThemeProvider>
      <FilterProvider>
        <SearchProvider>{children}</SearchProvider>
      </FilterProvider>
    </ThemeProvider>
  </NextUIProvider>
);

export default Providers;
