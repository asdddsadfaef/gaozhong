import { useAppStore } from '../app/store';

export const RelationshipPage = () => {
  const game = useAppStore((s) => s.game);
  if (!game) return null;
  return <div className="card"><h2>人物关系页</h2>{game.npcs.filter((n:any)=>n.isCore).map((n:any)=><div key={n.id} className="relRow"><strong>{n.name}</strong><span>好感 {game.relationships[n.id].好感}</span><span>信任 {game.relationships[n.id].信任}</span><span>暧昧 {game.relationships[n.id].暧昧}</span><span>敌意 {game.relationships[n.id].敌意}</span></div>)}</div>;
};
