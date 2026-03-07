import { NarrativeScene, WorldState } from '../types/game.js';

export function generateLocalNarrative(state: WorldState, skeleton: string, actionName: string): NarrativeScene {
  const npc = state.npcs[(state.time.week + state.time.day) % state.npcs.length];
  return {
    sceneTitle: `第${state.time.week}周${state.time.timeSlot}｜${actionName}`,
    narration: `${skeleton} 你在校园里完成了“${actionName}”，心里浮现出一点新的方向感。${npc.name}从走廊尽头走来，空气里有青春独有的慌张与明亮。`,
    dialogue: [`${npc.name}：今天你看起来比平时更有精神。`, '你：也许是终于找到节奏了。', `${npc.name}：那就继续向前，我会看着你。`],
    optionTexts: ['继续当前节奏', '和Ta多聊几句', '去操场独自走走'],
    moodTags: ['校园日常', '成长', '细腻'],
    memorySummary: `你在${state.time.timeSlot}执行${actionName}，与${npc.name}产生了短暂互动。`,
    optionalLogEntry: `${npc.name}与你的关系产生微小变化。`
  };
}
