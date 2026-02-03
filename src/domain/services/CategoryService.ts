import { ICategoryRepository } from "@/domain/interfaces";
import { Category, CategoryId } from "@/domain/models";
import { Context } from "@/lib/context";
import { startService } from "@/lib/init";

export class CategoryService {
  categoryRepository: ICategoryRepository;
  serviceName: string = "CategoryService";

  constructor({
    categoryRepository,
  }: {
    categoryRepository: ICategoryRepository;
  }) {
    this.categoryRepository = categoryRepository;
  }

  async getAllAtRoot({
    context: superContext,
  }: {
    context: Context;
  }): Promise<Category[]> {
    let { logger, context, end } = startService({
      context: superContext,
      className: this.serviceName,
      methodName: "getAllAtRoot",
    });

    try {
      return await this.categoryRepository.getAllAtRoot({ context });
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
    categoryId: CategoryId;
  }): Promise<Category> {
    const { context, end } = startService({
      context: superContext,
      className: this.serviceName,
      methodName: "getById",
    });

    try {
      return await this.categoryRepository.getById({ context, categoryId });
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
    const { context, end } = startService({
      context: superContext,
      className: this.serviceName,
      methodName: "getAllByIds",
    });

    try {
      return await this.categoryRepository.getAllByIds({ context, categoryIds });
    } catch (e) {
      throw e;
    } finally {
      end();
    }
  }

  async getAllRecursively({
    context: superContext,
  }: {
    context: Context;
  }): Promise<Category[]> {
    let { logger, context, end } = startService({
      context: superContext,
      className: this.serviceName,
      methodName: "getAllRecursively",
    });

    try {
      const rootCategories = await this.categoryRepository.getAllAtRoot({ context });
      const allCategories: Category[] = [...rootCategories];

      // 再帰的に子カテゴリーを収集
      const collectChildren = async (category: Category): Promise<void> => {
        if (category.children && category.children.length > 0) {
          for (const childId of category.children) {
            const childCategory = await this.categoryRepository.getById({
              context,
              categoryId: childId,
            });
            allCategories.push(childCategory);
            await collectChildren(childCategory);
          }
        }
      };

      for (const category of rootCategories) {
        await collectChildren(category);
      }

      return allCategories;
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
    const { context, end } = startService({
      context: superContext,
      className: this.serviceName,
      methodName: "save",
    });

    try {
      return await this.categoryRepository.save({ context, category });
    } catch (e) {
      throw e;
    } finally {
      end();
    }
  }
}
