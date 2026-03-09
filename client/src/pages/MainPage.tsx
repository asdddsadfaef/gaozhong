import { useMemo, useState } from 'react';
import { useAppStore } from '../app/store';
import { formatLifeTime, parseSettlement, sceneOptions } from '../utils/immersive';

export const MainPage = () => {
  const { game, actions, performAction, performCustomAction, scene } = useAppStore();
  const [custom, setCustom] = useState('');

  const options = useMemo(() => sceneOptions(scene, actions, game), [scene, actions, game]);

  if (!game) return <div className="panel">加载中...</div>;

  const latestExam = game.examRecords.at(-1);
  const avgScore = latestExam ? Math.round(Object.values(latestExam.scores).reduce((a: number, b: number) => a + Number(b), 0) / 9) : 0;
  const learningEff = Math.round((game.player.stats.自律 + game.player.resources.精力 / 2) / 2);
  const mood = game.player.resources.心情 > 70 ? '轻快' : game.player.resources.压力 > 60 ? '紧绷' : '平稳';

  return (
    <div className="storyPage">
      <section className="statusCard">
        <div className="nameRow">
          <h2>{game.player.name}</h2>
          <span className="turnTag">第{game.time.week}周 · {game.time.timeSlot}</span>
        </div>
        <div className="pillRow">
          <span>女主</span>
          <span>{game.player.family.家境}</span>
          <span>高一(1)班</span>
          <span>{mood}</span>
        </div>
        <div className="statsRow">
          <div><label>容貌</label><strong>{game.player.stats.魅力}</strong></div>
          <div><label>智商</label><strong>{game.player.stats.智力}</strong></div>
          <div><label>情商</label><strong>{game.player.stats.情商}</strong></div>
          <div><label>金钱</label><strong>{game.player.resources.金钱}</strong></div>
        </div>
        <div className="metaRow">
          <span>年级排名：{latestExam?.ranking ?? '待测'}</span>
          <span>学习效率：{learningEff}</span>
          <span>模拟考分：{avgScore || '待测'}</span>
        </div>
      </section>

      <section className="panel sceneBar">{formatLifeTime(game)}</section>

      <section className="panel narrativeCard">
        <h3>{scene?.sceneTitle || '开学第一天 · 教室窗边'}</h3>
        <p>{scene?.narration || '午后的风从窗边吹进来，你在课本边角写下今天的目标。日常像一条温柔的河，在你和每个人之间缓慢流动。'}</p>
        {(scene?.dialogue || []).map((line, idx) => <p key={idx} className="dialogLine">「{line}」</p>)}
        <p className="settlement">{parseSettlement(scene, game)}</p>
      </section>

      <section className="panel">
        <h4>你准备怎么回应这个瞬间？</h4>
        <div className="choiceList">
          {options.slice(0, 5).map((option, idx) => (
            <button key={idx} className="choiceBtn" onClick={() => option.actionId && performAction(option.actionId)}>{option.text}</button>
          ))}
        </div>
        <div className="customActionRow">
          <input value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="输入自定义行动…" />
          <button onClick={() => { if (!custom.trim()) return; performCustomAction(custom.trim()); setCustom(''); }}>发送</button>
        </div>
      </section>

      <section className="panel logsPanel">
        <h4>本回合记录 / 近期事件</h4>
        {game.logs.slice(-6).map((log, i) => <p key={i}>{log}</p>)}
      </section>

      <details className="panel">
        <summary>自由行动库（可选）</summary>
        <div className="miniGrid">
          {actions.slice(0, 24).map((a) => <button key={a.id} className="ghostBtn" onClick={() => performAction(a.id)}>{a.name}</button>)}
        </div>
      </details>
    </div>
  );
};
