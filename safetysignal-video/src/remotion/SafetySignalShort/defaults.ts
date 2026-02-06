import type { SafetySignalProps } from './types';
import { generateCaptionsFromText } from './captions';

const VO_TEXT =
  "Quick one: stop treating near-misses like paperwork. In the UK, your fastest route to fewer serious incidents is a reporting culture people actually use. Three moves: make reporting stupid-easy, respond within 24 hours, and show the fixes so people know it mattered. This week: pick one high-risk task, do a five-minute near-miss stand-down, and change one control for real. Follow SafetySignal UK for practical health and safety leadership.";

export const DEFAULT_VO_SECONDS = 24;

export const defaultSafetySignalProps: SafetySignalProps = {
  topic: 'Near-miss culture',
  hook: 'Near-misses aren’t admin.',
  headline: 'They’re your early-warning system — if you respond fast.',
  bullets: [
    'Make reporting frictionless (QR + 30 seconds max).',
    'Respond within 24 hours — silence kills reporting.',
    'Publish the fixes so people see impact.',
    'This week: run a 5-minute stand-down and change one control.',
  ],
  cta: 'Follow SafetySignal UK for practical H&S leadership.',
  brand: 'SafetySignal UK',
  accent: '#b80000',
  bgImageUrl:
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2000&q=80',
  voiceoverUrl: 'audio/vo-default.mp3',
  captions: generateCaptionsFromText(VO_TEXT, DEFAULT_VO_SECONDS),
};
