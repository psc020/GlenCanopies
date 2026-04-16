"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import type { ProjectImage } from "@/types/project";

type ProjectHeroMediaProps = {
  images: ProjectImage[];
  alt: string;
};

export function ProjectHeroMedia({ images, alt }: ProjectHeroMediaProps) {
  const [failedSources, setFailedSources] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const validImages = useMemo(() => {
    const failed = new Set(failedSources);
    const seen = new Set<string>();

    return images.filter((image) => {
      if (!image?.src || failed.has(image.src) || seen.has(image.src)) {
        return false;
      }

      seen.add(image.src);
      return true;
    });
  }, [failedSources, images]);

  if (validImages.length === 0) {
    return null;
  }

  const safeActiveIndex = Math.min(activeIndex, validImages.length - 1);
  const activeImage = validImages[safeActiveIndex] ?? validImages[0];
  const canSlide = validImages.length > 1;

  const markImageFailed = (src: string) => {
    setFailedSources((current) => (current.includes(src) ? current : [...current, src]));
  };

  const moveBy = (direction: -1 | 1) => {
    setActiveIndex((current) => {
      if (!validImages.length) {
        return 0;
      }

      const normalizedCurrent = Math.min(current, validImages.length - 1);
      return (normalizedCurrent + direction + validImages.length) % validImages.length;
    });
  };

  return (
    <div className="space-y-3">
      <div className="relative min-h-[280px] overflow-hidden bg-card md:min-h-[360px]">
        <Image
          key={activeImage.src}
          src={activeImage.src}
          alt={activeImage.alt || fallbackAlt(activeImage.alt, alt)}
          fill
          priority
          className="object-cover"
          sizes="(min-width: 1280px) 56vw, 100vw"
          unoptimized={activeImage.src.includes("/api/media?")}
          onError={() => markImageFailed(activeImage.src)}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.04)_0%,rgba(15,23,42,0.2)_100%)]" />

        {canSlide ? (
          <>
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 bg-black/42 px-3 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-[10px]">
                <span>{String(safeActiveIndex + 1).padStart(2, "0")}</span>
                <span className="h-px w-4 bg-white/50" />
                <span>{String(validImages.length).padStart(2, "0")}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous project image"
                  className="inline-flex size-10 items-center justify-center border border-white/18 bg-black/42 text-white backdrop-blur-[10px] transition-colors hover:bg-black/58"
                  onClick={() => moveBy(-1)}
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next project image"
                  className="inline-flex size-10 items-center justify-center border border-white/18 bg-black/42 text-white backdrop-blur-[10px] transition-colors hover:bg-black/58"
                  onClick={() => moveBy(1)}
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>

      {canSlide ? (
        <div className="grid grid-cols-4 gap-2 md:grid-cols-5">
          {validImages.map((image, index) => (
            <button
              key={`${image.src}-${index}`}
              type="button"
              aria-label={`View image ${index + 1}`}
              className={cn(
                "relative aspect-[4/3] overflow-hidden border border-slate-200 bg-card transition-colors",
                index === safeActiveIndex ? "border-[#1D1D1D]" : "hover:border-slate-400",
              )}
              onClick={() => setActiveIndex(index)}
            >
              <Image
                src={image.src}
                alt={image.alt || fallbackAlt(image.alt, alt)}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 10vw, 20vw"
                unoptimized={image.src.includes("/api/media?")}
                onError={() => markImageFailed(image.src)}
              />
              <div
                className={cn(
                  "absolute inset-0 transition-colors",
                  index === safeActiveIndex ? "bg-transparent" : "bg-black/18",
                )}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function fallbackAlt(imageAlt: string | undefined, alt: string) {
  return imageAlt || alt;
}
