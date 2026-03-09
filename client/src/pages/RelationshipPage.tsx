import { useAppStore } from '../app/store';
import { relationTag } from '../utils/immersive';

export const RelationshipPage = () => {
  const game = useAppStore((s) => s.game);
  if (!game) return null;

  const core = game.npcs.filter((n: any) => n.isCore);
  return (
    <div className="storyPage">
      <section className="panel">
        <h3>校园人脉网络</h3>
        <p className="subtle">他们并不只是数值，而是会在你的生活里靠近、误解、并肩，或渐行渐远。</p>
      </section>
      {core.map((npc: any) => {
        const rel = game.relationships[npc.id];
        return (
          <article key={npc.id} className="panel npcCard">
            <div className="npcHeader">
              <strong>{npc.name}</strong>
              <span className="npcTag">{relationTag(npc)}</span>
            </div>
            <p>{npc.personalityTags.join(' / ')} · {npc.socialRole}</p>
            <div className="npcMeters">
              <span>好感 {rel?.好感 ?? 0}</span>
              <span>信任 {rel?.信任 ?? 0}</span>
              <span>熟悉 {rel?.熟悉 ?? 0}</span>
            </div>
            <p className="subtle">最近印象：{npc.name}今天的情绪是「{npc.emotion}」，你们之间的温度正在细微变化。</p>
          </article>
        );
      })}
    </div>
  );
  return <div className="card"><h2>人物关系页</h2>{game.npcs.filter((n:any)=>n.isCore).map((n:any)=><div key={n.id} className="relRow"><strong>{n.name}</strong><span>好感 {game.relationships[n.id].好感}</span><span>信任 {game.relationships[n.id].信任}</span><span>暧昧 {game.relationships[n.id].暧昧}</span><span>敌意 {game.relationships[n.id].敌意}</span></div>)}</div>;
};
