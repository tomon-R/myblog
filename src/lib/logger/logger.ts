import pino from "pino";

import { AppConfig } from "@/lib/config";
import { LogObject } from "./logObject";

export type Logger = pino.Logger;

export let baseLogger: Logger;

// Initializes baseLogger
export function initLogger(conf: AppConfig) {
  // Skip if already initialized
  if (baseLogger) {
    return baseLogger;
  }

  const isLocal = conf.env === "local";

  baseLogger = pino({
    timestamp: pino.stdTimeFunctions.isoTime,

    formatters: {
      level(label: string) {
        return { level: label };
      },
    },

    serializers: {
      error: pino.stdSerializers.err,
    },

    redact: {
      paths: ["password", "token", "apiKey", "secret", "authorization"],
      remove: true,
    },

    ...(isLocal && {
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          levelFirst: true,
          translateTime: "HH:MM:ss Z",
          ignore: "pid,hostname",
          customColors: "error:red,warn:yellow,info:green,debug:blue",
        },
      },
    }),
  });

  return baseLogger;
}

// Returns new logger instance of function scope
export function newLogger(records: LogObject): Logger {
  if (!baseLogger) {
    throw new Error(
      "Logger not initialized. Call initLogger() in app/config.ts first."
    );
  }
  return baseLogger.child(records);
}

// Returns new logger instance that logs additional records
export function include({
  logger,
  records,
}: {
  logger: Logger;
  records: LogObject;
}): Logger {
  return logger.child(records);
}
