import type { Metadata } from "next";

import { siteConfig, absoluteUrl } from "@/lib/site";
import type { FAQ } from "@/types/faq";
import type { Project } from "@/types/project";

export type BreadcrumbItem = {
  name: string;
  href: string;
};

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  image = absoluteUrl("/opengraph-image"),
  type = "website",
  noIndex = false,
}: MetadataInput): Metadata {
  const canonical = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      type,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function buildFaqJsonLd(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: siteConfig.baseUrl,
    logo: absoluteUrl("/icon"),
    sameAs: [siteConfig.facebookUrl, siteConfig.instagramUrl].filter(Boolean),
  };
}

export function buildLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.legalName,
    url: siteConfig.baseUrl,
    image: absoluteUrl("/opengraph-image"),
    description: siteConfig.description,
    areaServed: siteConfig.serviceArea.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    telephone: siteConfig.phone || undefined,
    email: siteConfig.email || undefined,
  };
}

export function buildProjectImageJsonLd(project: Project) {
  return project.images.map((image) => ({
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: absoluteUrl(image.src),
    caption: image.alt,
    representativeOfPage: true,
  }));
}

