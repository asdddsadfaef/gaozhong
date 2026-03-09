import { ExamRecord, Subject, WorldState } from '../types/game.js';

function examTypeByWeek(week: number): ExamRecord['examType'] | null {
  if (week % 24 === 0) return '高考';
  if (week % 12 === 0) return '期末';
  if (week % 6 === 0) return '期中';
  if (week % 4 === 0) return '月考';
  if (week % 2 === 0) return '小测';
  return null;
}

export function maybeRunExam(state: WorldState): ExamRecord | null {
  const examType = examTypeByWeek(state.time.week);
  if (!examType || state.examRecords.find((e) => e.week === state.time.week)) return null;
  const subjects = Object.keys(state.player.subjects) as Subject[];
  const scores = Object.fromEntries(subjects.map((subject) => {
    const s = state.player.subjects[subject];
    const stressPenalty = Math.max(0, state.player.resources.压力 - 40) * 0.2;
    const energyBonus = state.player.resources.精力 * 0.1;
    const finalScore = Math.max(35, Math.min(100, s.mastery * 0.5 + s.examSkill * 0.3 + s.stability * 0.2 + energyBonus - stressPenalty));
    return [subject, Math.round(finalScore)];
  })) as Record<Subject, number>;
  const avg = Object.values(scores).reduce((a, b) => a + b, 0) / subjects.length;
  const ranking = Math.max(1, 120 - Math.round(avg));
  return { examType, week: state.time.week, scores, ranking, teacherComment: avg > 80 ? '状态稳定，继续保持。' : '基础可提升，注意复盘。', parentFeedback: ranking < 30 ? '家里很满意，也希望你别太累。' : '父母提醒你调整节奏，稳住心态。' };
}
