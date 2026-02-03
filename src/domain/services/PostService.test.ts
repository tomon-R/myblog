import { ICategoryRepository, IPostRepository } from "@/domain/interfaces";
import { Post } from "@/domain/models";
import { PostService } from "@/domain/services/PostService";
import { AppConfig, newAppConfig } from "@/lib/config";
import { AppInfo, Context, TraceInfo } from "@/lib/context";
import { initLogger } from "@/lib/logger";
import { initTracer, startNewSpan } from "@/lib/trace";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("PostService", () => {
  let postRepository: IPostRepository;
  let categoryRepository: ICategoryRepository;
  let postService: PostService;
  let context: Context;

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
    const tracer = initTracer(appConfig.appName, appConfig.appVersion);
    const { span } = startNewSpan({ tracer, name: "test" });
    const traceInfo = new TraceInfo({ tracer, span });
    context = context.set(traceInfo);

    postRepository = {
      getById: vi.fn(),
      getAllByIds: vi.fn(),
      save: vi.fn(),
    };

    categoryRepository = {
      getAllAtRoot: vi.fn(),
      getById: vi.fn(),
      getAllByIds: vi.fn(),
      save: vi.fn(),
    };

    postService = new PostService({
      postRepository,
      categoryRepository,
    });
  });

  it("should get post by id", async () => {
    const mockPost = new Post({
      id: "test-id",
      title: "Test",
      date: "12-01",
      description: "",
      content: "nothing",
    });
    vi.mocked(postRepository.getById).mockResolvedValue(mockPost);

    const result = await postService.getById({
      context: context,
      postId: "test-id",
    });

    expect(result).toEqual(mockPost);
    expect(postRepository.getById).toHaveBeenCalledWith({
      context: expect.objectContaining({
        app: expect.objectContaining({
          env: context.app.env,
        }),
        callstack: expect.any(Object),
        trace: expect.any(Object),
      }),
      postId: "test-id",
    });
  });
});
