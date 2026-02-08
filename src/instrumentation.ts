import { config } from "@/lib/config";
import { initTelemetry, shutdownTelemetry } from "@/lib/telemetry";
import { baseLogger, initLogger } from "./lib/logger";

export async function register() {
  // どのランタイムでも logger を初期化する
  initLogger(config);
  baseLogger.info("Logger initialized successfully");

  if (config.appConfig.runtime === "nodejs") {
    await initTelemetry(config);
    baseLogger.info("OpenTelemetry SDK started successfully");

    // globalThis 経由でアクセスすることで Edge Runtime の静的解析による警告を回避する
    const nodeProcess = globalThis.process;

    // 正常な終了時
    nodeProcess.on("SIGTERM", async () => {
      baseLogger.info("SIGTERM received, shutting down gracefully");
      await shutdownTelemetry();
      baseLogger.info("OpenTelemetry SDK shut down successfully");
      nodeProcess.exit(0);
    });

    // 中断終了時
    nodeProcess.on("SIGINT", async () => {
      baseLogger.info("SIGINT received, shutting down gracefully");
      await shutdownTelemetry();
      baseLogger.info("OpenTelemetry SDK shut down successfully");
      nodeProcess.exit(0);
    });

    baseLogger.info("Process exit handlers registered for Node.js runtime");
  } else {
    // node.js 以外のランタイムではテレメトリーは使用しない
    baseLogger.info(
      "Telemetry not initialized with runtime: " + config.appConfig.runtime,
    );
  }
}
