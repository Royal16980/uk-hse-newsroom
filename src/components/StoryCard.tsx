import Link from 'next/link';
import { ArticleImage } from '@/components/ArticleImage';
import type { Article } from '@/lib/articles';

import { TagLink } from '@/components/TagLink';

export function StoryCard({ article, variant = 'grid' }: { article: Article; variant?: 'grid' | 'lead' }) {
  const href = `/story/${article.id}`;

  if (variant === 'lead') {
    return (
      <div className="rounded-2xl border border-slate-200 overflow-hidden">
        {article.image?.url ? (
          <div className="p-4">
            <ArticleImage src={article.image.url} alt={article.image.alt} credit={article.image.credit} />
          </div>
        ) : null}
        <div className="px-6 pb-6">
          <div className="flex flex-wrap gap-2">
            {(article.tags || []).slice(0, 4).map((t) => (
              <TagLink key={t} tag={t} />
            ))}
          </div>
          <h3 className="mt-3 text-2xl font-black tracking-tight">
            <Link href={href} className="hover:underline">
              {article.title}
            </Link>
          </h3>
          {article.deck ? <p className="mt-2 max-w-prose text-slate-700">{article.deck}</p> : null}
          <div className="mt-4 flex items-center justify-between text-xs text-slate-600">
            <span>{article.source ?? 'Source'}</span>
            <span>{article.publishedAt ? new Date(article.publishedAt).toLocaleString('en-GB') : ''}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 p-5 hover:bg-slate-50 transition-colors">
      <div className="text-xs font-semibold text-slate-500">{article.source ?? 'Source'}</div>
      <div className="mt-2 grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <div className="text-lg font-black tracking-tight">
            <Link href={href} className="hover:underline">
              {article.title}
            </Link>
          </div>
          {article.deck ? <div className="mt-1 text-sm text-slate-700">{article.deck}</div> : null}
          <div className="mt-3 flex flex-wrap gap-2">
            {(article.tags || []).slice(0, 3).map((t) => (
              <TagLink key={t} tag={t} />
            ))}
          </div>
          <div className="mt-3 text-xs text-slate-600">
            {article.publishedAt ? new Date(article.publishedAt).toLocaleString('en-GB') : ''}
          </div>
        </div>
        <div className="col-span-4">
          {article.image?.url ? (
            <div className="rounded-2xl overflow-hidden border border-slate-200">
              {/* compact thumbnail */}
              <img
                src={article.image.url}
                alt={article.image.alt || ''}
                className="aspect-[16/10] w-full object-cover"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="aspect-[16/10] w-full rounded-2xl border border-dashed border-slate-200 bg-slate-50" />
          )}
        </div>
      </div>
    </div>
  );
}
