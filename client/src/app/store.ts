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
  performCustomAction: (text: string) => Promise<void>;
  refreshSaves: () => Promise<void>;
  saveSlot: (slotId: string) => Promise<void>;
  loadSlot: (slotId: string) => Promise<void>;
}

function findActionByText(text: string, actions: ActionDefinition[]): ActionDefinition | undefined {
  const normalized = text.trim();
  return actions.find((a) => normalized.includes(a.name.slice(0, 2)))
    || actions.find((a) => normalized.includes(a.category.slice(0, 2)))
    || actions[Math.floor(Math.random() * Math.max(actions.length, 1))];
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
  performCustomAction: async (text) => {
    const action = findActionByText(text, get().actions);
    if (!action) return;
    const result = await api.doAction(action.id);
    set({
      game: result.state,
      scene: {
        ...result.scene,
        optionalLogEntry: `你的自定义行动「${text}」被系统映射为「${action.name}」，并自然融入了本回合剧情。`
      }
    });
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
