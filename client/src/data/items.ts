import { InventoryItem } from '../types/game';

export const initialItems: InventoryItem[] = [
  { id: 'exercise-book', name: '习题册', category: '学习类', count: 2, description: '标着密密麻麻批注的练习册。' },
  { id: 'mistake-notebook', name: '错题本', category: '学习类', count: 1, description: '记录最常踩坑的题型。' },
  { id: 'cola', name: '可乐', category: '生活类', count: 3, description: '冰镇后能迅速恢复一点心情。' },
  { id: 'snack', name: '零食', category: '生活类', count: 4, description: '宿舍夜聊时的社交硬通货。' },
  { id: 'pen', name: '钢笔', category: '学习类', count: 2, description: '写作文时手感很顺。' },
  { id: 'headphone', name: '耳机', category: '生活类', count: 1, description: '午休时隔绝嘈杂。' },
  { id: 'reference-book', name: '参考书', category: '学习类', count: 1, description: '封面已经起皱，但内容靠谱。' },
  { id: 'gift-box', name: '小礼物', category: '关系类', count: 1, description: '还没决定送给谁。' },
  { id: 'warm-note', name: '便签纸', category: '关系类', count: 6, description: '可以写一句鼓励的话。' },
  { id: 'lucky-charm', name: '幸运挂件', category: '特殊物品', count: 1, description: '据说考试周带着能稳一点心态。' }
];
