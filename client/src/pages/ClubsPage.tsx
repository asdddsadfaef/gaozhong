import { useAppStore } from '../app/store';

export const ClubsPage = () => {
  const clubs = useAppStore((s) => s.clubs);
  return <div className="card"><h2>社团页</h2>{clubs.map((c:any)=><p key={c.id}>{c.name}｜{c.fixedBonus}｜活动: {c.schedule}｜结局倾向: {c.endingBias}</p>)}</div>;
};
