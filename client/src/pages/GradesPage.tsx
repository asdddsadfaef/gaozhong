import { useAppStore } from '../app/store';

export const GradesPage = () => {
  const game = useAppStore((s) => s.game);
  if (!game) return null;
  return <div className="card"><h2>成绩页</h2>{Object.entries(game.player.subjects).map(([k,v]: any)=><p key={k}>{k}: 掌握{v.mastery} 兴趣{v.interest} 稳定{v.stability} 应试{v.examSkill}</p>)}<h3>考试记录</h3>{game.examRecords.map((e:any,i:number)=><p key={i}>{e.week}周 {e.examType} 排名{e.ranking} 老师评语：{e.teacherComment}</p>)}</div>;
};
