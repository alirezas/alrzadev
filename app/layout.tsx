import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  style: "italic",
  weight: "400",
  preload: true,
});

export const metadata: Metadata = {
  title: "Alireza Sarabchi",
  description:
    "I craft digital products, from the first idea to the last detail.",
  authors: [{ name: "Alireza Sarabchi" }],
  openGraph: {
    title: "Alireza Sarabchi",
    description:
      "I craft digital products, from the first idea to the last detail.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Alireza Sarabchi",
    description:
      "I craft digital products, from the first idea to the last detail.",
  },
  robots: "index, follow",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#171717" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable} antialiased`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
