import type { SEOFields } from "@/types/seo";

export type Area = {
  slug: string;
  name: string;
  intro: string;
  serviceSlugs: string[];
  featuredProjectSlugs: string[];
  commonProjectTypes: string[];
  mapQuery: string;
  projectCount: number;
  seo: SEOFields;
};
