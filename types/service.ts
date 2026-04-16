import type { FAQ } from "@/types/faq";
import type { SEOFields } from "@/types/seo";

export type ServiceSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ServiceGroup = "canopies" | "additional";

export type Service = {
  slug: string;
  href: string;
  group: ServiceGroup;
  title: string;
  shortTitle: string;
  intro: string;
  introParagraphs?: string[];
  overview: string;
  heroImage: string;
  heroEyebrow: string;
  icon: string;
  benefits: string[];
  styleOptions?: string[];
  bodySections: ServiceSection[];
  faqs: FAQ[];
  relatedProjectTags: string[];
  aliases?: string[];
  childServiceSlugs?: string[];
  seo: SEOFields;
};
