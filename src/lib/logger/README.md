# Logger

このアプリケーションのロガーは、[Pino](https://getpino.io/) 上に構築された、構造化されたコンテキスト対応のロギングソリューションを提供します。アプリケーションのアーキテクチャ内で効率的、安全、かつ容易に使用できるように設計されています。

## 基本原則

1.  **構造化ロギング**: すべてのログは JSON オブジェクト (`LogObject`) として生成され、機械による解析、フィルタリング、分析が容易です。
2.  **コンテキストロギング**: ロガーは階層的です。ベースロガーは、アプリケーションの異なるレイヤー（例：ハンドラからサービスへ）を通過する際にコンテキスト情報で拡張されます。
3.  **Singleton Pattern**: ロガーは Singleton Pattern を採用しており、アプリケーション全体で単一のベースロガーインスタンスを共有します。これにより、設定の一貫性とメモリ効率が保証されます。

## 初期化

ロガーは、アプリケーションの起動時に一度だけ初期化する必要があります。これは、`initLogger()` をアプリケーション設定で呼び出すことによって行われます。

```typescript
// src/lib/init/starter.ts または同様のエントリポイントで
import { initLogger } from "@/lib/logger";
import { appConfig } from "@/lib/config";

// アプリケーション全体のためのベースロガーを初期化する
initLogger(appConfig);
```

## 使用方法

### スコープ用のロガーを作成する

`newLogger` を使用して、特定の機能スコープ（例：ハンドラやサービスメソッド）用の新しいロガーインスタンスを作成します。この関数は、初期化されたベースロガーから子ロガーを作成します。現在の `Context` からの情報を含めることがベストプラクティスです。

```typescript
import { newLogger } from "@/lib/logger";
import { Context } from "@/lib/context";

function handleRequest(context: Context) {
  // コンテキスト固有の情報を持つロガーを作成する
  const logger = newLogger(context.toLogObject());

  logger.info("Handling request started.");
  // ... ビジネスロジック ...
  logger.info("Handling request finished.");
}
```
