import { ClubDefinition } from '../types/game.js';

export const clubs: ClubDefinition[] = [
  { id: 'basketball', name: '篮球社', fixedBonus: '运动能力+2，声望+1', schedule: '周二/周四傍晚', exclusiveNpcIds: ['npc_core_2', 'npc_core_8'], positions: ['新人', '轮换', '主力', '队长'], endingBias: '体育特长结局' },
  { id: 'literature', name: '文学社', fixedBonus: '创造力+2，情绪恢复', schedule: '周三夜晚', exclusiveNpcIds: ['npc_core_4'], positions: ['社员', '编辑', '主笔', '社长'], endingBias: '文艺创作结局' },
  { id: 'music', name: '音乐社', fixedBonus: '魅力+1，心情+2', schedule: '周五傍晚', exclusiveNpcIds: ['npc_core_10'], positions: ['社员', '伴奏', '主唱', '部长'], endingBias: '校园风云人物结局' },
  { id: 'student_union', name: '学生会', fixedBonus: '声望+2，自律+1', schedule: '周一/周三白天', exclusiveNpcIds: ['npc_core_5'], positions: ['干事', '部长', '副主席', '主席'], endingBias: '顶尖升学结局' },
  { id: 'anime', name: '动漫社', fixedBonus: '创造力+2，归属感+1', schedule: '周六下午', exclusiveNpcIds: ['npc_core_7'], positions: ['社员', '主美', '策划', '社长'], endingBias: '自媒体/创业路线结局' },
  { id: 'debate', name: '辩论社', fixedBonus: '情商+1，政治应试+1', schedule: '周二夜晚', exclusiveNpcIds: ['npc_core_6'], positions: ['队员', '二辩', '主辩', '队长'], endingBias: '竞赛保送结局' }
];
