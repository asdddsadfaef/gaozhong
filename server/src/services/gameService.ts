import { arcNodes, endings } from '../content/arcs.js';
import { events } from '../content/events.js';
import { clubs } from '../content/clubs.js';
import { allNpcs } from '../content/npcs.js';
import { applyAction, listActions } from '../engine/actionEngine.js';
import { maybeRunExam } from '../engine/examEngine.js';
import { createInitialState } from '../engine/initialState.js';
import { simulateNpcTurn } from '../engine/socialEngine.js';
import { advanceTime } from '../engine/timeEngine.js';
import { loadSlot, saveSlot as persistSlot, listSlots } from '../persistence/saveRepository.js';
import { WorldState } from '../types/game.js';
import { generateNarrative } from '../ai/narrativeService.js';

let currentState: WorldState = createInitialState();

function pickEvent(state: WorldState) {
  return events.find((event) => (!event.minWeek || state.time.week >= event.minWeek) && (!event.triggerFlag || state.activeStoryFlags.includes(event.triggerFlag))) ?? events[0];
}

function calcEnding(state: WorldState): string | undefined {
  if (state.time.yearStage !== '高三' || state.time.week < 72) return undefined;
  const avg = Object.values(state.player.subjects).reduce((acc, s) => acc + s.mastery, 0) / 9;
  if (avg > 88) return endings[0];
  if (state.player.clubId === 'basketball') return endings[3];
  if (state.player.clubId === 'literature') return endings[4];
  if (avg > 75) return endings[1];
  return endings[11];
}

export async function performAction(actionId: string, targetNpcId?: string) {
  const actionName = applyAction(currentState, actionId, targetNpcId);
  const event = pickEvent(currentState);
  const scene = await generateNarrative(currentState, event.skeleton, actionName);
  currentState.logs.push(scene.optionalLogEntry || scene.memorySummary);
  currentState.logs.push(...simulateNpcTurn(currentState));
  currentState.time = advanceTime(currentState.time);
  const exam = maybeRunExam(currentState);
  if (exam) {
    currentState.examRecords.push(exam);
    currentState.logs.push(`进行了${exam.examType}，你的排名来到年级第${exam.ranking}名。`);
  }
  const ending = calcEnding(currentState);
  if (ending) currentState.ending = ending;
  return { state: currentState, scene };
}

export const getState = () => currentState;
export const resetGame = () => (currentState = createInitialState());
export const getMeta = () => ({ actions: listActions(), clubs, npcs: allNpcs, arcNodes, endings });
export const saveGame = (slotId: string) => persistSlot(slotId, currentState);
export const loadGame = (slotId: string) => {
  const slot = loadSlot(slotId);
  if (slot) currentState = slot.state;
  return slot;
};
export const getSaves = () => listSlots();
