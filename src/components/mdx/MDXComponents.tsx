import * as React from "react";
import Link from "next/link";
import { CodeBlock } from "./CodeBlock";
import { Pre } from "./Pre";
import { cn } from "@/lib/utils";

export const mdxComponents = {
  // Headings
  h1: ({ className, ...props }: React.ComponentProps<"h1">) => (
    <h1
      className={cn(
        "mt-8 scroll-m-20 text-4xl font-bold tracking-tight font-rajdhani",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.ComponentProps<"h2">) => (
    <h2
      className={cn(
        "mt-8 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.ComponentProps<"h3">) => (
    <h3
      className={cn(
        "mt-6 scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.ComponentProps<"h4">) => (
    <h4
      className={cn(
        "mt-6 scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.ComponentProps<"h5">) => (
    <h5
      className={cn(
        "mt-6 scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.ComponentProps<"h6">) => (
    <h6
      className={cn(
        "mt-6 scroll-m-20 text-base font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),

  // Paragraph
  p: ({ className, ...props }: React.ComponentProps<"p">) => (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-4", className)} {...props} />
  ),

  // Lists
  ul: ({ className, ...props }: React.ComponentProps<"ul">) => (
    <ul className={cn("my-4 ml-6 list-disc [&>li]:mt-2", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.ComponentProps<"ol">) => (
    <ol className={cn("my-4 ml-6 list-decimal [&>li]:mt-2", className)} {...props} />
  ),
  li: ({ className, ...props }: React.ComponentProps<"li">) => (
    <li className={cn("", className)} {...props} />
  ),

  // Blockquote
  blockquote: ({ className, ...props }: React.ComponentProps<"blockquote">) => (
    <blockquote
      className={cn(
        "mt-4 border-l-4 border-primary pl-6 italic text-muted-foreground [&>*]:text-muted-foreground",
        className
      )}
      {...props}
    />
  ),

  // Table
  table: ({ className, ...props }: React.ComponentProps<"table">) => (
    <div className="my-4 w-full overflow-x-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  thead: ({ className, ...props }: React.ComponentProps<"thead">) => (
    <thead className={cn("border-b", className)} {...props} />
  ),
  tbody: ({ className, ...props }: React.ComponentProps<"tbody">) => (
    <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  ),
  tr: ({ className, ...props }: React.ComponentProps<"tr">) => (
    <tr className={cn("border-b transition-colors hover:bg-muted/50", className)} {...props} />
  ),
  th: ({ className, ...props }: React.ComponentProps<"th">) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-semibold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.ComponentProps<"td">) => (
    <td
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),

  // Code
  code: CodeBlock,
  pre: Pre,

  // Link
  a: ({ className, href, ...props }: React.ComponentProps<"a">) => {
    // 外部リンクの場合
    if (href?.startsWith("http")) {
      return (
        <a
          className={cn(
            "font-medium text-primary underline underline-offset-4 hover:text-primary/80",
            className
          )}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        />
      );
    }

    // 内部リンクの場合
    return (
      <Link
        className={cn(
          "font-medium text-primary underline underline-offset-4 hover:text-primary/80",
          className
        )}
        href={href || "#"}
        {...props}
      />
    );
  },

  // Horizontal Rule
  hr: ({ className, ...props }: React.ComponentProps<"hr">) => (
    <hr className={cn("my-8 border-border", className)} {...props} />
  ),

  // Image
  img: ({
    className,
    alt,
    ...props
  }: React.ComponentProps<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cn("rounded-lg border", className)}
      alt={alt}
      {...props}
    />
  ),

  // Strong and Emphasis
  strong: ({ className, ...props }: React.ComponentProps<"strong">) => (
    <strong className={cn("font-semibold", className)} {...props} />
  ),
  em: ({ className, ...props }: React.ComponentProps<"em">) => (
    <em className={cn("italic", className)} {...props} />
  ),
};
