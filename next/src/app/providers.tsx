import { NextUIProvider } from "@nextui-org/react";

import ThemeProvider from "@/contexts/theme";

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <NextUIProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </NextUIProvider>
);

export default Providers;
