import { useAppStore } from '../app/store';

export const SummaryPage = () => {
  const game = useAppStore((s) => s.game);
  if (!game) return null;
  return <div className="card"><h2>周/学期总结</h2><p>最近行动：{game.logs.slice(-5).join(' / ')}</p><p>心理：{Object.entries(game.player.psych).map(([k,v])=>`${k}${v}`).join('，')}</p></div>;
};
