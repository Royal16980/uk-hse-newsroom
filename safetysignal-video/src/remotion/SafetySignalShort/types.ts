import { z } from 'zod';

export const CaptionWord = z.object({
  w: z.string(),
  start: z.number(), // seconds
  end: z.number(),   // seconds
});

export const SafetySignalPropsSchema = z.object({
  topic: z.string(),
  headline: z.string(),
  hook: z.string(),
  bullets: z.array(z.string()).min(1).max(5),
  cta: z.string(),
  brand: z.string().default('SafetySignal UK'),
  accent: z.string().default('#b80000'),
  bgImageUrl: z.string().optional(),
  voiceoverUrl: z.string().optional(),
  captions: z.array(CaptionWord).optional(),
});

export type SafetySignalProps = z.infer<typeof SafetySignalPropsSchema>;
