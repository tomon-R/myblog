import { ICategoryRepository } from "@/domain/interfaces";
import { Category } from "@/domain/models";
import { CategoryService } from "@/domain/services/CategoryService";
import { AppConfig, newAppConfig } from "@/lib/config";
import { AppInfo, Context } from "@/lib/context";
import { initLogger } from "@/lib/logger";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("CategoryService", () => {
  let categoryRepository: ICategoryRepository;
  let categoryService: CategoryService;
  let context: Context;

  beforeEach(() => {
    categoryRepository = {
      getAllAtRoot: vi.fn(),
      getById: vi.fn(),
      getAllByIds: vi.fn(),
      save: vi.fn(),
    };

    const appConfig: AppConfig = newAppConfig({
      appName: "myblog",
      appVersion: "test",
      appDescription: "",
      env: "test",
    });

    initLogger(appConfig);

    const appInfo = new AppInfo(appConfig);
    context = new Context({ app: appInfo });

    categoryService = new CategoryService({
      categoryRepository,
    });
  });

  it("should get category by id", async () => {
    const mockCategory = new Category({
      id: "test-id",
      name: "Test Category",
      description: "Test Description",
      content: "Test Content",
    });

    vi.mocked(categoryRepository.getById).mockResolvedValue(mockCategory);

    const result = await categoryService.getById({
      context: context,
      categoryId: "test-id",
    });

    expect(result).toEqual(mockCategory);
    expect(categoryRepository.getById).toHaveBeenCalledWith({
      context: expect.objectContaining({
        app: expect.objectContaining({
          env: context.app.env,
        }),
      }),
      categoryId: "test-id",
    });
  });

  it("should save category", async () => {
    const mockCategory = new Category({
      id: "test-id",
      name: "Test Category",
      description: "Test Description",
      content: "Test Content",
    });

    vi.mocked(categoryRepository.save).mockResolvedValue(undefined);

    await categoryService.save({
      context: context,
      category: mockCategory,
    });

    expect(categoryRepository.save).toHaveBeenCalledWith({
      context: expect.objectContaining({
        app: expect.objectContaining({
          env: context.app.env,
        }),
      }),
      category: mockCategory,
    });
  });
});
