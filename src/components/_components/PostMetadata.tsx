import * as React from "react";
import { Calendar, User, Clock } from "lucide-react";
import { Post } from "@/domain/models/Post";
import { formatDate } from "@/lib/utils/date";
import { cn } from "@/lib/utils";

interface PostMetadataProps {
  post: Post;
  className?: string;
}

export function PostMetadata({ post, className }: PostMetadataProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-4 text-sm text-muted-foreground",
        className
      )}
    >
      {/* Date */}
      <div className="flex items-center gap-2">
        <Calendar className="size-4" />
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </div>

      {/* Author */}
      {post.author && (
        <div className="flex items-center gap-2">
          <User className="size-4" />
          <span>{post.author}</span>
        </div>
      )}

      {/* Read Time */}
      {post.readTime && (
        <div className="flex items-center gap-2">
          <Clock className="size-4" />
          <span>{post.readTime}</span>
        </div>
      )}
    </div>
  );
}
