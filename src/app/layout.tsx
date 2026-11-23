import "./globals.css";
import { ReactNode } from "react";
import { getLocale } from "next-intl/server";

// Шрифт Onest (как в админке и ассистенте) подключён в globals.css: все начертания и буквы ң, ө, ү
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
