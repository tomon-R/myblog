import { useDomain } from "@/app/domain";
import Hero from "@/app/Hero";
import HomePageClient from "@/components/_components/HomePageClient";
import { appConfig } from "@/lib/config/instance";
import { AppInfo, Context, PageInfo } from "@/lib/context";

export default async function HomePage() {
  const { services } = useDomain();
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

  return (
    <>
      <section>
        <Hero
          appName={appConfig.appName}
          appDescription={appConfig.appDescription || ""}
        />
      </section>
      <HomePageClient categories={plainCategories} />
    </>
  );
}
