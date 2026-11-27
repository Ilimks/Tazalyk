import "./globals.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { getLocale } from "next-intl/server";
import { SITE_URL } from "@/shared/config/site";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#102382",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  category: "government",
  classification: "Municipal Enterprise",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  icons: {
    icon: [
      { url: "/assets/favicon.ico", sizes: "any" },
      { url: "/assets/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/assets/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/assets/site.webmanifest",
  appleWebApp: {
    title: "Тазалык",
    statusBarStyle: "black-translucent",
  },
  other: {
    "msapplication-TileColor": "#102382",
  },
};


export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
