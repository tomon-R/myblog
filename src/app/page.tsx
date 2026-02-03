import { getDomain } from "@/app/domain";
import { appConfig } from "@/lib/config/instance";
import { AppInfo, Context, PageInfo } from "@/lib/context";
import HomePageClient from "@/components/_components/HomePageClient";

export default async function HomePage() {
  const { services } = getDomain();
  const { categoryService } = services;

  const appInfo = new AppInfo(appConfig);
  const pageInfo = new PageInfo({ pageName: "Home", path: "/" });
  const context = new Context({ app: appInfo }).set(pageInfo);

  const categories = await categoryService.getAllAtRoot({ context });

  // Convert Category instances to plain objects for Client Component
  const plainCategories = categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    content: category.content,
    featuredPosts: category.featuredPosts,
    parent: category.parent,
    children: category.children,
    posts: category.posts,
  }));

  return <HomePageClient categories={plainCategories} />;
}
