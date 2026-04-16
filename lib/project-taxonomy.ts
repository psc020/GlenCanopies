import type { Project, ProjectCategory, ProjectTag } from "@/types/project";
import { slugify, unique } from "@/lib/utils";

export const projectTags = [
  "Apex",
  "Roman",
  "Lean-Too",
  "Flat Top",
  "Double Hipped",
  "Window Canopies",
  "LED Spotlights",
  "All Black",
  "Single Door",
  "Double Door",
  "Housing Development",
  "Social Housing",
  "Replacement Scheme",
  "Domestic Install",
  "New Build",
  "Scheme Work",
] as const satisfies readonly ProjectTag[];

export const archiveFilters = [
  { key: "all", label: "All" },
  { key: "apex", label: "Apex" },
  { key: "roman", label: "Roman" },
  { key: "small-lean-to", label: "Small Lean-To" },
  { key: "large-lean-to", label: "Large Lean-To" },
  { key: "flat-top", label: "Flat Top" },
  { key: "led-spotlights", label: "LED Spotlights" },
  { key: "all-black", label: "All Black" },
  { key: "double-door", label: "Double Door" },
  { key: "development-work", label: "Development Work" },
] as const;

export type ArchiveFilterKey = (typeof archiveFilters)[number]["key"];

export type LeanTooVariant = "small" | "large" | "generic";

const tagSynonyms: Record<string, ProjectTag> = {
  apex: "Apex",
  roman: "Roman",
  "lean too": "Lean-Too",
  "lean-too": "Lean-Too",
  "lean to": "Lean-Too",
  "lean-to": "Lean-Too",
  "flat top": "Flat Top",
  "flat-top": "Flat Top",
  flat: "Flat Top",
  "double hipped": "Double Hipped",
  window: "Window Canopies",
  "window canopy": "Window Canopies",
  "window canopies": "Window Canopies",
  led: "LED Spotlights",
  "led spotlights": "LED Spotlights",
  spotlights: "LED Spotlights",
  "all black": "All Black",
  "single door": "Single Door",
  "double door": "Double Door",
  development: "Housing Development",
  "housing development": "Housing Development",
  "social housing": "Social Housing",
  "replacement scheme": "Replacement Scheme",
  "domestic install": "Domestic Install",
  "new build": "New Build",
  "scheme work": "Scheme Work",
};

const inferenceRules: Array<{ pattern: RegExp; tag: ProjectTag }> = [
  { pattern: /\bapex\b/i, tag: "Apex" },
  { pattern: /\broman\b/i, tag: "Roman" },
  { pattern: /\blean[\s-]?too?\b|\blean[\s-]?to\b/i, tag: "Lean-Too" },
  { pattern: /\bflat(?:[\s-]?top)?\b/i, tag: "Flat Top" },
  { pattern: /\bdouble hipped\b/i, tag: "Double Hipped" },
  { pattern: /\bwindow canopy\b|\bwindow canopies\b/i, tag: "Window Canopies" },
  { pattern: /\bled\b|\bspotlights?\b/i, tag: "LED Spotlights" },
  { pattern: /\ball black\b/i, tag: "All Black" },
  { pattern: /\bdouble door\b/i, tag: "Double Door" },
  { pattern: /\bsingle door\b/i, tag: "Single Door" },
  { pattern: /\bhousing development\b|\bdevelopment\b/i, tag: "Housing Development" },
  { pattern: /\bsocial housing\b/i, tag: "Social Housing" },
  { pattern: /\breplacement scheme\b/i, tag: "Replacement Scheme" },
  { pattern: /\bnew build\b/i, tag: "New Build" },
  { pattern: /\bscheme work\b|\bscheme\b/i, tag: "Scheme Work" },
];

export function normalizeProjectTag(tag: string): ProjectTag | null {
  const normalized = tagSynonyms[slugify(tag).replace(/-/g, " ")];
  return normalized ?? null;
}

export function classifyProjectTags(text: string, existingTags: string[] = []) {
  const tags: ProjectTag[] = [];

  for (const tag of existingTags) {
    const normalized = normalizeProjectTag(tag);
    if (normalized) {
      tags.push(normalized);
    }
  }

  for (const rule of inferenceRules) {
    if (rule.pattern.test(text)) {
      tags.push(rule.tag);
    }
  }

  if (!tags.includes("Single Door") && !tags.includes("Double Door") && !tags.includes("Window Canopies")) {
    tags.push("Single Door");
  }

  if (!tags.some((tag) => tag === "Housing Development" || tag === "Social Housing" || tag === "Replacement Scheme" || tag === "Scheme Work")) {
    tags.push("Domestic Install");
  }

  return unique(tags);
}

export function inferProjectCategory(tags: ProjectTag[], text = ""): ProjectCategory {
  if (tags.includes("Housing Development")) {
    return tags.includes("New Build") ? "New Build" : "Housing Development";
  }

  if (tags.includes("Social Housing")) {
    return "Social Housing";
  }

  if (tags.includes("Replacement Scheme")) {
    return "Replacement Scheme";
  }

  if (tags.includes("Scheme Work") || /\bscheme\b/i.test(text)) {
    return "Scheme Work";
  }

  return "Domestic Install";
}

export function inferRelatedServiceSlugs(tags: ProjectTag[], text = "") {
  const serviceSlugs = new Set<string>();
  const normalizedText = text.toLowerCase();

  if (tags.includes("Apex")) {
    serviceSlugs.add("apex-canopies");
  }

  if (tags.includes("Roman")) {
    serviceSlugs.add("roman-canopies");
  }

  if (tags.includes("Lean-Too")) {
    for (const slug of inferLeanTooServiceSlugs(tags, text)) {
      serviceSlugs.add(slug);
    }
  }

  if (tags.includes("Flat Top")) {
    serviceSlugs.add("flat-top-canopies");
  }

  if (/\bdoor surround\b|\bdoor surrounds\b/.test(normalizedText)) {
    serviceSlugs.add("door-surrounds");
  }

  if (/\bcolumn\b|\bcolumns\b/.test(normalizedText)) {
    serviceSlugs.add("columns");
  }

  if (/\bpvc sill\b|\bpvc sills\b|\bexternal pvc sill\b|\bexternal pvc sills\b/.test(normalizedText)) {
    serviceSlugs.add("pvc-sills");
  }

  if (/\baluminium sill\b|\baluminium sills\b|\baluminum sill\b|\baluminum sills\b/.test(normalizedText)) {
    serviceSlugs.add("aluminium-sills");
  }

  if (/\bchimney\b|\bchimneys\b/.test(normalizedText)) {
    serviceSlugs.add("chimneys");
  }

  const hasCanopySignals =
    tags.some((tag) =>
      ["Apex", "Roman", "Lean-Too", "Flat Top", "Window Canopies", "Housing Development", "Social Housing", "Replacement Scheme", "Scheme Work"].includes(tag),
    ) || /\bcanopy\b|\bcanopies\b/.test(normalizedText);

  if (hasCanopySignals) {
    serviceSlugs.add("canopies");
  }

  return [...serviceSlugs];
}

export function inferLeanTooVariant(text = ""): LeanTooVariant {
  const mentionsLargeLeanToo = /\blarge\s+lean[\s-]?too?\b|\blarge\s+lean[\s-]?to\b/i.test(text);
  const mentionsSmallLeanToo = /\bsmall\s+lean[\s-]?too?\b|\bsmall\s+lean[\s-]?to\b/i.test(text);

  if (mentionsLargeLeanToo && !mentionsSmallLeanToo) {
    return "large";
  }

  if (mentionsSmallLeanToo && !mentionsLargeLeanToo) {
    return "small";
  }

  return "generic";
}

export function inferLeanTooServiceSlugs(tags: ProjectTag[], text = "") {
  if (!tags.includes("Lean-Too")) {
    return [] as string[];
  }

  const variant = inferLeanTooVariant(text);

  if (variant === "large") {
    return ["large-lean-to-canopies"];
  }

  if (variant === "small") {
    return ["small-lean-to-canopies"];
  }

  return ["small-lean-to-canopies", "large-lean-to-canopies"];
}

export function isLargeLeanTooTags(tags: ProjectTag[], text = "") {
  return (
    tags.includes("Double Hipped") ||
    tags.includes("Double Door") ||
    tags.includes("LED Spotlights") ||
    /\blarge\b|\bwider\b|\bwide\b|\bdouble hipped\b/i.test(text)
  );
}

export function isLargeLeanTooProject(project: Project) {
  return (
    project.tags.includes("Lean-Too") &&
    inferLeanTooVariant([project.projectType, project.title, project.summary, project.description].join(" ")) ===
      "large"
  );
}

export function matchesArchiveFilter(project: Project, filter: ArchiveFilterKey) {
  if (filter === "all") {
    return true;
  }

  if (filter === "development-work") {
    return isDevelopmentProject(project);
  }

  if (filter === "small-lean-to") {
    return (
      project.tags.includes("Lean-Too") &&
      inferLeanTooVariant([project.projectType, project.title, project.summary, project.description].join(" ")) !==
        "large"
    );
  }

  if (filter === "large-lean-to") {
    return (
      project.tags.includes("Lean-Too") &&
      inferLeanTooVariant([project.projectType, project.title, project.summary, project.description].join(" ")) !==
        "small"
    );
  }

  return project.tags.some((tag) => slugify(tag) === filter);
}

export function isDevelopmentProject(project: Project) {
  return (
    project.tags.includes("Housing Development") ||
    project.tags.includes("Social Housing") ||
    project.tags.includes("Replacement Scheme") ||
    project.tags.includes("Scheme Work") ||
    project.projectCategory !== "Domestic Install"
  );
}

export function sortProjectsByDate(projects: Project[]) {
  return [...projects].sort((first, second) => {
    return new Date(second.dateCompleted).getTime() - new Date(first.dateCompleted).getTime();
  });
}
