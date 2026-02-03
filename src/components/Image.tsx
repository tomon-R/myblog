import { config } from "@/lib/config";
import NextImage, { ImageProps } from "next/image";

const basePath = process.env.NODE_ENV === "production" ? `/${config.appConfig.appName}` : "";

export default function Image({ src, ...props }: ImageProps) {
  const imgSrc = typeof src === "string" ? `${basePath}${src}` : src;

  return <NextImage src={imgSrc} {...props} />;
}
