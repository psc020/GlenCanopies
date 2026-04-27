import Link from "next/link";

import { CTASection } from "@/components/layout/cta-section";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectFilters } from "@/components/projects/project-filters";
import { ProjectGrid } from "@/components/projects/project-grid";
import { JsonLd } from "@/components/seo/json-ld";
import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { archiveFilters, matchesArchiveFilter, type ArchiveFilterKey } from "@/lib/project-taxonomy";
import { getProjects } from "@/lib/spiffy";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Recent Work", href: "/recent-work" },
];

const projectsPerPage = 12;

export const metadata = buildMetadata({
  title: "Recent Canopy Installations Ireland | Glen Canopies",
  description:
    "View recent canopy installations across Ireland including Roman, Lean-To, Flat Top and Apex designs with clean factual project details.",
  path: "/recent-work",
});

function normalizeFilter(value?: string): ArchiveFilterKey {
  return archiveFilters.some((filter) => filter.key === value) ? (value as ArchiveFilterKey) : "all";
}

function buildPageHref(filter: ArchiveFilterKey, query: string, page: number) {
  const params = new URLSearchParams();

  if (filter !== "all") {
    params.set("filter", filter);
  }

  if (query) {
    params.set("q", query);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const suffix = params.toString();
  return suffix ? `/recent-work?${suffix}` : "/recent-work";
}

export default async function RecentWorkPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; q?: string; page?: string }>;
}) {
  const params = await searchParams;
  const currentFilter = normalizeFilter(params.filter);
  const currentQuery = params.q?.trim() ?? "";
  const currentPage = Math.max(1, Number(params.page ?? "1") || 1);

  const projects = await getProjects();
  const filteredProjects = projects.filter((project) => {
    if (!matchesArchiveFilter(project, currentFilter)) {
      return false;
    }

    if (!currentQuery) {
      return true;
    }

    const haystack = [
      project.title,
      project.summary,
      project.description,
      project.projectType,
      project.location,
      project.county,
      project.projectCategory,
      project.finish,
      project.lighting,
      ...project.tags,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(currentQuery.toLowerCase());
  });

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / projectsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const pageProjects = filteredProjects.slice(
    (safePage - 1) * projectsPerPage,
    safePage * projectsPerPage,
  );

  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumbs)} />
      <PageHeader
        breadcrumbs={breadcrumbs}
        eyebrow="Recent Work"
        title="Recent Installations"
        description="Browse real canopy installations completed across homes and developments."
        backgroundImageSrc="/brand/page-headers/recentwork.jpg"
        backgroundPosition="center 52%"
      />
      <section className="shell-container section-space space-y-8">
        <ProjectFilters currentFilter={currentFilter} currentQuery={currentQuery} />
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
          <p>
            Showing {pageProjects.length} of {filteredProjects.length} project
            {filteredProjects.length === 1 ? "" : "s"}
          </p>
          {currentFilter !== "all" || currentQuery ? (
            <Link className="font-semibold text-slate-950" href="/recent-work">
              Clear filters
            </Link>
          ) : null}
        </div>
        {pageProjects.length > 0 ? (
          <ProjectGrid className="lg:grid-cols-3" projects={pageProjects} />
        ) : (
          <div className="surface-panel rounded-xl p-8 text-sm leading-7 text-slate-600">
            No projects matched your filters. Try another style, location, or reset the filters.
          </div>
        )}
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
                  href={buildPageHref(currentFilter, currentQuery, page)}
                >
                  {page}
                </Link>
              );
            })}
          </nav>
        ) : null}
      </section>
      <CTASection
        title="Seen a Style You Like?"
        description="Save a few ideas, then get in touch and we’ll help you choose the right option for your property or project."
      />
    </>
  );
}
