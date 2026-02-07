import { Shell } from '@/components/Shell';
import { StoryCard } from '@/components/StoryCard';
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
            <StoryCard key={a.id} article={a} />
          ))}
        </div>
      </div>
    </Shell>
  );
}
