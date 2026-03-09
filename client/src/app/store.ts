import { create } from 'zustand';
import { createNewGame, runTurn } from '../engine/gameState';
import { listSlots, loadAuto, loadSlot, saveAuto, saveSlot as saveSlotEngine } from '../engine/saveEngine';
import { parseCustomAction } from '../engine/actionEngine';
import { ApiConfig, GameState, WorldBook } from '../types/game';

interface AppStore {
  game: GameState;
  selectedNpcId?: string;
  init: () => void;
  chooseOption: (option: string) => void;
  submitCustomAction: (text: string) => void;
  selectNpc: (npcId?: string) => void;
  manualSave: (slot: string) => void;
  manualLoad: (slot: string) => void;
  newGame: () => void;
  updateWorldBook: (patch: Partial<WorldBook>) => void;
  updateApiConfig: (patch: Partial<ApiConfig>) => void;
  switchTheme: () => void;
  slots: ReturnType<typeof listSlots>;
  refreshSlots: () => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
  game: createNewGame(),
  slots: listSlots(),
  init: () => {
    const saved = loadAuto();
    if (saved) set({ game: saved });
    set({ slots: listSlots() });
  },
  chooseOption: (option) => {
    const updated = runTurn(get().game, option);
    saveAuto(updated);
    set({ game: updated, slots: listSlots() });
  },
  submitCustomAction: (text) => {
    const parsed = parseCustomAction(text);
    const updated = runTurn(get().game, parsed.normalized, parsed.hint);
    saveAuto(updated);
    set({ game: updated, slots: listSlots() });
  },
  selectNpc: (selectedNpcId) => set({ selectedNpcId }),
  manualSave: (slot) => {
    saveSlotEngine(get().game, slot);
    set({ slots: listSlots() });
  },
  manualLoad: (slot) => {
    const state = loadSlot(slot);
    if (state) {
      saveAuto(state);
      set({ game: state, slots: listSlots() });
    }
  },
  newGame: () => {
    const state = createNewGame();
    saveAuto(state);
    set({ game: state, slots: listSlots(), selectedNpcId: undefined });
  },
  updateWorldBook: (patch) => {
    const game = { ...get().game, worldBook: { ...get().game.worldBook, ...patch } };
    saveAuto(game);
    set({ game });
  },
  updateApiConfig: (patch) => {
    const game = { ...get().game, apiConfig: { ...get().game.apiConfig, ...patch } };
    saveAuto(game);
    set({ game });
  },
  switchTheme: () => {
    const nextTheme: '樱粉' | '薰衣草' = get().game.theme === '樱粉' ? '薰衣草' : '樱粉';
    const game: GameState = { ...get().game, theme: nextTheme };
    saveAuto(game);
    set({ game });
  },
  refreshSlots: () => set({ slots: listSlots() })
}));
