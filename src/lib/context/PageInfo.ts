import { LogObject } from "@/lib/logger/logObject";
import { Info } from "./Info";

// App 領域の page 情報

export class PageInfo implements Info {
  pageName: string;
  path: string;

  constructor({ pageName, path }: { pageName: string; path: string }) {
    this.pageName = pageName;
    this.path = path;
  }

  toLogObject(): LogObject {
    return {
      pageName: this.pageName,
      path: this.path,
    };
  }
}
