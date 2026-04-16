import Link from "next/link";
import { Search } from "lucide-react";

import { archiveFilters, type ArchiveFilterKey } from "@/lib/project-taxonomy";
import { cn } from "@/lib/utils";

type ProjectFiltersProps = {
  currentFilter: ArchiveFilterKey;
  currentQuery: string;
};

export function ProjectFilters({ currentFilter, currentQuery }: ProjectFiltersProps) {
  const buildArchiveHref = (filter: ArchiveFilterKey, query: string) => {
    const params = new URLSearchParams();

    if (filter !== "all") {
      params.set("filter", filter);
    }

    if (query.trim()) {
      params.set("q", query.trim());
    }

    const suffix = params.toString();
    return suffix ? `/recent-work?${suffix}` : "/recent-work";
  };

  return (
    <div className="surface-panel rounded-xl p-4 md:p-5">
      <div className="flex flex-col gap-4">
        <form action="/recent-work" className="flex flex-col gap-3 md:flex-row" role="search">
          {currentFilter !== "all" ? (
            <input type="hidden" name="filter" value={currentFilter} />
          ) : null}
          <label className="relative block flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-[15px] tracking-[-0.01em] text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-slate-400"
              defaultValue={currentQuery}
              name="q"
              placeholder="Search project type, finish or location"
            />
            <span className="sr-only">Search recent work</span>
          </label>
          <button
            className="inline-flex h-12 items-center justify-center rounded-xl border border-[#1D1D1D] bg-[#1D1D1D] px-5 text-[15px] font-medium tracking-[-0.01em] text-white transition-colors hover:bg-[#2a2a2a]"
            type="submit"
          >
            Search
          </button>
        </form>
        <div className="flex flex-wrap gap-2">
          {archiveFilters.map((filter) => {
            const active = filter.key === currentFilter;

            return (
              <Link
                key={filter.key}
                href={buildArchiveHref(filter.key, currentQuery)}
                className={cn(
                  "rounded-full border px-4 py-2 text-[15px] font-medium tracking-[-0.01em] transition-colors",
                  active
                    ? "border-[#1D1D1D] bg-[#1D1D1D] text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-400 hover:text-slate-950",
                )}
              >
                {filter.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
