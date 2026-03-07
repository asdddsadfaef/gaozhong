import { narrativeSchema } from '../schemas/narrative.js';
import { WorldState } from '../types/game.js';
import { generateLocalNarrative } from './localNarrative.js';
import { buildNarrativePrompt } from './promptBuilder.js';

const timeoutMs = 6000;

export async function generateNarrative(state: WorldState, skeleton: string, actionName: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return generateLocalNarrative(state, skeleton, actionName);

  const prompt = buildNarrativePrompt(state, skeleton, actionName);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const resp = await fetch(`${process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1'}/chat/completions`, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: prompt.system },
          { role: 'developer', content: prompt.developer },
          { role: 'user', content: JSON.stringify(prompt.user) }
        ]
      })
    });

    if (!resp.ok) throw new Error('AI接口返回失败');
    const data = await resp.json() as any;
    const content = data.choices?.[0]?.message?.content;
    const parsed = narrativeSchema.safeParse(JSON.parse(content));
    if (!parsed.success) throw new Error('AI输出校验失败');
    return parsed.data;
  } catch {
    return generateLocalNarrative(state, skeleton, actionName);
  } finally {
    clearTimeout(timer);
  }
}
