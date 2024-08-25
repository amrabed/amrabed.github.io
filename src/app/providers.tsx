import { NextUIProvider } from "@nextui-org/react";

import { SearchProvider } from "@/contexts/search";
import ThemeProvider from "@/contexts/theme";

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <NextUIProvider>
    <ThemeProvider>
      <SearchProvider>{children}</SearchProvider>
    </ThemeProvider>
  </NextUIProvider>
);

export default Providers;
