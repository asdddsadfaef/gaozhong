import { create } from 'zustand';
import { api } from '../services/api';
import { ActionDefinition, GameState, NarrativeScene } from '../types/game';

interface AppState {
  game?: GameState;
  scene?: NarrativeScene;
  actions: ActionDefinition[];
  clubs: any[];
  saves: any[];
  init: () => Promise<void>;
  performAction: (actionId: string, targetNpcId?: string) => Promise<void>;
  refreshSaves: () => Promise<void>;
  saveSlot: (slotId: string) => Promise<void>;
  loadSlot: (slotId: string) => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  actions: [],
  clubs: [],
  saves: [],
  init: async () => {
    const [game, meta] = await Promise.all([api.getState(), api.getMeta()]);
    set({ game, actions: meta.actions, clubs: meta.clubs });
  },
  performAction: async (actionId, targetNpcId) => {
    const result = await api.doAction(actionId, targetNpcId);
    set({ game: result.state, scene: result.scene });
  },
  refreshSaves: async () => set({ saves: await api.listSaves() }),
  saveSlot: async (slotId) => {
    await api.save(slotId);
    await get().refreshSaves();
  },
  loadSlot: async (slotId) => {
    await api.load(slotId);
    await get().init();
  }
}));
