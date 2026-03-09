import { useAppStore } from '../app/store';

export const GradesPage = () => {
  const game = useAppStore((s) => s.game);
  if (!game) return null;
  return (
    <div className="storyPage">
      <section className="panel">
        <h3>属性成长</h3>
        <div className="miniGrid">
          {Object.entries(game.player.stats).map(([k, v]) => <div key={k} className="statChip">{k} <strong>{String(v)}</strong></div>)}
        </div>
      </section>
      <section className="panel">
        <h3>学科能力</h3>
        {Object.entries(game.player.subjects).map(([k, v]: any) => (
          <p key={k}>{k}｜掌握 {v.mastery}｜兴趣 {v.interest}｜稳定 {v.stability}｜应试 {v.examSkill}</p>
        ))}
      </section>
      <section className="panel">
        <h3>考试轨迹</h3>
        {game.examRecords.length === 0 ? <p className="subtle">还没有正式考试记录。</p> : game.examRecords.map((e: any, i: number) => <p key={i}>第{e.week}周 {e.examType} · 排名 {e.ranking} · {e.teacherComment}</p>)}
      </section>
    </div>
  );
  return <div className="card"><h2>成绩页</h2>{Object.entries(game.player.subjects).map(([k,v]: any)=><p key={k}>{k}: 掌握{v.mastery} 兴趣{v.interest} 稳定{v.stability} 应试{v.examSkill}</p>)}<h3>考试记录</h3>{game.examRecords.map((e:any,i:number)=><p key={i}>{e.week}周 {e.examType} 排名{e.ranking} 老师评语：{e.teacherComment}</p>)}</div>;
};
