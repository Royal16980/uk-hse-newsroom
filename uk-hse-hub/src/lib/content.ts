import fs from "node:fs";
import path from "node:path";

export type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  topic: string;
  updated: string;
  readingMinutes?: number;
  body: string[];
  checklist?: string[];
};

export type Template = {
  slug: string;
  title: string;
  excerpt: string;
  topic: string;
  format?: string;
  updated: string;
  includes?: string[];
  gate?: {
    enabled: boolean;
    fields: string[];
    consentText?: string;
  };
};

export type Topic = {
  slug: string;
  title: string;
  intro: string;
  startHere?: string[];
  topTemplates?: string[];
  faq?: { q: string; a: string }[];
};

function readJson<T>(file: string): T {
  const p = path.join(process.cwd(), "content", file);
  const raw = fs.readFileSync(p, "utf8");
  return JSON.parse(raw) as T;
}

export function getGuides(): Guide[] {
  return readJson<{ guides: Guide[] }>("guides.json").guides;
}

export function getTemplates(): Template[] {
  return readJson<{ templates: Template[] }>("templates.json").templates;
}

export function getTopics(): Topic[] {
  return readJson<{ topics: Topic[] }>("topics.json").topics;
}

export function findGuide(slug: string): Guide | undefined {
  return getGuides().find((g) => g.slug === slug);
}

export function findTemplate(slug: string): Template | undefined {
  return getTemplates().find((t) => t.slug === slug);
}

export function findTopic(slug: string): Topic | undefined {
  return getTopics().find((t) => t.slug === slug);
}
