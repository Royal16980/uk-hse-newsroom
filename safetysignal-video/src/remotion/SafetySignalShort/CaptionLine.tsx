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
      className="mx-auto max-w-[920px] rounded-2xl bg-black/70 px-6 py-4"
    >
      <div className="flex flex-wrap gap-x-2 gap-y-1 text-[44px] font-black leading-[1.05] tracking-tight text-white">
        {visible.map((c, idx) => {
          const active = t >= c.start && t <= c.end;
          return (
            <span
              key={`${c.start}-${idx}`}
              style={{
                opacity: active ? 1 : 0.72,
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
