import Link from "next/link";

import { services } from "@/content/services";
import type { Area } from "@/types/area";

type AreaLinksProps = {
  area: Area;
};

export function AreaLinks({ area }: AreaLinksProps) {
  const linkedServices = services.filter((service) => area.serviceSlugs.includes(service.slug));

  return (
    <section className="border-t border-slate-200 pt-6">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Services available in {area.name}</h2>
      <div className="mt-6 flex flex-wrap gap-3">
        {linkedServices.map((service) => (
          <Link
            key={service.slug}
            className="inline-flex items-center rounded-xl border border-slate-200 bg-card px-4 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:text-slate-950"
            href={service.href}
          >
            {service.shortTitle}
          </Link>
        ))}
      </div>
    </section>
  );
}
