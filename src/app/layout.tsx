import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";

import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });
const ScrollToTopButton = dynamic(() => import("@/components/upArrow"));
const ChatWidget = dynamic(() => import("@/components/ai-chat/ChatWidget"));

const Footer = dynamic(() => import("@/components/footer"));

export const metadata: Metadata = {
  metadataBase: new URL("https://amrabed.com"),
  title: "Amr Abed",
  description: "Amr Abed's personal website",
  keywords: "Amr Abed, personal website, portfolio, resume",
  authors: [{ name: "Amr Abed" }],
  robots: "index, follow",
  openGraph: {
    title: "Amr Abed",
    description: "Amr Abed's personal website",
    url: "https://amrabed.com",
    siteName: "Amr Abed",
    images: [
      {
        url: "/amr.webp",
        width: 800,
        height: 600,
        alt: "Amr Abed",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amr Abed",
    description: "Amr Abed's personal website",
    images: ["/amr.webp"],
  },
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased bg-background text-foreground transition-colors duration-500`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[1000] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg focus:outline-none"
        >
          Skip to content
        </a>
        <Providers>
          {children}
          <ScrollToTopButton />
          <ChatWidget />
          <Footer />
        </Providers>
      </body>
      <GoogleAnalytics gaId="G-JKPDWZ2PLD" />
    </html>
  );
}
