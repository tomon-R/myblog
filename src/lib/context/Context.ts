import type { Attributes, AttributeValue } from "@opentelemetry/api";

import { LogObject } from "@/lib/logger/logObject";
import { AppInfo } from "./AppInfo";
import { CallStackInfo } from "./CallStackInfo";
import { Info } from "./Info";
import { PageInfo } from "./PageInfo";
import { TraceInfo } from "./TraceInfo";

// Context は情報を継承し、呼び出される関数に分散することを目的としています。
// 情報はログに抽出することができます。

// TODO: Add other properties like user info
export class Context {
  app: AppInfo;
  trace?: TraceInfo;
  page?: PageInfo;
  callstack?: CallStackInfo;

  constructor({
    app,
    trace,
    page,
    callstack,
  }: {
    app: AppInfo;
    trace?: TraceInfo;
    page?: PageInfo;
    callstack?: CallStackInfo;
  }) {
    this.app = app;
    this.trace = trace;
    this.page = page;
    this.callstack = callstack;
  }

  // Converts all info into one LogObject
  toLogObject(): LogObject {
    const logObject: LogObject = {};

    if (this.app) {
      Object.assign(logObject, this.app.toLogObject());
    }

    if (this.page) {
      Object.assign(logObject, this.page.toLogObject());
    }

    if (this.trace) {
      Object.assign(logObject, this.trace.toLogObject());
    }

    if (this.callstack) {
      Object.assign(logObject, this.callstack.toLogObject());
    }

    return logObject;
  }

  // Converts to OpenTelemetry Attributes
  toSpanAttribute(): Attributes {
    const logObject = this.toLogObject();
    const attributes: Attributes = {};

    for (const [key, value] of Object.entries(logObject)) {
      if (value === null || value === undefined) {
        continue; // Skip null/undefined values
      }

      if (Array.isArray(value)) {
        // Convert arrays to JSON string to handle mixed types
        attributes[key] = JSON.stringify(value);
      } else if (typeof value === "object") {
        // Convert nested objects to JSON string
        attributes[key] = JSON.stringify(value);
      } else {
        // Primitive values (string, number, boolean)
        attributes[key] = value as AttributeValue;
      }
    }

    return attributes;
  }

  set(info: Info): Context {
    if (info instanceof AppInfo) {
      return new Context({
        ...this,
        app: info,
      });
    }

    if (info instanceof PageInfo) {
      return new Context({
        ...this,
        page: info,
      });
    }

    if (info instanceof TraceInfo) {
      return new Context({
        ...this,
        trace: info,
      });
    }

    if (info instanceof CallStackInfo) {
      return new Context({
        ...this,
        callstack: info,
      });
    }

    return this;
  }
}
