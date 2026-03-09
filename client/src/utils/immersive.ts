import { ActionDefinition, GameState, NarrativeScene } from '../types/game';

const weekDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
const seasons = ['春', '夏', '秋', '冬'];
const locations = ['教室', '走廊', '食堂', '图书馆', '操场', '宿舍'];

export function formatLifeTime(game: GameState) {
  const month = Math.max(1, Math.min(12, Math.floor(((game.time.day - 1) % 360) / 30) + 1));
  const season = seasons[Math.floor((month - 1) / 3) % 4];
  const weekDay = weekDays[(game.time.day - 1) % 7];
  const location = locations[(game.time.week + game.time.day) % locations.length];
  return `${game.time.yearStage}｜${game.time.semester}｜${season}｜${month}月｜${weekDay}${game.time.timeSlot}｜${location}`;
}

export function sceneOptions(scene: NarrativeScene | undefined, actions: ActionDefinition[], game?: GameState) {
  if (!game) return [];
  const options = (scene?.optionTexts || []).slice(0, 5).map((text, index) => ({
    text,
    actionId: actions[(index + game.time.week) % actions.length]?.id
  }));

  if (options.length >= 3) return options;

  const mood = game.player.resources.心情 > 65 ? '轻松' : game.player.resources.压力 > 60 ? '紧绷' : '平常';
  const mapped = actions
    .filter((a) => ['学习类', '社交类', '感情类', '生活类'].includes(a.category))
    .slice(0, 5)
    .map((a) => ({
      text: `${mood === '轻松' ? '趁着状态不错，' : mood === '紧绷' ? '深呼吸后，' : ''}${rewriteAction(a.name)}。`,
      actionId: a.id
    }));

  return mapped.slice(0, 5);
}

function rewriteAction(name: string) {
  return `你决定${name.replace(/^[^\u4e00-\u9fa5]*/, '')}`;
}

export function parseSettlement(scene: NarrativeScene | undefined, game: GameState) {
  if (!scene) return `【精力 ${game.player.resources.精力}｜心情 ${game.player.resources.心情}｜压力 ${game.player.resources.压力}】`;
  return '【本回合结算：金钱与状态已更新，关系波动已写入人脉网络】';
}

export function relationTag(npc: any): string {
  if (npc.socialRole.includes('学习')) return '同桌学伴';
  if (npc.socialRole.includes('篮球')) return '球场搭子';
  if (npc.socialRole.includes('文学')) return '社刊同伴';
  if (npc.socialRole.includes('学生会')) return '班务搭档';
  if (npc.socialRole.includes('转学生')) return '新朋友';
  return '同班同学';
}
