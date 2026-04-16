import "server-only";

import { slugify, unique } from "@/lib/utils";
import { getProjects } from "@/lib/spiffy";
import type { Area } from "@/types/area";
import type { Project } from "@/types/project";

const excludedAreaNames = new Set(["Ireland"]);

function buildAreaIntro(name: string, projects: Project[]) {
  const projectTypes = unique(projects.map((project) => project.projectType)).slice(0, 3);
  const joinedTypes =
    projectTypes.length > 1
      ? `${projectTypes.slice(0, -1).join(", ")} and ${projectTypes.at(-1)}`
      : projectTypes[0] ?? "canopy installations";

  return `Recent work in ${name} includes ${joinedTypes.toLowerCase()}, giving Glen Canopies genuine project backing in this location.`;
}

function buildAreaSeo(name: string): Area["seo"] {
  return {
    title: `Canopies ${name} | Glen Canopies`,
    description: `Canopies supplied and fitted in ${name} by Glen Canopies, with real project examples and related service information.`,
  };
}

function buildMapQuery(project: Project) {
  if (project.location === project.county || project.county === "Ireland") {
    return project.location;
  }

  return `${project.location}, ${project.county}`;
}

export function buildAreasFromProjects(projects: Project[]): Area[] {
  const groupedProjects = new Map<string, Project[]>();

  for (const project of projects) {
    const location = project.location.trim();

    if (!location || excludedAreaNames.has(location)) {
      continue;
    }

    const key = slugify(location);
    const current = groupedProjects.get(key) ?? [];
    current.push(project);
    groupedProjects.set(key, current);
  }

  return [...groupedProjects.entries()]
    .map(([slug, areaProjects]) => {
      const leadProject = areaProjects[0];

      return {
        slug,
        name: leadProject.location,
        intro: buildAreaIntro(leadProject.location, areaProjects),
        serviceSlugs: unique(areaProjects.flatMap((project) => project.relatedServiceSlugs)),
        featuredProjectSlugs: areaProjects.map((project) => project.slug),
        commonProjectTypes: unique(areaProjects.map((project) => project.projectType)).slice(0, 3),
        mapQuery: buildMapQuery(leadProject),
        projectCount: areaProjects.length,
        seo: buildAreaSeo(leadProject.location),
      };
    })
    .sort((first, second) => first.name.localeCompare(second.name));
}

export async function getAreas() {
  const projects = await getProjects();
  return buildAreasFromProjects(projects);
}

export async function getAreaBySlug(slug: string) {
  const areas = await getAreas();
  return areas.find((area) => area.slug === slug) ?? null;
}
