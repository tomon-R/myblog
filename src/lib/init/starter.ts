import { CallStackInfo, Context, TraceInfo } from "@/lib/context";
import { Logger, newLogger } from "@/lib/logger";
import { startNewSpan } from "@/lib/telemetry";

// Service 層関数にて Context を初期化し、 Logger を提供する補助関数

export function startService({
  context: superContext,
  className,
  methodName,
}: {
  context: Context;
  className: string;
  methodName: string;
}): { context: Context; logger: Logger; end: () => void } {
  let context = superContext;
  let end = () => {};

  const superTraceInfo = superContext.trace;
  if (superTraceInfo) {
    const { span, end: endFunc } = startNewSpan({
      tracer: superTraceInfo.tracer,
      superSpan: superTraceInfo.span,
      name: `${className}.${methodName}`,
    });
    end = endFunc;

    const newTraceInfo = new TraceInfo({ tracer: superTraceInfo.tracer, span });
    context = context.set(newTraceInfo);
  }

  const superCallStackInfo = superContext.callstack;
  if (superCallStackInfo) {
    const newCallStackInfo = superCallStackInfo.addCall(
      `${className}.${methodName}`,
    );
    context = context.set(newCallStackInfo);
  } else {
    const callStackInfo = new CallStackInfo().addCall(
      `${className}.${methodName}`,
    );
    context = context.set(callStackInfo);
  }

  const logger = newLogger(context.toLogObject());

  return { context, logger, end };
}

// Infra 層関数にて Context を初期化し、 Logger を提供する補助関数

export function startInfra({
  context: superContext,
  className,
  methodName,
}: {
  context: Context;
  className: string;
  methodName: string;
}): { context: Context; logger: Logger; end: () => void } {
  let context = superContext;
  let end = () => {};

  const superTraceInfo = superContext.trace;
  if (superTraceInfo) {
    const { span, end: endFunc } = startNewSpan({
      tracer: superTraceInfo.tracer,
      superSpan: superTraceInfo.span,
      name: `${className}.${methodName}`,
    });
    end = endFunc;
    const newTraceInfo = new TraceInfo({ tracer: superTraceInfo.tracer, span });
    context = context.set(newTraceInfo);
  }

  const superCallStackInfo = superContext.callstack;
  if (superCallStackInfo) {
    const newCallStackInfo = superCallStackInfo.addCall(
      `${className}.${methodName}`,
    );
    context = context.set(newCallStackInfo);
  } else {
    const callStackInfo = new CallStackInfo().addCall(
      `${className}.${methodName}`,
    );
    context = context.set(callStackInfo);
  }

  const logger = newLogger(context.toLogObject());

  return { context, logger, end };
}

// Infra 層にて Outer 層の関数（API や DB インタラクション）の Span を初期化する補助関数

export function startOuter({
  context: superContext,
  name,
}: {
  context: Context;
  name: string;
}): () => void {
  let end = () => {};

  const superTraceInfo = superContext.trace;
  if (superTraceInfo) {
    const { end: endFunc } = startNewSpan({
      tracer: superTraceInfo.tracer,
      superSpan: superTraceInfo.span,
      name: name,
    });
    end = endFunc;
  }

  return end;
}
