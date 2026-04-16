import type { MetadataRoute } from "next";

import { getProjects } from "@/lib/spiffy";
import { siteConfig } from "@/lib/site";

const staticRoutes = [
  "",
  "/about",
  "/services",
  "/services/canopies",
  "/services/canopies/roman-canopies",
  "/services/canopies/small-lean-to-canopies",
  "/services/canopies/large-lean-to-canopies",
  "/services/canopies/flat-top-canopies",
  "/services/canopies/apex-canopies",
  "/services/door-surrounds",
  "/services/columns",
  "/services/pvc-sills",
  "/services/aluminium-sills",
  "/developments",
  "/recent-work",
  "/faq",
  "/contact",
  "/privacy-policy",
  "/cookie-policy",
  "/thank-you",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const projects = await getProjects();

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.baseUrl}${route}`,
      lastModified: now,
    })),
    ...projects.map((project) => ({
      url: `${siteConfig.baseUrl}/recent-work/${project.slug}`,
      lastModified: new Date(project.dateCompleted),
    })),
  ];
}
