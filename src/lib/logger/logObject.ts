export type LogValue =
  | string
  | number
  | boolean
  | null
  | LogValue[]
  | { [key: string]: LogValue };

export type LogObject = Record<string, LogValue>;
