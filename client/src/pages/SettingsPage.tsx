import { useAppStore } from '../app/store';

export const SettingsPage = () => {
  const { game, updateWorldBook, updateApiConfig, manualSave, manualLoad, newGame, switchTheme, slots } = useAppStore();

  return (
    <section className="stack">
      <div className="card">
        <h3>世界书设定</h3>
        <textarea value={game.worldBook.customNotes} placeholder="补充你的世界观设定..." onChange={(e) => updateWorldBook({ customNotes: e.target.value })} />
        <p>{game.worldBook.campusTone}｜{game.worldBook.realismLevel}</p>
        <p>{game.worldBook.supernatural}</p>
      </div>

      <div className="card">
        <h3>API / 模型设置</h3>
        <input value={game.apiConfig.provider} onChange={(e) => updateApiConfig({ provider: e.target.value })} placeholder="Provider" />
        <input value={game.apiConfig.model} onChange={(e) => updateApiConfig({ model: e.target.value })} placeholder="Model" />
        <input value={game.apiConfig.endpoint} onChange={(e) => updateApiConfig({ endpoint: e.target.value })} placeholder="Endpoint" />
        <input value={game.apiConfig.apiKey} onChange={(e) => updateApiConfig({ apiKey: e.target.value })} placeholder="API Key" />
      </div>

      <div className="card">
        <h3>存档管理</h3>
        {slots.map((slot) => (
          <div className="saveRow" key={slot.slot}>
            <span>槽位{slot.slot}：{slot.savedAt}</span>
            <button onClick={() => manualSave(slot.slot)}>保存</button>
            <button onClick={() => manualLoad(slot.slot)} disabled={!slot.exists}>读档</button>
          </div>
        ))}
        <button onClick={newGame}>新游戏</button>
      </div>

      <div className="card">
        <h3>主题设置</h3>
        <p>当前主题：{game.theme}</p>
        <button onClick={switchTheme}>切换樱粉 / 薰衣草</button>
      </div>
    </section>
  );
};
