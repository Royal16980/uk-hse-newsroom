import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Shell } from '@/components/Shell';
import { ArticleImage } from '@/components/ArticleImage';
import { getArticleById } from '@/lib/articles';

export default async function StoryPage({ params }: { params: { id: string } }) {
  const a = await getArticleById(params.id);
  if (!a) return notFound();

  return (
    <Shell>
      <article className="mx-auto max-w-3xl">
        <div className="text-xs font-semibold text-slate-500">{a.source ?? 'Source'}</div>
        <h1 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">{a.title}</h1>
        {a.deck ? <p className="mt-3 text-slate-700">{a.deck}</p> : null}

        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-600">
          {a.publishedAt ? <span>{new Date(a.publishedAt).toLocaleString('en-GB')}</span> : null}
          {a.tags?.length ? <span>• {a.tags.slice(0, 6).join(' · ')}</span> : null}
        </div>

        <div className="mt-8">
          <ArticleImage src={a.image?.url} alt={a.image?.alt} credit={a.image?.credit} creditUrl={a.image?.creditUrl} />
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 p-6">
          <p className="text-sm text-slate-700">
            Source link:
          </p>
          <a
            className="mt-2 inline-block break-all font-semibold text-[var(--brand)] underline"
            href={a.url}
            target="_blank"
            rel="noreferrer"
          >
            {a.url}
          </a>
          <p className="mt-4 text-sm text-slate-700">
            This newsroom is automated: n8n refreshes the feed, and the site revalidates every few minutes.
          </p>
        </div>

        <div className="mt-10">
          <Link href="/" className="text-sm text-slate-700 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </article>
    </Shell>
  );
}
