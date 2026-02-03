import { config } from "@/lib/config";
import { initLogger } from "@/lib/logger";
import { rajdhani, ibmPlexSansJP } from "@/components/typography/fonts";
import type { Metadata } from "next";
import "./globals.css";

// Initialize logger at app startup
initLogger(config.appConfig);

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
    <html lang="ja" className={`${rajdhani.variable} ${ibmPlexSansJP.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
