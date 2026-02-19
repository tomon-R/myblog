import type { ThemeColorKey } from "./colorConfig";

/**
 * コンポーネントの Props で指定できる色トークン。
 * ThemeColorKey のサブセット。
 */
export const COLOR_TOKENS = [
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "accent",
  "accent-foreground",
  "muted",
  "muted-foreground",
  "foreground",
  "background",
  "destructive",
  "border",
  "card",
  "card-foreground",
  "star",
] as const satisfies readonly ThemeColorKey[];

export type ColorToken = (typeof COLOR_TOKENS)[number];

/**
 * ColorToken を CSS 変数参照に変換する。
 * 例: "primary" → "var(--primary)"
 */
export function resolveColor(token: ColorToken): string {
  return `var(--${token})`;
}
