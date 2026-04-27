import type { Project } from "@/types/project";

const staticServiceImageMap: Record<string, string> = {
  canopies: "/brand/services/apex-canopies.jpg",
  "roman-canopies": "/brand/services/roman-canopies.jpg",
  "small-lean-to-canopies": "/brand/services/small-lean-to-canopies.jpg",
  "large-lean-to-canopies": "/brand/services/large-lean-to-canopies.jpg",
  "flat-top-canopies": "/brand/services/flat-top-canopies.jpg",
  "apex-canopies": "/brand/services/apex-canopies.jpg",
  "door-surrounds": "/brand/services/door-surrounds.jpg",
  columns: "/brand/services/columns.jpg",
  "pvc-sills": "/brand/services/pvc-sills.jpg",
  "aluminium-sills": "/brand/services/aluminium-sills.jpg",
  chimneys: "/brand/services/chimneys.jpg",
};

export function getServiceShowcaseImage(projects: Project[], serviceSlug: string) {
  return (
    staticServiceImageMap[serviceSlug] ??
    projects.find((project) => project.relatedServiceSlugs.includes(serviceSlug))?.images[0]?.src
  );
}

export function getServiceShowcaseImageMap(projects: Project[], serviceSlugs: string[]) {
  return Object.fromEntries(
    serviceSlugs.map((slug) => [slug, getServiceShowcaseImage(projects, slug)]),
  ) as Record<string, string | undefined>;
}

export function dedupeProjectsBySlug(projects: Project[]) {
  return Array.from(new Map(projects.map((project) => [project.slug, project])).values());
}
