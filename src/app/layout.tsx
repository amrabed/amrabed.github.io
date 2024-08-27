import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";

import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });
const ScrollToTopButton = dynamic(
  () => import("@/components/scrollToTopButton"),
);

const Footer = dynamic(() => import("@/components/footer"));

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
      <body
        className={`${inter.className} antialiased text-slate-600 bg-white`}
      >
        <Providers>
          {children}
          <ScrollToTopButton />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
