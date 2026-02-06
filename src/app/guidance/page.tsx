import { Shell } from '@/components/Shell';

export default function GuidancePage() {
  return (
    <Shell>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-black tracking-tight">Guidance</h1>
        <p className="mt-3 text-slate-700">
          This section will be auto-populated with regulator guidance updates and simplified one-page summaries.
        </p>
        <div className="mt-6 rounded-2xl border border-slate-200 p-6 text-sm text-slate-700">
          Coming next: n8n workflow tags items as Guidance/Enforcement/Insight and the UI filters automatically.
        </div>
      </div>
    </Shell>
  );
}
