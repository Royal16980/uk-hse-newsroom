import Link from 'next/link';
import { Shell } from '@/components/Shell';
import { StoryCard } from '@/components/StoryCard';
import { getFeed } from '@/lib/articles';

export default async function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag);
  const feed = await getFeed();
  const items = feed.articles.filter((a) => (a.tags || []).includes(tag));

  return (
    <Shell>
      <div className="mx-auto max-w-4xl">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500">Tag</div>
            <h1 className="mt-1 text-3xl font-black tracking-tight">{tag}</h1>
            <p className="mt-2 text-slate-700">{items.length} stories</p>
          </div>
          <Link href="/briefing" className="text-sm text-slate-700 hover:underline">
            Browse all
          </Link>
        </div>

        <div className="mt-6 grid gap-4">
          {items.map((a) => (
            <StoryCard key={a.id} article={a} />
          ))}

          {!items.length ? (
            <div className="rounded-2xl border border-slate-200 p-6 text-sm text-slate-700">
              No stories for this tag yet.
            </div>
          ) : null}
        </div>
      </div>
    </Shell>
  );
}
