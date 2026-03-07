import { z } from 'zod';

export const narrativeSchema = z.object({
  sceneTitle: z.string(),
  narration: z.string(),
  dialogue: z.array(z.string()),
  optionTexts: z.array(z.string()),
  moodTags: z.array(z.string()),
  memorySummary: z.string(),
  optionalLogEntry: z.string().optional()
});

export type NarrativeOutput = z.infer<typeof narrativeSchema>;
