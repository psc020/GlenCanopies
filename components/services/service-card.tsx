import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Service } from "@/types/service";

type ServiceCardProps = {
  service: Service;
  imageSrc?: string;
  showHighlights?: boolean;
  showBadge?: boolean;
  layout?: "vertical" | "horizontal";
};

export function ServiceCard({
  service,
  imageSrc,
  showHighlights = false,
  showBadge = true,
  layout = "vertical",
}: ServiceCardProps) {
  const resolvedImage = imageSrc ?? service.heroImage;
  const highlightItems = showHighlights ? service.benefits.slice(0, 2) : [];
  const isHorizontal = layout === "horizontal";

  return (
    <article
      className={cn(
        "group surface-panel h-full overflow-hidden rounded-[1.25rem]",
        isHorizontal ? "min-h-[19rem]" : "min-h-[31rem]",
      )}
    >
      <Link
        className={cn(
          "grid h-full",
          isHorizontal ? "md:grid-cols-[13rem_1fr]" : "grid-rows-[16rem_1fr]",
        )}
        href={service.href}
      >
        <div
          className={cn(
            "relative overflow-hidden",
            isHorizontal
              ? "aspect-[4/3] md:h-full md:min-h-[13.5rem] md:aspect-auto"
              : "aspect-[4/3] min-h-[14rem] md:h-full md:min-h-[16rem] md:aspect-auto",
          )}
        >
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
            sizes={
              isHorizontal
                ? "(min-width: 1280px) 18vw, (min-width: 768px) 28vw, 100vw"
                : "(min-width: 1024px) 28vw, (min-width: 768px) 44vw, 100vw"
            }
            unoptimized={resolvedImage.includes("/api/media?")}
          />
          {showBadge ? (
            <div className="absolute inset-x-4 top-4 flex items-start gap-3">
              <Badge className="border-slate-200 bg-card text-slate-800">{service.heroEyebrow}</Badge>
            </div>
          ) : null}
        </div>
        <div className={cn("flex h-full flex-col gap-4", isHorizontal ? "p-5 md:p-6" : "p-6")}>
          <div className="space-y-2">
            <h3
              className={cn(
                "font-semibold tracking-tight text-slate-950",
                isHorizontal ? "text-xl md:text-2xl" : "text-2xl",
              )}
            >
              {service.shortTitle}
            </h3>
            <p className="line-clamp-4 text-pretty text-sm leading-7 text-slate-600">
              {service.overview}
            </p>
          </div>
          {highlightItems.length > 0 ? (
            <div
              className={cn(
                "space-y-3",
                isHorizontal && "md:grid md:grid-cols-2 md:gap-x-4 md:gap-y-0 md:space-y-0",
              )}
            >
              {highlightItems.map((item) => (
                <div key={item} className="border-t border-slate-200 pt-3 text-sm leading-7 text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          ) : null}
          <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-slate-950">
            Explore service
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}
