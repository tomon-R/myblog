import { Post } from "@/domain/models";
import {
  InvalidPostError,
  NotFoundPostError,
  PostMethodNotSupportedError,
} from "@/domain/errors";
import { AppConfig, newAppConfig } from "@/lib/config";
import { AppInfo, Context } from "@/lib/context";
import { initLogger } from "@/lib/logger";
import { beforeEach, describe, expect, it } from "vitest";
import { PostRepository } from "../PostRepository";

describe("PostRepository", () => {
  let repository: PostRepository;
  let context: Context;
  const testFixturesDir = "src/infrastructure/filesystem/tests/fixtures";

  beforeEach(() => {
    const appConfig: AppConfig = newAppConfig({
      appName: "myblog",
      appVersion: "test",
      appDescription: "",
      env: "test",
    });

    initLogger(appConfig);

    const appInfo = new AppInfo(appConfig);
    context = new Context({ app: appInfo });

    repository = new PostRepository({
      postRootPath: testFixturesDir,
      categoryFilename: "Category.mdx",
      reservedFilenames: ["Category.mdx"],
    });
  });

  describe("getById", () => {
    it("should successfully read a valid post", async () => {
      const postPath = `valid-post.mdx`;
      const post = await repository.getById({ context, postId: postPath });

      expect(post).toBeDefined();
      expect(post.id).toBe(postPath);
      expect(post.title).toBe("Test Post Title");
      expect(post.date).toBe("2024-01-15");
      expect(post.description).toBe("This is a test post description");
      expect(post.content).toContain("Test Post Content");
      expect(post.tags).toEqual(["test", "sample"]);
      expect(post.author).toBe("Test Author");
      expect(post.readTime).toBe("5 min");
    });

    it("should throw NotFoundPostError when file does not exist", async () => {
      await expect(
        repository.getById({ context, postId: `non-existent.mdx` })
      ).rejects.toThrow(NotFoundPostError);
    });

    it("should throw InvalidPostError when title is missing", async () => {
      await expect(
        repository.getById({ context, postId: `invalid-no-title.mdx` })
      ).rejects.toThrow(InvalidPostError);
    });

    it("should throw InvalidPostError when content is empty", async () => {
      await expect(
        repository.getById({ context, postId: `invalid-no-content.mdx` })
      ).rejects.toThrow(InvalidPostError);
    });

    it("should throw InvalidPostError when file extension is not .mdx", async () => {
      await expect(
        repository.getById({ context, postId: "not-mdx-file.txt" })
      ).rejects.toThrow(InvalidPostError);
    });

    it("should throw InvalidPostError when fileName is empty", async () => {
      await expect(repository.getById({ context, postId: "" })).rejects.toThrow(
        InvalidPostError
      );
    });
  });

  describe("save", () => {
    it("should throw PostMethodNotSupportedError", async () => {
      const dummyPost: Post = {
        id: "test",
        title: "Test",
        date: "2024-01-01",
        description: "Test",
        content: "Test content",
      };

      await expect(
        repository.save({ context, post: dummyPost })
      ).rejects.toThrow(PostMethodNotSupportedError);
    });
  });
});
