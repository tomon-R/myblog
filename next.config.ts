import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "",
  images: {
    unoptimized: true,
  },
  pageExtensions: ["js", "jsx", "ts", "tsx"],

  experimental: {
    serverComponentsExternalPackages: ["pino"],
  },
};

export default nextConfig;
