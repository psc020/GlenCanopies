"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";

import { ServiceIcon } from "@/lib/service-icons";
import { cn } from "@/lib/utils";
import type { Service } from "@/types/service";

type CanopyStylesCarouselProps = {
  services: Service[];
  imageByServiceSlug?: Record<string, string | undefined>;
  eyebrow?: string;
  title?: string;
  description?: string;
  supportingParagraphs?: string[];
};

type CarouselSlide = {
  id: string;
  href: string;
  title: string;
  summary: string;
  imageSrc: string;
  iconKey: string;
  features: string[];
};

type DragState = {
  pointerId: number;
  startX: number;
  startY: number;
};

const AUTOPLAY_INTERVAL_MS = 10000;
const TRANSITION_DURATION_MS = 520;

const normalizeIndex = (index: number, length: number) =>
  ((index % length) + length) % length;

export function CanopyStylesCarousel({
  services,
  imageByServiceSlug,
  eyebrow = "Canopy Styles",
  title,
  description,
  supportingParagraphs,
}: CanopyStylesCarouselProps) {
  const slides: CarouselSlide[] = useMemo(
    () =>
      services.map((service) => ({
        id: service.slug,
        href: service.href,
        title: service.shortTitle,
        summary: service.overview,
        imageSrc: imageByServiceSlug?.[service.slug] ?? service.heroImage,
        iconKey: service.icon,
        features: service.benefits.slice(0, 2),
      })),
    [imageByServiceSlug, services],
  );

  const canLoop = slides.length > 1;
  const displaySlides = useMemo(
    () => (canLoop ? [slides.at(-1)!, ...slides, slides[0]!] : slides),
    [canLoop, slides],
  );

  const [displayIndex, setDisplayIndex] = useState(canLoop ? 1 : 0);
  const [isAutoplaying, setIsAutoplaying] = useState(canLoop);
  const [isInViewport, setIsInViewport] = useState(false);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [dragOffset, setDragOffset] = useState(0);
  const activeIndex = canLoop ? normalizeIndex(displayIndex - 1, slides.length) : 0;

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef<DragState | null>(null);
  const dragAxisRef = useRef<"x" | "y" | null>(null);
  const dragOffsetRef = useRef(0);
  const draggedRef = useRef(false);
  const prefersReducedMotionRef = useRef(false);
  const wheelLockedRef = useRef(false);
  const autoplayResumeTimeoutRef = useRef<number | null>(null);
  const isInteractiveTarget = (target: EventTarget | null) =>
    target instanceof HTMLElement &&
    Boolean(target.closest("a, button"));

  const clearAutoplayResumeTimeout = () => {
    if (autoplayResumeTimeoutRef.current !== null) {
      window.clearTimeout(autoplayResumeTimeoutRef.current);
      autoplayResumeTimeoutRef.current = null;
    }
  };

  const temporarilyPauseAutoplay = (delay = AUTOPLAY_INTERVAL_MS) => {
    if (!canLoop || prefersReducedMotionRef.current) {
      return;
    }

    clearAutoplayResumeTimeout();
    setIsAutoplaying(false);

    autoplayResumeTimeoutRef.current = window.setTimeout(() => {
      setIsAutoplaying(true);
      autoplayResumeTimeoutRef.current = null;
    }, delay);
  };

  const getLoopBaseIndex = (current: number) => {
    if (!canLoop) {
      return current;
    }

    if (current <= 0) {
      return slides.length;
    }

    if (current >= slides.length + 1) {
      return 1;
    }

    return current;
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotionRef.current = mediaQuery.matches;

    const onChange = (event: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = event.matches;
      clearAutoplayResumeTimeout();
      setIsAutoplaying(!event.matches && canLoop);
    };

    mediaQuery.addEventListener("change", onChange);

    return () => {
      mediaQuery.removeEventListener("change", onChange);
      clearAutoplayResumeTimeout();
    };
  }, [canLoop]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.45 },
    );

    observer.observe(viewport);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!canLoop || !isAutoplaying || !isInViewport) {
      return;
    }

    const interval = window.setInterval(() => {
      setIsTransitionEnabled(true);
      setDisplayIndex((current) => {
        const baseIndex =
          current <= 0 ? slides.length : current >= slides.length + 1 ? 1 : current;
        return baseIndex + 1;
      });
    }, AUTOPLAY_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [canLoop, isAutoplaying, isInViewport, slides.length]);

  useEffect(() => {
    if (!canLoop) {
      return;
    }

    if (displayIndex >= 1 && displayIndex <= slides.length) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setIsTransitionEnabled(false);
      setDisplayIndex(displayIndex <= 0 ? slides.length : 1);
    }, TRANSITION_DURATION_MS);

    return () => window.clearTimeout(timeout);
  }, [canLoop, displayIndex, slides.length]);

  useEffect(() => {
    if (isTransitionEnabled) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setIsTransitionEnabled(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isTransitionEnabled]);

  if (slides.length === 0) {
    return null;
  }

  const moveBy = (step: number) => {
    if (!canLoop) {
      return;
    }

    setIsTransitionEnabled(true);
    setDisplayIndex((current) => getLoopBaseIndex(current) + step);
  };

  const goToRealSlide = (index: number) => {
    if (!canLoop) {
      return;
    }

    setIsTransitionEnabled(true);
    setDisplayIndex(index + 1);
  };

  const finishDrag = (resumeAutoplay: boolean) => {
    const absoluteOffset = Math.abs(dragOffsetRef.current);
    const shouldAdvance = dragAxisRef.current === "x" && absoluteOffset > 70;

    if (shouldAdvance) {
      moveBy(dragOffsetRef.current < 0 ? 1 : -1);
    }

    dragStateRef.current = null;
    dragAxisRef.current = null;
    dragOffsetRef.current = 0;
    setDragOffset(0);

    if (resumeAutoplay && canLoop && !prefersReducedMotionRef.current) {
      temporarilyPauseAutoplay();
    }
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!canLoop) {
      return;
    }

    draggedRef.current = false;

    if (isInteractiveTarget(event.target)) {
      return;
    }

    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
    };
    dragAxisRef.current = null;
    dragOffsetRef.current = 0;
    draggedRef.current = false;
    setDragOffset(0);
    temporarilyPauseAutoplay();
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - dragState.startX;
    const deltaY = event.clientY - dragState.startY;

    if (!dragAxisRef.current) {
      if (Math.abs(deltaX) < 6 && Math.abs(deltaY) < 6) {
        return;
      }

      dragAxisRef.current = Math.abs(deltaX) > Math.abs(deltaY) ? "x" : "y";
    }

    if (dragAxisRef.current !== "x") {
      return;
    }

    event.preventDefault();
    draggedRef.current = true;
    dragOffsetRef.current = deltaX;
    setDragOffset(deltaX);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    event.currentTarget.releasePointerCapture(event.pointerId);
    finishDrag(false);
  };

  const handlePointerCancel = () => {
    finishDrag(false);
  };

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    if (!canLoop) {
      return;
    }

    const dominantDelta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;

    if (Math.abs(dominantDelta) < 18) {
      return;
    }

    const horizontalIntent =
      Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey;

    if (!horizontalIntent) {
      return;
    }

    event.preventDefault();

    if (wheelLockedRef.current) {
      return;
    }

    wheelLockedRef.current = true;
    temporarilyPauseAutoplay();
    moveBy(dominantDelta > 0 ? 1 : -1);

    window.setTimeout(() => {
      wheelLockedRef.current = false;
    }, 460);
  };

  const trackTranslate = `translate3d(calc((100% - var(--slide-size)) / 2 - ${displayIndex} * (var(--slide-size) + var(--slide-gap)) + ${dragOffset}px), 0, 0)`;
  const progressPercentage = slides.length > 1 ? ((activeIndex + 1) / slides.length) * 100 : 100;

  return (
    <div
      id="canopy-styles"
      aria-label="Canopy styles carousel"
      aria-roledescription="carousel"
      className="space-y-6"
    >
      <div className="space-y-3">
        <p className="eyebrow">{eyebrow}</p>
        {title ? (
          <h2 className="title-as-eyebrow text-balance text-3xl text-slate-950 md:text-4xl">
            {title}
          </h2>
        ) : null}
      </div>

      <div className="space-y-4">
        <div className="w-full">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 border-y border-slate-200 py-2 sm:grid-cols-3 md:grid-cols-5 md:gap-x-6">
            {slides.map((slide, index) => (
              <button
                key={`style-nav-${slide.id}`}
                type="button"
                className={cn(
                "group relative flex min-h-[4.1rem] flex-col justify-center gap-1 px-2 py-2 text-center transition-colors md:min-h-[5rem] md:px-4",
                  index === activeIndex
                    ? "text-slate-950"
                    : "text-slate-500 hover:text-slate-800",
                )}
                onClick={() => {
                  temporarilyPauseAutoplay();
                  goToRealSlide(index);
                }}
              >
                <span
                  className={cn(
                    "mx-auto flex size-8 items-center justify-center transition-colors md:size-9",
                    index === activeIndex
                      ? "text-[#A62103]"
                      : "text-slate-400 group-hover:text-slate-600",
                  )}
                >
                  <ServiceIcon className="size-full" iconKey={slide.iconKey} />
                </span>
                <span className="text-[0.95rem] font-medium tracking-[-0.018em]">
                  {slide.title}
                </span>
                <span
                  className={cn(
                    "absolute inset-x-4 bottom-0 h-[2px] origin-center transition-transform duration-300",
                    index === activeIndex
                      ? "scale-x-100 bg-[#A62103]"
                      : "scale-x-0 bg-slate-950 group-hover:scale-x-100",
                  )}
                />
              </button>
            ))}
          </div>
        </div>
        <div
          ref={viewportRef}
          className="relative [--slide-gap:0.35rem] [--slide-size:92%] overflow-hidden [touch-action:pan-y] md:[--slide-gap:0.85rem] md:[--slide-size:72%] xl:[--slide-gap:0.95rem] xl:[--slide-size:68%]"
          onClickCapture={(event) => {
            if (draggedRef.current) {
              event.preventDefault();
              event.stopPropagation();
              draggedRef.current = false;
            }
          }}
          onPointerCancel={handlePointerCancel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onWheel={handleWheel}
        >
          <div
            className={cn(
              "flex gap-[var(--slide-gap)] will-change-transform",
              isTransitionEnabled &&
                "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            )}
            style={{ transform: trackTranslate }}
          >
            {displaySlides.map((slide, index) => {
              const realIndex = canLoop
                ? (index - 1 + slides.length) % slides.length
                : index;
              const isActive = realIndex === activeIndex;
              return (
                <article
                  key={`${slide.id}-${index}`}
                  className={cn(
                    "group relative min-h-[18.5rem] basis-[var(--slide-size)] shrink-0 overflow-hidden border border-slate-200 bg-white text-foreground transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:min-h-[34rem] xl:min-h-[36rem]",
                    isActive
                      ? "shadow-[0_36px_76px_-46px_rgba(17,17,17,0.28)]"
                      : "shadow-[0_24px_48px_-42px_rgba(17,17,17,0.12)]",
                  )}
                  style={{ borderRadius: 0 }}
                >
                  {!isActive ? (
                    <div className="pointer-events-none absolute inset-0 z-10">
                      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white/82 to-transparent md:w-20" />
                      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white/82 to-transparent md:w-20" />
                      <div className="absolute inset-0 ring-1 ring-black/5" />
                    </div>
                  ) : null}
                  <div className="grid h-full min-h-[18.5rem] grid-rows-[auto_minmax(0,1fr)] md:min-h-[34rem] md:grid-rows-1 md:grid-cols-[minmax(0,1.32fr)_minmax(17rem,0.68fr)] xl:min-h-[36rem] xl:grid-cols-[minmax(0,1.42fr)_minmax(19rem,0.66fr)]">
                    <div className="relative overflow-hidden md:min-h-full">
                      <Image
                        src={slide.imageSrc}
                        alt={`${slide.title} supplied and fitted by Glen Canopies`}
                        width={1400}
                        height={1000}
                        priority={realIndex === 0}
                        className="block h-auto w-full md:hidden"
                        sizes="100vw"
                        unoptimized={slide.imageSrc.includes("/api/media?")}
                      />
                      <Image
                        src={slide.imageSrc}
                        alt={`${slide.title} supplied and fitted by Glen Canopies`}
                        fill
                        priority={realIndex === 0}
                        className={cn(
                          "pointer-events-none hidden object-cover transition duration-700 md:block",
                          isActive
                            ? "scale-100 brightness-[1.02] saturate-[1.03] group-hover:scale-[1.03]"
                            : "scale-100 brightness-[0.92] saturate-[0.9]",
                        )}
                        sizes="(min-width: 1280px) 52vw, (min-width: 768px) 54vw, 90vw"
                        unoptimized={slide.imageSrc.includes("/api/media?")}
                      />
                      <div
                        className={cn(
                          "absolute inset-0",
                          isActive
                            ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(17,17,17,0.1)_100%)]"
                            : "bg-[linear-gradient(180deg,rgba(255,255,255,0.12)_0%,rgba(17,17,17,0.12)_100%)]",
                        )}
                      />
                      <div
                        className={cn(
                          "absolute inset-y-0 right-0 w-px",
                          isActive ? "bg-slate-300" : "bg-slate-200",
                        )}
                      />
                    </div>

                    <div
                      className={cn(
                        "relative flex h-full flex-col justify-between px-4 py-3.5 text-foreground md:px-5 md:py-5 xl:px-6 xl:py-6",
                        isActive
                          ? "bg-[linear-gradient(180deg,#ffffff_0%,#f3f4f6_100%)]"
                          : "bg-[linear-gradient(180deg,#fcfcfd_0%,#f4f6f8_100%)]",
                      )}
                    >
                      <div
                        className={cn(
                          "absolute left-0 top-0 h-1 w-20",
                          isActive ? "bg-[#fea502]" : "bg-transparent",
                        )}
                      />
                      <div className="pointer-events-none absolute right-4 top-3 text-slate-100 transition-all duration-500 md:right-5 md:top-4 xl:right-6">
                        <ServiceIcon
                          className="size-[4.4rem] stroke-[1.15] md:size-[5.8rem] xl:size-[6.75rem]"
                          iconKey={slide.iconKey}
                        />
                      </div>

                      <div
                        className={cn(
                          "relative z-10 space-y-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                          isActive ? "translate-y-0 opacity-100" : "translate-y-1 opacity-90",
                        )}
                      >
                        <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 text-[#A62103]">
                            <ServiceIcon
                              className="size-4.5"
                              iconKey={slide.iconKey}
                            />
                            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em]">
                              Canopy Style
                            </p>
                          </div>
                          <h3 className="max-w-[13rem] text-[1.15rem] font-semibold tracking-tight text-slate-950 md:max-w-[15rem] md:text-[1.9rem] md:leading-[1.05] xl:max-w-[16rem] xl:text-[2.1rem]">
                            {slide.title}
                          </h3>
                        </div>
                        <p className="max-w-[22rem] text-[13px] leading-[1.4] tracking-[-0.01em] text-slate-600 md:text-[1rem] md:leading-[1.6]">
                          {slide.summary}
                        </p>
                      </div>

                      <div
                        className={cn(
                          "relative z-10 mt-4 rounded-[1.1rem] border border-slate-200 bg-white/72 p-3.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:p-5",
                          isActive ? "opacity-100" : "opacity-88",
                        )}
                      >
                        {slide.features.map((feature, featureIndex) => {
                          const SecondaryIcon = featureIndex === 0 ? ShieldCheck : Sparkles;

                          return (
                            <div
                              key={feature}
                              className={cn(
                                "border-t border-slate-200 pt-3 first:border-t-0 first:pt-0",
                                featureIndex === 1 && "hidden md:block",
                              )}
                            >
                              <div className="flex items-start gap-4">
                                <div className="brand-icon-tile flex size-11 shrink-0 items-center justify-center rounded-xl">
                                  {featureIndex === 0 ? (
                                    <ServiceIcon className="size-4.5" iconKey={slide.iconKey} />
                                  ) : (
                                    <SecondaryIcon className="size-4.5" />
                                  )}
                                </div>
                                <p className="text-[13px] leading-[1.4] tracking-[-0.01em] text-slate-700 md:text-[15px] md:leading-7">
                                  {feature}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="relative z-10 mt-4 flex items-end justify-between gap-4 border-t border-slate-200 pt-3.5">
                        <div className="inline-flex min-w-0 items-center gap-2 text-slate-500">
                          <ServiceIcon className="size-4 text-[#A62103]" iconKey={slide.iconKey} />
                          <p className="truncate text-[0.74rem] font-semibold uppercase tracking-[0.18em]">
                            {slide.title}
                          </p>
                        </div>
                        <Link
                          className="group inline-flex items-center gap-2 text-[15px] font-medium tracking-[-0.01em] text-slate-950 transition-colors hover:text-[#A62103]"
                          href={slide.href}
                        >
                          View Style
                          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {canLoop ? (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous canopy style"
                className="inline-flex size-10 items-center justify-center border border-slate-300 bg-white text-slate-700 transition-colors hover:border-slate-950 hover:bg-slate-50 hover:text-slate-950"
                onClick={() => {
                  temporarilyPauseAutoplay();
                  moveBy(-1);
                }}
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Next canopy style"
                className="inline-flex size-10 items-center justify-center border border-slate-300 bg-white text-slate-700 transition-colors hover:border-slate-950 hover:bg-slate-50 hover:text-slate-950"
                onClick={() => {
                  temporarilyPauseAutoplay();
                  moveBy(1);
                }}
              >
                <ChevronRight className="size-4" />
              </button>
            </div>

            <div className="ml-auto flex w-full max-w-[18rem] items-center gap-3">
              <span className="inline-flex min-w-[7.5rem] items-center gap-2 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                <ServiceIcon className="size-4 text-[#A62103]" iconKey={slides[activeIndex]?.iconKey ?? "canopies"} />
                <span className="truncate">{slides[activeIndex]?.title ?? "Style"}</span>
              </span>
              <div className="relative h-px flex-1 overflow-hidden bg-slate-200">
                <div
                  className="absolute inset-y-0 left-0 bg-[#1D1D1D] transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {description || supportingParagraphs?.length ? (
        <div className="space-y-4 pt-1">
          {description ? (
            <p className="max-w-none text-pretty text-[1.0625rem] leading-[1.58] text-slate-600 md:text-[1.125rem]">
              {description}
            </p>
          ) : null}
          {supportingParagraphs?.length ? (
            <div className="space-y-4">
              {supportingParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-none text-pretty text-[1rem] leading-7 text-slate-600 md:text-[1.0625rem]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
