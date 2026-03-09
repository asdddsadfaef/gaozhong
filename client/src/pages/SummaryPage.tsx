import { useAppStore } from '../app/store';

export const SummaryPage = () => {
  const game = useAppStore((s) => s.game);
  if (!game) return null;
  return (
    <div className="storyPage">
      <section className="panel">
        <h3>事件簿</h3>
        <p className="subtle">把校园里悄悄发生的事，收进今天的记事本。</p>
      </section>
      <section className="panel logsPanel">
        {game.logs.slice(-20).reverse().map((item, idx) => <p key={idx}>{item}</p>)}
      </section>
      <section className="panel">
        <h4>心理侧写</h4>
        <p>{Object.entries(game.player.psych).map(([k, v]) => `${k}${v}`).join('｜')}</p>
      </section>
    </div>
  );
  return <div className="card"><h2>周/学期总结</h2><p>最近行动：{game.logs.slice(-5).join(' / ')}</p><p>心理：{Object.entries(game.player.psych).map(([k,v])=>`${k}${v}`).join('，')}</p></div>;
};
