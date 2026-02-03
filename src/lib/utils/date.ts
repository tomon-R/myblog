/**
 * 日付文字列を指定されたフォーマットに変換します
 * @param dateString - ISO 8601形式の日付文字列（例: "2024-03-20"）
 * @param locale - ロケール（デフォルト: "ja-JP"）
 * @returns フォーマットされた日付文字列
 */
export function formatDate(
  dateString: string,
  locale: string = "ja-JP"
): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch (error) {
    console.error("Invalid date string:", dateString);
    return dateString;
  }
}

/**
 * 日付文字列を相対的な時間表現に変換します（例: "3日前"）
 * @param dateString - ISO 8601形式の日付文字列
 * @param locale - ロケール（デフォルト: "ja-JP"）
 * @returns 相対時間文字列
 */
export function formatRelativeTime(
  dateString: string,
  locale: string = "ja-JP"
): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

    if (years > 0) return rtf.format(-years, "year");
    if (months > 0) return rtf.format(-months, "month");
    if (days > 0) return rtf.format(-days, "day");
    if (hours > 0) return rtf.format(-hours, "hour");
    if (minutes > 0) return rtf.format(-minutes, "minute");
    return rtf.format(-seconds, "second");
  } catch (error) {
    console.error("Invalid date string:", dateString);
    return dateString;
  }
}

/**
 * 日付文字列をISO 8601形式に変換します
 * @param dateString - 日付文字列
 * @returns ISO 8601形式の日付文字列
 */
export function toISOString(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toISOString();
  } catch (error) {
    console.error("Invalid date string:", dateString);
    return dateString;
  }
}
