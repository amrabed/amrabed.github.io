import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Amr Abed - Positions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
