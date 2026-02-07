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
    /** Optional attribution URL (photographer/profile). */
    creditUrl?: string;
  };
};

export type ArticleFeed = {
  generatedAt?: string;
  source?: string;
  articles: Article[];
};

const CONTENT_PATH = path.join(process.cwd(), 'content', 'articles.json');
const DEFAULT_REMOTE_FEED =
  'https://raw.githubusercontent.com/Royal16980/uk-hse-newsroom/master/content/articles.json';

function unsplashFallback(tags?: string[], title?: string) {
  const q = encodeURIComponent([...(tags || []), title || ''].join(' ').trim() || 'workplace safety');
  // Source endpoint: no key required. Returns a random image for the query.
  return `https://source.unsplash.com/1600x900/?${q}`;
}

function normalize(feed: ArticleFeed): ArticleFeed {
  feed.articles = (feed.articles || [])
    .filter(Boolean)
    .map((a) => {
      // Ensure every story has an image for a professional newsroom look.
      if (!a.image) a.image = {};
      if (!a.image.url) a.image.url = unsplashFallback(a.tags, a.title);
      if (!a.image.credit) a.image.credit = 'Unsplash';
      if (!a.image.alt) a.image.alt = a.title;
      return a;
    })
    .sort((a, b) => {
      const ad = a.publishedAt ? Date.parse(a.publishedAt) : 0;
      const bd = b.publishedAt ? Date.parse(b.publishedAt) : 0;
      return bd - ad;
    });
  return feed;
}

export async function getFeed(): Promise<ArticleFeed> {
  const remote = process.env.FEED_URL || DEFAULT_REMOTE_FEED;

  // Prefer remote feed in production so updates do NOT require a redeploy.
  // Cached via ISR-style revalidation.
  try {
    const r = await fetch(remote, { next: { revalidate: 300 } });
    if (r.ok) {
      const parsed = (await r.json()) as ArticleFeed;
      return normalize(parsed);
    }
  } catch {
    // fall back to local
  }

  const raw = fs.readFileSync(CONTENT_PATH, 'utf8');
  return normalize(JSON.parse(raw) as ArticleFeed);
}

export async function getArticleById(id: string): Promise<Article | undefined> {
  const feed = await getFeed();
  return feed.articles.find((a) => a.id === id);
}
