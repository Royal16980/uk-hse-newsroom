import fs from 'node:fs';
import path from 'node:path';

export type Article = {
  id: string;
  title: string;
  deck?: string;
  url: string;
  source?: string;
  publishedAt?: string;
  tags?: string[];
  image?: {
    alt?: string;
    credit?: string;
    url?: string;
  };
};

export type ArticleFeed = {
  generatedAt?: string;
  source?: string;
  articles: Article[];
};

const CONTENT_PATH = path.join(process.cwd(), 'content', 'articles.json');

export function getFeed(): ArticleFeed {
  const raw = fs.readFileSync(CONTENT_PATH, 'utf8');
  const parsed = JSON.parse(raw) as ArticleFeed;
  parsed.articles = (parsed.articles || [])
    .filter(Boolean)
    .sort((a, b) => {
      const ad = a.publishedAt ? Date.parse(a.publishedAt) : 0;
      const bd = b.publishedAt ? Date.parse(b.publishedAt) : 0;
      return bd - ad;
    });
  return parsed;
}

export function getArticleById(id: string): Article | undefined {
  return getFeed().articles.find((a) => a.id === id);
}
