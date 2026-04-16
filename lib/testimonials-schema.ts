import { z } from "zod";

const rawTestimonialImageSchema = z
  .object({
    uri: z.string().url().optional(),
    width: z.coerce.number().int().positive().optional(),
    height: z.coerce.number().int().positive().optional(),
  })
  .passthrough();

const rawTestimonialPhotoSchema = z
  .object({
    url: z.string().url().optional(),
    image: rawTestimonialImageSchema.optional(),
    viewer_image: rawTestimonialImageSchema.optional(),
    accessibility_caption: z.string().optional(),
  })
  .passthrough();

export const rawTestimonialSchema = z
  .object({
    id: z.string().optional(),
    legacyId: z.string().optional(),
    facebookUrl: z.string().url().optional(),
    url: z.string().url().optional(),
    date: z.string().optional(),
    text: z.string().optional(),
    isRecommended: z.coerce.boolean().optional(),
    likesCount: z.coerce.number().optional(),
    commentsCount: z.coerce.number().optional(),
    user: z
      .object({
        id: z.string().optional(),
        name: z.string().optional(),
        profileUrl: z.string().url().nullable().optional(),
        profilePic: z.string().url().optional(),
      })
      .passthrough()
      .optional(),
    photos: z.array(rawTestimonialPhotoSchema).optional(),
  })
  .passthrough();

const rawTestimonialsPayloadSchema = z.union([
  z.array(rawTestimonialSchema),
  z.object({ items: z.array(rawTestimonialSchema) }).passthrough(),
  z.object({ data: z.array(rawTestimonialSchema) }).passthrough(),
]);

type RawTestimonialsPayload = z.infer<typeof rawTestimonialsPayloadSchema>;

export type RawTestimonial = z.infer<typeof rawTestimonialSchema>;

export function parseTestimonialsPayload(raw: unknown): RawTestimonial[] {
  const parsed = rawTestimonialsPayloadSchema.parse(raw) as RawTestimonialsPayload;

  if (Array.isArray(parsed)) {
    return parsed as RawTestimonial[];
  }

  if ("items" in parsed) {
    return parsed.items as RawTestimonial[];
  }

  return parsed.data as RawTestimonial[];
}
