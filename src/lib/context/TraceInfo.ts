import { type Span, type Tracer } from "@opentelemetry/api";

import { LogObject } from "@/lib/logger/logObject";
import { Info } from "./Info";

// OpenTelemetry Trace / Span の情報
// Adapter 領域、 Domain 領域から使用する

export class TraceInfo implements Info {
  tracer: Tracer;
  span: Span;

  constructor({ tracer, span }: { tracer: Tracer; span: Span }) {
    this.tracer = tracer;
    this.span = span;
  }

  toLogObject(): LogObject {
    const spanContext = this.span.spanContext();
    return {
      traceId: spanContext.traceId,
      spanId: spanContext.spanId,
    };
  }
}
