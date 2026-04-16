import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, MapPin } from "lucide-react";

import { AreaMap } from "@/components/areas/area-map";
import type { Area } from "@/types/area";

type AreaCardProps = {
  area: Area;
};

export function AreaCard({ area }: AreaCardProps) {
  return (
    <article className="surface-panel rounded-[1.25rem] p-4 transition-transform duration-300 hover:-translate-y-1 md:p-5">
      <div className="space-y-4">
        <AreaMap query={area.mapQuery} title={area.name} />
        <div className="px-2 pb-2">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600">
            <MapPin className="size-4 text-[#A62103]" />
            Real project-backed location
          </div>
          <div className="mt-3 space-y-3">
            <h3 className="text-2xl font-semibold tracking-tight text-slate-950">{area.name}</h3>
            <p className="text-pretty text-sm leading-7 text-slate-600">{area.intro}</p>
          </div>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-card px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">
            <BriefcaseBusiness className="size-3.5" />
            {area.projectCount} project{area.projectCount === 1 ? "" : "s"}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {area.commonProjectTypes.slice(0, 2).map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-200 bg-card px-3 py-1 text-xs font-semibold text-slate-700"
              >
                {item}
              </span>
            ))}
          </div>
          <Link
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-950"
            href={`/areas/${area.slug}`}
          >
            View area page
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
