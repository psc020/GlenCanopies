import type { Project } from "@/types/project";

import { ProjectCard } from "@/components/projects/project-card";
import { cn } from "@/lib/utils";

type ProjectGridProps = {
  projects: Project[];
  className?: string;
};

export function ProjectGrid({ projects, className }: ProjectGridProps) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-2 2xl:grid-cols-3", className)}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
