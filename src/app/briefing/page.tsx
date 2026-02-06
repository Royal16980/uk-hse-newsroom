import { Shell } from '@/components/Shell';
import { getFeed } from '@/lib/articles';
import Link from 'next/link';

export default async function BriefingPage() {
  const feed = await getFeed();

  return (
    <Shell>
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-black tracking-tight">Today’s briefing</h1>
        <p className="mt-2 text-slate-700">
          A living front page that updates automatically via n8n.
        </p>

        <div className="mt-8 grid gap-4">
          {feed.articles.map((a) => (
            <Link
              key={a.id}
              href={`/story/${a.id}`}
              className="rounded-2xl border border-slate-200 p-5 hover:bg-slate-50"
            >
              <div className="text-xs font-semibold text-slate-500">{a.source ?? 'Source'}</div>
              <div className="mt-1 text-lg font-black tracking-tight">{a.title}</div>
              {a.deck ? <div className="mt-1 text-sm text-slate-700">{a.deck}</div> : null}
              <div className="mt-3 text-xs text-slate-600">
                {a.publishedAt ? new Date(a.publishedAt).toLocaleString('en-GB') : ''}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Shell>
  );
}
