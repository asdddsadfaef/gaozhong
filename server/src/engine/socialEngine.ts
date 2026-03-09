import { WorldState } from '../types/game.js';

export function simulateNpcTurn(state: WorldState): string[] {
  const logs: string[] = [];
  state.npcs.slice(0, 8).forEach((npc, idx) => {
    const rel = state.relationships[npc.id];
    const delta = (state.time.week + idx) % 3 - 1;
    rel.好感 = Math.max(0, Math.min(100, rel.好感 + delta));
    rel.熟悉 = Math.max(0, Math.min(100, rel.熟悉 + 1));
    if (delta > 0) logs.push(`${npc.name}今天对你更主动了一些。`);
  });
  return logs;
}
