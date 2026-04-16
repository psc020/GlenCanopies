import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Layers3, MapPin } from "lucide-react";

import { PageEvent } from "@/components/analytics/page-event";
import { CTASection } from "@/components/layout/cta-section";
import { ProjectHero } from "@/components/projects/project-hero";
import { ServiceActionBar } from "@/components/services/service-action-bar";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { services } from "@/content/services";
import { buildBreadcrumbJsonLd, buildMetadata, buildProjectImageJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { getProjectBySlug, getProjects } from "@/lib/spiffy";
import { formatDisplayDate } from "@/lib/utils";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return buildMetadata({
      title: "Recent Work | Glen Canopies",
      description: "Project page not found.",
      path: `/recent-work/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: project.seo.title,
    description: project.seo.description,
    path: `/recent-work/${project.slug}`,
    type: "article",
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedService = services.find((service) =>
    project.relatedServiceSlugs.includes(service.slug),
  );

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Recent Work", href: "/recent-work" },
    { name: project.title, href: `/recent-work/${project.slug}` },
  ];

  return (
    <>
      <JsonLd data={[buildBreadcrumbJsonLd(breadcrumbs), ...buildProjectImageJsonLd(project)]} />
      <PageEvent
        name="Project Page Viewed"
        props={{ slug: project.slug, projectType: project.projectType }}
      />
      <ProjectHero breadcrumbs={breadcrumbs} project={project} />
      <div className="shell-container section-space space-y-8">
        <section className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="border-t border-slate-200 pt-6">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Project Summary</h2>
            <p className="mt-4 text-pretty text-base leading-8 text-slate-600">{project.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            {relatedService ? (
              <div className="mt-6">
                <Link
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-950 transition-colors hover:text-[#A62103]"
                  href={relatedService.href}
                >
                  View {relatedService.shortTitle}
                </Link>
              </div>
            ) : null}
          </div>
          <div className="border-t border-slate-200 pt-6">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Key Details</h2>
            <dl className="mt-6 space-y-5">
              <div className="border-t border-slate-200 pt-4 first:border-t-0 first:pt-0">
                <dt className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  <Layers3 className="size-3.5" />
                  Service type
                </dt>
                <dd className="mt-2 text-base font-medium text-slate-900">{project.projectType}</dd>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <dt className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  <MapPin className="size-3.5" />
                  Location
                </dt>
                <dd className="mt-2 text-base font-medium text-slate-900">
                  {project.location}, {project.county}
                </dd>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <dt className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  <CalendarDays className="size-3.5" />
                  Completed
                </dt>
                <dd className="mt-2 text-base font-medium text-slate-900">
                  {formatDisplayDate(project.dateCompleted)}
                </dd>
              </div>
              {project.finish ? (
                <div className="border-t border-slate-200 pt-4">
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Finish
                  </dt>
                  <dd className="mt-2 text-base font-medium text-slate-900">{project.finish}</dd>
                </div>
              ) : null}
              {project.lighting ? (
                <div className="border-t border-slate-200 pt-4">
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Lighting
                  </dt>
                  <dd className="mt-2 text-base font-medium text-slate-900">{project.lighting}</dd>
                </div>
              ) : null}
              {project.doorConfiguration ? (
                <div className="border-t border-slate-200 pt-4">
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Door configuration
                  </dt>
                  <dd className="mt-2 text-base font-medium text-slate-900">
                    {project.doorConfiguration}
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>
        </section>
        <ServiceActionBar
          title={project.title}
          shareLabel="Share this project"
          shareUrl={absoluteUrl(`/recent-work/${project.slug}`)}
          enquiryHref={`/contact?service=${encodeURIComponent(project.projectType)}&project=${encodeURIComponent(project.title)}`}
          enquiryText="Tell us about the style, finish, or location you have in mind and we’ll help you with a similar installation."
        />
      </div>
      <CTASection
        title="Need a Similar Installation?"
        description="Tell us the location, canopy type, and finish you have in mind, and we’ll help with the right quote."
      />
    </>
  );
}
