import * as React from "react";
import { cn } from "@/lib/utils";

export function Pre({ className, ...props }: React.ComponentProps<"pre">) {
  return (
    <pre
      className={cn(
        "overflow-x-auto rounded-lg border bg-muted p-4 text-sm",
        className
      )}
      {...props}
    />
  );
}
