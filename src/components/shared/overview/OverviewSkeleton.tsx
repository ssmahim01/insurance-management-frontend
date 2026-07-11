function PanelSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 pt-8 space-y-4">
      <div className="h-3 w-24 bg-muted rounded animate-pulse" />
      <div className="h-3 w-32 bg-muted rounded animate-pulse" />
      <div className="border-t border-border pt-4 space-y-2">
        <div className="h-3 w-40 bg-muted rounded animate-pulse mb-2" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-9 w-full bg-muted rounded animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export function OverviewSkeleton() {
  return (
    <div className="space-y-6 pt-3">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PanelSkeleton />
        <PanelSkeleton />
      </div>
      <PanelSkeleton />
    </div>
  );
}