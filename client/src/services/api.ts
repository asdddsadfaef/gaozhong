import { ActionDefinition, GameState } from '../types/game';

const req = async <T>(url: string, init?: RequestInit) => {
  const resp = await fetch(url, { ...init, headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) } });
  if (!resp.ok) throw new Error('请求失败');
  return resp.json() as Promise<T>;
};

export const api = {
  getState: () => req<GameState>('/api/game/state'),
  getMeta: () => req<{ actions: ActionDefinition[]; clubs: any[]; endings: string[]; npcs: any[] }>('/api/game/meta'),
  doAction: (actionId: string, targetNpcId?: string) => req<{ state: GameState; scene: any }>('/api/game/action', { method: 'POST', body: JSON.stringify({ actionId, targetNpcId }) }),
  listSaves: () => req<any[]>('/api/game/saves'),
  save: (slotId: string) => req('/api/game/save/' + slotId, { method: 'POST' }),
  load: (slotId: string) => req('/api/game/load/' + slotId, { method: 'POST' })
};
