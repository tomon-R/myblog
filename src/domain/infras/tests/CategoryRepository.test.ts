import { Category } from "@/domain/models";
import {
  CategoryMethodNotSupportedError,
  NotFoundCategoryError,
} from "@/domain/errors";
import { AppConfig, newAppConfig } from "@/lib/config";
import { AppInfo, Context } from "@/lib/context";
import { initLogger } from "@/lib/logger";
import { beforeEach, describe, expect, it } from "vitest";
import { CategoryRepository } from "../CategoryRepository";

describe("CategoryRepository", () => {
  let repository: CategoryRepository;
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

    repository = new CategoryRepository({
      postRootPath: testFixturesDir,
      categoryFilename: "Category.mdx",
      reservedFilenames: ["Category.mdx"],
    });
  });

  describe("constructor", () => {
    it("should throw NotFoundCategoryError with defining with non-exisiting directory", () => {
      expect(() => {
        new CategoryRepository({
          postRootPath: "non-existing-category",
          categoryFilename: "Category.mdx",
          reservedFilenames: ["Category.mdx"],
        });
      }).toThrow(NotFoundCategoryError);
    });
  });

  describe("getById", () => {
    it("should successfully read a valid category", async () => {
      const categoryId = "test-category";
      const category = await repository.getById({
        context,
        categoryId,
      });

      expect(category).toBeDefined();
      expect(category.id).toBe(categoryId);
      expect(category.name).toBe("test-category");
      expect(category.description).toBe("test-category");
      expect(category.content).toContain("test category.");
    });
  });

  describe("save", () => {
    it("should throw CategoryMethodNotSupportedError", async () => {
      const dummyCategory = new Category({
        id: "test",
        name: "Test",
        description: "Test description",
        content: "Test content",
      });

      await expect(
        repository.save({ context, category: dummyCategory })
      ).rejects.toThrow(CategoryMethodNotSupportedError);
    });
  });
});
