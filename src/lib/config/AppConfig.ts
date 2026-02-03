export interface AppConfig {
  readonly appName: string;
  readonly appVersion?: string;
  readonly appDescription?: string;
  readonly env: string;
}

export function newAppConfig({
  appName,
  appVersion,
  appDescription,
  env,
}: {
  appName: string;
  appVersion?: string;
  appDescription?: string;
  env: string;
}) {
  return {
    appName,
    appVersion,
    appDescription,
    env,
  } as const;
}
