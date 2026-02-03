import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeShiki from "rehype-shiki";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { getDomain } from "@/app/domain";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { PostMetadata } from "@/components/_components/PostMetadata";
import { PostCard } from "@/components/_components/PostCard";
import { appConfig } from "@/lib/config/instance";
import { AppInfo, Context, PageInfo } from "@/lib/context";
import { Category, Post } from "@/domain/models";
import Link from "next/link";

interface PostPageProps {
  params: Promise<{ slug: string[] }>;
}

// すべてのカテゴリーを再帰的に取得するヘルパー関数
async function getAllCategoriesRecursively(): Promise<Category[]> {
  const { services } = getDomain();
  const { categoryService } = services;

  const appInfo = new AppInfo(appConfig);
  const context = new Context({ app: appInfo });

  const rootCategories = await categoryService.getAllAtRoot({ context });
  const allCategories: Category[] = [...rootCategories];

  async function collectChildren(category: Category) {
    if (category.children && category.children.length > 0) {
      for (const childId of category.children) {
        const childCategory = await categoryService.getById({
          context,
          categoryId: childId,
        });
        allCategories.push(childCategory);
        await collectChildren(childCategory);
      }
    }
  }

  for (const category of rootCategories) {
    await collectChildren(category);
  }

  return allCategories;
}

// generateStaticParams: すべてのポストパスを生成
export async function generateStaticParams() {
  const allCategories = await getAllCategoriesRecursively();
  const allPosts: Post[] = [];

  const { services } = getDomain();
  const { postService } = services;

  const appInfo = new AppInfo(appConfig);
  const context = new Context({ app: appInfo });

  for (const category of allCategories) {
    if (category.posts && category.posts.length > 0) {
      const posts = await postService.getAllByCategory({ context, category });
      allPosts.push(...posts);
    }
  }

  return allPosts.map((post) => ({
    slug: post.id.replace(".mdx", "").split("/"),
  }));
}

// generateMetadata: 動的メタデータ生成
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const postId = `${slug.join("/")}.mdx`;

  const { services } = getDomain();
  const { postService } = services;

  const appInfo = new AppInfo(appConfig);
  const context = new Context({ app: appInfo });

  try {
    const post = await postService.getById({ context, postId });

    return {
      title: `${post.title} | ${appConfig.appName}`,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        type: "article",
        publishedTime: post.date,
        authors: post.author ? [post.author] : undefined,
        tags: post.tags,
      },
    };
  } catch (error) {
    return {
      title: "Not Found",
      description: "The post you are looking for does not exist.",
    };
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const postId = `${slug.join("/")}.mdx`;

  const { services } = getDomain();
  const { postService, categoryService } = services;

  const appInfo = new AppInfo(appConfig);
  const pageInfo = new PageInfo({ pageName: "Post", path: `/posts/${slug.join("/")}` });
  const context = new Context({ app: appInfo }).set(pageInfo);

  let post: Post;
  try {
    post = await postService.getById({ context, postId });
  } catch (error) {
    notFound();
  }

  // パンくずナビゲーション用のパスを生成
  const breadcrumbItems = [
    { label: "ホーム", href: "/" },
    ...slug.slice(0, -1).map((segment, index) => ({
      label: segment,
      href: `/category/${slug.slice(0, index + 1).join("/")}`,
    })),
    { label: post.title, href: undefined },
  ];

  // 関連ポストの取得（同じカテゴリー内の他のポスト）
  let relatedPosts: Post[] = [];
  try {
    const categoryId = slug.slice(0, -1).join("/");
    if (categoryId) {
      const category = await categoryService.getById({ context, categoryId });
      if (category.posts && category.posts.length > 1) {
        const allPosts = await postService.getAllByCategory({ context, category });
        relatedPosts = allPosts
          .filter((p) => p.id !== post.id)
          .slice(0, 3);
      }
    }
  } catch (error) {
    // 関連ポストの取得に失敗しても続行
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
                      <Link href={item.href} className="transition-colors hover:text-foreground">
                        {item.label}
                      </Link>
                    ) : (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Article Header */}
      <header className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 font-rajdhani">
          {post.title}
        </h1>

        {/* Metadata */}
        <PostMetadata post={post} className="mb-6" />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <Separator />
      </header>

      {/* Article Content */}
      <article className="prose dark:prose-invert max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkMath],
              rehypePlugins: [rehypeKatex],
            },
          }}
          components={mdxComponents}
        />
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold mb-8">関連記事</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <PostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
