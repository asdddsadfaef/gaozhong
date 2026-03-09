import { useAppStore } from '../app/store';

export const NetworkPage = () => {
  const { game, selectedNpcId, selectNpc } = useAppStore();
  const selected = game.npcs.find((n) => n.id === selectedNpcId);

  return (
    <section className="stack">
      {game.npcs.map((npc) => (
        <button key={npc.id} className="card npcCard" onClick={() => selectNpc(npc.id)}>
          <div className="topLine"><strong>{npc.name}</strong><span>{npc.stage}</span></div>
          <div className="chips">{npc.identityTags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <p>好感 {npc.favor}｜信任 {npc.trust}｜暧昧 {npc.intimacy}</p>
          <p>{npc.bio}</p>
          <small>{npc.latestLine}</small>
        </button>
      ))}

      {selected && (
        <div className="modalMask" onClick={() => selectNpc(undefined)}>
          <div className="modalCard" onClick={(e) => e.stopPropagation()}>
            <h3>{selected.name} · 人物详情</h3>
            <p>{selected.bio}</p>
            <p>关系阶段：{selected.stage}</p>
            <p>近期印象：{selected.recentImpression}</p>
            <p>可触发剧情：{selected.eventTypes.join('、')}</p>
            <ul>{selected.history.map((h) => <li key={h}>{h}</li>)}</ul>
            <button onClick={() => selectNpc(undefined)}>关闭</button>
          </div>
        </div>
      )}
    </section>
  );
};
