import fs from 'node:fs';
import path from 'node:path';
import { SaveSlot, WorldState } from '../types/game.js';

const saveDir = process.env.SAVE_PATH || path.resolve(process.cwd(), '../saves');

function ensureDir() {
  if (!fs.existsSync(saveDir)) fs.mkdirSync(saveDir, { recursive: true });
}

export function saveSlot(slotId: string, state: WorldState) {
  ensureDir();
  const payload: SaveSlot = { slotId, updatedAt: new Date().toISOString(), state };
  fs.writeFileSync(path.join(saveDir, `${slotId}.json`), JSON.stringify(payload, null, 2), 'utf8');
}

export function loadSlot(slotId: string): SaveSlot | null {
  ensureDir();
  const file = path.join(saveDir, `${slotId}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf8')) as SaveSlot;
}

export function listSlots(): SaveSlot[] {
  ensureDir();
  return fs.readdirSync(saveDir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(fs.readFileSync(path.join(saveDir, f), 'utf8')) as SaveSlot)
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}
