import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import type { SafetySignalProps } from './types';

export function CaptionLine({
  captions,
  fromY = 0,
}: {
  captions: NonNullable<SafetySignalProps['captions']>;
  fromY?: number;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const windowSeconds = 3.0;
  const start = Math.max(0, t - 0.1);
  const end = t + windowSeconds;
  const visible = captions.filter((c) => c.end >= start && c.start <= end);

  const pop = interpolate(frame, [0, 12], [0.95, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        transform: `translateY(${fromY}px) scale(${pop})`,
      }}
      className="mx-auto max-w-[980px] rounded-2xl border border-white/10 bg-black/75 px-6 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur"
    >
      <div className="flex flex-wrap gap-x-2 gap-y-2 text-[44px] font-black leading-[1.05] tracking-tight text-white">
        {visible.map((c, idx) => {
          const active = t >= c.start && t <= c.end;
          return (
            <span
              key={`${c.start}-${idx}`}
              className="rounded-xl px-2 py-1"
              style={{
                background: active ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.08)',
                opacity: active ? 1 : 0.82,
                textShadow: '0 2px 10px rgba(0,0,0,0.55)',
              }}
            >
              {c.w}
            </span>
          );
        })}
      </div>
    </div>
  );
}
