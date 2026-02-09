import {
  DotGothic16,
  IBM_Plex_Sans_JP,
  Rajdhani,
  WDXL_Lubrifont_JP_N,
} from "next/font/google";

export const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-rajdhani",
});

export const dotGothic16 = DotGothic16({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dot-gothic-16",
});

export const wdxlLubrifontJPN = WDXL_Lubrifont_JP_N({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-wdxl-lubrifont-jp-n",
});

export const ibmPlexSansJP = IBM_Plex_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ibm-plex-sans-jp",
  display: "swap",
});
