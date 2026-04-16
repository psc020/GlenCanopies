export default function Loading() {
  return (
    <div className="shell-container section-space">
      <div className="surface-panel rounded-[2rem] p-8">
        <div className="h-6 w-32 animate-pulse rounded-full bg-slate-200" />
        <div className="mt-6 h-12 w-full max-w-2xl animate-pulse rounded-3xl bg-slate-200" />
        <div className="mt-4 h-5 w-full max-w-3xl animate-pulse rounded-full bg-slate-100" />
        <div className="mt-2 h-5 w-full max-w-2xl animate-pulse rounded-full bg-slate-100" />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="rounded-[1.5rem] border border-slate-200 bg-card p-4">
              <div className="aspect-[4/3] animate-pulse rounded-[1.25rem] bg-slate-200" />
              <div className="mt-4 h-5 animate-pulse rounded-full bg-slate-200" />
              <div className="mt-3 h-4 animate-pulse rounded-full bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
