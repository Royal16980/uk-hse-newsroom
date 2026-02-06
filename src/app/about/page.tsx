import { Shell } from '@/components/Shell';

export default function AboutPage() {
  return (
    <Shell>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-black tracking-tight">About</h1>
        <p className="mt-4 text-slate-700">
          UK HSE Newsroom is an automated, UK-first health & safety front page.
          It’s designed to feel like a modern news site (BBC-ish) while staying practical:
          every item is meant to translate into actions for leaders, managers and safety teams.
        </p>
        <ul className="mt-6 list-disc pl-6 text-slate-700 space-y-2">
          <li>Sources are pulled by n8n from public feeds (e.g., regulators and sector bodies).</li>
          <li>n8n generates a clean JSON feed and commits it to GitHub.</li>
          <li>Vercel auto-deploys on every update.</li>
        </ul>
        <p className="mt-6 text-sm text-slate-600">
          Not affiliated with the Health and Safety Executive (HSE).
        </p>
      </div>
    </Shell>
  );
}
