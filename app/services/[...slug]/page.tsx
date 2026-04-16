import { notFound } from "next/navigation";

import { PageEvent } from "@/components/analytics/page-event";
import { JsonLd } from "@/components/seo/json-ld";
import { ServicePageTemplate } from "@/components/services/service-page-template";
import {
  requireServiceBySlug,
  getServiceBySegments,
  services,
} from "@/content/services";
import { inferLeanTooVariant } from "@/lib/project-taxonomy";
import { dedupeProjectsBySlug, getServiceShowcaseImage } from "@/lib/project-showcase";
import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getProjectsByServiceSlug } from "@/lib/spiffy";
import type { Project } from "@/types/project";

type ServiceDetailPageProps = {
  params: Promise<{ slug: string[] }>;
};

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.href.replace("/services/", "").split("/"),
  }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceBySegments(slug);

  if (!service) {
    return buildMetadata({
      title: "Services | Glen Canopies",
      description: "Service page not found.",
      path: `/services/${slug.join("/")}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: service.href,
  });
}

function retitleLeanTooProjectForService(project: Project, serviceSlug: string) {
  if (!["small-lean-to-canopies", "large-lean-to-canopies"].includes(serviceSlug)) {
    return project;
  }

  if (!project.tags.includes("Lean-Too")) {
    return project;
  }

  const variant = inferLeanTooVariant(
    [project.projectType, project.title, project.summary, project.description].join(" "),
  );

  if (variant !== "generic") {
    return project;
  }

  const projectType =
    serviceSlug === "small-lean-to-canopies"
      ? "Small Lean-To Canopy"
      : "Large Lean-To Canopy";

  return {
    ...project,
    title: project.location !== "Ireland" ? `${projectType} in ${project.location}` : projectType,
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceBySegments(slug);

  if (!service) {
    notFound();
  }

  const canopyParent = requireServiceBySlug("canopies");
  const showcaseProjects = await getProjectsByServiceSlug(service.slug, 6);
  const relatedProjects = dedupeProjectsBySlug(showcaseProjects)
    .map((project) => retitleLeanTooProjectForService(project, service.slug))
    .slice(0, 3);
  const heroImageSrc =
    getServiceShowcaseImage(showcaseProjects, service.slug) ??
    (service.group === "canopies" && service.slug !== canopyParent.slug
      ? getServiceShowcaseImage(showcaseProjects, canopyParent.slug)
      : undefined);

  const breadcrumbs =
    service.group === "canopies" && service.slug !== canopyParent.slug
      ? [
          { name: "Home", href: "/" },
          { name: "About & Services", href: "/about#services" },
          { name: canopyParent.title, href: canopyParent.href },
          { name: service.title, href: service.href },
        ]
      : [
          { name: "Home", href: "/" },
          { name: "About & Services", href: "/about#services" },
          { name: service.title, href: service.href },
        ];

  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumbs)} />
      <PageEvent name="Service Page Viewed" props={{ service: service.slug }} />
      <ServicePageTemplate
        breadcrumbs={breadcrumbs}
        heroImageSrc={heroImageSrc}
        relatedProjects={relatedProjects}
        service={service}
      />
    </>
  );
}
