import { WorldState } from '../types/game.js';

export function buildNarrativePrompt(state: WorldState, skeleton: string, actionName: string) {
  return {
    system: '你是校园生活叙事助手，只能输出JSON，不可修改数值规则。',
    developer: '请严格遵循提供的人物和设定，不得新增不存在角色。',
    user: {
      date: state.time,
      player: {
        stats: state.player.stats,
        resources: state.player.resources,
        psych: state.player.psych
      },
      recentActions: state.actionHistory.slice(-21),
      activeFlags: state.activeStoryFlags,
      nearbyNpcs: state.npcs.slice(0, 5),
      skeleton,
      actionName,
      style: '青春校园，真实细腻，中文简洁有画面感'
    }
  };
}
