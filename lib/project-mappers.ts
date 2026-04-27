import type { Project, ProjectImage, ProjectTag } from "@/types/project";
import type { RawSpiffyImage, RawSpiffyProject } from "@/lib/spiffy-schema";
import {
  classifyProjectTags,
  inferProjectCategory,
  inferLeanTooServiceSlugs,
  inferLeanTooVariant,
  inferRelatedServiceSlugs,
  normalizeProjectTag,
  sortProjectsByDate,
} from "@/lib/project-taxonomy";
import { absoluteHttpUrl, slugify, unique } from "@/lib/utils";

const FALLBACK_IMAGE: ProjectImage = {
  src: "/demo/project-fallback.svg",
  alt: "Premium canopy installation project",
  width: 1600,
  height: 1200,
};

function toInternalImageSource(value: string) {
  const url = absoluteHttpUrl(value);

  if (!url) {
    return value;
  }

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("fbcdn.net") || parsed.hostname.includes("fbsbx.com")) {
      return url;
    }
  } catch {
    return value;
  }

  return `/api/media?src=${encodeURIComponent(url)}`;
}

function isLikelyImageUrl(value: string) {
  try {
    const url = new URL(value);
    return (
      url.hostname.includes("fbcdn.net") ||
      url.hostname.includes("fbsbx.com") ||
      /\.(avif|gif|heic|heif|jpe?g|png|webp)$/i.test(url.pathname)
    );
  } catch {
    return false;
  }
}

function pickBestNestedImage(
  ...candidates: Array<{ uri?: string; width?: number; height?: number } | undefined>
) {
  const validCandidates = candidates.filter(
    (candidate): candidate is { uri?: string; width?: number; height?: number } =>
      Boolean(candidate?.uri && isLikelyImageUrl(candidate.uri)),
  );

  if (validCandidates.length === 0) {
    return null;
  }

  return validCandidates.sort((left, right) => {
    const leftArea = (left.width ?? 0) * (left.height ?? 0);
    const rightArea = (right.width ?? 0) * (right.height ?? 0);
    return rightArea - leftArea;
  })[0];
}

function normalizeImage(image: RawSpiffyImage, title: string): ProjectImage | null {
  if (!image) {
    return null;
  }

  if (typeof image === "string") {
    return {
      src: toInternalImageSource(image),
      alt: title,
      width: 1600,
      height: 1200,
    };
  }

  const bestNestedImage = pickBestNestedImage(image.image, image.photo_image);
  const candidateSources = [image.url, image.src, bestNestedImage?.uri, image.thumbnail].filter(
    (value): value is string => Boolean(value && isLikelyImageUrl(value)),
  );
  const src = candidateSources[0];

  if (!src || !isLikelyImageUrl(src)) {
    return null;
  }

  return {
    src: toInternalImageSource(src),
    alt: image.alt ?? title,
    width: bestNestedImage?.width ?? image.width ?? 1600,
    height: bestNestedImage?.height ?? image.height ?? 1200,
  };
}

function normalizeImages(record: RawSpiffyProject, title: string) {
  const images = [record.image, ...(record.images ?? []), ...(record.gallery ?? []), ...(record.media ?? [])]
    .map((image) => normalizeImage(image, title))
    .filter((image): image is ProjectImage => Boolean(image))
    .filter((image, index, collection) => collection.findIndex((candidate) => candidate.src === image.src) === index);

  return images.length > 0 ? images : [FALLBACK_IMAGE];
}

function firstString(...values: Array<string | undefined>) {
  return values.find((value) => value && value.trim())?.trim() ?? "";
}

function normalizeTextValue(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function isLikelyProjectTitle(value: string | undefined) {
  if (!value) {
    return false;
  }

  const normalized = normalizeTextValue(value);

  return Boolean(normalized) && normalized.length <= 88 && !/[.!?]\s*$/.test(normalized);
}

function normalizeCategory(value: string): ProjectTag | null {
  return normalizeProjectTag(value);
}

function buildTitle(record: RawSpiffyProject) {
  const candidates = [record.title, record.name, record.summary, record.excerpt];
  const title = candidates.find((candidate) => isLikelyProjectTitle(candidate));

  return title ? normalizeTextValue(title) : "";
}

function buildSummary(record: RawSpiffyProject) {
  return firstString(record.summary, record.excerpt, record.description, record.body, record.text).slice(0, 180);
}

function buildDescription(record: RawSpiffyProject, fallback: string) {
  return firstString(record.description, record.body, record.content, record.text, fallback).slice(0, 220);
}

function buildSlug(record: RawSpiffyProject, title: string, location: string) {
  if (record.slug) {
    return slugify(record.slug);
  }

  const seed = firstString(title, record.projectType, record.type);
  const suffix = location ? `-${location}` : record.id ? `-${record.id}` : "";
  return slugify(`${seed}${suffix}`);
}

function normalizeTags(record: RawSpiffyProject, text: string) {
  const inputTags = [...(record.tags ?? []), ...(record.keywords ?? []), record.category ?? "", record.projectCategory ?? ""]
    .filter(Boolean)
    .flatMap((tag) => tag.split(",").map((part) => part.trim()))
    .filter(Boolean);

  const tags = classifyProjectTags(text, inputTags);

  const normalizedCategory = normalizeCategory(firstString(record.projectCategory, record.category));
  if (normalizedCategory && !tags.includes(normalizedCategory)) {
    tags.push(normalizedCategory);
  }

  return unique(tags as ProjectTag[]);
}

const knownLocations = [
  "Belfast",
  "Lisburn",
  "Omagh",
  "Derry",
  "Londonderry",
  "Craigavon",
  "Newry",
  "Banbridge",
  "Antrim",
  "Co Kildare",
  "Kildare",
];

const locationToCounty: Record<string, string> = {
  Belfast: "County Antrim",
  Lisburn: "County Antrim",
  Omagh: "County Tyrone",
  Derry: "County Londonderry",
  Londonderry: "County Londonderry",
  Craigavon: "County Armagh",
  Newry: "County Down",
  Banbridge: "County Down",
  Antrim: "County Antrim",
  "Co Kildare": "Co Kildare",
  Kildare: "Co Kildare",
};

function normalizeLocation(value: string) {
  const cleaned = value.replace(/\s+/g, " ").trim().replace(/^[,.-\s]+|[,.-\s]+$/g, "");

  if (!cleaned) {
    return "";
  }

  const countyMatch = cleaned.match(/^(Co(?:unty)?\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/);
  if (countyMatch) {
    return countyMatch[1].trim();
  }

  const matchedLocation = knownLocations.find((location) =>
    new RegExp(`\\b${location.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(cleaned),
  );

  if (matchedLocation) {
    return matchedLocation;
  }

  return cleaned
    .replace(/\b(?:by|fitted|supplied|installed|installation|canopy|canopies|scheme|work|with)\b.*$/i, "")
    .replace(/^[,.-\s]+|[,.-\s]+$/g, "")
    .trim();
}

function extractLocation(text: string) {
  const countyMatch = text.match(/\b(?:in|at|across|on)\s+(Co(?:unty)?\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
  if (countyMatch) {
    return normalizeLocation(countyMatch[1]);
  }

  const matchedLocation = knownLocations.find((location) =>
    new RegExp(`\\b${location.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(text),
  );

  return matchedLocation ? normalizeLocation(matchedLocation) : "";
}

function inferProjectType(tags: ProjectTag[], text: string) {
  const leanTooVariant = inferLeanTooVariant(text);

  if (/\bchimney\b|\bchimneys\b/i.test(text)) {
    return "Chimney Installation";
  }

  if (/\bdoor surround\b|\bdoor surrounds\b/i.test(text)) {
    return "Door Surround Installation";
  }

  if (/\bcolumn\b|\bcolumns\b/i.test(text)) {
    return "Column Installation";
  }

  if (/\bpvc sill\b|\bpvc sills\b|\bexternal pvc sill\b|\bexternal pvc sills\b/i.test(text)) {
    return "PVC Sill Installation";
  }

  if (/\baluminium sill\b|\baluminium sills\b|\baluminum sill\b|\baluminum sills\b/i.test(text)) {
    return "Aluminium Sill Installation";
  }

  if (tags.includes("Flat Top") || /\bflat(?:[\s-]?top)?\b/i.test(text)) {
    return "Flat Top Canopy";
  }

  if (tags.includes("Double Hipped") && tags.includes("Lean-Too")) {
    return leanTooVariant === "large" ? "Large Lean-To Canopy" : "Lean-To Canopy";
  }

  if (tags.includes("Apex")) {
    return "Apex Canopy";
  }

  if (tags.includes("Roman")) {
    return "Roman Canopy";
  }

  if (tags.includes("Lean-Too")) {
    if (leanTooVariant === "large") {
      return "Large Lean-To Canopy";
    }

    if (leanTooVariant === "small") {
      return "Small Lean-To Canopy";
    }

    return "Lean-To Canopy";
  }

  if (tags.includes("Window Canopies")) {
    return "Window Canopy Installation";
  }

  if (tags.includes("Housing Development") || tags.includes("Scheme Work")) {
    return "Development Canopy Scheme";
  }

  if (/\bdoor canopy\b|\bdoor canopies\b/i.test(text)) {
    return "Door Canopy Installation";
  }

  return "Canopy Installation";
}

function shouldPreferInferredProjectType(rawProjectType: string, inferredProjectType: string) {
  if (!rawProjectType) {
    return true;
  }

  const normalizedRawType = rawProjectType.trim().toLowerCase();
  const normalizedInferredType = inferredProjectType.trim().toLowerCase();

  if (!normalizedInferredType || normalizedRawType === normalizedInferredType) {
    return false;
  }

  return (
    /^(installation|project|recent work|canopy installation|door canopy installation)$/i.test(rawProjectType) ||
    (/\bcanopy\b/.test(normalizedRawType) && !/\bcanopy\b/.test(normalizedInferredType))
  );
}

function formatProjectTitle(projectType: string, location: string) {
  return location !== "Ireland" ? `${projectType} in ${location}` : projectType;
}

function shouldUseGeneratedTitle(rawTitle: string, projectType: string) {
  if (!rawTitle) {
    return true;
  }

  const normalizedTitle = rawTitle.trim().toLowerCase();
  const normalizedProjectType = projectType.trim().toLowerCase();

  return (
    rawTitle.length > 88 ||
    /^(recent work|recent installation|new project|project|installation|canopy installation|door canopy installation)$/i.test(rawTitle) ||
    normalizedTitle === normalizedProjectType ||
    (/\bcanopy\b/.test(normalizedTitle) && !/\bcanopy\b/.test(normalizedProjectType))
  );
}

function inferFinish(text: string) {
  if (/all black/i.test(text)) {
    return "All black";
  }

  if (/anthracite/i.test(text)) {
    return "Anthracite";
  }

  return undefined;
}

function inferLighting(tags: ProjectTag[], text: string) {
  if (tags.includes("LED Spotlights") || /\bled\b|\bspotlights?\b/i.test(text)) {
    return "Integrated LED spotlights";
  }

  return undefined;
}

function inferDoorConfiguration(tags: ProjectTag[]) {
  if (tags.includes("Double Door")) {
    return "Double door";
  }

  if (tags.includes("Single Door")) {
    return "Single door";
  }

  return undefined;
}

function normalizeRelatedServiceSlugs(input: string[], tags: ProjectTag[], text: string) {
  const remapped = input.flatMap((slug) => {
    switch (slug) {
      case "door-canopies":
      case "window-canopies":
      case "grp-canopies":
        return ["canopies"];
      case "apex-door-canopies":
        return ["apex-canopies"];
      case "roman-door-canopies":
        return ["roman-canopies"];
      case "lean-too-canopies":
        return inferLeanTooServiceSlugs(tags, text);
      default:
        return [slug];
    }
  });

  return unique(remapped);
}

export function mapSpiffyProject(record: RawSpiffyProject): Project | null {
  const rawTitle = buildTitle(record);
  const rawText = [rawTitle, record.text, record.summary, record.description, record.body].filter(Boolean).join(" ");
  const extractedLocation = extractLocation(rawText);
  const location =
    normalizeLocation(firstString(record.location, record.town, extractedLocation)) || "Ireland";
  const county = firstString(record.county, locationToCounty[location]) || "Ireland";
  const summarySeed = buildSummary(record) || rawTitle;
  const descriptionSeed = buildDescription(record, summarySeed || "Recent installation by Glen Canopies.");
  const combinedText = [rawTitle, summarySeed, descriptionSeed, record.projectType, record.type, location, county].join(" ");
  const tags = normalizeTags(record, combinedText);
  const inferredProjectType = inferProjectType(tags, combinedText);
  const rawProjectType = firstString(record.projectType, record.type);
  const projectType = shouldPreferInferredProjectType(rawProjectType, inferredProjectType)
    ? inferredProjectType
    : rawProjectType || inferredProjectType;
  const title = shouldUseGeneratedTitle(rawTitle, projectType)
    ? formatProjectTitle(projectType, location)
    : rawTitle;
  const summary =
    summarySeed ||
    (location !== "Ireland"
      ? `${projectType} supplied and fitted in ${location}.`
      : `${projectType} supplied and fitted by Glen Canopies.`);
  const description = buildDescription(record, summary);

  if (!title) {
    return null;
  }

  const projectCategory = inferProjectCategory(tags, combinedText);
  const relatedServiceSlugs = normalizeRelatedServiceSlugs(
    record.relatedServiceSlugs ?? record.relatedServices ?? inferRelatedServiceSlugs(tags, combinedText),
    tags,
    combinedText,
  );
  const dateCompleted =
    firstString(record.dateCompleted, record.completedAt, record.time, record.createdAt) ||
    new Date().toISOString();
  const slug = buildSlug(record, title, location);

  return {
    id: String(record.postId ?? record.id ?? slug),
    slug,
    title,
    summary,
    description,
    projectType,
    tags,
    location,
    county,
    projectCategory,
    dateCompleted,
    images: normalizeImages(record, title),
    featured: record.featured ?? false,
    lighting: record.lighting ?? inferLighting(tags, combinedText),
    finish: record.finish ?? inferFinish(combinedText),
    doorConfiguration: record.doorConfiguration ?? inferDoorConfiguration(tags),
    sourceUrl: absoluteHttpUrl(firstString(record.sourceUrl, record.url)) || undefined,
    relatedServiceSlugs,
    seo: {
      title:
        location !== "Ireland"
          ? `${projectType} in ${location} | Glen Canopies`
          : `${projectType} | Glen Canopies`,
      description:
        location !== "Ireland"
          ? `${projectType} supplied and fitted in ${location} by Glen Canopies. View project images and key details.`
          : `${projectType} supplied and fitted by Glen Canopies. View project images and key details.`,
    },
  };
}

function ensureUniqueProjectSlugs(projects: Project[]) {
  const seen = new Map<string, number>();

  return projects.map((project) => {
    const baseSlug = project.slug || slugify(project.title) || slugify(project.id) || "project";
    const currentCount = seen.get(baseSlug) ?? 0;
    seen.set(baseSlug, currentCount + 1);

    if (currentCount === 0) {
      return project;
    }

    const stableSuffix = slugify(project.id).slice(-10) || String(currentCount + 1);
    let candidate = `${baseSlug}-${stableSuffix}`;
    let collisionIndex = 2;

    while (seen.has(candidate)) {
      candidate = `${baseSlug}-${stableSuffix}-${collisionIndex}`;
      collisionIndex += 1;
    }

    seen.set(candidate, 1);

    return {
      ...project,
      slug: candidate,
      seo: {
        ...project.seo,
      },
    };
  });
}

export function mapSpiffyProjects(records: RawSpiffyProject[]) {
  const mappedProjects = records
    .map((record) => mapSpiffyProject(record))
    .filter((record): record is Project => Boolean(record));

  return sortProjectsByDate(ensureUniqueProjectSlugs(mappedProjects));
}
