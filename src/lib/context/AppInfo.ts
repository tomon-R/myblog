import { AppConfig } from "@/lib/config";
import { LogObject } from "@/lib/logger/logObject";
import { Info } from "./Info";

// アプリケーションの情報
// すべての Context で共通

export class AppInfo implements Info {
  appName: string;
  appVersion?: string;
  env: string;

  constructor(conf: AppConfig) {
    this.appName = conf.appName;
    this.env = conf.env;
    this.appVersion = conf.appVersion;
  }

  toLogObject(): LogObject {
    return {
      appName: this.appName,
      appVersion: this.appVersion ?? "",
      env: this.env,
    };
  }
}
