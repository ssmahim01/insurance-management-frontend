export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-5 space-y-3">
            <div className="h-3 w-16 bg-muted rounded animate-pulse" />
            <div className="h-7 w-20 bg-muted rounded animate-pulse" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-16 rounded-xl border border-border bg-card animate-pulse" />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 h-80 animate-pulse" />
        <div className="rounded-2xl border border-border bg-card p-6 h-80 animate-pulse" />
      </div>

      {[...Array(3)].map((_, i) => (
        <div key={i} className="rounded-2xl border border-border bg-card p-6 h-56 animate-pulse" />
      ))}
    </div>
  );
}