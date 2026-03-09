import { StoryArcNode } from '../types/game.js';

const arcs = ['学霸竞争线','社团成长线','恋爱线','家庭冲突线','心理压力/自我成长线','高考冲刺线'];

export const arcNodes: StoryArcNode[] = Array.from({ length: 24 }, (_, i) => ({
  id: `arc_${i + 1}`,
  arc: arcs[i % arcs.length],
  title: `${arcs[i % arcs.length]}节点${i + 1}`,
  requiredFlags: i === 0 ? [] : [`arc_progress_${Math.max(1, i)}`],
  grantFlags: [`arc_progress_${i + 1}`]
}));

export const endings = [
  '顶尖升学结局','普通升学结局','竞赛保送结局','体育特长结局','文艺创作结局','校园风云人物结局','恋爱毕业结局','遗憾错过结局','问题学生救赎结局','转学/休学结局','自媒体/创业路线结局','平凡但完整的青春结局'
];
