import { AppConfig } from "./AppConfig";
import { FilesystemConfig } from "./FilesystemConfig";
import { TelemetryConfig } from "./TelemetryConfig";

export interface Config {
  appConfig: AppConfig;
  filesystemConfig: FilesystemConfig;
  telemetryConfig: TelemetryConfig;
}

export function newConfig({
  appConfig,
  filesystemConfig,
  telemetryConfig,
}: {
  appConfig: AppConfig;
  filesystemConfig: FilesystemConfig;
  telemetryConfig: TelemetryConfig;
}) {
  return {
    appConfig,
    filesystemConfig,
    telemetryConfig,
  } as const;
}
