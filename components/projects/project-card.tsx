import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";

import { FacebookButton } from "@/components/ui/facebook-button";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types/project";
import { formatMonthYear } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const leadImage = project.images[0];

  return (
    <article className="group relative surface-panel overflow-hidden rounded-[1.25rem]">
      <Link className="block h-full" href={`/recent-work/${project.slug}`}>
        <div className="relative overflow-hidden md:aspect-[5/4]">
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
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 100vw"
            unoptimized={leadImage.src.includes("/api/media?")}
          />
          <div
            className={`absolute left-4 right-4 top-4 flex flex-wrap gap-2 ${
              project.sourceUrl ? "pr-8" : ""
            }`}
          >
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>
        <div className="flex h-full flex-col gap-4 p-6">
          <div className="space-y-2">
            <h3 className="line-clamp-2 text-xl font-semibold tracking-tight text-slate-950">
              {project.title}
            </h3>
            <p className="line-clamp-3 text-pretty text-sm leading-7 text-slate-600">
              {project.summary}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-slate-400" />
              {project.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="size-4 text-slate-400" />
              {formatMonthYear(project.dateCompleted)}
            </span>
            {project.sourceUrl ? (
              <span className="ml-auto inline-flex items-center">
                <FacebookButton compact href={project.sourceUrl} label="View Facebook Post" />
              </span>
            ) : null}
          </div>
          <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-slate-950">
            View project
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}
