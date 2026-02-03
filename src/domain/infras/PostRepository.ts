import { statSync } from "fs";
import { readFile, stat } from "fs/promises";
import matter from "gray-matter";
import { join } from "path";

import {
  InvalidPostError,
  NotFoundPostError,
  PostMethodNotSupportedError,
} from "@/domain/errors";
import { IPostRepository } from "@/domain/interfaces";
import { Post, PostId } from "@/domain/models";
import { FilesystemConfig } from "@/lib/config";
import { Context } from "@/lib/context";
import { startInfra } from "@/lib/init";

// File I/O implementation
// Consider relative path from root category as an id
export class PostRepository implements IPostRepository {
  private readonly postRoot: string;
  private readonly repositoryName: string = "PostRepository";
  private readonly categoryFilename: string;

  constructor(conf: FilesystemConfig) {
    this.postRoot = join(process.cwd(), conf.postRootPath);
    this.categoryFilename = conf.categoryFilename;

    try {
      const stat = statSync(this.postRoot);
      if (!stat.isDirectory()) {
        throw new NotFoundPostError(
          `Root posts directory not found at: ${conf.postRootPath}`,
        );
      }
    } catch (error) {
      throw new NotFoundPostError(
        `Root posts directory not found at: ${conf.postRootPath}`,
      );
    }
  }

  async getById({
    context: superContext,
    postId,
  }: {
    context: Context;
    postId: PostId;
  }): Promise<Post> {
    let { logger, context, end } = startInfra({
      context: superContext,
      className: this.repositoryName,
      methodName: "getById",
    });

    try {
      const filename = postId.split("/").pop();
      const postPath = join(this.postRoot, postId);

      let postInfo;
      try {
        postInfo = await stat(postPath);
      } catch (error) {
        logger.error(`Post not found: ${postId}`);
        throw new NotFoundPostError(`Post not found: ${postId}`);
      }

      if (
        !postInfo.isFile() ||
        !filename ||
        filename == this.categoryFilename
      ) {
        logger.error(`Invalid post: "${filename}"`);
        throw new InvalidPostError(`Invalid post: "${filename}"`);
      }

      const fileContents = await readFile(postPath, "utf8");
      const { data, content } = matter(fileContents);

      // Requirements
      if (!data.title || !data.date || !data.description || !content) {
        logger.error(`Invalid post: ${postId}`);
        throw new InvalidPostError(`Invalid post: ${postId}`);
      }

      const post: Post = {
        id: postId,
        title: data.title,
        date: data.date,
        description: data.description,
        content: content,
        tags: data.tags,
        author: data.author,
        readTime: data.readTime,
      };

      return post;
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
    let { logger, context, end } = startInfra({
      context: superContext,
      className: this.repositoryName,
      methodName: "getAllByIds",
    });
    try {
      logger.info(`Fetching ${postIds.length} categories`);

      const posts = await Promise.all(
        postIds.map((postId) => this.getById({ context, postId })),
      );

      return posts;
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
    let { logger, context, end } = startInfra({
      context: superContext,
      className: this.repositoryName,
      methodName: "save",
    });
    try {
      throw new PostMethodNotSupportedError("Saving post is not supported.");
    } catch (e) {
      throw e;
    } finally {
      end();
    }
  }
}
