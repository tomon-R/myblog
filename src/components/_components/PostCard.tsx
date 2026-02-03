import * as React from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/domain/models/Post";
import { PostMetadata } from "./PostMetadata";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: Post;
  featured?: boolean;
  className?: string;
}

export function PostCard({ post, featured = false, className }: PostCardProps) {
  // ポストIDから.mdxを除去してURLパスを作成
  const postPath = `/posts/${post.id.replace(".mdx", "")}`;

  return (
    <Link href={postPath}>
      <Card
        className={cn(
          "h-full transition-all duration-300 hover:shadow-xl hover:border-primary/50 hover:-translate-y-1",
          featured && "md:col-span-2",
          className
        )}
      >
        <CardHeader>
          <CardTitle
            className={cn(
              "line-clamp-2",
              featured ? "text-2xl" : "text-xl"
            )}
          >
            {post.title}
          </CardTitle>
          <PostMetadata post={post} />
        </CardHeader>

        <CardContent className="space-y-4">
          <CardDescription className="line-clamp-3">
            {post.description}
          </CardDescription>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
