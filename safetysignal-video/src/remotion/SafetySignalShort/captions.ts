import type { SafetySignalProps } from './types';

// Simple caption generator: evenly distributes word timings across a fixed voiceover duration.
// Replace with real Whisper timestamps when available.
export function generateCaptionsFromText(text: string, voiceSeconds: number): NonNullable<SafetySignalProps['captions']> {
  const clean = text
    .replace(/\s+/g, ' ')
    .trim();

  const words = clean.length ? clean.split(' ') : [];
  if (!words.length || voiceSeconds <= 0) return [];

  const per = voiceSeconds / words.length;

  return words.map((w, i) => {
    const start = i * per;
    const end = (i + 1) * per;
    return { w, start, end };
  });
}
