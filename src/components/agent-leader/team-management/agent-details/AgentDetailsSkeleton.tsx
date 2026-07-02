export function AgentDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="h-20 w-20 rounded-full bg-muted animate-pulse" />
          <div className="space-y-3 flex-1 w-full">
            <div className="h-5 w-40 bg-muted rounded animate-pulse" />
            <div className="h-3 w-56 bg-muted rounded animate-pulse" />
            <div className="h-3 w-64 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-5 space-y-3">
            <div className="h-4 w-20 bg-muted rounded animate-pulse" />
            <div className="h-6 w-10 bg-muted rounded animate-pulse" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-6 space-y-3">
            <div className="h-4 w-32 bg-muted rounded animate-pulse" />
            {[...Array(4)].map((__, j) => (
              <div key={j} className="h-3 w-full bg-muted rounded animate-pulse" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}