import "server-only";

import { unstable_cache } from "next/cache";

import { demoProjects } from "@/content/demo-projects";
import { isDevelopmentProject, sortProjectsByDate } from "@/lib/project-taxonomy";
import { mapSpiffyProjects } from "@/lib/project-mappers";
import { parseSpiffyPayload } from "@/lib/spiffy-schema";
import type { Project } from "@/types/project";

export const PROJECT_REVALIDATE_SECONDS = 60 * 60;

const PROJECTS_TAG = "projects";

function getProjectsEndpoint() {
  const datasetUrl =
    process.env.APIFY_PROJECTS_DATASET_URL?.trim() || process.env.SPIFFY_DATASET_URL?.trim();

  if (datasetUrl) {
    return datasetUrl;
  }

  const baseUrl = process.env.APIFY_API_URL?.trim() || process.env.SPIFFY_API_URL?.trim();
  const projectsPath =
    process.env.APIFY_PROJECTS_PATH?.trim() || process.env.SPIFFY_PROJECTS_PATH?.trim() || "/projects";

  if (!baseUrl) {
    return null;
  }

  return new URL(projectsPath, baseUrl).toString();
}

export function hasProjectFeedConfigured() {
  return Boolean(getProjectsEndpoint());
}

async function fetchSpiffyProjects(): Promise<Project[]> {
  const endpoint = getProjectsEndpoint();

  if (!endpoint) {
    return process.env.NODE_ENV === "development" ? sortProjectsByDate(demoProjects) : [];
  }

  try {
    const response = await fetch(endpoint, {
      headers: {
        Accept: "application/json",
        ...((process.env.APIFY_API_TOKEN || process.env.SPIFFY_API_TOKEN)
          ? { Authorization: `Bearer ${process.env.APIFY_API_TOKEN || process.env.SPIFFY_API_TOKEN}` }
          : {}),
      },
      next: {
        revalidate: PROJECT_REVALIDATE_SECONDS,
        tags: [PROJECTS_TAG],
      },
    });

    if (!response.ok) {
      throw new Error(`Spiffy project request failed with ${response.status}`);
    }

    const payload = await response.json();
    const records = parseSpiffyPayload(payload);
    return mapSpiffyProjects(records);
  } catch (error) {
    console.error("Unable to load Spiffy projects", error);
    return process.env.NODE_ENV === "development" ? sortProjectsByDate(demoProjects) : [];
  }
}

function getCachedProjects(endpoint: string | null) {
  return unstable_cache(fetchSpiffyProjects, ["spiffy-projects", endpoint ?? "none"], {
    revalidate: PROJECT_REVALIDATE_SECONDS,
    tags: [PROJECTS_TAG],
  })();
}

export async function getProjects() {
  const endpoint = getProjectsEndpoint();

  if (process.env.NODE_ENV === "development") {
    return fetchSpiffyProjects();
  }

  return getCachedProjects(endpoint);
}

export async function getProjectBySlug(slug: string) {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug) ?? null;
}

export async function getFeaturedProjects(limit = 3) {
  const projects = await getProjects();
  const featuredProjects = projects.filter((project) => project.featured);
  return (featuredProjects.length > 0 ? featuredProjects : projects).slice(0, limit);
}

export async function getDevelopmentProjects(limit?: number) {
  const projects = await getProjects();
  const developmentProjects = projects.filter(isDevelopmentProject);
  return typeof limit === "number" ? developmentProjects.slice(0, limit) : developmentProjects;
}

export async function getProjectsByServiceSlug(serviceSlug: string, limit?: number) {
  const projects = await getProjects();
  const matches = projects.filter((project) => project.relatedServiceSlugs.includes(serviceSlug));

  return typeof limit === "number" ? matches.slice(0, limit) : matches;
}
