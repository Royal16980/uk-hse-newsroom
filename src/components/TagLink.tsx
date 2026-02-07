import Link from 'next/link';

export function TagLink({ tag }: { tag: string }) {
  return (
    <Link
      href={`/tag/${encodeURIComponent(tag)}`}
      className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-700 hover:bg-white hover:underline"
    >
      {tag}
    </Link>
  );
}
