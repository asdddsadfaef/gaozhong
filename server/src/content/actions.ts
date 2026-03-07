import { ActionDefinition } from '../types/game.js';

const categories: ActionDefinition['category'][] = ['学习类', '社交类', '社团类', '生活类', '感情类', '特殊类'];
const names = {
  学习类: ['晨读语文','数学刷题','英语听力','物理实验复盘','化学错题整理','生物图谱记忆','历史时序梳理','政治议题辩写','地理地图默绘'],
  社交类: ['食堂拼桌','课间闲聊','操场散步','帮同学讲题','参加班级讨论','匿名夸夸墙','邀请组队学习','周末逛书店','给同桌写便签'],
  社团类: ['篮球对抗训练','文学社采风','乐队排练','学生会值班','动漫社分镜会','辩论模拟赛','社团招新筹备','社团联谊策划','社团成果展示'],
  生活类: ['整理宿舍','晚饭加餐','夜跑','图书馆发呆','和家人通话','早睡修复','校医室复查','兼职家教','周末短途出行'],
  感情类: ['送早餐','并肩回家','操场看台谈心','共享歌单','深夜短信','约自习室双人位','节日小礼物','误会澄清','雨天借伞'],
  特殊类: ['报名竞赛','临时演讲','组织班会','秘密调查', '逃课去看展', '深夜写长信', '尝试直播', '向老师请教人生', '策划毕业纪念册']
};

export const actions: ActionDefinition[] = categories.flatMap((category) =>
  names[category].map((name, idx) => ({
    id: `${category}_${idx}`,
    name,
    category,
    description: `执行${name}，将影响属性、关系与剧情。`,
    cost: { 精力: 5 + (idx % 3) * 4, 压力: category === '学习类' ? 3 : 1 },
    gain: { 心情: category === '生活类' ? 4 : 1, 声望: category === '社团类' ? 2 : 0 },
    statGain: category === '学习类' ? { 智力: 1, 自律: 1 } : category === '社交类' ? { 情商: 1 } : { 创造力: 1 },
    relationshipDelta: { 好感: category === '感情类' ? 4 : 1, 熟悉: 1, 信任: category === '社交类' ? 2 : 0, 暧昧: category === '感情类' ? 2 : 0, 敬佩: category === '特殊类' ? 1 : 0, 嫉妒: 0, 敌意: 0, 依赖: category === '感情类' ? 1 : 0 },
    addedFlags: idx % 4 === 0 ? [`flag_${category}_${idx}`] : [],
    subjectFocus: category === '学习类' ? (['语文','数学','英语','物理','化学','生物','历史','政治','地理'][idx % 9] as any) : undefined
  }))
);
