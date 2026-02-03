import { useDomain } from "@/app/domain";
import CategoryNode from "@/components/_components/CategoryNode";
import { PostCard } from "@/components/_components/PostCard";
import { PostListItem } from "@/components/_components/PostListItem";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Category, Post } from "@/domain/models";
import { appConfig } from "@/lib/config/instance";
import { AppInfo, Context, PageInfo } from "@/lib/context";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{ slug: string[] }>;
}

// generateStaticParams: すべてのカテゴリーパスを生成
export async function generateStaticParams() {
  const { services } = useDomain();
  const { categoryService } = services;

  const appInfo = new AppInfo(appConfig);
  const context = new Context({ app: appInfo });

  const allCategories = await categoryService.getAllRecursively({ context });

  return allCategories.map((category) => ({
    slug: category.id.split("/"),
  }));
}

// generateMetadata: 動的メタデータ生成
export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryId = slug.join("/");

  const { services } = useDomain();
  const { categoryService } = services;

  const appInfo = new AppInfo(appConfig);
  const context = new Context({ app: appInfo });

  try {
    const category = await categoryService.getById({ context, categoryId });

    return {
      title: `${category.name} | ${appConfig.appName}`,
      description: category.description,
      openGraph: {
        title: category.name,
        description: category.description,
        type: "website",
      },
    };
  } catch (error) {
    return {
      title: "Not Found",
      description: "The category you are looking for does not exist.",
    };
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categoryId = slug.join("/");

  const { services } = useDomain();
  const { categoryService, postService } = services;

  const appInfo = new AppInfo(appConfig);
  const pageInfo = new PageInfo({
    pageName: "Category",
    path: `/category/${categoryId}`,
  });
  const context = new Context({ app: appInfo }).set(pageInfo);

  let category: Category;
  try {
    category = await categoryService.getById({ context, categoryId });
  } catch (error) {
    notFound();
  }

  // パンくずナビゲーション用のパスを生成
  const breadcrumbItems = [
    { label: "ホーム", href: "/" },
    ...slug.map((segment, index) => ({
      label: segment,
      href:
        index === slug.length - 1
          ? undefined
          : `/category/${slug.slice(0, index + 1).join("/")}`,
    })),
  ];

  // フィーチャードポストの取得
  let featuredPosts: Post[] = [];
  if (category.featuredPosts && category.featuredPosts.length > 0) {
    try {
      featuredPosts = await postService.getAllByIds({
        context,
        postIds: category.featuredPosts,
      });
    } catch (error) {
      // フィーチャードポストの取得に失敗しても続行
    }
  }

  // 子カテゴリーの取得
  let childCategories: Category[] = [];
  if (category.children && category.children.length > 0) {
    try {
      childCategories = await categoryService.getAllByIds({
        context,
        categoryIds: category.children,
      });
    } catch (error) {
      // 子カテゴリーの取得に失敗しても続行
    }
  }

  // ポストの取得
  let posts: Post[] = [];
  if (category.posts && category.posts.length > 0) {
    try {
      posts = await postService.getAllByCategory({ context, category });
    } catch (error) {
      // ポストの取得に失敗しても続行
    }
  }

  return (
    <main className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbItems.map((item, index) => (
                <div key={index} className="contents">
                  <BreadcrumbItem>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="transition-colors hover:text-foreground"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbItems.length - 1 && (
                    <BreadcrumbSeparator />
                  )}
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <header className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-rajdhani">
            {category.name}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {category.description}
          </p>
        </div>
      </header>

      {/* MDX Content */}
      {category.content && category.content.trim() !== "" && (
        <article className="prose dark:prose-invert max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <MDXRemote source={category.content} components={mdxComponents} />
        </article>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="py-12">
            <h2 className="text-3xl font-semibold mb-8">注目の記事</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <PostCard key={post.id} post={post} featured />
              ))}
            </div>
            {(childCategories.length > 0 || posts.length > 0) && (
              <Separator className="mt-12" />
            )}
          </section>
        )}

        {/* Subcategories */}
        {childCategories.length > 0 && (
          <section className="py-12">
            <h2 className="text-3xl font-semibold mb-8">サブカテゴリー</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {childCategories.map((child) => (
                <CategoryNode key={child.id} category={child} />
              ))}
            </div>
            {posts.length > 0 && <Separator className="mt-12" />}
          </section>
        )}

        {/* Posts List */}
        {posts.length > 0 && (
          <section className="py-12">
            <h2 className="text-3xl font-semibold mb-8">記事一覧</h2>
            <div className="space-y-4">
              {posts.map((post) => (
                <PostListItem key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {featuredPosts.length === 0 &&
          childCategories.length === 0 &&
          posts.length === 0 && (
            <section className="py-16 text-center">
              <p className="text-muted-foreground text-lg">
                このカテゴリーにはまだコンテンツがありません。
              </p>
            </section>
          )}
      </div>
    </main>
  );
}
