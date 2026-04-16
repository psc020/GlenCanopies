import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import type { BreadcrumbItem } from "@/lib/seo";

type PageHeaderProps = {
  breadcrumbs?: BreadcrumbItem[];
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
  backgroundImageSrc?: string;
  backgroundPosition?: string;
};

export function PageHeader({
  breadcrumbs,
  eyebrow,
  title,
  description,
  actions,
  backgroundImageSrc,
  backgroundPosition = "center center",
}: PageHeaderProps) {
  const hasBackgroundImage = Boolean(backgroundImageSrc);

  return (
    <section
      className={hasBackgroundImage ? "page-header-hero" : "page-header-band"}
      style={
        hasBackgroundImage
          ? {
              backgroundImage: `linear-gradient(135deg, rgb(29 29 29 / 0.7), rgb(29 29 29 / 0.46)), url(${backgroundImageSrc})`,
              backgroundPosition,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }
          : undefined
      }
    >
      <div className="shell-container">
        <div className={hasBackgroundImage ? "space-y-4 py-10 md:py-14" : "space-y-4 py-5 md:py-7"}>
          {breadcrumbs?.length ? (
            <Breadcrumbs
              items={breadcrumbs.map((item) => ({ label: item.name, href: item.href }))}
              variant={hasBackgroundImage ? "inverse" : "default"}
            />
          ) : null}
          <div className="space-y-3">
            {eyebrow ? <span className={hasBackgroundImage ? "eyebrow-light" : "eyebrow"}>{eyebrow}</span> : null}
            <h1
              className={
                hasBackgroundImage
                  ? "title-as-eyebrow max-w-5xl text-balance text-[2.65rem] text-white md:text-[4.5rem]"
                  : "title-as-eyebrow text-balance text-[2.65rem] text-slate-950 md:text-[4.5rem]"
              }
            >
              {title}
            </h1>
            <p
              className={
                hasBackgroundImage
                  ? "max-w-4xl text-pretty text-[1.0625rem] leading-[1.6] text-white/88 md:text-[1.1875rem]"
                  : "max-w-4xl text-pretty text-[1.0625rem] leading-[1.6] text-slate-600 md:text-[1.1875rem]"
              }
            >
              {description}
            </p>
          </div>
          {actions ? <div className={hasBackgroundImage ? "flex flex-wrap gap-3 text-white" : "flex flex-wrap gap-3"}>{actions}</div> : null}
        </div>
      </div>
    </section>
  );
}
