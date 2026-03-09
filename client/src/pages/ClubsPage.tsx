import { useAppStore } from '../app/store';

export const ClubsPage = () => {
  const { clubs, game } = useAppStore();
  return (
    <div className="storyPage">
      <section className="panel">
        <h3>资产与社团</h3>
        <p>金钱：{game?.player.resources.金钱 ?? 0} ｜ 声望：{game?.player.resources.声望 ?? 0} ｜ 家庭支持：{game?.player.resources.家庭支持 ?? 0}</p>
      </section>
      {clubs.map((c: any) => (
        <article key={c.id} className="panel">
          <strong>{c.name}</strong>
          <p>{c.fixedBonus}</p>
          <p className="subtle">活动日程：{c.schedule} · 结局倾向：{c.endingBias}</p>
        </article>
      ))}
    </div>
  );
  const clubs = useAppStore((s) => s.clubs);
  return <div className="card"><h2>社团页</h2>{clubs.map((c:any)=><p key={c.id}>{c.name}｜{c.fixedBonus}｜活动: {c.schedule}｜结局倾向: {c.endingBias}</p>)}</div>;
};
