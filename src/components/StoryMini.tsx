import Link from 'next/link';
import type { Article } from '@/lib/articles';

export function StoryMini({ article }: { article: Article }) {
  return (
    <Link href={`/story/${article.id}`} className="group grid grid-cols-12 gap-3">
      <div className="col-span-4">
        {article.image?.url ? (
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <img
              src={article.image.url}
              alt={article.image.alt || ''}
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="aspect-[4/3] w-full rounded-xl border border-dashed border-slate-200 bg-slate-50" />
        )}
      </div>
      <div className="col-span-8">
        <div className="text-sm font-semibold group-hover:underline">{article.title}</div>
        <div className="mt-1 text-xs text-[rgb(var(--muted))]">
          {article.source ?? 'Source'}
          {article.publishedAt ? ` · ${new Date(article.publishedAt).toLocaleDateString('en-GB')}` : ''}
        </div>
      </div>
    </Link>
  );
}
