import { config } from "@/lib/config";

import { ibmPlexSansJP, rajdhani } from "@/components/typography/fonts";
import type { Metadata } from "next";
import "./globals.css";

export const runtime = "nodejs";

export const metadata: Metadata = {
  title: config.appConfig.appName,
  description: config.appConfig.appDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${rajdhani.variable} ${ibmPlexSansJP.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
