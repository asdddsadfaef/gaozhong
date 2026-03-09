import { useAppStore } from '../app/store';

const Group = ({ title, data }: { title: string; data: Record<string, number> }) => (
  <div className="card">
    <h3>{title}</h3>
    {Object.entries(data).map(([k, v]) => (
      <div className="attrRow" key={k}><span>{k}</span><div><b>{v}</b><progress max={title === '学业属性' && k === '年级排名' ? 900 : 100} value={v} /></div></div>
    ))}
  </div>
);

export const AttributesPage = () => {
  const { game } = useAppStore();
  return <section className="stack"><Group title="核心属性" data={game.attributes.core} /><Group title="状态属性" data={game.attributes.state} /><Group title="学业属性" data={game.attributes.academy} /></section>;
};
