"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // エラーをコンソールにログ出力
    console.error("Post page error:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <div className="flex items-center gap-2 text-destructive mb-2">
            <AlertCircle className="size-6" />
            <CardTitle>エラーが発生しました</CardTitle>
          </div>
          <CardDescription>
            記事の読み込み中に問題が発生しました。
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            {error.message || "不明なエラーが発生しました。"}
          </p>
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button onClick={reset} variant="default">
            もう一度試す
          </Button>
          <Button asChild variant="outline">
            <Link href="/">ホームに戻る</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
