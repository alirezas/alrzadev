import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const plex = localFont({
  src: [
    { path: "./fonts/ibm-plex-mono.ttf", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-mono-italic.ttf", weight: "400", style: "italic" },
  ],
  variable: "--font-plex",
  display: "swap",
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
  themeColor: "#080b10",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={plex.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>{children}</body>
    </html>
  );
}
