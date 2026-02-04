import {
  context,
  trace,
  type Span,
  type SpanOptions,
  type Tracer,
} from "@opentelemetry/api";

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
    superSpan ? trace.setSpan(context.active(), superSpan) : undefined,
  );
  return { span, end: () => span.end() };
}
