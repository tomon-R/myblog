import { config } from "@/lib/config";

import { ibmPlexSansJP, rajdhani } from "@/components/typography/fonts";
import type { Metadata } from "next";
import "./globals.css";
import Header from "./Header";

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
      <body className="antialiased">
        <Header
          appName={config.appConfig.appName}
          navigationItems={[
            { link: "/", label: "Home" },
            { link: "/", label: "Home2" },
            { link: "/", label: "Home3" },
          ]}
        />
        {children}
      </body>
    </html>
  );
}
