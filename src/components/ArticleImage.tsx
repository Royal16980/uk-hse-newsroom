import Image from 'next/image';

export function ArticleImage({
  src,
  alt,
  credit,
}: {
  src?: string;
  alt?: string;
  credit?: string;
}) {
  if (!src) return null;

  return (
    <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
      <div className="relative aspect-[16/9]">
        <Image
          src={src}
          alt={alt || ''}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
          priority={false}
        />
      </div>
      {credit ? (
        <figcaption className="px-4 py-2 text-xs text-slate-600">Image: {credit}</figcaption>
      ) : null}
    </figure>
  );
}
