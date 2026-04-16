"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";

type HeroCarouselProps = {
  projects: Project[];
};

type CarouselSlide = {
  id: string;
  title: string;
  summary: string;
  image: {
    src: string;
    alt: string;
  };
  href?: string;
};

const fallbackSlide: CarouselSlide = {
  id: "fallback",
  title: "Premium canopy installations",
  summary: "Real project-led canopy work across homes, developments, and scheme installations.",
  image: {
    src: "/demo/hero-canopy.svg",
    alt: "Premium canopy installation showcase",
  },
};

export function HeroCarousel({ projects }: HeroCarouselProps) {
  const slides: CarouselSlide[] =
    projects.length > 0
      ? projects.map((project) => ({
          id: project.id,
          href: `/recent-work/${project.slug}`,
          title: project.title,
          summary: project.summary,
          image: project.images[0],
        }))
      : [fallbackSlide];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 4800);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-full min-h-[360px] overflow-hidden lg:min-h-[620px]">
      <div
        className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="relative h-full min-w-full">
            <Image
              src={slide.image.src}
              alt={slide.image.alt}
              fill
              priority={index === 0}
              className="object-contain md:object-cover"
              sizes="(min-width: 1024px) 58vw, 100vw"
              unoptimized={slide.image.src.includes("/api/media?")}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1D1D1D]/38 via-[#1D1D1D]/8 to-transparent" />
            <div className="absolute inset-x-5 bottom-5 md:inset-x-6 md:bottom-6">
              {slide.href ? (
                <Link
                  className="block border border-white/12 bg-[#1D1D1D]/52 p-4 text-white backdrop-blur-sm transition-colors hover:bg-[#1D1D1D]/62 md:p-5"
                  href={slide.href}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#fea502]">
                    Recent post
                  </p>
                  <h2 className="mt-2 text-lg font-semibold tracking-tight md:text-xl">{slide.title}</h2>
                  <p className="mt-2 max-w-xl text-sm leading-7 text-slate-200">{slide.summary}</p>
                </Link>
              ) : (
                <div className="border border-white/12 bg-[#1D1D1D]/52 p-4 text-white backdrop-blur-sm md:p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#fea502]">
                    Project-led showcase
                  </p>
                  <h2 className="mt-2 text-lg font-semibold tracking-tight md:text-xl">{slide.title}</h2>
                  <p className="mt-2 max-w-xl text-sm leading-7 text-slate-200">{slide.summary}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {slides.length > 1 ? (
        <div className="absolute bottom-5 right-5 flex items-center gap-2 md:bottom-6 md:right-6">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Show slide ${index + 1}`}
              className={cn(
                "h-2.5 w-8 rounded-full border border-white/18 bg-white/18 transition-all",
                index === activeIndex && "border-[#fea502] bg-[#fea502]",
              )}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
