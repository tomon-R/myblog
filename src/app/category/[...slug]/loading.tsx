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
            <div className="h-4 w-24 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </div>

      {/* Hero Skeleton */}
      <header className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-12 bg-muted animate-pulse rounded mb-4 max-w-md" />
          <div className="h-6 bg-muted animate-pulse rounded max-w-2xl" />
        </div>
      </header>

      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section 1 */}
        <section className="py-12">
          <div className="h-8 bg-muted animate-pulse rounded w-48 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        </section>

        <Separator />

        {/* Section 2 */}
        <section className="py-12">
          <div className="h-8 bg-muted animate-pulse rounded w-48 mb-8" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
