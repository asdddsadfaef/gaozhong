import { useEffect } from 'react';
import { useAppStore } from '../app/store';

export const SavesPage = () => {
  const { saves, refreshSaves, saveSlot, loadSlot } = useAppStore();
  useEffect(() => { refreshSaves(); }, [refreshSaves]);

  return (
    <div className="storyPage">
      <section className="panel">
        <h3>设置</h3>
        <p className="subtle">你可以保存当前进度，或切换到任意已保存的青春分支。</p>
        <div className="miniGrid">
          <button onClick={() => saveSlot('slot1')}>保存到槽位1</button>
          <button onClick={() => saveSlot('slot2')}>保存到槽位2</button>
          <button onClick={() => loadSlot('slot1')}>读取槽位1</button>
          <button onClick={() => loadSlot('slot2')}>读取槽位2</button>
        </div>
      </section>
      <section className="panel">
        <h4>已有存档</h4>
        {saves.length === 0 ? <p>暂无存档</p> : saves.map((s: any) => <p key={s.slotId}>{s.slotId} · {s.updatedAt}</p>)}
      </section>
    </div>
  );
  return <div className="card"><h2>存档页</h2><button onClick={() => saveSlot('slot1')}>保存到槽位1</button><button onClick={() => loadSlot('slot1')}>读取槽位1</button>{saves.map((s:any)=><p key={s.slotId}>{s.slotId} - {s.updatedAt}</p>)}</div>;
};
