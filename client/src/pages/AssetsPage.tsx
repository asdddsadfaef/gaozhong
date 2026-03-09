import { useAppStore } from '../app/store';

export const AssetsPage = () => {
  const { game } = useAppStore();
  const groups = ['学习类', '生活类', '关系类', '特殊物品'] as const;
  return (
    <section className="stack">
      <div className="card"><h3>当前金钱</h3><p className="money">¥ {game.attributes.state.金钱}</p></div>
      {groups.map((group) => (
        <div className="card" key={group}>
          <h3>{group}</h3>
          {game.inventory.filter((item) => item.category === group).map((item) => (
            <p key={item.id}>{item.name} × {item.count} <small>{item.description}</small></p>
          ))}
        </div>
      ))}
    </section>
  );
};
