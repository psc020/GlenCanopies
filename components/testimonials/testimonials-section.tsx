"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types/testimonial";

type TestimonialsSectionProps = {
  testimonials: Testimonial[];
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
};

type EnrichedTestimonial = Testimonial & {
  firstName: string;
  originalIndex: number;
  quoteLength: number;
  wordCount: number;
  hasImage: boolean;
};

type SlotKind = "feature" | "wide" | "half";

type Slot = {
  id: string;
  className: string;
  kind: SlotKind;
  targetChars: number;
  maxChars: number;
  imageMaxChars: number;
  allowImage: boolean;
};

type Template = {
  id: string;
  boardHeightClass: string;
  slots: Slot[];
};

type Assignment = {
  slot: Slot;
  testimonial: EnrichedTestimonial;
  showImage: boolean;
  score: number;
};

type Board = {
  id: string;
  template: Template;
  assignments: Assignment[];
};

const GRID_TEMPLATES: Template[] = [
  {
    id: "hero-stack",
    boardHeightClass: "h-[27rem] md:h-[29rem] xl:h-[31rem]",
    slots: [
      {
        id: "feature",
        className: "md:col-[1/8] md:row-[1/7]",
        kind: "feature",
        targetChars: 132,
        maxChars: 180,
        imageMaxChars: 110,
        allowImage: true,
      },
      {
        id: "upper-wide",
        className: "md:col-[8/13] md:row-[1/4]",
        kind: "wide",
        targetChars: 72,
        maxChars: 112,
        imageMaxChars: 76,
        allowImage: true,
      },
      {
        id: "lower-wide",
        className: "md:col-[8/13] md:row-[4/7]",
        kind: "wide",
        targetChars: 72,
        maxChars: 112,
        imageMaxChars: 76,
        allowImage: true,
      },
    ],
  },
  {
    id: "offset-four",
    boardHeightClass: "h-[25rem] md:h-[26rem] xl:h-[28rem]",
    slots: [
      {
        id: "top-feature",
        className: "md:col-[1/8] md:row-[1/4]",
        kind: "wide",
        targetChars: 76,
        maxChars: 118,
        imageMaxChars: 76,
        allowImage: true,
      },
      {
        id: "top-wide",
        className: "md:col-[8/13] md:row-[1/4]",
        kind: "wide",
        targetChars: 66,
        maxChars: 102,
        imageMaxChars: 68,
        allowImage: true,
      },
      {
        id: "bottom-wide",
        className: "md:col-[1/6] md:row-[4/7]",
        kind: "wide",
        targetChars: 66,
        maxChars: 102,
        imageMaxChars: 68,
        allowImage: true,
      },
      {
        id: "bottom-feature",
        className: "md:col-[6/13] md:row-[4/7]",
        kind: "wide",
        targetChars: 76,
        maxChars: 118,
        imageMaxChars: 76,
        allowImage: true,
      },
    ],
  },
  {
    id: "balanced-three",
    boardHeightClass: "h-[24rem] md:h-[25rem] xl:h-[27rem]",
    slots: [
      {
        id: "top-half",
        className: "md:col-[1/7] md:row-[1/4]",
        kind: "wide",
        targetChars: 72,
        maxChars: 110,
        imageMaxChars: 72,
        allowImage: true,
      },
      {
        id: "bottom-half",
        className: "md:col-[1/7] md:row-[4/7]",
        kind: "wide",
        targetChars: 72,
        maxChars: 110,
        imageMaxChars: 72,
        allowImage: true,
      },
      {
        id: "right-feature",
        className: "md:col-[7/13] md:row-[1/7]",
        kind: "half",
        targetChars: 118,
        maxChars: 164,
        imageMaxChars: 94,
        allowImage: true,
      },
    ],
  },
  {
    id: "duo",
    boardHeightClass: "h-[20rem] md:h-[20rem] xl:h-[21rem]",
    slots: [
      {
        id: "left",
        className: "md:col-[1/7] md:row-[1/7]",
        kind: "half",
        targetChars: 116,
        maxChars: 156,
        imageMaxChars: 90,
        allowImage: true,
      },
      {
        id: "right",
        className: "md:col-[7/13] md:row-[1/7]",
        kind: "half",
        targetChars: 116,
        maxChars: 156,
        imageMaxChars: 90,
        allowImage: true,
      },
    ],
  },
];

const HARD_OVERFLOW_PENALTY = 100_000;
const QUOTE_SIZE_PRESETS: Record<string, string[]> = {
  "feature:text": [
    "text-[1.28rem] leading-[1.12] md:text-[1.56rem]",
    "text-[1.14rem] leading-[1.16] md:text-[1.34rem]",
    "text-[1rem] leading-[1.22] md:text-[1.12rem]",
    "text-[0.92rem] leading-[1.3] md:text-[1rem]",
  ],
  "feature:image": [
    "text-[1.06rem] leading-[1.18] md:text-[1.22rem]",
    "text-[0.98rem] leading-[1.24] md:text-[1.08rem]",
    "text-[0.9rem] leading-[1.3] md:text-[0.98rem]",
    "text-[0.84rem] leading-[1.34] md:text-[0.92rem]",
  ],
  "half:text": [
    "text-[1.2rem] leading-[1.14] md:text-[1.42rem]",
    "text-[1.06rem] leading-[1.2] md:text-[1.2rem]",
    "text-[0.94rem] leading-[1.28] md:text-[1.04rem]",
    "text-[0.86rem] leading-[1.34] md:text-[0.94rem]",
  ],
  "half:image": [
    "text-[1rem] leading-[1.2] md:text-[1.12rem]",
    "text-[0.92rem] leading-[1.26] md:text-[1rem]",
    "text-[0.86rem] leading-[1.32] md:text-[0.92rem]",
    "text-[0.8rem] leading-[1.38] md:text-[0.86rem]",
  ],
  "wide:text": [
    "text-[0.98rem] leading-[1.2] md:text-[1.08rem]",
    "text-[0.9rem] leading-[1.28] md:text-[0.98rem]",
    "text-[0.84rem] leading-[1.34] md:text-[0.9rem]",
    "text-[0.78rem] leading-[1.42] md:text-[0.84rem]",
  ],
  "wide:image": [
    "text-[0.9rem] leading-[1.24] md:text-[0.96rem]",
    "text-[0.84rem] leading-[1.32] md:text-[0.9rem]",
    "text-[0.78rem] leading-[1.38] md:text-[0.84rem]",
    "text-[0.74rem] leading-[1.46] md:text-[0.8rem]",
  ],
};

function getFirstName(name: string) {
  return name.split(/\s+/).filter(Boolean)[0] ?? name;
}

function buildEnrichedTestimonials(testimonials: Testimonial[]) {
  return testimonials.map((testimonial, index) => ({
    ...testimonial,
    firstName: getFirstName(testimonial.name),
    originalIndex: index,
    quoteLength: testimonial.quote.trim().length,
    wordCount: testimonial.quote.trim().split(/\s+/).length,
    hasImage: Boolean(testimonial.imageSrc),
  }));
}

function getPreferredBoardSizes(count: number) {
  if (count <= 2) {
    return [2];
  }

  if (count === 3) {
    return [3];
  }

  if (count === 4) {
    return [4, 2];
  }

  if (count === 5) {
    return [3, 2];
  }

  if (count === 6) {
    return [3, 4, 2];
  }

  if (count === 7) {
    return [4, 3, 2];
  }

  if (count === 8) {
    return [4, 3, 2];
  }

  return [3, 4, 2];
}

function combinations<T>(items: T[], size: number) {
  const result: T[][] = [];

  function walk(startIndex: number, combination: T[]) {
    if (combination.length === size) {
      result.push([...combination]);
      return;
    }

    for (let index = startIndex; index < items.length; index += 1) {
      combination.push(items[index]);
      walk(index + 1, combination);
      combination.pop();
    }
  }

  walk(0, []);
  return result;
}

function permutations<T>(items: T[]) {
  if (items.length <= 1) {
    return [items];
  }

  const result: T[][] = [];

  items.forEach((item, index) => {
    const remaining = items.slice(0, index).concat(items.slice(index + 1));
    permutations(remaining).forEach((permutation) => {
      result.push([item, ...permutation]);
    });
  });

  return result;
}

function scoreFit(testimonial: EnrichedTestimonial, slot: Slot, showImage: boolean) {
  if (showImage && (!slot.allowImage || !testimonial.hasImage)) {
    return Number.POSITIVE_INFINITY;
  }

  const maxChars = showImage ? slot.imageMaxChars : slot.maxChars;
  const targetChars = showImage ? Math.min(slot.targetChars, slot.imageMaxChars - 12) : slot.targetChars;
  const overflow = testimonial.quoteLength - maxChars;
  const underflow = Math.max(0, targetChars - testimonial.quoteLength);
  let score = 0;

  if (overflow > 0) {
    score += HARD_OVERFLOW_PENALTY + overflow * overflow * 4;
  }

  score += Math.abs(testimonial.quoteLength - targetChars) * 0.18;
  score += underflow * 0.05;

  if (testimonial.hasImage && slot.allowImage) {
    score += showImage ? -10 : 8;
  }

  if (slot.kind === "feature") {
    if (testimonial.quoteLength < 85) {
      score += 130;
    }

    if (!showImage && testimonial.quoteLength < 110) {
      score += 280;
    }
  }

  if (slot.kind === "wide" && testimonial.quoteLength > 160) {
    score += 180;
  }

  if (slot.kind === "wide" && testimonial.quoteLength < 52) {
    score += 28;
  }

  if (slot.kind === "half" && testimonial.quoteLength > 220) {
    score += 250;
  }

  if (slot.kind === "half" && testimonial.quoteLength < 105) {
    score += 220;
  }

  if (slot.kind === "half" && !showImage && testimonial.quoteLength < 122) {
    score += 340;
  }

  score += testimonial.originalIndex * 0.85;

  return score;
}

function chooseImageMode(testimonial: EnrichedTestimonial, slot: Slot) {
  const withoutImageScore = scoreFit(testimonial, slot, false);
  const withImageScore = testimonial.hasImage ? scoreFit(testimonial, slot, true) : Number.POSITIVE_INFINITY;

  if (withImageScore + 8 < withoutImageScore) {
    return { showImage: true, score: withImageScore };
  }

  return { showImage: false, score: withoutImageScore };
}

function buildBestBoard(remaining: EnrichedTestimonial[]) {
  const preferredSizes = getPreferredBoardSizes(remaining.length);
  const candidates = GRID_TEMPLATES.filter(
    (template) =>
      template.slots.length <= remaining.length &&
      preferredSizes.includes(template.slots.length) &&
      (remaining.length - template.slots.length === 0 || remaining.length - template.slots.length >= 2),
  );
  let bestBoard:
    | {
        template: Template;
        assignments: Assignment[];
        testimonialIds: string[];
        score: number;
      }
    | undefined;

  candidates.forEach((template) => {
    combinations(remaining, template.slots.length).forEach((combination) => {
      permutations(combination).forEach((orderedTestimonials) => {
        const assignments: Assignment[] = [];
        let score = 0;
        let earliestIndex = Number.POSITIVE_INFINITY;
        let latestIndex = Number.NEGATIVE_INFINITY;

        template.slots.forEach((slot, index) => {
          const testimonial = orderedTestimonials[index];
          const imageMode = chooseImageMode(testimonial, slot);

          assignments.push({
            slot,
            testimonial,
            showImage: imageMode.showImage,
            score: imageMode.score,
          });

          score += imageMode.score;
          earliestIndex = Math.min(earliestIndex, testimonial.originalIndex);
          latestIndex = Math.max(latestIndex, testimonial.originalIndex);
        });

        score += (latestIndex - earliestIndex) * 1.2;
        score -= template.slots.length * 12;

        if (!bestBoard || score < bestBoard.score) {
          bestBoard = {
            template,
            assignments,
            testimonialIds: assignments.map((assignment) => assignment.testimonial.id),
            score,
          };
        }
      });
    });
  });

  return bestBoard;
}

function buildBoards(testimonials: EnrichedTestimonial[]) {
  const remaining = [...testimonials];
  const boards: Board[] = [];

  while (remaining.length > 0) {
    const bestBoard = buildBestBoard(remaining);

    if (!bestBoard) {
      break;
    }

    boards.push({
      id: `${bestBoard.template.id}-${bestBoard.assignments.map((assignment) => assignment.testimonial.id).join("-")}`,
      template: bestBoard.template,
      assignments: bestBoard.assignments,
    });

    bestBoard.testimonialIds.forEach((testimonialId) => {
      const index = remaining.findIndex((testimonial) => testimonial.id === testimonialId);

      if (index !== -1) {
        remaining.splice(index, 1);
      }
    });
  }

  return boards;
}

function getQuotePresetKey(assignment: Assignment) {
  return `${assignment.slot.kind}:${assignment.showImage ? "image" : "text"}`;
}

function renderStars() {
  return (
    <div className="flex items-center gap-1 text-primary">
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} className="size-3.5 fill-current" />
      ))}
    </div>
  );
}

function AutoFitQuote({ assignment }: { assignment: Assignment }) {
  const presetKey = getQuotePresetKey(assignment);
  const presets = QUOTE_SIZE_PRESETS[presetKey] ?? QUOTE_SIZE_PRESETS["wide:text"];
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [presetIndex, setPresetIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;

    if (!container || !text) {
      return undefined;
    }

    let raf = 0;

    const fit = () => {
      if (text.scrollHeight > container.clientHeight + 2 && presetIndex < presets.length - 1) {
        setPresetIndex((current) => Math.min(current + 1, presets.length - 1));
      }
    };

    raf = window.requestAnimationFrame(fit);

    const resizeObserver = new ResizeObserver(() => {
      setPresetIndex(0);
    });

    resizeObserver.observe(container);

    return () => {
      window.cancelAnimationFrame(raf);
      resizeObserver.disconnect();
    };
  }, [presetIndex, presets.length]);

  return (
    <div ref={containerRef} className="min-h-0 flex-1 overflow-hidden">
      <p
        ref={textRef}
        className={cn(
          "break-words font-medium tracking-[-0.03em] text-slate-950",
          presets[presetIndex],
        )}
      >
        “{assignment.testimonial.quote}”
      </p>
    </div>
  );
}

function TileContent({ assignment, mobile = false }: { assignment: Assignment; mobile?: boolean }) {
  const imageSrc =
    assignment.showImage && assignment.testimonial.imageSrc ? assignment.testimonial.imageSrc : null;
  const [imageShape, setImageShape] = useState<"landscape" | "square" | "portrait">("landscape");
  const isLargeSlot = assignment.slot.kind === "feature" || assignment.slot.kind === "half";
  const useSplitImageLayout = !mobile && (isLargeSlot || imageShape === "square");

  if (imageSrc) {
    return (
      <article className="flex h-full min-h-0 overflow-hidden border border-slate-200 bg-card">
        <div
          className={cn(
            "grid h-full min-h-0 w-full",
            useSplitImageLayout
              ? "md:grid-cols-[0.96fr_1.04fr]"
              : mobile
                ? "grid-rows-[12.5rem_auto]"
                : "grid-rows-[minmax(0,1fr)_minmax(0,0.96fr)]",
          )}
        >
          {useSplitImageLayout ? (
            <>
              <div className="relative min-h-0 overflow-hidden bg-[#dddddd]">
                <Image
                  src={imageSrc}
                  alt={`Project image shared by ${assignment.testimonial.firstName}`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 26vw, 100vw"
                  unoptimized={imageSrc.includes("/api/media?")}
                  onLoad={(event) => {
                    const ratio =
                      event.currentTarget.naturalWidth / event.currentTarget.naturalHeight;

                    if (ratio >= 1.16) {
                      setImageShape("landscape");
                    } else if (ratio <= 0.84) {
                      setImageShape("portrait");
                    } else {
                      setImageShape("square");
                    }
                  }}
                />
              </div>
              <div className="flex min-h-0 flex-col justify-between gap-4 p-5 md:p-6">
                <div className="flex items-center justify-between gap-4">
                  {renderStars()}
                  <span className="text-[0.78rem] font-medium tracking-[-0.01em] text-slate-500">
                    {assignment.testimonial.dateLabel}
                  </span>
                </div>
                <div className="flex min-h-0 flex-1 flex-col justify-center gap-4">
                  <Quote className="size-5 text-primary/70" />
                  <AutoFitQuote
                    key={`${assignment.testimonial.id}-${getQuotePresetKey(assignment)}`}
                    assignment={assignment}
                  />
                </div>
                <div className="border-t border-slate-200 pt-3">
                  <p className="text-sm font-semibold tracking-[-0.02em] text-slate-950">
                    {assignment.testimonial.firstName}
                  </p>
                  <p className="text-xs font-medium text-slate-500">Facebook recommendation</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="relative min-h-0 overflow-hidden bg-[#dddddd]">
                <Image
                  src={imageSrc}
                  alt={`Project image shared by ${assignment.testimonial.firstName}`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 22vw, 100vw"
                  unoptimized={imageSrc.includes("/api/media?")}
                  onLoad={(event) => {
                    const ratio =
                      event.currentTarget.naturalWidth / event.currentTarget.naturalHeight;

                    if (ratio >= 1.16) {
                      setImageShape("landscape");
                    } else if (ratio <= 0.84) {
                      setImageShape("portrait");
                    } else {
                      setImageShape("square");
                    }
                  }}
                />
              </div>
              <div className="flex min-h-0 flex-col justify-between gap-3 p-4 md:p-5">
                <div className="flex items-center justify-between gap-4">
                  {renderStars()}
                  <span className="text-[0.78rem] font-medium tracking-[-0.01em] text-slate-500">
                    {assignment.testimonial.dateLabel}
                  </span>
                </div>
                <div className="flex min-h-0 flex-1 flex-col justify-center gap-3">
                  <Quote className="size-4.5 text-primary/70" />
                  <AutoFitQuote
                    key={`${assignment.testimonial.id}-${getQuotePresetKey(assignment)}`}
                    assignment={assignment}
                  />
                </div>
                <div className="border-t border-slate-200 pt-3">
                  <p className="text-sm font-semibold tracking-[-0.02em] text-slate-950">
                    {assignment.testimonial.firstName}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </article>
    );
  }

  return (
    <article className="flex h-full min-h-0 overflow-hidden border border-slate-200 bg-card">
      <div className="flex h-full min-h-0 w-full flex-col justify-between gap-4 p-5 md:p-6">
        <div className="flex items-center justify-between gap-4">
          {renderStars()}
          <span className="text-[0.78rem] font-medium tracking-[-0.01em] text-slate-500">
            {assignment.testimonial.dateLabel}
          </span>
        </div>
        <div className="flex min-h-0 flex-1 flex-col justify-center gap-4">
          <Quote className="size-5 text-primary/70" />
          <AutoFitQuote
            key={`${assignment.testimonial.id}-${getQuotePresetKey(assignment)}`}
            assignment={assignment}
          />
        </div>
        <div className="border-t border-slate-200 pt-3">
          <p className="text-sm font-semibold tracking-[-0.02em] text-slate-950">
            {assignment.testimonial.firstName}
          </p>
          <p className="text-xs font-medium text-slate-500">Facebook recommendation</p>
        </div>
      </div>
    </article>
  );
}

export function TestimonialsSection({
  testimonials,
  eyebrow,
  title,
  description,
  className,
}: TestimonialsSectionProps) {
  const boards = useMemo(() => buildBoards(buildEnrichedTestimonials(testimonials)), [testimonials]);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return undefined;
    }

    let frame = 0;

    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const width = viewport.clientWidth;

        if (!width) {
          return;
        }

        const nextIndex = Math.round(viewport.scrollLeft / width);
        setActiveIndex(Math.max(0, Math.min(boards.length - 1, nextIndex)));
      });
    };

    viewport.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      viewport.removeEventListener("scroll", handleScroll);
    };
  }, [boards.length]);

  const goToIndex = (index: number) => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    viewport.scrollTo({
      left: viewport.clientWidth * index,
      behavior: "smooth",
    });
  };

  if (!boards.length) {
    return null;
  }

  return (
    <section className={cn("space-y-7", className)}>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="space-y-3">
          <span className="eyebrow">{eyebrow}</span>
          <div className="space-y-2">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-950 md:text-[3rem]">
              {title}
            </h2>
            <p className="max-w-3xl text-pretty text-[1.02rem] leading-[1.58] text-slate-600 md:text-[1.1rem]">
              {description}
            </p>
          </div>
        </div>
        {boards.length > 1 ? (
          <div className="flex items-center justify-between gap-4 md:justify-end">
            <p className="text-sm font-medium tracking-[-0.01em] text-slate-500">
              {activeIndex + 1} / {boards.length}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goToIndex(Math.max(0, activeIndex - 1))}
                disabled={activeIndex === 0}
                className="inline-flex size-11 items-center justify-center border border-slate-200 bg-card text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous testimonials"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => goToIndex(Math.min(boards.length - 1, activeIndex + 1))}
                disabled={activeIndex === boards.length - 1}
                className="inline-flex size-11 items-center justify-center border border-slate-200 bg-card text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next testimonials"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="relative">
        <div
          ref={viewportRef}
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {boards.map((board) => (
            <div key={board.id} className="min-w-full snap-center">
              <div
                className={cn(
                  "grid gap-3 md:hidden",
                )}
              >
                {board.assignments.map((assignment) => (
                  <TileContent key={`${board.id}-${assignment.slot.id}`} assignment={assignment} mobile />
                ))}
              </div>
              <div className={cn("hidden grid-cols-12 grid-rows-6 gap-3 md:grid", board.template.boardHeightClass)}>
                {board.assignments.map((assignment) => (
                  <div key={`${board.id}-${assignment.slot.id}`} className={assignment.slot.className}>
                    <TileContent assignment={assignment} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {boards.length > 1 ? (
          <div className="mt-5 flex items-center justify-center gap-2">
            {boards.map((board, index) => (
              <button
                key={board.id}
                type="button"
                aria-label={`Go to testimonial set ${index + 1}`}
                aria-pressed={activeIndex === index}
                onClick={() => goToIndex(index)}
                className={cn(
                  "h-2.5 w-2.5 border border-slate-400/40 bg-slate-300/80 transition",
                  activeIndex === index && "w-9 bg-primary border-primary",
                )}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
