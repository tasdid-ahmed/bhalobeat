export function EventGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-2xl border border-border bg-card"
        >
          <div className="aspect-[16/10] w-full bg-muted" />
          <div className="space-y-3 p-5">
            <div className="h-5 w-24 rounded-full bg-muted" />
            <div className="h-6 w-4/5 rounded bg-muted" />
            <div className="h-4 w-1/2 rounded bg-muted" />
            <div className="h-4 w-1/3 rounded bg-muted" />
            <div className="h-9 w-full rounded-lg bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}