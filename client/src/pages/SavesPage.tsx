import { useEffect } from 'react';
import { useAppStore } from '../app/store';

export const SavesPage = () => {
  const { saves, refreshSaves, saveSlot, loadSlot } = useAppStore();
  useEffect(() => { refreshSaves(); }, [refreshSaves]);
  return <div className="card"><h2>存档页</h2><button onClick={() => saveSlot('slot1')}>保存到槽位1</button><button onClick={() => loadSlot('slot1')}>读取槽位1</button>{saves.map((s:any)=><p key={s.slotId}>{s.slotId} - {s.updatedAt}</p>)}</div>;
};
