import { GameEvent, GameState } from '../types/game';

export function generateNarrative(params: {
  state: GameState;
  event: GameEvent;
  action: string;
  npcName?: string;
  actionHint?: string;
}) {
  const { state, event, action, npcName, actionHint } = params;
  const seed = event.narrativeSeeds[state.time.turn % event.narrativeSeeds.length];
  const mood = state.attributes.state.心情;
  const stress = state.attributes.state.压力;
  const tone = mood >= 60 ? '心里带着一点轻快' : stress >= 65 ? '你明显感到肩膀有些紧' : '你努力让自己稳住节奏';
  const npcLine = npcName ? `${npcName}在你身边停了几秒，语气自然地接住了你的话。` : '周围的人声断续传来，像背景里的陪伴。';

  return `${seed}${tone}。你选择了「${action}」，这一步更像一次真实的校园日常，而不是标准答案。${npcLine}${actionHint ? `这次行动被系统识别为${actionHint}，剧情也因此悄悄偏向新的分支。` : ''}`;
}

export function summarizeEffects(effectText: string) {
  return `【${effectText}】`;
}
