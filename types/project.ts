import type { SEOFields } from "@/types/seo";

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ProjectCategory =
  | "Domestic Install"
  | "Housing Development"
  | "Social Housing"
  | "Replacement Scheme"
  | "New Build"
  | "Scheme Work";

export type ProjectTag =
  | "Apex"
  | "Roman"
  | "Lean-Too"
  | "Flat Top"
  | "Double Hipped"
  | "Window Canopies"
  | "LED Spotlights"
  | "All Black"
  | "Single Door"
  | "Double Door"
  | "Housing Development"
  | "Social Housing"
  | "Replacement Scheme"
  | "Domestic Install"
  | "New Build"
  | "Scheme Work";

export type Project = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  projectType: string;
  tags: ProjectTag[];
  location: string;
  county: string;
  projectCategory: ProjectCategory;
  dateCompleted: string;
  images: ProjectImage[];
  featured: boolean;
  lighting?: string;
  finish?: string;
  doorConfiguration?: string;
  sourceUrl?: string;
  relatedServiceSlugs: string[];
  seo: SEOFields;
};
