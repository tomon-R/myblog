import { config } from "@/lib/config";
import { initTelemetry, shutdownTelemetry } from "@/lib/telemetry";
import { baseLogger, initLogger } from "./lib/logger";

export async function register() {
  // Initialize logger
  initLogger(config);
  baseLogger.info("Logger initialized successfully");

  await initTelemetry(config);
  baseLogger.info("OpenTelemetry SDK started successfully");

  // 正常な終了時
  process.on("SIGTERM", async () => {
    await shutdownTelemetry();
    baseLogger.info("OpenTelemetry SDK shut down successfully");
    process.exit(0);
  });

  // 中断終了時
  process.on("SIGINT", async () => {
    await shutdownTelemetry();
    baseLogger.info("OpenTelemetry SDK shut down successfully");
    process.exit(0);
  });
}
