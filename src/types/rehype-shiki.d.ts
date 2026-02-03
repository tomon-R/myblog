declare module "rehype-shiki" {
  import { Plugin } from "unified";

  interface RehypeShikiOptions {
    theme?: string;
    langs?: string[];
  }

  const rehypeShiki: Plugin<[RehypeShikiOptions?]>;
  export default rehypeShiki;
}
