import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "doitlive.guide — Go live on Twitch",
  description:
    "No fluff, no affiliate links, no gear you need to buy. The fastest path from zero to streaming with stuff you already have.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
