import { Post, PostId } from "@/domain/models";
import { Context } from "@/lib/context";

export interface IPostRepository {
  getById({
    context,
    postId,
  }: {
    context: Context;
    postId: PostId;
  }): Promise<Post>;
  getAllByIds({
    context,
    postIds,
  }: {
    context: Context;
    postIds: PostId[];
  }): Promise<Post[]>;
  save({ context, post }: { context: Context; post: Post }): Promise<void>;
}
