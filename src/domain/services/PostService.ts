import { Category, Post, PostId } from "@/domain/models";
import { ICategoryRepository, IPostRepository } from "@/domain/interfaces";
import { Context } from "@/lib/context";
import { startService } from "@/lib/init";
import { include } from "@/lib/logger";

export class PostService {
  serviceName: string = "PostService";
  postRepository: IPostRepository;
  categoryRepository: ICategoryRepository;

  constructor({
    postRepository,
    categoryRepository,
  }: {
    postRepository: IPostRepository;
    categoryRepository: ICategoryRepository;
  }) {
    this.postRepository = postRepository;
    this.categoryRepository = categoryRepository;
  }

  async getById({
    context: superContext,
    postId,
  }: {
    context: Context;
    postId: PostId;
  }): Promise<Post> {
    let { logger, context, end } = startService({
      context: superContext,
      className: this.serviceName,
      methodName: "getById",
    });

    try {
      return await this.postRepository.getById({ context, postId });
    } catch (e) {
      throw e;
    } finally {
      end();
    }
  }

  async getAllByIds({
    context: superContext,
    postIds,
  }: {
    context: Context;
    postIds: PostId[];
  }): Promise<Post[]> {
    let { logger, context, end } = startService({
      context: superContext,
      className: this.serviceName,
      methodName: "getAllByIds",
    });

    try {
      logger = include({ logger, records: { postIds: postIds } });
      logger.info(`getting posts: ${postIds.join(", ")}`);

      return await this.postRepository.getAllByIds({ context, postIds });
    } catch (e) {
      throw e;
    } finally {
      end();
    }
  }

  async getAllByCategory({
    context: superContext,
    category,
  }: {
    context: Context;
    category: Category;
  }): Promise<Post[]> {
    let { logger, context, end } = startService({
      context: superContext,
      className: this.serviceName,
      methodName: "getAllByCategory",
    });

    try {
      const postIds = category.posts || [];
      logger = include({ logger, records: { postIds: postIds } });
      logger.info(`getting posts: ${postIds.join(", ")}`);

      return await this.postRepository.getAllByIds({ context, postIds });
    } catch (e) {
      throw e;
    } finally {
      end();
    }
  }
  async save({
    context: superContext,
    post,
  }: {
    context: Context;
    post: Post;
  }): Promise<void> {
    let { logger, context, end } = startService({
      context: superContext,
      className: this.serviceName,
      methodName: "save",
    });

    try {
      logger = include({ logger, records: { postId: post.id } });
      logger.info(`saving post: ${post.id}`);

      return this.postRepository.save({ context, post });
    } catch (e) {
      throw e;
    } finally {
      end();
    }
  }
}
