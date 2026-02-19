export type ThemeColorKey =
  | "background"           // ページ全体の背景色
  | "foreground"           // ページ全体のデフォルトテキスト色
  | "card"                 // カードコンポーネントの背景色
  | "card-foreground"      // カード内のテキスト色
  | "popover"              // ドロップダウン・ツールチップの背景色
  | "popover-foreground"   // ドロップダウン・ツールチップのテキスト色
  | "primary"              // メインアクション・強調要素の色（ボタン・リンク等）
  | "primary-foreground"   // primary 背景上のテキスト色
  | "secondary"            // サブアクション・補助要素の色
  | "secondary-foreground" // secondary 背景上のテキスト色
  | "muted"                // 控えめな背景色（無効状態・区切り等）
  | "muted-foreground"     // 控えめなテキスト色（補足情報・プレースホルダー等）
  | "accent"               // ホバー・選択状態のハイライト色
  | "accent-foreground"    // accent 背景上のテキスト色
  | "destructive"          // 削除・エラー・警告アクションの色
  | "border"               // ボーダー・区切り線の色
  | "input"                // フォーム入力欄のボーダー色
  | "ring"                 // フォーカスリングの色
  // Custom tokens
  | "star";                // Star コンポーネント専用の色

export type Theme = Record<ThemeColorKey, string>;

export type ThemeName = "default" | "dark" | "warm" | "warm-dark";

// ─── カラーパレット ───────────────────────────────────────────────────────────
// 各テーマで使う色に名前をつけて管理する。
// テーマの定義はこのパレットを参照する。

const palette = {
  // default: ニュートラルなモノクロ系
  default: {
    white:       "oklch(1 0 0)",            // 純白
    offWhite:    "oklch(0.985 0 0)",        // わずかにくすんだ白
    lightGray:   "oklch(0.97 0 0)",         // 薄いグレー
    silver:      "oklch(0.922 0 0)",        // シルバー
    pewter:      "oklch(0.708 0 0)",        // 鉛色
    ash:         "oklch(0.556 0 0)",        // 灰色
    charcoal:    "oklch(0.205 0 0)",        // チャコール
    ink:         "oklch(0.145 0 0)",        // インク黒
    crimson:     "oklch(0.577 0.245 27.325)", // 深紅
  },

  // dark: ニュートラルなダークモード
  dark: {
    night:       "oklch(0.145 0 0)",        // 夜の黒
    darkSurface: "oklch(0.205 0 0)",        // 暗い表面
    darkSlate:   "oklch(0.269 0 0)",        // ダークスレート
    dimGray:     "oklch(0.556 0 0)",        // 暗めのグレー
    midGray:     "oklch(0.708 0 0)",        // 中間グレー
    silver:      "oklch(0.922 0 0)",        // シルバー（ダーク primary に使用）
    pale:        "oklch(0.985 0 0)",        // 薄白
    whiteAlpha10: "oklch(1 0 0 / 10%)",    // 白 10% 透過（ボーダー用）
    whiteAlpha15: "oklch(1 0 0 / 15%)",    // 白 15% 透過（インプット用）
    rose:        "oklch(0.704 0.191 22.216)", // ローズレッド
  },

  // warm: 暖かみのあるライトモード
  warm: {
    cream:       "oklch(0.99 0.01 40)",     // クリーム色
    espresso:    "oklch(0.2 0.05 30)",      // エスプレッソ
    darkEspresso: "oklch(0.25 0.05 30)",   // 濃いエスプレッソ
    latte:       "oklch(0.95 0.03 45)",     // ラテ
    sand:        "oklch(0.95 0.02 40)",     // 砂色
    taupe:       "oklch(0.5 0.05 35)",      // トープ（灰茶色）
    apricot:     "oklch(0.85 0.15 50)",     // アプリコット
    sienna:      "oklch(0.58 0.2 35)",      // シエナ（赤茶）
    rust:        "oklch(0.58 0.25 27)",     // 錆色
    warmGray:    "oklch(0.9 0.02 40)",      // 温かみのあるグレー
  },

  // warm-dark: 暖かみのあるダークモード
  "warm-dark": {
    charred:     "oklch(0.15 0.03 25)",     // 焦げ茶
    darkChoco:   "oklch(0.2 0.04 30)",      // ダークチョコ
    darkWalnut:  "oklch(0.28 0.04 35)",     // ダークウォールナット
    mushroom:    "oklch(0.65 0.05 40)",     // マッシュルーム
    linen:       "oklch(0.95 0.02 40)",     // リネン（温かみのある白）
    amber:       "oklch(0.75 0.18 40)",     // アンバー（琥珀）
    teal:        "oklch(0.7 0.2 50)",       // ティール（青緑）
    ember:       "oklch(0.65 0.22 25)",     // 残り火
    linenAlpha12: "oklch(0.95 0.02 40 / 12%)", // リネン 12% 透過（ボーダー用）
    linenAlpha18: "oklch(0.95 0.02 40 / 18%)", // リネン 18% 透過（インプット用）
  },
} as const;

// ─── テーマ定義 ───────────────────────────────────────────────────────────────

export const themes: Record<ThemeName, Theme> = {
  default: {
    background:           palette.default.white,
    foreground:           palette.default.ink,
    card:                 palette.default.white,
    "card-foreground":    palette.default.ink,
    popover:              palette.default.white,
    "popover-foreground": palette.default.ink,
    primary:              palette.default.charcoal,
    "primary-foreground": palette.default.offWhite,
    secondary:            palette.default.lightGray,
    "secondary-foreground": palette.default.charcoal,
    muted:                palette.default.lightGray,
    "muted-foreground":   palette.default.ash,
    accent:               palette.default.lightGray,
    "accent-foreground":  palette.default.charcoal,
    destructive:          palette.default.crimson,
    border:               palette.default.silver,
    input:                palette.default.silver,
    ring:                 palette.default.pewter,
    star:                 palette.default.charcoal,
  },

  dark: {
    background:           palette.dark.night,
    foreground:           palette.dark.pale,
    card:                 palette.dark.darkSurface,
    "card-foreground":    palette.dark.pale,
    popover:              palette.dark.darkSurface,
    "popover-foreground": palette.dark.pale,
    primary:              palette.dark.silver,
    "primary-foreground": palette.dark.darkSurface,
    secondary:            palette.dark.darkSlate,
    "secondary-foreground": palette.dark.pale,
    muted:                palette.dark.darkSlate,
    "muted-foreground":   palette.dark.midGray,
    accent:               palette.dark.darkSlate,
    "accent-foreground":  palette.dark.pale,
    destructive:          palette.dark.rose,
    border:               palette.dark.whiteAlpha10,
    input:                palette.dark.whiteAlpha15,
    ring:                 palette.dark.dimGray,
    star:                 palette.dark.silver,
  },

  warm: {
    background:           palette.warm.cream,
    foreground:           palette.warm.espresso,
    card:                 palette.warm.cream,
    "card-foreground":    palette.warm.espresso,
    popover:              palette.warm.cream,
    "popover-foreground": palette.warm.espresso,
    primary:              palette.warm.sienna,
    "primary-foreground": palette.warm.cream,
    secondary:            palette.warm.latte,
    "secondary-foreground": palette.warm.darkEspresso,
    muted:                palette.warm.sand,
    "muted-foreground":   palette.warm.taupe,
    accent:               palette.warm.apricot,
    "accent-foreground":  palette.warm.espresso,
    destructive:          palette.warm.rust,
    border:               palette.warm.warmGray,
    input:                palette.warm.warmGray,
    ring:                 palette.warm.sienna,
    star:                 palette.warm.sienna,
  },

  "warm-dark": {
    background:           palette["warm-dark"].charred,
    foreground:           palette["warm-dark"].linen,
    card:                 palette["warm-dark"].darkChoco,
    "card-foreground":    palette["warm-dark"].linen,
    popover:              palette["warm-dark"].darkChoco,
    "popover-foreground": palette["warm-dark"].linen,
    primary:              palette["warm-dark"].amber,
    "primary-foreground": palette["warm-dark"].charred,
    secondary:            palette["warm-dark"].darkWalnut,
    "secondary-foreground": palette["warm-dark"].linen,
    muted:                palette["warm-dark"].darkWalnut,
    "muted-foreground":   palette["warm-dark"].mushroom,
    accent:               palette["warm-dark"].teal,
    "accent-foreground":  palette["warm-dark"].linen,
    destructive:          palette["warm-dark"].ember,
    border:               palette["warm-dark"].linenAlpha12,
    input:                palette["warm-dark"].linenAlpha18,
    ring:                 palette["warm-dark"].amber,
    star:                 palette["warm-dark"].amber,
  },
};
