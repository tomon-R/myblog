import { newAppConfig } from "./AppConfig";
import { newConfig } from "./Config";
import { newFilesystemConfig } from "./FilesystemConfig";
import { newTelemetryConfig } from "./TelemetryConfig";

export const appConfig = newAppConfig({
  appName: process.env.NEXT_PUBLIC_APP_NAME!,
  appVersion: process.env.NEXT_PUBLIC_APP_VERSION,
  appDescription: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
  env: process.env.NEXT_PUBLIC_APP_ENV!,
  runtime: process.env.NEXT_RUNTIME,
});

export const filesystemConfig = newFilesystemConfig({
  postRootPath: process.env.NEXT_PUBLIC_APP_POST_ROOT_PATH!,
  categoryFilename: process.env.NEXT_PUBLIC_APP_CATEGORY_FILENAME!,
  reservedFilenames: process.env.NEXT_PUBLIC_APP_RESERVED_FILENAMES!.split(","),
});

export const telemetryConfig = newTelemetryConfig({
  enabled: process.env.OTEL_TRACES_ENABLED === "true",
});

export const config = newConfig({
  appConfig,
  filesystemConfig,
  telemetryConfig,
});
