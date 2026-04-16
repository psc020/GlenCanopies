import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Building2 } from "lucide-react";

import { CanopyStylesCarousel } from "@/components/home/canopy-styles-carousel";
import { traditionalCanopyRangeParagraphs } from "@/content/services";
import { ServiceIcon } from "@/lib/service-icons";
import type { Service } from "@/types/service";

type ServicesGridProps = {
  services: Service[];
  imageByServiceSlug?: Record<string, string | undefined>;
  developmentImageSrc?: string;
};

export function ServicesGrid({
  services,
  imageByServiceSlug,
  developmentImageSrc,
}: ServicesGridProps) {
  const canopyParent = services.find((service) => service.slug === "canopies");
  const canopyChildren = services.filter((service) =>
    canopyParent?.childServiceSlugs?.includes(service.slug),
  );
  const additionalServices = services.filter((service) => service.group === "additional");
  const additionalServiceCards = [
    ...additionalServices.map((service) => ({
      key: service.slug,
      title: service.shortTitle,
      copy: service.overview,
      href: service.href,
      imageSrc: imageByServiceSlug?.[service.slug] ?? service.heroImage,
      iconKey: service.icon,
      ctaLabel: "View Service",
    })),
    {
      key: "development-scheme-work",
      title: "Development & Scheme Work",
      copy:
        "Supply-and-fit canopy delivery for housing developments, social housing, replacement schemes, and phased programmes.",
      href: "/developments",
      imageSrc: developmentImageSrc ?? imageByServiceSlug?.canopies ?? "/brand/services/apex-canopies.jpg",
      iconKey: "development",
      ctaLabel: "View Development Work",
    },
  ];

  return (
    <section id="services" className="shell-container section-space">
      <div className="space-y-12">
        {canopyParent ? (
          <div className="space-y-8">
            <CanopyStylesCarousel
              eyebrow="Canopy Styles"
              title="Main Canopy Styles"
              description="Explore the main canopy styles we supply and fit, from compact entrances to wider feature frontages."
              imageByServiceSlug={imageByServiceSlug}
              supportingParagraphs={traditionalCanopyRangeParagraphs}
              services={canopyChildren}
            />
          </div>
        ) : null}

        <div className="space-y-6">
          <div className="border-t border-slate-200 pt-6">
            <h3 className="title-as-eyebrow text-3xl text-slate-950">
              Additional Services
            </h3>
            <p className="eyebrow mt-4">Entrance Finishing</p>
            <p className="mt-5 max-w-xl text-pretty text-[1.0625rem] leading-[1.6] text-slate-600">
              We also provide finishing services that help complete the look around the entrance.
            </p>
          </div>
          <div className="overflow-hidden">
            <div className="grid items-stretch gap-px bg-slate-200 md:grid-cols-2 xl:grid-cols-3">
            {additionalServiceCards.map((item) => (
              <article key={item.key} className="h-full">
                <div
                  className="group relative isolate flex h-full overflow-hidden rounded-none bg-white transition-shadow duration-300 hover:shadow-[0_28px_60px_-42px_rgba(15,23,42,0.22)]"
                  style={{ borderRadius: 0 }}
                >
                  <div className="absolute inset-x-0 top-0 z-20 h-[3px] origin-left scale-x-0 bg-[#fea502] transition-transform duration-300 group-hover:scale-x-100" />
                  <div className="grid h-full w-full grid-rows-[auto_minmax(0,1fr)] md:grid-rows-[13.5rem_minmax(0,1fr)]">
                    <div className="p-3 pb-0 md:p-4 md:pb-0">
                      <div className="relative h-full overflow-hidden">
                        <Image
                          src={item.imageSrc}
                          alt={`${item.title} supplied and fitted by Glen Canopies`}
                          width={1200}
                          height={900}
                          className="block h-auto w-full md:hidden"
                          sizes="100vw"
                          unoptimized={item.imageSrc.includes("/api/media?")}
                        />
                        <Image
                          src={item.imageSrc}
                          alt={`${item.title} supplied and fitted by Glen Canopies`}
                          fill
                          className="hidden object-cover transition duration-700 group-hover:scale-[1.04] md:block"
                          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 48vw, 100vw"
                          unoptimized={item.imageSrc.includes("/api/media?")}
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.02)_0%,rgba(15,23,42,0.2)_100%)]" />
                      </div>
                    </div>
                    <div
                      className="relative flex h-full flex-col justify-between gap-5 bg-white px-4 pb-4 pt-4 text-foreground md:px-6 md:pb-6 md:pt-5"
                    >
                      <div className="min-w-0 space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <span className="brand-icon-tile flex size-10 shrink-0 items-center justify-center rounded-xl">
                              {item.iconKey === "development" ? (
                                <Building2 className="size-4.5" />
                              ) : (
                                <ServiceIcon className="size-4.5" iconKey={item.iconKey} />
                              )}
                            </span>
                            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#A62103]">
                              {item.iconKey === "development" ? "Project Delivery" : "Additional Service"}
                            </p>
                          </div>
                          <h4 className="text-[1.35rem] font-semibold tracking-[-0.03em] text-foreground">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-[15px] leading-7 tracking-[-0.012em] text-slate-600">
                          {item.copy}
                        </p>
                      </div>

                      <Link
                        className="group inline-flex items-center gap-3 self-start text-[15px] font-medium tracking-[-0.01em] text-foreground transition-colors hover:text-[#A62103]"
                        href={item.href}
                      >
                        <span className="h-px w-7 bg-[#A62103] transition-all duration-300 group-hover:w-10" />
                        {item.ctaLabel}
                        <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
