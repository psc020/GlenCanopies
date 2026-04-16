import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { FacebookButton } from "@/components/ui/facebook-button";
import { formatMonthYear } from "@/lib/utils";
import type { Project } from "@/types/project";

type FeaturedProjectsProps = {
  projects: Project[];
};

function ProjectTags({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-2">
      {project.tags.slice(0, 3).map((tag) => (
        <Badge key={tag} className="brand-chip">
          {tag}
        </Badge>
      ))}
    </div>
  );
}

function ProjectMeta({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-4 border-t border-slate-200/80 pt-4 text-sm text-slate-500">
      <span className="inline-flex items-center gap-2.5">
        <span className="brand-icon-tile flex size-8 items-center justify-center rounded-xl">
          <MapPin className="size-4" />
        </span>
        {project.location}
      </span>
      <span className="inline-flex items-center gap-2.5">
        <span className="brand-icon-tile flex size-8 items-center justify-center rounded-xl">
          <CalendarDays className="size-4" />
        </span>
        {formatMonthYear(project.dateCompleted)}
      </span>
      {project.sourceUrl ? (
        <span className="ml-auto inline-flex items-center">
          <FacebookButton compact href={project.sourceUrl} label="View Facebook Post" />
        </span>
      ) : null}
    </div>
  );
}

function ProjectCta() {
  return (
    <span className="mt-auto inline-flex items-center gap-3 text-sm font-semibold text-slate-950 transition-colors group-hover:text-[#A62103]">
      <span className="h-px w-7 bg-[#A62103]" />
      View Project
      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </span>
  );
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section id="recent-installations" className="shell-container section-space">
      <div className="flex flex-col gap-3">
        <span className="eyebrow">Recent Work</span>
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
          <div className="max-w-3xl space-y-2.5">
            <h2 className="title-as-eyebrow text-balance text-3xl text-slate-950 md:text-4xl">
              Recent Installations
            </h2>
            <p className="text-pretty text-[1.0625rem] leading-[1.58] text-slate-600 md:text-[1.125rem]">
              Browse recent canopy projects, including domestic installs, modern finishes,
              lighting options, and development work.
            </p>
          </div>
          <Link
            className="inline-flex items-center justify-center gap-2 border border-slate-200 bg-card px-4 py-2 text-[15px] font-medium tracking-[-0.01em] text-slate-700 transition-colors hover:border-slate-300 hover:bg-white hover:text-foreground"
            href="/recent-work"
          >
            View All Recent Work
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
      {projects.length > 0 ? (
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.92fr)]">
          {projects[0] ? (
            <article
              className="group relative overflow-hidden rounded-none bg-white shadow-[0_32px_80px_-46px_rgba(15,23,42,0.36)] transition-shadow duration-300 hover:shadow-[0_40px_90px_-42px_rgba(15,23,42,0.4)]"
              style={{ borderRadius: 0 }}
            >
              <div className="absolute inset-x-0 top-0 z-20 h-[3px] origin-left scale-x-0 bg-[#A62103] transition-transform duration-300 group-hover:scale-x-100" />
              <Link className="grid h-full min-h-[24rem] grid-rows-[auto_minmax(0,1fr)] md:grid-rows-[18rem_minmax(0,1fr)]" href={`/recent-work/${projects[0].slug}`}>
                <div className="relative overflow-hidden">
                  <Image
                    src={projects[0].images[0].src}
                    alt={projects[0].images[0].alt}
                    width={projects[0].images[0].width}
                    height={projects[0].images[0].height}
                    className="block h-auto w-full md:hidden"
                    sizes="100vw"
                    unoptimized={projects[0].images[0].src.includes("/api/media?")}
                  />
                  <Image
                    src={projects[0].images[0].src}
                    alt={projects[0].images[0].alt}
                    fill
                    className="hidden object-cover transition duration-500 group-hover:scale-[1.03] md:block"
                    sizes="(min-width: 1024px) 48vw, 100vw"
                    unoptimized={projects[0].images[0].src.includes("/api/media?")}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.04)_0%,rgba(15,23,42,0.3)_100%)]" />
                </div>
                <div className="flex h-full flex-col gap-5 border-t border-slate-200/80 bg-white p-5 md:p-6">
                  <div className="space-y-2.5">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#A62103]">
                      Featured Installation
                    </p>
                    <ProjectTags project={projects[0]} />
                    <h3 className="text-xl font-semibold tracking-[-0.035em] text-slate-950 md:text-[1.9rem]">
                      {projects[0].title}
                    </h3>
                    <p className="text-pretty text-[15px] leading-7 tracking-[-0.012em] text-slate-600 md:text-[1.02rem]">
                      {projects[0].summary}
                    </p>
                  </div>
                  <ProjectMeta project={projects[0]} />
                  <ProjectCta />
                </div>
              </Link>
            </article>
          ) : null}
          <div className="space-y-4">
            {projects.slice(1, 4).map((project) => {
              const leadImage = project.images[0];

              return (
                <article
                  key={project.id}
                  className="group relative overflow-hidden rounded-none bg-white shadow-[0_24px_60px_-44px_rgba(15,23,42,0.32)] transition-shadow duration-300 hover:shadow-[0_30px_70px_-40px_rgba(15,23,42,0.36)]"
                  style={{ borderRadius: 0 }}
                >
                  <div className="absolute inset-x-0 top-0 z-20 h-[3px] origin-left scale-x-0 bg-[#A62103] transition-transform duration-300 group-hover:scale-x-100" />
                  <Link
                    className="grid min-h-[10.5rem] grid-cols-1 md:grid-cols-[9.75rem_minmax(0,1fr)]"
                    href={`/recent-work/${project.slug}`}
                  >
                    <div className="relative overflow-hidden">
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
                        className="hidden object-cover transition duration-500 group-hover:scale-[1.03] md:block"
                        sizes="(min-width: 1024px) 18vw, 34vw"
                        unoptimized={leadImage.src.includes("/api/media?")}
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.06)_0%,rgba(15,23,42,0.26)_100%)]" />
                    </div>
                    <div className="flex h-full flex-col gap-3 border-t border-slate-200/70 p-4 md:border-l md:border-t-0 md:p-5">
                      <div className="space-y-2">
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#A62103]">
                          Recent Project
                        </p>
                        <ProjectTags project={project} />
                        <h3 className="line-clamp-2 text-lg font-semibold tracking-[-0.03em] text-slate-950">
                          {project.title}
                        </h3>
                        <p className="line-clamp-2 text-sm leading-6 text-slate-600">
                          {project.summary}
                        </p>
                      </div>
                      <ProjectMeta project={project} />
                      <ProjectCta />
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="mt-8 rounded-none bg-white p-8 text-sm leading-7 text-slate-600 shadow-[0_24px_60px_-44px_rgba(15,23,42,0.22)]">
          Featured project cards will populate here once the live project feed is available.
        </div>
      )}
    </section>
  );
}
