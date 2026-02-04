import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { ConsoleSpanExporter } from "@opentelemetry/sdk-trace-node";
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";

import { Config } from "@/lib/config";
import { baseLogger } from "@/lib/logger";

let sdk: NodeSDK | undefined;

export function initTelemetry(config: Config): void {
  // Only initialize once
  if (sdk) {
    return;
  }

  // Create resource with service information
  const resource = resourceFromAttributes({
    [ATTR_SERVICE_NAME]: config.appConfig.appName,
    [ATTR_SERVICE_VERSION]: config.appConfig.appVersion,
    environment: config.appConfig.env,
  });

  // まだ使わない予定。有効化しても console の exporter を使う。
  const traceExporter = config.telemetryConfig.enabled
    ? new ConsoleSpanExporter()
    : undefined;

  sdk = new NodeSDK({
    resource,
    ...(traceExporter && { traceExporter }),
    instrumentations: [
      getNodeAutoInstrumentations({
        "@opentelemetry/instrumentation-fs": {
          enabled: false,
        },
        "@opentelemetry/instrumentation-http": {
          enabled: true,
        },
        "@opentelemetry/instrumentation-net": {
          enabled: false,
        },
      }),
    ],
  });

  try {
    sdk.start();
  } catch (error) {
    baseLogger.error({ error }, "Error initializing OpenTelemetry SDK");
  }
}

export async function shutdownTelemetry(): Promise<void> {
  if (sdk) {
    try {
      await sdk.shutdown();
    } catch (error) {
      baseLogger.error({ error }, "Error shutting down OpenTelemetry SDK");
    }
  }
}
