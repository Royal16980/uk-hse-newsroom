import React from 'react';
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useVideoConfig } from 'remotion';
import type { SafetySignalProps } from './types';
import { CaptionLine } from './CaptionLine';

const Safe = ({ children }: { children: React.ReactNode }) => (
  <div className="px-12">
    <div className="mx-auto max-w-[980px]">{children}</div>
  </div>
);

export const SafetySignalShort: React.FC<SafetySignalProps> = (p) => {
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill className="bg-[#0b1220]">
      {/* Background */}
      {p.bgImageUrl ? (
        <AbsoluteFill>
          <Img
            src={p.bgImageUrl}
            style={{
              width,
              height,
              objectFit: 'cover',
              filter: 'saturate(1.05) contrast(1.05) brightness(0.65)',
            }}
          />
        </AbsoluteFill>
      ) : null}
      <AbsoluteFill className="bg-gradient-to-b from-black/40 via-black/45 to-black/60" />

      {/* Brand bar */}
      <div className="absolute left-0 right-0 top-0">
        <div className="h-2" style={{ backgroundColor: p.accent }} />
        <div className="flex items-center justify-between px-12 py-6 text-white">
          <div className="text-[26px] font-black tracking-tight">{p.brand}</div>
          <div className="text-[16px] font-semibold opacity-80">UK Health & Safety</div>
        </div>
      </div>

      {/* Hook */}
      <div className="absolute left-0 right-0 top-[150px]">
        <Safe>
          <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-[16px] font-semibold text-white/90">
            {p.topic}
          </div>
          <div className="mt-4 text-[74px] font-black leading-[0.98] tracking-tight text-white">
            {p.hook}
          </div>
          <div className="mt-4 max-w-[900px] text-[34px] font-semibold leading-[1.1] text-white/85">
            {p.headline}
          </div>
        </Safe>
      </div>

      {/* Bullets */}
      <div className="absolute left-0 right-0 top-[640px]">
        <Safe>
          <div className="grid gap-4">
            {p.bullets.slice(0, 4).map((b, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-[34px] font-semibold text-white"
              >
                <span className="mr-3 font-black" style={{ color: p.accent }}>
                  {i + 1}.
                </span>
                {b}
              </div>
            ))}
          </div>
        </Safe>
      </div>

      {/* CTA */}
      <div className="absolute bottom-[210px] left-0 right-0">
        <Safe>
          <div className="rounded-2xl bg-white px-7 py-5 text-[30px] font-black text-slate-950">
            {p.cta}
          </div>
        </Safe>
      </div>

      {/* Captions */}
      {p.captions?.length ? (
        <div className="absolute bottom-[70px] left-0 right-0">
          <Safe>
            <CaptionLine captions={p.captions} />
          </Safe>
        </div>
      ) : null}

      {/* Audio */}
      {p.voiceoverUrl ? (
        <Sequence>
          <Audio src={p.voiceoverUrl.startsWith('http') ? p.voiceoverUrl : staticFile(p.voiceoverUrl)} />
        </Sequence>
      ) : null}
    </AbsoluteFill>
  );
};
