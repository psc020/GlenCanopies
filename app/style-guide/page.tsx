import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

import { FileUploadField } from "@/components/forms/file-upload-field";
import { CTASection } from "@/components/layout/cta-section";
import { PageHeader } from "@/components/layout/page-header";
import { SectionHeading } from "@/components/layout/section-heading";
import { DevelopmentHighlights } from "@/components/home/development-highlights";
import { TrustStrip } from "@/components/home/trust-strip";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectFilters } from "@/components/projects/project-filters";
import { ProjectHero } from "@/components/projects/project-hero";
import { ProjectImage, Project } from "@/types/project";
import { ServiceCard } from "@/components/services/service-card";
import { ServiceHero } from "@/components/services/service-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { requireServiceBySlug } from "@/content/services";
import { ServiceIcon } from "@/lib/service-icons";
import type { BreadcrumbItem } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Style Guide | Glen Canopies",
  description: "Internal reference page showing live Glen Canopies UI blocks and styling patterns.",
  robots: {
    index: false,
    follow: false,
  },
};

function GuideBlock({
  name,
  source,
  note,
  children,
}: {
  name: string;
  source: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-2 border-b border-slate-200 pb-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold tracking-tight text-slate-950">{name}</h3>
          {note ? <p className="max-w-2xl text-sm leading-7 text-slate-600">{note}</p> : null}
        </div>
        <code className="text-xs font-medium tracking-tight text-slate-500">{source}</code>
      </div>
      <div className="overflow-hidden rounded-[1rem] border border-slate-200 bg-white">{children}</div>
    </section>
  );
}

function GuideCard({
  name,
  source,
  children,
}: {
  name: string;
  source: string;
  children: React.ReactNode;
}) {
  return (
    <div className="surface-panel rounded-[1.25rem] p-5 md:p-6">
      <div className="mb-5 flex flex-col gap-1 border-b border-slate-200 pb-4">
        <h4 className="text-lg font-semibold tracking-tight text-slate-950">{name}</h4>
        <code className="text-xs font-medium tracking-tight text-slate-500">{source}</code>
      </div>
      {children}
    </div>
  );
}

function sampleImage(src: string, alt: string): ProjectImage {
  return {
    src,
    alt,
    width: 1600,
    height: 1200,
  };
}

const sampleBreadcrumbs: BreadcrumbItem[] = [
  { name: "Home", href: "/" },
  { name: "Style Guide", href: "/style-guide" },
];

const sampleProject: Project = {
  id: "style-guide-project",
  slug: "apex-canopy-style-guide-sample",
  title: "Apex Canopy in Lisburn",
  summary: "A clean all-black Apex canopy example with a straightforward factual summary and project tags.",
  description: "Sample project used to preview project cards and title blocks inside the style guide.",
  projectType: "Apex Canopy",
  tags: ["Apex", "All Black", "Domestic Install"],
  location: "Lisburn",
  county: "County Antrim",
  projectCategory: "Domestic Install",
  dateCompleted: "2026-03-20",
  images: [sampleImage("/brand/services/apex-canopies.jpg", "Apex canopy example")],
  featured: true,
  finish: "All Black",
  lighting: "LED Spotlights",
  doorConfiguration: "Single Door",
  relatedServiceSlugs: ["canopies", "apex-canopies"],
  seo: {
    title: "Apex Canopy in Lisburn | Glen Canopies",
    description: "Sample project metadata for the internal style guide.",
  },
};

const sampleDevelopmentProjects: Project[] = [
  sampleProject,
  {
    ...sampleProject,
    id: "style-guide-project-2",
    slug: "roman-canopy-style-guide-sample",
    title: "Roman Canopy in Newtownabbey",
    projectType: "Roman Canopy",
    tags: ["Roman", "Double Door", "Scheme Work"],
    location: "Newtownabbey",
    county: "County Antrim",
    projectCategory: "Scheme Work",
    dateCompleted: "2026-02-10",
    images: [sampleImage("/brand/services/roman-canopies.jpg", "Roman canopy example")],
    relatedServiceSlugs: ["canopies", "roman-canopies"],
  },
  {
    ...sampleProject,
    id: "style-guide-project-3",
    slug: "lean-to-style-guide-sample",
    title: "Large Lean-To in Omagh",
    projectType: "Large Lean-To",
    tags: ["Lean-Too", "Double Hipped", "LED Spotlights"],
    location: "Omagh",
    county: "County Tyrone",
    projectCategory: "Housing Development",
    dateCompleted: "2026-01-16",
    images: [sampleImage("/brand/services/large-lean-to-canopies.jpg", "Lean-To canopy example")],
    relatedServiceSlugs: ["canopies", "large-lean-to-canopies"],
  },
];

function AdditionalServicePreview() {
  const service = requireServiceBySlug("door-surrounds");

  return (
    <article className="h-full">
      <div className="group relative isolate flex min-h-[25rem] overflow-hidden rounded-[1.35rem] bg-[#0D090B]">
        <div className="absolute inset-0">
          <Image
            src={service.heroImage}
            alt={`${service.title} supplied and fitted by Glen Canopies`}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 48vw, 100vw"
          />
        </div>
        <div className="absolute left-5 right-5 top-5 z-10">
          <div
            className="inline-flex w-fit max-w-full items-center gap-3 rounded-xl bg-[#0D090B]/80 px-4 py-3 text-white shadow-[0_18px_34px_-24px_rgba(13,9,11,0.78)]"
            style={{ border: "1px solid #0D090B" }}
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#fea502]">
              <ServiceIcon className="size-4.5" iconKey={service.icon} />
            </span>
            <h4 className="text-base font-semibold tracking-tight md:text-lg">{service.title}</h4>
          </div>
        </div>
        <div className="relative flex min-h-[25rem] w-full flex-col justify-end">
          <div
            className="relative mt-auto w-full overflow-hidden bg-[#0D090B]/66 px-5 py-4 text-white shadow-[0_-18px_44px_-28px_rgba(13,9,11,0.72)]"
            style={{ borderTop: "1px solid #0D090B" }}
          >
            <div className="relative flex flex-col">
              <p className="text-sm leading-7 text-white/84">{service.overview}</p>
              <Button
                asChild
                variant="outline"
                className="mt-5 w-full border-white/18 bg-white/10 text-white hover:bg-white/18 hover:text-white"
              >
                <Link href={service.href}>
                  Explore service
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function DevelopmentRowPreview() {
  return (
    <Link
      className="surface-panel grid grid-cols-[6.5rem_1fr] items-center gap-4 rounded-[1rem] p-3 transition-transform duration-300 hover:-translate-y-0.5"
      href="#rows"
    >
      <div className="relative h-20 overflow-hidden rounded-lg">
        <Image
          src="/brand/services/roman-canopies.jpg"
          alt="Development row image example"
          fill
          className="object-cover"
          sizes="20rem"
        />
      </div>
      <div className="min-w-0 space-y-1.5">
        <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Scheme Work</div>
        <h3 className="text-base font-semibold tracking-tight text-slate-950">Development Row Card</h3>
        <div className="text-sm font-medium text-slate-500">Compact linked row with image and labels</div>
      </div>
    </Link>
  );
}

export default function StyleGuidePage() {
  const canopies = requireServiceBySlug("canopies");
  const romanCanopies = requireServiceBySlug("roman-canopies");
  const doorSurrounds = requireServiceBySlug("door-surrounds");

  return (
    <>
      <PageHeader
        breadcrumbs={sampleBreadcrumbs}
        eyebrow="Internal Reference"
        title="Glen Canopies Style Guide"
        description="A live reference page showing the current block types, button styles, cards, headings, filters, and form elements used throughout the site."
        actions={
          <>
            <Button asChild>
              <Link href="#buttons">
                Jump to Buttons
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="#cards">Jump to Cards</Link>
            </Button>
          </>
        }
      />

      <section className="shell-container section-space">
        <div className="surface-panel rounded-[1.25rem] p-5 md:p-6">
          <div className="flex flex-wrap gap-3">
            {[
              ["titles", "Titles"],
              ["buttons", "Buttons"],
              ["badges", "Badges"],
              ["cards", "Cards"],
              ["rows", "Rows"],
              ["filters", "Filters"],
              ["forms", "Forms"],
              ["sections", "Sections"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={`#${href}`}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold tracking-tight text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-950"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="shell-container section-space space-y-12" id="titles">
        <SectionHeading
          eyebrow="Titles"
          title="Title blocks and heading treatments"
          description="These are the main title patterns currently used across the site for pages, sections, and detail templates."
        />

        <GuideBlock
          name="Page Header"
          source="components/layout/page-header.tsx"
          note="Full-width light band used for standard page intros."
        >
          <PageHeader
            breadcrumbs={sampleBreadcrumbs}
            eyebrow="Page Header"
            title="Standard Page Intro"
            description="This is the default page-level title treatment with breadcrumbs, eyebrow, heading, and supporting copy."
          />
        </GuideBlock>

        <GuideBlock
          name="Section Heading"
          source="components/layout/section-heading.tsx"
          note="Reusable section heading block with left-aligned and centered variants."
        >
          <div className="grid gap-8 p-6 md:grid-cols-2 md:p-8">
            <SectionHeading
              eyebrow="Left Aligned"
              title="Left aligned section title"
              description="Used through the homepage and archive pages for structured content sections."
            />
            <SectionHeading
              eyebrow="Centered"
              title="Centered section title"
              description="Best suited where you want a more editorial or standalone section intro."
              align="center"
            />
          </div>
        </GuideBlock>

        <GuideBlock
          name="Service Hero"
          source="components/services/service-hero.tsx"
          note="Service page title pattern with breadcrumbs, title, eyebrow under the title, intro copy, and lead image."
        >
          <ServiceHero breadcrumbs={sampleBreadcrumbs} service={canopies} />
        </GuideBlock>

        <GuideBlock
          name="Project Hero"
          source="components/projects/project-hero.tsx"
          note="Project detail page title block with category badges, metadata row, and lead image."
        >
          <ProjectHero
            breadcrumbs={[
              { name: "Home", href: "/" },
              { name: "Recent Work", href: "/recent-work" },
              { name: sampleProject.title, href: `/recent-work/${sampleProject.slug}` },
            ]}
            project={sampleProject}
          />
        </GuideBlock>
      </section>

      <section className="shell-container section-space space-y-12" id="buttons">
        <SectionHeading
          eyebrow="Buttons"
          title="Button styles and CTA treatments"
          description="Primary and supporting button styles currently used across the site, including the darker nav-style CTA treatment."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <GuideCard name="Button Variants" source="components/ui/button.tsx">
            <div className="flex flex-wrap gap-3">
              <Button>Default Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="link">Link Button</Button>
            </div>
          </GuideCard>

          <GuideCard name="Brand CTA Buttons" source="header / CTA overrides">
            <div className="flex flex-wrap gap-3">
              <Button className="!border-[#fea502] !bg-[#fea502] !text-[#1d1d1d] hover:!border-[#fea502] hover:!bg-[#fea502] hover:!text-[#1d1d1d]">
                Header Quote CTA
              </Button>
              <Button className="border-white/14 bg-white/8 text-white hover:bg-white/12 hover:text-white" variant="outline">
                Dark Outline CTA
              </Button>
              <Button className="border border-white/12 bg-white/5 text-white hover:bg-white/10 hover:text-white" variant="ghost">
                Dark Ghost CTA
              </Button>
            </div>
          </GuideCard>
        </div>
      </section>

      <section className="shell-container section-space space-y-12" id="badges">
        <SectionHeading
          eyebrow="Tags"
          title="Badges, chips, and filter pills"
          description="These are the small labeling patterns used for tags, category chips, and archive filters."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <GuideCard name="Standard Badge" source="components/ui/badge.tsx">
            <div className="flex flex-wrap gap-2">
              <Badge>Apex</Badge>
              <Badge>All Black</Badge>
              <Badge>Domestic Install</Badge>
            </div>
          </GuideCard>

          <GuideCard name="Brand Chips" source="brand-chip / project dark badge">
            <div className="flex flex-wrap gap-2">
              <Badge className="brand-chip">Canopy Services</Badge>
              <Badge className="border-black/10 bg-[#0D090B] text-white">Scheme Work</Badge>
            </div>
          </GuideCard>

          <GuideCard name="Filter Pills" source="components/projects/project-filters.tsx">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-slate-950 bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
                Active Filter
              </span>
              <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
                Inactive Filter
              </span>
            </div>
          </GuideCard>
        </div>
      </section>

      <section className="shell-container section-space space-y-12" id="cards">
        <SectionHeading
          eyebrow="Cards"
          title="Main card and media block styles"
          description="These are the card patterns currently doing the heavy lifting across services, projects, and image-led homepage content."
        />

        <div className="grid gap-8">
          <GuideBlock
            name="Surface Panel"
            source="surface-panel utility"
            note="The standard light-grey card shell used across the site."
          >
            <div className="p-6 md:p-8">
              <div className="surface-panel rounded-[1.25rem] p-6">
                <h3 className="text-xl font-semibold tracking-tight text-slate-950">Surface Panel Card</h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                  Used for utility cards, content wrappers, filter bars, FAQs, and smaller blocks that need a quiet framed surface.
                </p>
              </div>
            </div>
          </GuideBlock>

          <GuideBlock
            name="Service Cards"
            source="components/services/service-card.tsx"
            note="Vertical and horizontal service cards used for canopy and service linking."
          >
            <div className="grid gap-6 p-6 lg:grid-cols-2 md:p-8">
              <ServiceCard service={romanCanopies} />
              <ServiceCard layout="horizontal" service={doorSurrounds} />
            </div>
          </GuideBlock>

          <GuideBlock
            name="Project Card"
            source="components/projects/project-card.tsx"
            note="Image-led project card with tags, metadata row, and CTA."
          >
            <div className="p-6 md:p-8">
              <div className="max-w-md">
                <ProjectCard project={sampleProject} />
              </div>
            </div>
          </GuideBlock>

          <GuideBlock
            name="Additional Service Image Card"
            source="homepage additional-services card"
            note="The image-background card used in the homepage additional services section."
          >
            <div className="p-6 md:p-8">
              <div className="max-w-md">
                <AdditionalServicePreview />
              </div>
            </div>
          </GuideBlock>
        </div>
      </section>

      <section className="shell-container section-space space-y-12" id="rows">
        <SectionHeading
          eyebrow="Rows"
          title="Compact rows and list blocks"
          description="These are the tighter linked rows and structured lists used where full cards would feel too heavy."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <GuideCard name="Development Row Card" source="components/home/development-highlights.tsx">
            <DevelopmentRowPreview />
          </GuideCard>

          <GuideCard name="FAQ Detail Card" source="details + surface-panel">
            <details className="surface-panel rounded-xl p-5" open>
              <summary className="cursor-pointer list-none text-lg font-semibold tracking-tight text-slate-950 marker:hidden">
                FAQ / Details Card
              </summary>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Used for FAQ answers and expandable informational content blocks.
              </p>
            </details>
          </GuideCard>
        </div>
      </section>

      <section className="shell-container section-space space-y-12" id="filters">
        <SectionHeading
          eyebrow="Archive Tools"
          title="Filter, search, and archive controls"
          description="The current archive utility bar for recent work search and tag-based filtering."
        />

        <GuideBlock
          name="Project Filters"
          source="components/projects/project-filters.tsx"
          note="Search field plus clickable filter pills."
        >
          <div className="p-6 md:p-8">
            <ProjectFilters currentFilter="all" currentQuery="" />
          </div>
        </GuideBlock>
      </section>

      <section className="shell-container section-space space-y-12" id="forms">
        <SectionHeading
          eyebrow="Forms"
          title="Form fields and input styling"
          description="The current input, select, textarea, and file-upload styles used within quote enquiries."
        />

        <GuideBlock
          name="Form Primitives"
          source="components/ui/* + components/forms/file-upload-field.tsx"
          note="The current base field styles used throughout the contact flow."
        >
          <div className="grid gap-6 p-6 md:grid-cols-2 md:p-8">
            <div className="space-y-3">
              <Label htmlFor="guide-name">Input</Label>
              <Input id="guide-name" placeholder="Name" />
            </div>
            <div className="space-y-3">
              <Label htmlFor="guide-select">Select</Label>
              <Select defaultValue="" id="guide-select">
                <option value="" disabled>
                  Select a service
                </option>
                <option>Canopies</option>
                <option>Door Surrounds</option>
                <option>PVC Sills</option>
              </Select>
            </div>
            <div className="space-y-3 md:col-span-2">
              <Label htmlFor="guide-message">Textarea</Label>
              <Textarea
                id="guide-message"
                placeholder="Tell us about the section or field styling you want to reuse."
              />
            </div>
            <div className="md:col-span-2">
              <FileUploadField id="guide-upload" name="guide-upload" />
            </div>
          </div>
        </GuideBlock>
      </section>

      <section className="space-y-12" id="sections">
        <div className="shell-container section-space">
          <SectionHeading
            eyebrow="Whole Sections"
            title="Larger section patterns"
            description="These are the larger, full-section patterns currently used on the homepage and internal pages."
          />
        </div>

        <GuideBlock
          name="Trust Strip"
          source="components/home/trust-strip.tsx"
          note="The split layout with left-hand section heading and right-hand trust points."
        >
          <TrustStrip />
        </GuideBlock>

        <GuideBlock
          name="Development Highlights"
          source="components/home/development-highlights.tsx"
          note="Two-column section with text/point stack on the left and compact project rows on the right."
        >
          <DevelopmentHighlights projects={sampleDevelopmentProjects} />
        </GuideBlock>

        <GuideBlock
          name="Dark CTA Section"
          source="components/layout/cta-section.tsx"
          note="The dark closing CTA block used near the end of key pages."
        >
          <CTASection
            title="Closing CTA section"
            description="Used as the final conversion block with a strong primary action and supporting secondary actions."
          />
        </GuideBlock>
      </section>
    </>
  );
}
