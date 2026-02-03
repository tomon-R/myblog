import * as React from "react";
import { cn } from "@/lib/utils";

export function CodeBlock({ className, ...props }: React.ComponentProps<"code">) {
  // インラインコードの場合
  if (!className) {
    return (
      <code
        className="rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm"
        {...props}
      />
    );
  }

  // コードブロックの場合（Shikiによって処理済み）
  return <code className={cn(className)} {...props} />;
}
