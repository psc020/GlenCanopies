import Image from "next/image";
import {
  ArrowUpRight,
  Building2,
  ClipboardList,
  Hammer,
  Home,
  House,
  Landmark,
  Sparkles,
} from "lucide-react";

import { PageEvent } from "@/components/analytics/page-event";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { CanopyStylesCarousel } from "@/components/home/canopy-styles-carousel";
import { CTASection } from "@/components/layout/cta-section";
import { PageHeader } from "@/components/layout/page-header";
import { SectionHeading } from "@/components/layout/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { TestimonialsSection } from "@/components/testimonials/testimonials-section";
import { services } from "@/content/services";
import { getServiceShowcaseImageMap } from "@/lib/project-showcase";
import { buildBreadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getProjects } from "@/lib/spiffy";
import { getTestimonials } from "@/lib/testimonials";
import type { Service } from "@/types/service";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "About & Services", href: "/about" },
];

export const metadata = buildMetadata({
  title: "About Glen Canopies | Ireland",
  description:
    "Glen Canopies supplies and fits high-quality canopies across Ireland for homes, developments, and entrance upgrades.",
  path: "/about",
});

const whoWeWorkWith = [
  { title: "Homeowners", icon: Home },
  { title: "Developers", icon: Building2 },
  { title: "Housing and scheme projects", icon: Landmark },
];

const whyChoosePoints = [
  {
    title: "Supply and fit service from start to finish",
    icon: Hammer,
  },
  {
    title: "Domestic and development experience",
    icon: Building2,
  },
  {
    title: "Clean, sharp finishing details",
    icon: Sparkles,
  },
  {
    title: "Canopies chosen to suit the property",
    icon: House,
  },
  {
    title: "Straightforward advice and quoting",
    icon: ClipboardList,
  },
];

type AboutServiceCardProps = {
  service: Service;
  imageSrc?: string;
  linkLabel: string;
};

function AboutServiceCard({ service, imageSrc, linkLabel }: AboutServiceCardProps) {
  const resolvedImage = imageSrc ?? service.heroImage;

  return (
    <article className="group flex h-full flex-col overflow-hidden border border-slate-200 bg-card">
      <TrackedLink
        eventName="Service Page Viewed"
        eventProps={{ location: "about-services-grid", service: service.slug }}
        href={service.href}
        className="flex h-full flex-col"
      >
        <div className="relative overflow-hidden md:aspect-[5/3]">
          <Image
            src={resolvedImage}
            alt={`${service.title} supplied and fitted by Glen Canopies`}
            width={1200}
            height={900}
            className="block h-auto w-full md:hidden"
            sizes="100vw"
            unoptimized={resolvedImage.includes("/api/media?")}
          />
          <Image
            src={resolvedImage}
            alt={`${service.title} supplied and fitted by Glen Canopies`}
            fill
            className="hidden object-cover transition duration-500 group-hover:scale-[1.03] md:block"
            sizes="(min-width: 1280px) 22vw, (min-width: 768px) 44vw, 100vw"
            unoptimized={resolvedImage.includes("/api/media?")}
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4 md:p-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold tracking-tight text-slate-950">{service.title}</h3>
            <p className="text-pretty text-[15px] leading-7 text-slate-600">{service.overview}</p>
          </div>
          <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-slate-950">
            {linkLabel}
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </TrackedLink>
    </article>
  );
}

export default async function AboutPage() {
  const [projects, testimonials] = await Promise.all([getProjects(), getTestimonials(10)]);
  const canopyStyleServices = services.filter(
    (service) => service.group === "canopies" && service.slug !== "canopies",
  );
  const additionalServiceCards = services.filter((service) =>
    ["door-surrounds", "columns", "pvc-sills", "aluminium-sills", "chimneys"].includes(
      service.slug,
    ),
  );
  const serviceImageMap = getServiceShowcaseImageMap(projects, [
    ...canopyStyleServices.map((service) => service.slug),
    ...additionalServiceCards.map((service) => service.slug),
  ]);

  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumbs)} />
      <PageEvent name="About Page Viewed" props={{ page: "about-services" }} />
      <PageHeader
        breadcrumbs={breadcrumbs}
        eyebrow="About & Services"
        title="About Glen Canopies"
        description="Glen Canopies supplies and fits canopies across Ireland for homes, developments, and entrance upgrades. We also provide finishing details that help complete the overall look of the frontage."
        backgroundImageSrc="/brand/page-headers/aboutservcies.png"
        backgroundPosition="center 54%"
      />
      <div className="shell-container section-space space-y-14 md:space-y-16">
        <section className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4">
            <SectionHeading
              title="What We Do"
              description="We supply and install canopies for homes, developments, and larger scheme work. The goal is simple: the canopy should suit the property, improve shelter, and look right on the entrance."
            />
            <p className="max-w-3xl text-pretty text-[1.0625rem] leading-[1.6] text-slate-600 md:text-[1.125rem]">
              We also offer supporting exterior finishing services, including door surrounds,
              columns, PVC sills, and aluminium sills.
            </p>
          </div>
          <aside className="surface-panel border border-slate-200 p-5 md:p-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Who We Work With</h2>
              <p className="text-[15px] leading-7 tracking-[-0.01em] text-slate-600">
                We work across domestic and development projects, from one-off installs to larger
                schemes where consistency and finish matter.
              </p>
            </div>
            <div className="mt-6 grid gap-3">
              {whoWeWorkWith.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-3 border-t border-slate-200 pt-3 text-[15px] font-medium tracking-[-0.01em] text-slate-700"
                >
                  <span className="brand-icon-tile flex size-10 shrink-0 items-center justify-center">
                    <item.icon className="size-4.5" />
                  </span>
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="space-y-6">
          <CanopyStylesCarousel
            eyebrow="Canopy Styles"
            title="Canopy Styles"
            description="We supply and fit a range of canopy styles to suit different types of entrances and frontages."
            imageByServiceSlug={serviceImageMap}
            services={canopyStyleServices}
          />
        </section>

        <section className="space-y-6">
          <SectionHeading
            title="Additional Services"
            description="We also provide finishing services that help complete the entrance and improve the overall frontage."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {additionalServiceCards.map((service) => (
              <AboutServiceCard
                key={service.slug}
                service={service}
                imageSrc={serviceImageMap[service.slug]}
                linkLabel="View Service"
              />
            ))}
          </div>
        </section>

        <TestimonialsSection
          testimonials={testimonials}
          eyebrow="Testimonials"
          title="Customer Feedback"
          description="Feedback from customers who have had canopies and entrance finishing work supplied and fitted by Glen Canopies."
        />

        <section className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            title="Why Choose Glen Canopies"
            description="We focus on straightforward service, quality workmanship, and finishes that look right on the property."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {whyChoosePoints.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="surface-panel border border-slate-200 p-5">
                  <div className="flex items-start gap-3">
                    <span className="brand-icon-tile flex size-10 shrink-0 items-center justify-center">
                      <Icon className="size-4.5" />
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight text-slate-950">
                      {item.title}
                    </h3>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

      </div>
      <CTASection
        title="Get a Quote for Your Project"
        description="Whether you already know the style you want or need help choosing, we can guide you and provide a clear quote."
        primaryLabel="Get a Free Quote"
        secondaryLabel="Contact Us"
      />
    </>
  );
}
