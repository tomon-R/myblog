import { Category, CategoryId } from "@/domain/models";
import { Context } from "@/lib/context";

export interface ICategoryRepository {
  getAllAtRoot({ context }: { context: Context }): Promise<Category[]>;
  getById({
    context,
    categoryId,
  }: {
    context: Context;
    categoryId: CategoryId;
  }): Promise<Category>;
  getAllByIds({
    context,
    categoryIds,
  }: {
    context: Context;
    categoryIds: CategoryId[];
  }): Promise<Category[]>;
  save({
    context,
    category,
  }: {
    context: Context;
    category: Category;
  }): Promise<void>;
}
