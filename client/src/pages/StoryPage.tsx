import { useState } from 'react';
import { useAppStore } from '../app/store';
import { formatTimeLabel } from '../engine/timeEngine';

export const StoryPage = () => {
  const { game, chooseOption, submitCustomAction } = useAppStore();
  const [customAction, setCustomAction] = useState('');

  return (
    <section className="stack">
      <div className="card">
        <div className="sceneLabel">{formatTimeLabel(game.time)}</div>
        <h2>{game.current.title}</h2>
        <p className="narrative">{game.current.content}</p>
        <p className="effects">{game.current.effectsLabel}</p>
      </div>

      <div className="card">
        <h3>本回合行动</h3>
        <div className="optionList">
          {game.current.options.map((option) => (
            <button key={option} onClick={() => chooseOption(option)}>{option}</button>
          ))}
        </div>
        <div className="customAction">
          <input value={customAction} placeholder="输入自定义行动…" onChange={(e) => setCustomAction(e.target.value)} />
          <button onClick={() => { submitCustomAction(customAction); setCustomAction(''); }}>发送</button>
        </div>
      </div>

      <div className="card muted">
        <h3>近期记录</h3>
        <ul>
          {game.recentLogs.map((log) => <li key={log}>{log}</li>)}
        </ul>
      </div>
    </section>
  );
};
