import type { Metadata } from "next";
import type { Viewport } from "next";
import { Inter } from "next/font/google";

import "@/styles/animation.css";
import "@/styles/cssGrid.css";
import "@/styles/globals.css";
import ThemeProvider from "@/contexts/theme";


const inter = Inter({ subsets: ["latin"] });

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
        <body className={`${inter.className} antialiased` }><ThemeProvider>{children}</ThemeProvider></body>
    </html>
  );
}
