import Image from "next/image";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ServiceActionBar } from "@/components/services/service-action-bar";
import type { BreadcrumbItem } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import type { Service } from "@/types/service";

type ServiceHeroProps = {
  service: Service;
  breadcrumbs: BreadcrumbItem[];
  imageSrc?: string;
  showBenefits?: boolean;
};

export function ServiceHero({
  service,
  breadcrumbs,
  imageSrc,
  showBenefits = true,
}: ServiceHeroProps) {
  const resolvedImage = imageSrc ?? service.heroImage;
  const isCanopyService = service.group === "canopies";
  const showRangeCopy = isCanopyService && Boolean(service.introParagraphs?.length);
  const enquiryHref = `/contact?service=${encodeURIComponent(service.title)}`;
  const shareLabel =
    service.slug === "canopies"
      ? "Share canopies"
      : service.group === "canopies"
      ? "Share this style"
      : "Share this service";

  return (
    <section className="page-header-band">
      <div className="shell-container">
        <div className="space-y-6 py-5 md:space-y-10 md:py-7">
          {isCanopyService ? (
            <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
              <div className="flex flex-col gap-5 py-3 md:py-5 lg:pr-10">
                <Breadcrumbs
                  items={breadcrumbs.map((item) => ({ label: item.name, href: item.href }))}
                />
                <div className="space-y-3">
                  <p className="eyebrow">{service.heroEyebrow}</p>
                  <h1 className="title-as-eyebrow text-balance text-4xl text-slate-950 md:text-5xl">
                    {service.title}
                  </h1>
                  <p className="max-w-2xl text-pretty text-[1rem] leading-[1.55] text-slate-600 md:text-[1.1875rem]">
                    {service.intro}
                  </p>
                </div>
                {showBenefits ? (
                  <div className="surface-panel border border-slate-200 p-4 md:p-6">
                    <p className="eyebrow">Highlighted Features</p>
                    <ul className="mt-5 grid gap-3 md:grid-cols-2">
                      {service.benefits.map((benefit) => (
                        <li
                          key={benefit}
                          className="border-t border-slate-200 pt-3 text-[0.96rem] font-medium tracking-[-0.01em] text-slate-700"
                        >
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
              <div className="space-y-4 lg:w-full lg:pt-14 xl:pt-[3.9rem]">
                <div className="relative aspect-[5/4] min-h-[220px] overflow-hidden border border-slate-200 bg-card md:min-h-[340px] lg:min-h-[380px]">
                  <Image
                    src={resolvedImage}
                    alt={`${service.title} project-led showcase`}
                    fill
                    priority
                    className="object-cover"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    unoptimized={resolvedImage.includes("/api/media?")}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="flex flex-col justify-center gap-5 py-3 md:py-5 lg:pr-10">
                <Breadcrumbs items={breadcrumbs.map((item) => ({ label: item.name, href: item.href }))} />
                <div className="space-y-3">
                  <p className="eyebrow">{service.heroEyebrow}</p>
                  <h1 className="title-as-eyebrow text-balance text-4xl text-slate-950 md:text-5xl">
                    {service.title}
                  </h1>
                  <p className="max-w-2xl text-pretty text-[1rem] leading-[1.55] text-slate-600 md:text-[1.1875rem]">
                    {service.intro}
                  </p>
                </div>
                {showBenefits ? (
                  <ul className="grid gap-3 md:grid-cols-2">
                    {service.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="border-t border-slate-200 pt-3 text-[0.96rem] font-medium tracking-[-0.01em] text-slate-700"
                      >
                        {benefit}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
              <div className="relative min-h-[240px] overflow-hidden border border-slate-200 bg-card md:min-h-[320px]">
                <Image
                  src={resolvedImage}
                  alt={`${service.title} project-led showcase`}
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  unoptimized={resolvedImage.includes("/api/media?")}
                />
              </div>
            </div>
          )}

          {showRangeCopy ? (
            <div className="w-full border-t border-slate-200 pt-6 md:pt-8">
              <div className="space-y-3">
                {service.introParagraphs?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="max-w-none text-pretty text-[1rem] leading-7 text-slate-600 md:text-[1.0625rem]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ) : null}

          <ServiceActionBar
            title={service.title}
            shareLabel={shareLabel}
            shareUrl={absoluteUrl(service.href)}
            enquiryHref={enquiryHref}
          />
        </div>
      </div>
    </section>
  );
}
