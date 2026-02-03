# Error

このアプリケーションでは、エラーと警告を型安全に扱うための独自のエラーシステムを提供します。このエラーシステムは 2 つの原則に従って成り立ちます。

**原則 1. CustomError は内部で定義される**

CustomError が定義されるケースは 2 つあります。

1. 既知の内部エラーを表現する
2. 外部層に由来する外部エラーをラッピングする

**原則 2. 発生したエラーは最表層まで伝播する**

Service 層、Infra 層で発生したエラーは Adaptor 層まで伝播します。

### 既知の内部エラーを表現する

アプリケーション内で予測可能なエラー状態は、CustomError として明示的に定義します。

```typescript
export class NotFoundPostError extends PostError {
  constructor(message: string) {
    super("NotFound", message);
    this.addChildName("NotFound");
  }
}
```

これにより、エラーの種類を型で判別でき (`instanceof`)、HTTP ステータスコードとの対応が明確になります。

### 外部エラーをラッピングする

外部システム（ファイルシステム、データベース、API など）から発生する生のエラーは、CustomError でラッピングします。

```typescript
// Infrastructure 層
getById({ id, context }: { id: PostId; context: Context }): Post {
  try {
    fileContents = readFileSync(fullPath, "utf8");
  } catch (e) {
    // 外部エラーを CustomError に変換
    throw new NotFoundPostError(`Post file not found at: ${id}`);
  }
  return post;
}
```

**なぜラッピングするのか**: 上位層は外部システムの実装詳細を知る必要がなくなり、外部ライブラリを変更してもエラーハンドリングのインターフェースは変わりません。

## 原則 2: 発生したエラーは最表層まで伝播する

エラーは発生した層から最表層（App 層）まで伝播します：

```
Infrastructure 層:  CustomError を throw
        ↓
Service 層:         エラーをそのまま伝播（try-catch なし）
        ↓
Adaptor 層:         エラーを catch して最終ハンドリング
```

### 例外: エラーに情報を追加する場合

Service 層でエラーに追加情報を付与する必要がある場合のみ、`try-catch` を使用します：

```typescript
try {
  return this.postRepository.getAllByIds({ ids, context });
} catch (error) {
  if (error instanceof CustomError) {
    error.addChildName(`InCategory:${category.id}`);
  }
  throw error; // 必ず再 throw
}
```
