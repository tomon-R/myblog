export interface TelemetryConfig {
  readonly enabled: boolean;
  // TODO: add more config (e.g. endpoint, key) when you need to actually use tracer
}

export function newTelemetryConfig({ enabled }: { enabled: boolean }) {
  return {
    enabled,
  } as const;
}
