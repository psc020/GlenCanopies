import "server-only";

import { unstable_cache } from "next/cache";

import { testimonials as fallbackTestimonials } from "@/content/testimonials";
import { parseTestimonialsPayload, type RawTestimonial } from "@/lib/testimonials-schema";
import { absoluteHttpUrl, formatMonthYear } from "@/lib/utils";
import type { Testimonial } from "@/types/testimonial";

export const TESTIMONIALS_REVALIDATE_SECONDS = 60 * 60 * 6;

const TESTIMONIALS_TAG = "testimonials";

const blockedLanguagePatterns = [
  /\bfuck(?:ing|ed|er|s)?\b/i,
  /\bshit(?:ty)?\b/i,
  /\bcunt\b/i,
  /\bbitch(?:es)?\b/i,
  /\bbastard(?:s)?\b/i,
  /\bprick(?:s)?\b/i,
  /\bslut(?:s)?\b/i,
  /\bwhore(?:s)?\b/i,
];

const blockedNegativePatterns = [
  /wouldn['’]?t recommend/i,
  /would not recommend/i,
  /don['’]?t wanna know/i,
  /don['’]?t want to know/i,
  /leave job unfinished/i,
  /\bunfinished\b/i,
  /\bblame each other\b/i,
  /\bcow ?boys?\b/i,
  /\bterrible\b/i,
  /\bawful\b/i,
  /\brubbish\b/i,
  /\bdisaster\b/i,
  /\bavoid\b/i,
  /\bpoor service\b/i,
];

function getTestimonialsEndpoint() {
  return process.env.APIFY_TESTIMONIALS_DATASET_URL?.trim() || null;
}

function toInternalImageSource(value?: string) {
  if (!value) {
    return undefined;
  }

  const url = absoluteHttpUrl(value);
  if (!url) {
    return undefined;
  }

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("fbcdn.net") || parsed.hostname.includes("fbsbx.com")) {
      return url;
    }
  } catch {
    return undefined;
  }

  return `/api/media?src=${encodeURIComponent(url)}`;
}

function normalizeFallbackTestimonials(testimonials: Testimonial[]) {
  return testimonials.map((testimonial) => ({
    ...testimonial,
    avatarSrc: toInternalImageSource(testimonial.avatarSrc),
    imageSrc: toInternalImageSource(testimonial.imageSrc),
  }));
}

function normalizeQuote(value: string) {
  return value
    .replace(/\s+/g, " ")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .trim();
}

function hasBlockedLanguage(value: string) {
  return [...blockedLanguagePatterns, ...blockedNegativePatterns].some((pattern) =>
    pattern.test(value),
  );
}

function pickReviewImage(review: RawTestimonial) {
  const photo = review.photos?.find((item) => item.viewer_image?.uri || item.image?.uri);
  return photo?.viewer_image?.uri ?? photo?.image?.uri;
}

function looksUsableReview(review: RawTestimonial, quote: string) {
  if (!review.isRecommended) {
    return false;
  }

  if (!quote || quote.length < 24) {
    return false;
  }

  if (!/[a-z]/i.test(quote)) {
    return false;
  }

  if (hasBlockedLanguage(quote)) {
    return false;
  }

  return true;
}

function mapReview(review: RawTestimonial): Testimonial | null {
  const quote = normalizeQuote(review.text ?? "");

  if (!looksUsableReview(review, quote)) {
    return null;
  }

  const id = review.legacyId ?? review.id;
  const name = review.user?.name?.trim();
  const date = review.date?.trim();

  if (!id || !name || !date) {
    return null;
  }

  return {
    id,
    name,
    quote,
    date,
    dateLabel: formatMonthYear(date),
    sourceLabel: "Facebook recommendation",
    sourceUrl: review.url ?? review.facebookUrl,
    avatarSrc: toInternalImageSource(review.user?.profilePic),
    imageSrc: toInternalImageSource(pickReviewImage(review)),
    isRecommended: true,
  };
}

function dedupeTestimonials(testimonials: Testimonial[]) {
  const seen = new Set<string>();

  return testimonials.filter((testimonial) => {
    const key = `${testimonial.id}:${testimonial.quote.toLowerCase()}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

async function fetchTestimonialsFeed(): Promise<Testimonial[]> {
  const endpoint = getTestimonialsEndpoint();

  if (!endpoint) {
    return normalizeFallbackTestimonials(fallbackTestimonials);
  }

  try {
    const response = await fetch(endpoint, {
      headers: { Accept: "application/json" },
      next: {
        revalidate: TESTIMONIALS_REVALIDATE_SECONDS,
        tags: [TESTIMONIALS_TAG],
      },
    });

    if (!response.ok) {
      throw new Error(`Testimonials request failed with ${response.status}`);
    }

    const payload = await response.json();
    const records = parseTestimonialsPayload(payload);
    const liveTestimonials = dedupeTestimonials(records.map(mapReview).filter(Boolean) as Testimonial[]);

    return liveTestimonials.length > 0
      ? liveTestimonials
      : normalizeFallbackTestimonials(fallbackTestimonials);
  } catch (error) {
    console.error("Unable to load testimonials", error);
    return normalizeFallbackTestimonials(fallbackTestimonials);
  }
}

function getCachedTestimonials(endpoint: string | null) {
  return unstable_cache(fetchTestimonialsFeed, ["apify-testimonials", endpoint ?? "none"], {
    revalidate: TESTIMONIALS_REVALIDATE_SECONDS,
    tags: [TESTIMONIALS_TAG],
  })();
}

export async function getTestimonials(limit?: number) {
  const endpoint = getTestimonialsEndpoint();
  const testimonials =
    process.env.NODE_ENV === "development"
      ? await fetchTestimonialsFeed()
      : await getCachedTestimonials(endpoint);

  return typeof limit === "number" ? testimonials.slice(0, limit) : testimonials;
}
