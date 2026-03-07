import { EventTemplate } from '../types/game.js';

const daily = Array.from({ length: 110 }, (_, i): EventTemplate => ({
  id: `daily_${i + 1}`,
  title: `日常片段${i + 1}`,
  type: '日常',
  minWeek: Math.floor(i / 7) + 1,
  skeleton: `在第${Math.floor(i / 7) + 1}周的校园里，微风吹过走廊，关于选择与成长的小事件悄然发生。`
}));

const stageEvents: EventTemplate[] = [
  '开学典礼','军训汇演','第一次月考','秋季运动会','艺术节彩排','期中考试周','冬季竞赛季','分班选科会','高三誓师','百日冲刺','毕业旅行','毕业典礼'
].map((title, idx) => ({
  id: `stage_${idx + 1}`,
  title,
  type: '阶段',
  minWeek: idx * 2 + 1,
  skeleton: `${title}来临，班级秩序与人际关系出现新的波动。`
}));

export const events: EventTemplate[] = [...daily, ...stageEvents];
