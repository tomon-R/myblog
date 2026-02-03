import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Item, ItemContent, ItemTitle, ItemDescription } from "@/components/ui/item";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/domain/models/Post";
import { PostMetadata } from "./PostMetadata";
import { cn } from "@/lib/utils";

interface PostListItemProps {
  post: Post;
  className?: string;
}

export function PostListItem({ post, className }: PostListItemProps) {
  // ポストIDから.mdxを除去してURLパスを作成
  const postPath = `/posts/${post.id.replace(".mdx", "")}`;

  return (
    <Link href={postPath}>
      <Item
        className={cn(
          "transition-all duration-300 hover:shadow-lg hover:border-primary/50",
          className
        )}
      >
        <ItemContent>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <ItemTitle className="line-clamp-1">{post.title}</ItemTitle>
              <PostMetadata post={post} />
              <ItemDescription className="line-clamp-2">
                {post.description}
              </ItemDescription>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{post.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Arrow Icon */}
            <div className="flex-shrink-0 pt-1">
              <ArrowRight className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>
        </ItemContent>
      </Item>
    </Link>
  );
}
