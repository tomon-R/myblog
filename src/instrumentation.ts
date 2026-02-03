import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { ConsoleSpanExporter } from "@opentelemetry/sdk-trace-node";
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";

import { appConfig } from "@/lib/config/instance";
import { initLogger } from "@/lib/logger";

let sdk: NodeSDK | undefined;

export async function register() {
  // Only initialize once
  if (sdk) {
    return;
  }

  // Initialize logger
  initLogger(appConfig);
  console.log("Logger initialized successfully");

  // Create resource with service information
  const resource = resourceFromAttributes({
    [ATTR_SERVICE_NAME]: process.env.OTEL_SERVICE_NAME || "my-blog",
    [ATTR_SERVICE_VERSION]: process.env.OTEL_SERVICE_VERSION || "0.1.0",
    environment: process.env.ENV || "development",
  });

  // Only enable console trace output if explicitly requested
  const traceExporter =
    process.env.OTEL_TRACES_ENABLED === "true"
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
    console.log("OpenTelemetry SDK started successfully");
    if (traceExporter) {
      console.log("Traces will be output to console");
    } else {
      console.log(
        "Console trace output disabled. Set OTEL_TRACES_ENABLED=true to enable."
      );
    }
  } catch (error) {
    console.error(`Error initializing OpenTelemetry SDK: ${error}`);
  }
}

// Export shutdown function for manual cleanup if needed
export async function shutdown() {
  if (sdk) {
    try {
      await sdk.shutdown();
      console.log("OpenTelemetry SDK shut down successfully");
    } catch (error) {
      console.error(`Error shutting down OpenTelemetry SDK: ${error}`);
    }
  }
}
