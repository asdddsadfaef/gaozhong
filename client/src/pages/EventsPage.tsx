import { useAppStore } from '../app/store';

export const EventsPage = () => {
  const { game } = useAppStore();
  const tracks = game.eventProgress.tracks;

  return (
    <section className="stack">
      <div className="card">
        <h3>主线进度</h3>
        {Object.entries(tracks).map(([name, value]) => <p key={name}>{name}：{value}%</p>)}
      </div>
      <div className="card">
        <h3>已触发关键事件</h3>
        <p>已解锁：{game.eventProgress.unlocked.length} 个</p>
        <ul>{game.eventProgress.timeline.map((it) => <li key={it}>{it}</li>)}</ul>
      </div>
      <div className="card muted">
        <h3>未解锁事件（占位）</h3>
        <p>学园祭告白夜 / 模拟考逆袭 / 毕业季抉择</p>
      </div>
    </section>
  );
};
