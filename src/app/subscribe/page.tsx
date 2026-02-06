import { Shell } from '@/components/Shell';

export default function SubscribePage() {
  return (
    <Shell>
      <div className="mx-auto max-w-xl">
        <h1 className="text-3xl font-black tracking-tight">Subscribe</h1>
        <p className="mt-3 text-slate-700">
          This is intentionally simple for now. We’ll wire subscriptions via n8n (email + WhatsApp broadcast lists).
        </p>

        <div className="mt-6 rounded-2xl border border-slate-200 p-6">
          <div className="text-sm font-semibold">Next step</div>
          <p className="mt-2 text-sm text-slate-700">
            Add your preferred channel into n8n and we’ll push the daily brief automatically.
          </p>
        </div>
      </div>
    </Shell>
  );
}
