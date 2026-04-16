import { MapPin } from "lucide-react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ProjectHeroMedia } from "@/components/projects/project-hero-media";
import { Badge } from "@/components/ui/badge";
import type { BreadcrumbItem } from "@/lib/seo";
import type { Project } from "@/types/project";
import { formatDisplayDate } from "@/lib/utils";

type ProjectHeroProps = {
  project: Project;
  breadcrumbs: BreadcrumbItem[];
};

export function ProjectHero({ project, breadcrumbs }: ProjectHeroProps) {
  return (
    <section className="page-header-band">
      <div className="shell-container">
        <div className="grid gap-8 py-6 md:py-7 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="flex flex-col justify-center gap-6 py-4 md:py-5 lg:pr-10">
            <Breadcrumbs items={breadcrumbs.map((item) => ({ label: item.name, href: item.href }))} />
            <div className="flex flex-wrap gap-2">
              <Badge className="brand-chip">{project.projectType}</Badge>
              <Badge className="border-[#1D1D1D]/10 bg-[#1D1D1D] text-white">
                {project.projectCategory}
              </Badge>
            </div>
            <div className="space-y-3">
              <h1 className="title-as-eyebrow text-balance text-4xl text-slate-950 md:text-5xl">
                {project.title}
              </h1>
              <p className="max-w-2xl text-pretty text-[1.0625rem] leading-[1.6] text-slate-600 md:text-[1.1875rem]">
                {project.summary}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-5 text-[0.96rem] font-medium tracking-[-0.01em] text-slate-600">
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4" />
                {project.location}, {project.county}
              </span>
              <span>Completed {formatDisplayDate(project.dateCompleted)}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 5).map((tag) => (
                <Badge key={tag} className="border-slate-200 bg-card">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <ProjectHeroMedia
            alt={`${project.title} supplied and fitted by Glen Canopies`}
            images={project.images}
          />
        </div>
      </div>
    </section>
  );
}
