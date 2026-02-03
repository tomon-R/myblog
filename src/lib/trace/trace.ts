import {
  context,
  trace,
  type Span,
  type SpanOptions,
  type Tracer,
} from "@opentelemetry/api";

export function initTracer(name: string, version?: string): Tracer {
  const tracer = trace.getTracer(name, version);
  return tracer;
}

export function startNewSpan({
  tracer,
  name,
  superSpan,
  options,
}: {
  tracer: Tracer;
  name: string;
  superSpan?: Span;
  options?: SpanOptions;
}): { span: Span; end: () => void } {
  const span = tracer.startSpan(
    name,
    options,
    superSpan ? trace.setSpan(context.active(), superSpan) : undefined
  );
  return { span, end: () => span.end() };
}
