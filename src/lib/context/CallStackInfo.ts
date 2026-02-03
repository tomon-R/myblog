import { LogObject } from "@/lib/logger/logObject";
import { Info } from "./Info";

// CallStack の情報
// Adapter 領域、 Domain 領域から使用する

export class CallStackInfo implements Info {
  callStack: string[];

  constructor(callStack: string[] = []) {
    this.callStack = callStack;
  }

  addCall(name: string): CallStackInfo {
    return new CallStackInfo([...this.callStack, name]);
  }

  toLogObject(): LogObject {
    return {
      executionPath: this.callStack.join(" -> "),
      callDepth: this.callStack.length,
    };
  }
}
