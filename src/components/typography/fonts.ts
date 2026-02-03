import { IBM_Plex_Sans_JP, Rajdhani } from "next/font/google";

export const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-rajdhani",
});

export const ibmPlexSansJP = IBM_Plex_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ibm-plex-sans-jp",
  display: "swap",
});
