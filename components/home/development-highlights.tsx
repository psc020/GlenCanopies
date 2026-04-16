import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Building2, CalendarDays, Layers3, MapPin, ShieldCheck } from "lucide-react";

import { FacebookButton } from "@/components/ui/facebook-button";
import { formatMonthYear } from "@/lib/utils";
import type { Project } from "@/types/project";

type DevelopmentHighlightsProps = {
  projects: Project[];
};

const developmentPoints = [
  {
    title: "Housing developments",
    copy: "Canopy packages designed to keep the finish consistent across multiple plots.",
    icon: Building2,
  },
  {
    title: "Social housing",
    copy: "Practical, durable installations with a clean finished look.",
    icon: ShieldCheck,
  },
  {
    title: "Phased programmes",
    copy: "Supply and fitting that works across staged projects and repeat visits.",
    icon: Layers3,
  },
];

export function DevelopmentHighlights({ projects }: DevelopmentHighlightsProps) {
  return (
    <section id="development-scheme-work" className="shell-container section-space">
      <div className="space-y-8">
        <div className="flex flex-col gap-3">
          <span className="eyebrow">Developments</span>
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
            <div className="max-w-3xl space-y-2.5">
              <h2 className="title-as-eyebrow text-balance text-3xl text-slate-950 md:text-4xl">
                Development &amp; Scheme Work
              </h2>
              <p className="text-pretty text-[1.0625rem] leading-[1.58] text-slate-600 md:text-[1.125rem]">
                We work with homeowners, developers, and housing providers on canopy installations
                across single plots and wider schemes.
              </p>
            </div>
            <Link
              className="inline-flex items-center justify-center gap-2 border border-slate-200 bg-card px-4 py-2 text-[15px] font-medium tracking-[-0.01em] text-slate-700 transition-colors hover:border-slate-300 hover:bg-white hover:text-foreground"
              href="/developments"
            >
              View Development Work
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <div className="space-y-4">
              {developmentPoints.map((point) => {
                const Icon = point.icon;

                return (
                  <div key={point.title} className="border-t border-slate-200 pt-5">
                    <div className="flex items-start gap-4">
                      <div className="brand-icon-tile flex size-12 items-center justify-center rounded-xl bg-white shadow-[0_20px_40px_-32px_rgba(15,23,42,0.35)]">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold tracking-tight text-slate-950">
                          {point.title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">{point.copy}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            {projects.length > 0 ? (
              <div className="space-y-4">
                {projects.map((project) => {
                  const leadImage = project.images[0];

                  return (
                    <article
                      key={project.id}
                      className="group relative overflow-hidden rounded-none bg-white shadow-[0_24px_58px_-42px_rgba(15,23,42,0.3)] transition-shadow duration-300 hover:shadow-[0_30px_70px_-40px_rgba(15,23,42,0.34)]"
                      style={{ borderRadius: 0 }}
                    >
                      <div className="absolute inset-x-0 top-0 z-20 h-[3px] origin-left scale-x-0 bg-[#A62103] transition-transform duration-300 group-hover:scale-x-100" />
                      <Link
                        className="grid grid-cols-1 items-center gap-0 rounded-none md:grid-cols-[7rem_1fr]"
                        style={{ borderRadius: 0 }}
                        href={`/recent-work/${project.slug}`}
                      >
                        <div className="relative h-full min-h-[7.25rem] overflow-hidden rounded-none md:min-h-[8.25rem]" style={{ borderRadius: 0 }}>
                          <Image
                            src={leadImage.src}
                            alt={leadImage.alt}
                            width={leadImage.width}
                            height={leadImage.height}
                            className="block h-auto w-full md:hidden"
                            sizes="100vw"
                            unoptimized={leadImage.src.includes("/api/media?")}
                          />
                          <Image
                            src={leadImage.src}
                            alt={leadImage.alt}
                            fill
                            className="hidden object-cover md:block"
                            sizes="(min-width: 1280px) 10vw, (min-width: 768px) 14vw, 28vw"
                            unoptimized={leadImage.src.includes("/api/media?")}
                          />
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.06)_0%,rgba(15,23,42,0.26)_100%)]" />
                        </div>
                        <div className="min-w-0 space-y-2 border-t border-slate-200/70 px-4 py-4 md:border-l md:border-t-0 md:px-5">
                          <div className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#A62103]">
                            {project.projectCategory}
                          </div>
                          <h3 className="text-base font-semibold tracking-[-0.028em] text-slate-950">
                            {project.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 text-[14px] tracking-[-0.01em] text-slate-500">
                            <span className="inline-flex items-center gap-2">
                              <MapPin className="size-4 text-[#A62103]" />
                              {project.location}
                            </span>
                            <span className="inline-flex items-center gap-2">
                              <CalendarDays className="size-4 text-[#A62103]" />
                              {formatMonthYear(project.dateCompleted)}
                            </span>
                            {project.sourceUrl ? (
                              <span className="ml-auto inline-flex items-center">
                                <FacebookButton compact href={project.sourceUrl} label="View Facebook Post" />
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </Link>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="surface-panel rounded-[1.75rem] p-8 text-sm leading-7 text-slate-600">
                Development and scheme project examples will appear here as soon as the live project
                feed is connected.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
