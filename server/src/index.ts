import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { gameRouter } from './routes/gameRoutes.js';

dotenv.config({ path: '../.env' });

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/game', gameRouter);

const port = Number(process.env.PORT || 3001);
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
