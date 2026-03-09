import { GameState } from '../types/game';

const autoKey = 'ai-campus-auto-save';
const slotPrefix = 'ai-campus-slot-';

export function saveAuto(state: GameState) {
  localStorage.setItem(autoKey, JSON.stringify(state));
}

export function loadAuto(): GameState | null {
  const raw = localStorage.getItem(autoKey);
  return raw ? JSON.parse(raw) : null;
}

export function saveSlot(state: GameState, slot: string) {
  localStorage.setItem(`${slotPrefix}${slot}`, JSON.stringify({ state, savedAt: new Date().toLocaleString() }));
}

export function loadSlot(slot: string): GameState | null {
  const raw = localStorage.getItem(`${slotPrefix}${slot}`);
  if (!raw) return null;
  return JSON.parse(raw).state;
}

export function listSlots() {
  return ['1', '2', '3'].map((slot) => {
    const raw = localStorage.getItem(`${slotPrefix}${slot}`);
    if (!raw) return { slot, exists: false, savedAt: '空槽位' };
    const parsed = JSON.parse(raw);
    return { slot, exists: true, savedAt: parsed.savedAt as string };
  });
}
