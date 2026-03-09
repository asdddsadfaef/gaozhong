import { gameEvents } from '../data/events';
import { GameEvent, GameState } from '../types/game';

export function pickEvent(state: GameState, actionText: string): GameEvent {
  const candidates = gameEvents.filter((event) => {
    if (event.scene !== state.time.location) return false;
    if (event.trigger.minTurn && state.time.turn < event.trigger.minTurn) return false;
    if (event.trigger.maxStress && state.attributes.state.压力 > event.trigger.maxStress) return false;
    if (event.trigger.minMood && state.attributes.state.心情 < event.trigger.minMood) return false;
    if (event.trigger.minEnergy && state.attributes.state.精力 < event.trigger.minEnergy) return false;
    return true;
  });

  if (candidates.length === 0) {
    return gameEvents[state.time.turn % gameEvents.length];
  }

  const keywordMatch = candidates.find((event) =>
    event.actions.some((a) => actionText.includes(a.slice(0, 2)))
    || event.title.includes(actionText.slice(0, 2))
  );

  return keywordMatch || candidates[(state.time.turn + actionText.length) % candidates.length];
}

export function pickNpcId(event: GameEvent, state: GameState) {
  if (event.npcPool.length === 0) return undefined;
  return event.npcPool[state.time.turn % event.npcPool.length];
}
