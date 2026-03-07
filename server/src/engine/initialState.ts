import { allNpcs } from '../content/npcs.js';
import { Relationship, WorldState } from '../types/game.js';

const defaultRelationship = (): Relationship => ({ 好感: 20, 信任: 15, 熟悉: 10, 暧昧: 0, 敬佩: 5, 嫉妒: 0, 敌意: 0, 依赖: 0 });

export const createInitialState = (): WorldState => ({
  time: { day: 1, week: 1, timeSlot: '白天', yearStage: '高一', semester: '上学期' },
  player: {
    name: '你',
    stats: { 智力: 60, 自律: 55, 情商: 58, 魅力: 52, 意志: 57, 创造力: 54, 运动能力: 50, 叛逆值: 35, 敏感度: 62 },
    resources: { 精力: 80, 心情: 70, 压力: 30, 健康: 85, 金钱: 200, 声望: 10, 家庭支持: 65, 自由度: 50 },
    subjects: Object.fromEntries(['语文','数学','英语','物理','化学','生物','历史','政治','地理'].map((s) => [s, { mastery: 55, interest: 50, stability: 52, examSkill: 50 }])) as any,
    psych: { 焦虑: 35, 倦怠: 20, 成就感: 40, 自我认同: 50, 孤独感: 25, 归属感: 40 },
    family: { 家境: '普通', 父母期待: 70, 管教严格度: 60, 情绪支持: 55, 是否住校: true }
  },
  npcs: allNpcs,
  relationships: Object.fromEntries(allNpcs.map((npc) => [npc.id, defaultRelationship()])),
  actionHistory: [],
  activeStoryFlags: ['新生入学'],
  logs: ['你踏进了新学期的校门。'],
  examRecords: []
});
