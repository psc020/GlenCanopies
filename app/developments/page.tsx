import Link from "next/link";
import { Building2, Layers3, RefreshCcw, ShieldCheck } from "lucide-react";

import { CTASection } from "@/components/layout/cta-section";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectGrid } from "@/components/projects/project-grid";
import { JsonLd } from "@/components/seo/json-ld";
import { SectionHeading } from "@/components/layout/section-heading";
import { dedupeProjectsBySlug } from "@/lib/project-showcase";
import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getDevelopmentProjects } from "@/lib/spiffy";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Developments", href: "/developments" },
];

export const metadata = buildMetadata({
  title: "Canopy Installations for Developments | Ireland",
  description:
    "Canopy systems supplied and fitted for housing developments and social housing across Ireland.",
  path: "/developments",
});

const developmentSections = [
  {
    title: "Housing developments",
    copy: "Canopy packages designed to keep the finish consistent across multiple plots.",
    icon: Building2,
  },
  {
    title: "Social housing",
    copy: "Practical, durable canopies for wider housing programmes.",
    icon: ShieldCheck,
  },
  {
    title: "Replacement schemes",
    copy: "Straightforward replacement work where consistency and finish matter.",
    icon: RefreshCcw,
  },
  {
    title: "Phased installations",
    copy: "Supply and fitting that supports staged programmes and repeat visits.",
    icon: Layers3,
  },
] as const;

const projectsPerPage = 12;

function buildPageHref(page: number) {
  return page > 1 ? `/developments?page=${page}` : "/developments";
}

export default async function DevelopmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page ?? "1") || 1);
  const projects = dedupeProjectsBySlug(await getDevelopmentProjects());
  const totalPages = Math.max(1, Math.ceil(projects.length / projectsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const pageProjects = projects.slice((safePage - 1) * projectsPerPage, safePage * projectsPerPage);

  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumbs)} />
      <PageHeader
        breadcrumbs={breadcrumbs}
        eyebrow="Development Work"
        title="Development & Scheme Work"
        description="Glen Canopies supplies and fits canopy systems for housing developments, social housing projects, and multi-property installations."
        backgroundImageSrc="/brand/page-headers/developmentscheme.png"
        backgroundPosition="center 55%"
      />
      <section className="shell-container section-space space-y-8">
        <section className="space-y-8">
          <SectionHeading
            eyebrow="Development Work"
            title="Built for Larger Projects"
            description="We support developments, housing schemes, and phased programmes with canopy installations that stay consistent from plot to plot."
          />
          <div className="max-w-4xl space-y-4 text-sm leading-8 text-slate-600 md:text-base">
            <p>
              Glen Canopies works on one-off development plots, social housing programmes,
              replacement schemes, and staged roll-outs where finish and consistency matter.
            </p>
            <p>
              The focus is straightforward: choose the right canopy style, keep the installation
              quality consistent, and make sure the finished result looks right across the wider
              project.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {developmentSections.map((section) => {
              const Icon = section.icon;

              return (
                <article key={section.title} className="surface-panel rounded-[1rem] p-5">
                  <div className="brand-icon-tile flex size-11 items-center justify-center rounded-lg">
                    <Icon className="size-5" />
                  </div>
                  <h2 className="mt-4 text-xl font-semibold tracking-tight text-slate-950">
                    {section.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{section.copy}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeading
            title="Published Development Work"
            description="Current development and scheme-led projects from the live project feed."
          />
          {pageProjects.length > 0 ? (
            <>
              <ProjectGrid className="lg:grid-cols-3" projects={pageProjects} />
              {totalPages > 1 ? (
                <nav className="flex flex-wrap items-center gap-3" aria-label="Pagination">
                  {Array.from({ length: totalPages }, (_, index) => {
                    const page = index + 1;

                    return (
                      <Link
                        key={page}
                        className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                          page === safePage
                            ? "border-[#1D1D1D] bg-[#1D1D1D] text-white"
                            : "border-slate-200 bg-card text-slate-700"
                        }`}
                        href={buildPageHref(page)}
                      >
                        {page}
                      </Link>
                    );
                  })}
                </nav>
              ) : null}
            </>
          ) : (
            <div className="surface-panel rounded-[1.25rem] p-8 text-sm leading-7 text-slate-600">
              Development project cards will appear here once the live project feed is connected.
            </div>
          )}
        </section>
      </section>
      <CTASection
        title="Need a Canopy Partner for a Larger Scheme?"
        description="Tell us about the development, project size, or rollout, and we’ll help you scope the right approach."
      />
    </>
  );
}
