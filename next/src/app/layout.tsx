import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";

import ThemeProvider from "@/contexts/theme";
import "@/styles/animation.css";
import "@/styles/cssGrid.css";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });
const Footer = dynamic(() => import("@/components/Footer"));

export const metadata: Metadata = {
  title: "Amr Abed",
  description: "Amr Abed's personal website",
  keywords: "Amr Abed, personal website, portfolio, resume",
  authors: [{ name: "Amr Abed" }],
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
