import { initialNpcs } from '../data/npcs';
import { initialItems } from '../data/items';
import { defaultApiConfig, defaultHero, defaultWorldBook, relationStages } from '../data/world';
import { nextOptions } from './actionEngine';
import { pickEvent, pickNpcId } from './eventEngine';
import { generateNarrative, summarizeEffects } from './narrativeEngine';
import { nextTime } from './timeEngine';
import { GameState, Npc } from '../types/game';

function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

const baseAttributes = {
  core: { 智商: 72, 情商: 68, 容貌: 74, 意志: 63, 自律: 60, 魅力: 66, 创造力: 70 },
  state: { 精力: 72, 心情: 64, 压力: 38, 健康: 80, 金钱: 220 },
  academy: { 学习效率: 62, 年级排名: 186, 模拟考分数: 618, 语文能力: 66, 数学能力: 64, 英语能力: 67, 综合能力: 65 }
};

export function createNewGame(): GameState {
  const initial: GameState = {
    hero: defaultHero,
    attributes: baseAttributes,
    npcs: initialNpcs,
    inventory: initialItems,
    time: {
      turn: 1,
      grade: '高一',
      semester: '上学期',
      season: '冬',
      month: 12,
      weekday: '周日',
      period: '晚上',
      location: '宿舍'
    },
    eventProgress: { unlocked: [], timeline: [], tracks: { 学业成长线: 0, 关系成长线: 0, 班级融入线: 0, 自我成长线: 0 } },
    current: {
      title: '开学后的第一个周末夜',
      content: '晚自习散场后，宿舍里终于松快下来。你把书包放到床边，听着室友断断续续的聊天，忽然有种“新的生活真的开始了”的实感。',
      effectsLabel: '暂无结算',
      options: nextOptions({} as GameState),
      eventType: '日常事件',
      eventId: 'opening'
    },
    recentLogs: ['你来到新学校的第一周，正在适应节奏。'],
    worldBook: defaultWorldBook,
    apiConfig: defaultApiConfig,
    theme: '樱粉'
  };
  initial.current.options = nextOptions(initial);
  return initial;
}

function updateNpc(npcs: Npc[], npcId: string | undefined, favor = 0, trust = 0, intimacy = 0, respect = 0) {
  return npcs.map((npc) => {
    if (npc.id !== npcId) return npc;
    const nextFavor = clamp(npc.favor + favor);
    const nextTrust = clamp(npc.trust + trust);
    const nextIntimacy = clamp(npc.intimacy + intimacy);
    const nextRespect = clamp(npc.respect + respect);
    const stage = [...relationStages].reverse().find((item) => nextFavor >= item.min)?.label ?? npc.stage;
    return {
      ...npc,
      favor: nextFavor,
      trust: nextTrust,
      intimacy: nextIntimacy,
      respect: nextRespect,
      stage,
      recentImpression: `第${new Date().getMinutes()}分的互动让你们关系出现了细微变化。`,
      history: [`第${npc.history.length + 1}次互动：关系阶段更新为${stage}`, ...npc.history].slice(0, 8)
    };
  });
}

function effectToLabel(entries: Array<[string, number]>) {
  return entries.filter(([, val]) => val !== 0).map(([key, val]) => `${key} ${val > 0 ? '+' : ''}${val}`).join('，');
}

export function runTurn(state: GameState, action: string, actionHint?: string) {
  const event = pickEvent(state, action);
  const npcId = pickNpcId(event, state);
  const npc = state.npcs.find((it) => it.id === npcId);

  const next = structuredClone(state);
  next.time = nextTime(state.time);
  next.attributes.state.精力 = clamp(state.attributes.state.精力 + (event.effect.energy ?? 0) - 1);
  next.attributes.state.心情 = clamp(state.attributes.state.心情 + (event.effect.mood ?? 0));
  next.attributes.state.压力 = clamp(state.attributes.state.压力 + (event.effect.stress ?? 0));
  next.attributes.state.健康 = clamp(state.attributes.state.健康 + (event.effect.health ?? 0));
  next.attributes.state.金钱 = clamp(state.attributes.state.金钱 + (event.effect.money ?? 0), 0, 9999);
  next.attributes.academy.学习效率 = clamp(state.attributes.academy.学习效率 + (event.effect.efficiency ?? 0));
  next.attributes.academy.模拟考分数 = clamp(state.attributes.academy.模拟考分数 + (event.effect.exam ?? 0), 0, 750);
  next.attributes.academy.语文能力 = clamp(state.attributes.academy.语文能力 + (event.effect.chinese ?? 0));
  next.attributes.academy.数学能力 = clamp(state.attributes.academy.数学能力 + (event.effect.math ?? 0));
  next.attributes.academy.英语能力 = clamp(state.attributes.academy.英语能力 + (event.effect.english ?? 0));
  next.attributes.academy.综合能力 = Math.round((next.attributes.academy.语文能力 + next.attributes.academy.数学能力 + next.attributes.academy.英语能力) / 3);
  next.attributes.academy.年级排名 = clamp(state.attributes.academy.年级排名 - Math.round((event.effect.exam ?? 0) / 2), 1, 900);

  next.npcs = updateNpc(next.npcs, npcId, event.effect.favor, event.effect.trust, event.effect.intimacy, event.effect.respect);
  next.hero.moodTag = next.attributes.state.压力 > 70 ? '有点绷不住' : next.attributes.state.心情 > 70 ? '状态在线' : '平稳推进';
  next.eventProgress.unlocked = Array.from(new Set([event.id, ...state.eventProgress.unlocked]));
  next.eventProgress.timeline = [`第${next.time.turn}回合：${event.title}`, ...state.eventProgress.timeline].slice(0, 25);
  next.eventProgress.tracks[event.track] += 1;

  const label = effectToLabel([
    ['精力', event.effect.energy ?? -1],
    ['心情', event.effect.mood ?? 0],
    ['压力', event.effect.stress ?? 0],
    ['健康', event.effect.health ?? 0],
    ['金钱', event.effect.money ?? 0],
    ['学习效率', event.effect.efficiency ?? 0],
    ['模拟考分数', event.effect.exam ?? 0],
    [npc ? `${npc.name}好感` : '人际热度', event.effect.favor ?? 0]
  ]);

  next.current = {
    title: event.title,
    content: generateNarrative({ state, event, action, npcName: npc?.name, actionHint }),
    effectsLabel: summarizeEffects(label || '状态平稳，无明显波动'),
    options: nextOptions(next),
    eventType: event.type,
    eventId: event.id,
    npcId
  };
  next.recentLogs = [`第${next.time.turn}回合｜${event.title}｜${label || '无变化'}`, ...state.recentLogs].slice(0, 12);
  return next;
}
