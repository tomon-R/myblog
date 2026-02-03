import { CategoryRepository } from "@/domain/infras/CategoryRepository";
import { PostRepository } from "@/domain/infras/PostRepository";
import { CategoryService } from "@/domain/services/CategoryService";
import { PostService } from "@/domain/services/PostService";
import { initLogger } from "@/lib/logger";

import { config } from "@/lib/config";

import { cache } from "react";

// Domain の使用宣言。 Domain 領域を初期化する。
export const useDomain = cache(() => {
  initLogger(config.appConfig);

  const infras = {
    categoryRepository: new CategoryRepository(config.filesystemConfig),
    postRepository: new PostRepository(config.filesystemConfig),
  };
  const services = {
    categoryService: new CategoryService({
      categoryRepository: infras.categoryRepository,
    }),
    postService: new PostService({
      postRepository: infras.postRepository,
      categoryRepository: infras.categoryRepository,
    }),
  };
  return {
    services,
  };
});
