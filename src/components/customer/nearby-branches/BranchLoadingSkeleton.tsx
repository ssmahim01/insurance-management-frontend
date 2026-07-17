export function BranchLoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* map placeholder */}
      <div className="relative h-40 w-full overflow-hidden rounded-2xl border border-border bg-muted sm:h-52">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-linear-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />
        <div className="flex h-full items-center justify-center">
          <div className="h-8 w-8 rounded-full border-2 border-emerald-400/40 border-t-emerald-500 animate-spin" />
        </div>
      </div>

      {/* card grid skeleton */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-linear-to-r from-transparent via-muted/40 to-transparent" />

            <div className="relative mb-4 flex items-center justify-between">
              <div className="h-5 w-16 rounded-full bg-muted animate-pulse" />
              <div className="h-5 w-12 rounded-full bg-muted animate-pulse" />
            </div>

            <div className="relative flex items-start gap-3 mb-4">
              <div className="h-16 w-16 shrink-0 rounded-2xl bg-muted animate-pulse" />
              <div className="min-w-0 flex-1 space-y-2 pt-2">
                <div className="h-3.5 w-3/4 rounded bg-muted animate-pulse" />
                <div className="h-3 w-1/2 rounded bg-muted animate-pulse" />
              </div>
            </div>

            <div className="relative space-y-2 mb-4">
              <div className="h-3 w-full rounded bg-muted animate-pulse" />
              <div className="h-3 w-4/5 rounded bg-muted animate-pulse" />
            </div>

            <div className="relative space-y-2 pt-4 border-t border-border">
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2 h-8 rounded-lg bg-muted animate-pulse" />
                <div className="h-8 rounded-lg bg-muted animate-pulse" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-8 rounded-lg bg-muted animate-pulse" />
                <div className="h-8 rounded-lg bg-muted animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}