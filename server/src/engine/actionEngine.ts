import { actions } from '../content/actions.js';
import { WorldState } from '../types/game.js';

export function listActions() {
  return actions;
}

export function applyAction(state: WorldState, actionId: string, targetNpcId?: string): string {
  const action = actions.find((a) => a.id === actionId);
  if (!action) {
    return '未找到该行动。';
  }
  if (action.requiredClub && state.player.clubId !== action.requiredClub) {
    return '你还未加入对应社团。';
  }
  for (const [k, v] of Object.entries(action.cost)) {
    const key = k as keyof typeof state.player.resources;
    state.player.resources[key] = Math.max(0, state.player.resources[key] - (v ?? 0));
  }
  for (const [k, v] of Object.entries(action.gain)) {
    const key = k as keyof typeof state.player.resources;
    state.player.resources[key] = Math.min(100, state.player.resources[key] + (v ?? 0));
  }
  if (action.statGain) {
    for (const [k, v] of Object.entries(action.statGain)) {
      const key = k as keyof typeof state.player.stats;
      state.player.stats[key] = Math.min(100, state.player.stats[key] + (v ?? 0));
    }
  }
  if (action.subjectFocus) {
    const subject = state.player.subjects[action.subjectFocus];
    subject.mastery = Math.min(100, subject.mastery + 3);
    subject.examSkill = Math.min(100, subject.examSkill + 2);
  }
  if (targetNpcId && action.relationshipDelta) {
    const relationship = state.relationships[targetNpcId];
    if (relationship) {
      for (const [k, v] of Object.entries(action.relationshipDelta)) {
        const key = k as keyof typeof relationship;
        relationship[key] = Math.max(0, Math.min(100, relationship[key] + (v ?? 0)));
      }
    }
  }
  state.actionHistory.push(`${state.time.week}周-${state.time.timeSlot}:${action.name}`);
  state.logs.push(`你执行了「${action.name}」。`);
  action.addedFlags?.forEach((f) => !state.activeStoryFlags.includes(f) && state.activeStoryFlags.push(f));
  return action.name;
}
