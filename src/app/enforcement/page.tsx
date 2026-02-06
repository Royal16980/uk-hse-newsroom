import { Shell } from '@/components/Shell';

export default function EnforcementPage() {
  return (
    <Shell>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-black tracking-tight">Enforcement</h1>
        <p className="mt-3 text-slate-700">
          A dedicated page for prosecutions, notices, and the lessons teams should steal before they learn the hard way.
        </p>
        <div className="mt-6 rounded-2xl border border-slate-200 p-6 text-sm text-slate-700">
          Coming next: automatic “failure mode” classification (leadership, training, maintenance, guarding, CDM).
        </div>
      </div>
    </Shell>
  );
}
