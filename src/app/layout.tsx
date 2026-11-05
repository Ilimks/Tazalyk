import "./globals.css";
import { ReactNode } from "react";
import localFont from "next/font/local";
import { getLocale } from "next-intl/server";

// Сопоставление начертаний сохранено как было в globals.css:
// файл ExtraLight используется как обычный 400, Medium — 500, Bold — 600.
const roboto = localFont({
  src: [
    { path: "./fonts/Roboto-ExtraLight.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Roboto-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Roboto-Bold.woff2", weight: "600", style: "normal" },
  ],
  display: "swap",
  variable: "--font-roboto",
  fallback: ["system-ui", "Arial", "sans-serif"],
});

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={roboto.variable}>
      <body>{children}</body>
    </html>
  );
}
