import { Separator } from "@/components/ui/separator";

export default function Loading() {
  return (
    <main className="min-h-screen">
      {/* Breadcrumb Skeleton */}
      <div className="border-b bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-16 bg-muted animate-pulse rounded" />
            <div className="h-4 w-4 bg-muted animate-pulse rounded" />
            <div className="h-4 w-20 bg-muted animate-pulse rounded" />
            <div className="h-4 w-4 bg-muted animate-pulse rounded" />
            <div className="h-4 w-32 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </div>

      {/* Header Skeleton */}
      <header className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-12 bg-muted animate-pulse rounded mb-6" />

        {/* Metadata Skeleton */}
        <div className="flex gap-4 mb-6">
          <div className="h-4 w-32 bg-muted animate-pulse rounded" />
          <div className="h-4 w-24 bg-muted animate-pulse rounded" />
          <div className="h-4 w-20 bg-muted animate-pulse rounded" />
        </div>

        {/* Tags Skeleton */}
        <div className="flex gap-2 mb-8">
          <div className="h-6 w-16 bg-muted animate-pulse rounded-full" />
          <div className="h-6 w-20 bg-muted animate-pulse rounded-full" />
          <div className="h-6 w-18 bg-muted animate-pulse rounded-full" />
        </div>

        <Separator />
      </header>

      {/* Content Skeleton */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-4">
        <div className="h-4 bg-muted animate-pulse rounded w-full" />
        <div className="h-4 bg-muted animate-pulse rounded w-full" />
        <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
        <div className="h-4 bg-muted animate-pulse rounded w-full" />
        <div className="h-4 bg-muted animate-pulse rounded w-5/6" />
        <div className="h-8 bg-muted animate-pulse rounded w-full mt-8" />
        <div className="h-4 bg-muted animate-pulse rounded w-full" />
        <div className="h-4 bg-muted animate-pulse rounded w-full" />
        <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
      </article>
    </main>
  );
}
