import { Router } from 'express';
import { getMeta, getSaves, getState, loadGame, performAction, resetGame, saveGame } from '../services/gameService.js';

export const gameRouter = Router();

gameRouter.get('/state', (_req, res) => {
  res.json(getState());
});

gameRouter.get('/meta', (_req, res) => {
  res.json(getMeta());
});

gameRouter.post('/action', async (req, res) => {
  const { actionId, targetNpcId } = req.body as { actionId: string; targetNpcId?: string };
  const result = await performAction(actionId, targetNpcId);
  res.json(result);
});

gameRouter.post('/reset', (_req, res) => {
  res.json(resetGame());
});

gameRouter.get('/saves', (_req, res) => {
  res.json(getSaves());
});

gameRouter.post('/save/:slotId', (req, res) => {
  saveGame(req.params.slotId);
  res.json({ ok: true });
});

gameRouter.post('/load/:slotId', (req, res) => {
  const save = loadGame(req.params.slotId);
  res.json({ ok: Boolean(save), save });
});
