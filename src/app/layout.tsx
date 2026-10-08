import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";

import { Footer, NavBar } from "@amrabed/ui";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });
const ScrollToTopButton = dynamic(() => import("@/components/upArrow"));
const ChatWidget = dynamic(() => import("@/components/chat"));

const SECTIONS = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Certifications", href: "#certifications" },
  { name: "Projects", href: "#projects" },
  { name: "Publications", href: "#publications" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#degrees" },
  { name: "Teaching", href: "#teaching" },
  { name: "Articles", href: "#articles" },
  { name: "Contact", href: "#contact" },
];

export const metadata: Metadata = {
  metadataBase: new URL("https://amrabed.com"),
  title: "Amr Abed — Engineering Manager | PhD, AWS Certified | AI & Cloud",
  description:
    "Software engineer and cloud architect with PhD from Virginia Tech. Engineering Manager at Sophi specializing in AI/ML, AWS, and scalable systems. Ex-Google intern. AWS certified.",
  keywords:
    "Amr Abed, software engineer, engineering manager, machine learning, AWS certified, cloud architect, Virginia Tech PhD, Sophi, AI, MLOps, portfolio",
  authors: [{ name: "Amr Abed", url: "https://amrabed.com" }],
  alternates: {
    canonical: "https://amrabed.com",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Amr Abed — Engineering Manager | PhD, AWS Certified | AI & Cloud",
    description:
      "Software engineer and cloud architect with PhD from Virginia Tech. Engineering Manager at Sophi specializing in AI/ML, AWS, and scalable systems.",
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
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amr Abed — Engineering Manager | PhD, AWS Certified | AI & Cloud",
    description:
      "Software engineer and cloud architect with PhD from Virginia Tech. Engineering Manager at Sophi specializing in AI/ML, AWS, and scalable systems.",
    images: ["/amr.webp"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://amrabed.com/#person",
      name: "Amr Abed",
      jobTitle: "Engineering Manager",
      worksFor: {
        "@type": "Organization",
        name: "Sophi",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Virginia Tech",
      },
      url: "https://amrabed.com",
      image: "https://amrabed.com/amrabed.webp",
      sameAs: [
        "https://github.com/amrabed",
        "https://linkedin.com/in/amrabed",
        "https://twitter.com/amr_abed",
        "https://medium.com/@amrabed",
      ],
      description:
        "Software engineer and cloud architect with PhD from Virginia Tech. Engineering Manager at Sophi specializing in AI/ML, AWS, and scalable systems.",
    },
    {
      "@type": "WebSite",
      "@id": "https://amrabed.com/#website",
      url: "https://amrabed.com",
      name: "Amr Abed",
      author: {
        "@id": "https://amrabed.com/#person",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
          <NavBar
            currentSite="home"
            showLogo={false}
            authorHref="#home"
            navLinks={SECTIONS}
            showOnScroll
          />
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
