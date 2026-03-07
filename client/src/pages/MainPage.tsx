import { useMemo } from 'react';
import { useAppStore } from '../app/store';

export const MainPage = () => {
  const { game, actions, performAction, scene } = useAppStore();
  const grouped = useMemo(() => actions.reduce((acc: Record<string, any[]>, action) => {
    (acc[action.category] ||= []).push(action);
    return acc;
  }, {}), [actions]);

  if (!game) return <div className="card">加载中...</div>;

  return (
    <div className="layout">
      <section className="card topInfo">
        <div>{game.time.yearStage} {game.time.semester} · 第{game.time.week}周 第{game.time.day}天 {game.time.timeSlot}</div>
        <div>金钱{game.player.resources.金钱} / 精力{game.player.resources.精力} / 心情{game.player.resources.心情} / 压力{game.player.resources.压力}</div>
      </section>
      <aside className="card left">
        <h3>玩家属性</h3>
        {Object.entries(game.player.stats).map(([k, v]) => <p key={k}>{k}: {String(v)}</p>)}
      </aside>
      <main className="card center">
        <h3>{scene?.sceneTitle || '开学第一天'}</h3>
        <p>{scene?.narration || game.logs.at(-1)}</p>
        {(scene?.dialogue || []).map((d: string, i: number) => <p key={i}>· {d}</p>)}
        <h4>日志</h4>
        <div className="logBox">{game.logs.slice(-8).map((l: string, i: number) => <p key={i}>{l}</p>)}</div>
      </main>
      <aside className="card right">
        <h3>核心NPC</h3>
        {game.npcs.filter((n: any) => n.isCore).slice(0, 8).map((npc: any) => (
          <p key={npc.id}>{npc.name} · {npc.emotion} · 好感{game.relationships[npc.id]?.好感 ?? 0}</p>
        ))}
      </aside>
      <section className="card bottom">
        <h3>行动菜单</h3>
        {Object.entries(grouped).map(([cat, list]) => (
          <div key={cat}>
            <h4>{cat}</h4>
            <div className="actionGrid">{(list as any[]).slice(0, 8).map((a) => <button key={a.id} onClick={() => performAction(a.id)}>{a.name}</button>)}</div>
          </div>
        ))}
      </section>
    </div>
  );
};
