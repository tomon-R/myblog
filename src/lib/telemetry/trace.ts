import { trace, type Tracer } from "@opentelemetry/api";

export function initTracer(name: string, version?: string): Tracer {
  const tracer = trace.getTracer(name, version);
  return tracer;
}
