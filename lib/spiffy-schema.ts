import { z } from "zod";

export const rawSpiffyImageSchema = z
  .union([
    z.string().url(),
    z.object({
      url: z.string().url().optional(),
      src: z.string().url().optional(),
      alt: z.string().optional(),
      width: z.coerce.number().int().positive().optional(),
      height: z.coerce.number().int().positive().optional(),
      thumbnail: z.string().url().optional(),
      image: z
        .object({
          uri: z.string().url().optional(),
          width: z.coerce.number().int().positive().optional(),
          height: z.coerce.number().int().positive().optional(),
        })
        .optional(),
      photo_image: z
        .object({
          uri: z.string().url().optional(),
          width: z.coerce.number().int().positive().optional(),
          height: z.coerce.number().int().positive().optional(),
        })
        .optional(),
    }).passthrough(),
  ])
  .optional();

export const rawSpiffyProjectSchema = z
  .object({
    id: z.union([z.string(), z.number()]).optional(),
    slug: z.string().optional(),
    title: z.string().optional(),
    name: z.string().optional(),
    summary: z.string().optional(),
    excerpt: z.string().optional(),
    description: z.string().optional(),
    body: z.string().optional(),
    content: z.string().optional(),
    text: z.string().optional(),
    projectType: z.string().optional(),
    type: z.string().optional(),
    tags: z.array(z.string()).optional(),
    keywords: z.array(z.string()).optional(),
    location: z.string().optional(),
    town: z.string().optional(),
    county: z.string().optional(),
    projectCategory: z.string().optional(),
    category: z.string().optional(),
    completedAt: z.string().optional(),
    dateCompleted: z.string().optional(),
    createdAt: z.string().optional(),
    images: z.array(rawSpiffyImageSchema).optional(),
    gallery: z.array(rawSpiffyImageSchema).optional(),
    media: z.array(rawSpiffyImageSchema).optional(),
    image: rawSpiffyImageSchema,
    featured: z.coerce.boolean().optional(),
    lighting: z.string().optional(),
    finish: z.string().optional(),
    doorConfiguration: z.string().optional(),
    likes: z.coerce.number().optional(),
    comments: z.coerce.number().optional(),
    shares: z.coerce.number().optional(),
    time: z.string().optional(),
    timestamp: z.coerce.number().optional(),
    postId: z.string().optional(),
    sourceUrl: z.string().url().optional(),
    url: z.string().url().optional(),
    relatedServiceSlugs: z.array(z.string()).optional(),
    relatedServices: z.array(z.string()).optional(),
  })
  .passthrough();

const rawSpiffyPayloadSchema = z.union([
  z.array(rawSpiffyProjectSchema),
  z.object({ items: z.array(rawSpiffyProjectSchema) }).passthrough(),
  z.object({ data: z.array(rawSpiffyProjectSchema) }).passthrough(),
  z.object({ results: z.array(rawSpiffyProjectSchema) }).passthrough(),
  z.object({ projects: z.array(rawSpiffyProjectSchema) }).passthrough(),
]);

export type RawSpiffyProject = z.infer<typeof rawSpiffyProjectSchema>;
export type RawSpiffyImage = z.infer<typeof rawSpiffyImageSchema>;
type RawSpiffyPayload = z.infer<typeof rawSpiffyPayloadSchema>;

export function parseSpiffyPayload(raw: unknown): RawSpiffyProject[] {
  const parsed = rawSpiffyPayloadSchema.parse(raw) as RawSpiffyPayload;

  if (Array.isArray(parsed)) {
    return parsed;
  }

  if ("items" in parsed) {
    return parsed.items as RawSpiffyProject[];
  }

  if ("data" in parsed) {
    return parsed.data as RawSpiffyProject[];
  }

  if ("results" in parsed) {
    return parsed.results as RawSpiffyProject[];
  }

  return parsed.projects as RawSpiffyProject[];
}
