import { AppConfig } from "./AppConfig";
import { FilesystemConfig } from "./FilesystemConfig";

export interface Config {
  appConfig: AppConfig;
  filesystemConfig: FilesystemConfig;
}

export function newConfig({
  appConfig,
  filesystemConfig,
}: {
  appConfig: AppConfig;
  filesystemConfig: FilesystemConfig;
}) {
  return {
    appConfig,
    filesystemConfig,
  } as const;
}
