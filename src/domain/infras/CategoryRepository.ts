import { ICategoryRepository } from "@/domain/interfaces";
import { Category, CategoryId, PostId } from "@/domain/models";
import { FilesystemConfig } from "@/lib/config";
import { Context } from "@/lib/context";
import { startInfra } from "@/lib/init";
import { statSync } from "fs";
import { readdir, readFile, stat } from "fs/promises";
import matter from "gray-matter";
import { join } from "path";
import {
  CategoryMethodNotSupportedError,
  NotFoundCategoryError,
} from "../../domain/errors";

// File I/O implementation
// Consider relative path from root category as an id
export class CategoryRepository implements ICategoryRepository {
  repositoryName: string = "CategoryRepository";
  private readonly postRoot: string;
  private readonly categoryFilename: string;
  private readonly reservedFilenames: string[];

  constructor(conf: FilesystemConfig) {
    this.postRoot = join(process.cwd(), conf.postRootPath);
    this.categoryFilename = conf.categoryFilename;
    this.reservedFilenames = conf.reservedFilenames;

    try {
      const stat = statSync(this.postRoot);
      if (!stat.isDirectory()) {
        throw new NotFoundCategoryError(
          `Root directory not found at: ${conf.postRootPath}`,
        );
      }
    } catch (error) {
      throw new NotFoundCategoryError(
        `Root directory not found at: ${conf.postRootPath}`,
      );
    }
  }

  async getAllAtRoot({
    context: superContext,
  }: {
    context: Context;
  }): Promise<Category[]> {
    let { logger, context, end } = startInfra({
      context: superContext,
      className: this.repositoryName,
      methodName: "getAllAtRoot",
    });

    try {
      const entries = await readdir(this.postRoot);
      const categoryIds: CategoryId[] = [];

      for (const entry of entries) {
        const entryPath = join(this.postRoot, entry);
        const entryInfo = await stat(entryPath);
        const categoryFilePath = join(entryPath, this.categoryFilename);
        let categoryFileInfo;
        try {
          categoryFileInfo = await stat(categoryFilePath);
        } catch (error) {
          // ignore error
        }

        if (entryInfo.isDirectory() && categoryFileInfo?.isFile()) {
          logger.info(`fetching category by id....`);
          categoryIds.push(entry);
        }
      }

      if (categoryIds.length > 0) {
        logger.info(`Found ${categoryIds.length} categories at root`);
      } else {
        logger.warn("No categories found at root");
      }

      const categories = await this.getAllByIds({ context, categoryIds });
      return categories;
    } catch (e) {
      throw e;
    } finally {
      end();
    }
  }

  async getById({
    context: superContext,
    categoryId,
  }: {
    context: Context;
    categoryId: string;
  }): Promise<Category> {
    let { logger, context, end } = startInfra({
      context: superContext,
      className: this.repositoryName,
      methodName: "getById",
    });

    try {
      const categoryPath = join(this.postRoot, categoryId);
      const categoryInfo = await stat(categoryPath);

      if (!categoryInfo.isDirectory()) {
        logger.error(`Category not found at: ${categoryPath}`);
        throw new NotFoundCategoryError(
          `Category not found at: ${categoryPath}`,
        );
      }

      const categoryFilePath = join(categoryPath, this.categoryFilename);
      const categoryFileInfo = await stat(categoryFilePath);

      if (!categoryFileInfo.isFile()) {
        logger.error(`Category file not found at: ${categoryPath}`);
        throw new NotFoundCategoryError(
          `Category flie not found at: ${categoryPath}`,
        );
      }
      const categoryFileContents = await readFile(categoryFilePath, "utf8");
      const { data, content } = matter(categoryFileContents);

      // Name is required
      if (!data.name) {
        logger.error(`Invalid category: missing name`);
        throw new NotFoundCategoryError(`Invalid category: missing name`);
      }

      // Scan directory for children and posts
      const childEntries = await readdir(categoryPath, {
        withFileTypes: true,
      });
      const children: CategoryId[] = [];
      const posts: PostId[] = [];

      for (const child of childEntries) {
        if (child.isDirectory()) {
          children.push(join(categoryId, child.name));
        } else if (child.isFile() && !this.reservedFilenames.includes(child.name)) {
          posts.push(join(categoryId, child.name));
        }
      }

      // Determine parent from path
      const pathParts = categoryId.split("/").filter(Boolean);
      const parent: CategoryId | undefined =
        pathParts.length > 1 ? pathParts.slice(0, -1).join("/") : undefined;

      return new Category({
        id: categoryId,
        name: data.name,
        description: data.description || "",
        content: content,
        featuredPosts: data.featuredPosts,
        parent,
        children: children.length > 0 ? children : undefined,
        posts: posts.length > 0 ? posts : undefined,
      });
    } catch (e) {
      throw e;
    } finally {
      end();
    }
  }

  async getAllByIds({
    context: superContext,
    categoryIds,
  }: {
    context: Context;
    categoryIds: CategoryId[];
  }): Promise<Category[]> {
    let { logger, context, end } = startInfra({
      context: superContext,
      className: this.repositoryName,
      methodName: "getAllByIds",
    });

    try {
      logger.info(`Fetching ${categoryIds.length} categories`);

      const categories = await Promise.all(
        categoryIds.map((categoryId) => this.getById({ context, categoryId })),
      );

      return categories;
    } catch (e) {
      throw e;
    } finally {
      end();
    }
  }

  async save({
    context: superContext,
    category,
  }: {
    context: Context;
    category: Category;
  }): Promise<void> {
    let { logger, context, end } = startInfra({
      context: superContext,
      className: this.repositoryName,
      methodName: "category",
    });
    try {
      throw new CategoryMethodNotSupportedError(
        "Saving Category is not supported.",
      );
    } catch (e) {
      throw e;
    } finally {
      end();
    }
  }
}
