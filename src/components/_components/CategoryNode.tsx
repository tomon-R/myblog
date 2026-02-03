import Link from "next/link";
import { Calculator, Code2, Folder } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Category } from "@/domain/models";
import { cn } from "@/lib/utils";

export interface CategoryNodeProps {
  category: Category;
}

// カテゴリーIDに基づいてアイコンを選択
function getCategoryIcon(categoryId: string) {
  if (categoryId.includes("math")) {
    return <Calculator className="size-6 text-primary" />;
  }
  if (categoryId.includes("web-dev") || categoryId.includes("react")) {
    return <Code2 className="size-6 text-primary" />;
  }
  return <Folder className="size-6 text-primary" />;
}

export default function CategoryNode({ category }: CategoryNodeProps) {
  const categoryPath = `/category/${category.id}`;
  const icon = getCategoryIcon(category.id);

  // サブカテゴリー数とポスト数を計算
  const subCategoryCount = category.children?.length || 0;
  const postCount = category.posts?.length || 0;

  return (
    <Link href={categoryPath}>
      <Card
        className={cn(
          "h-full transition-all duration-300",
          "hover:shadow-2xl hover:border-primary/50 hover:-translate-y-1",
          "cursor-pointer group"
        )}
      >
        <CardHeader>
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="flex-shrink-0 p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              {icon}
            </div>

            <div className="flex-1 min-w-0">
              <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                {category.name}
              </CardTitle>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {subCategoryCount > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {subCategoryCount} カテゴリー
                  </Badge>
                )}
                {postCount > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {postCount} 記事
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <CardDescription className="line-clamp-2">
            {category.description}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
