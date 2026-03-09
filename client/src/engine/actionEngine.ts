import { sceneActionMap } from '../data/actions';
import { GameState } from '../types/game';

const mapRules: Array<{ keywords: string[]; hint: string }> = [
  { keywords: ['学习', '题', '复习', '背', '刷'], hint: '专注学习型行动' },
  { keywords: ['聊天', '一起', '陪', '约', '分享'], hint: '人际互动型行动' },
  { keywords: ['休息', '散步', '放松', '吃', '睡'], hint: '恢复状态型行动' },
  { keywords: ['兼职', '买', '省钱', '花钱'], hint: '资源管理型行动' }
];

export function nextOptions(state: GameState) {
  const pool = sceneActionMap[state.time.location];
  const start = state.time.turn % pool.length;
  return [0, 1, 2, 3].map((i) => pool[(start + i) % pool.length]);
}

export function parseCustomAction(input: string) {
  const trimmed = input.trim();
  if (!trimmed) return { normalized: '安静观察周围，等待新的机会', hint: '观察型行动' };
  const matched = mapRules.find((rule) => rule.keywords.some((k) => trimmed.includes(k)));
  return { normalized: trimmed, hint: matched?.hint ?? '自由探索型行动' };
}
