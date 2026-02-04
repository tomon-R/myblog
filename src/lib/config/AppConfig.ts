export interface AppConfig {
  readonly appName: string;
  readonly appVersion?: string;
  readonly appDescription?: string;
  readonly env: string;
  readonly runtime?: string;
}

export function newAppConfig({
  appName,
  appVersion,
  appDescription,
  env,
  runtime,
}: {
  appName: string;
  appVersion?: string;
  appDescription?: string;
  env: string;
  runtime?: string;
}) {
  return {
    appName,
    appVersion,
    appDescription,
    env,
    runtime,
  } as const;
}
