export type Gender = '男' | '女' | '非二元';
export type FamilyBackground = '普通家庭' | '小康家庭' | '富裕家庭';

export type TimePeriod = '早晨' | '上午' | '中午' | '下午' | '傍晚' | '晚上' | '深夜';
export type Season = '春' | '夏' | '秋' | '冬';
export type Location = '宿舍' | '教室' | '食堂' | '操场' | '图书馆' | '校门口' | '家里';

export interface TimeState {
  turn: number;
  grade: '高一' | '高二' | '高三';
  semester: '上学期' | '下学期';
  season: Season;
  month: number;
  weekday: string;
  period: TimePeriod;
  location: Location;
}

export interface HeroProfile {
  name: string;
  gender: Gender;
  familyBackground: FamilyBackground;
  className: string;
  moodTag: string;
  romanceStatus: string;
  streamPreference: string;
}

export interface Attributes {
  core: Record<'智商' | '情商' | '容貌' | '意志' | '自律' | '魅力' | '创造力', number>;
  state: Record<'精力' | '心情' | '压力' | '健康' | '金钱', number>;
  academy: Record<'学习效率' | '年级排名' | '模拟考分数' | '语文能力' | '数学能力' | '英语能力' | '综合能力', number>;
}

export interface Npc {
  id: string;
  name: string;
  identityTags: string[];
  personalityTags: string[];
  bio: string;
  favor: number;
  trust: number;
  intimacy: number;
  respect: number;
  stage: string;
  recentImpression: string;
  latestLine: string;
  eventTypes: string[];
  history: string[];
}

export interface InventoryItem {
  id: string;
  name: string;
  category: '学习类' | '生活类' | '关系类' | '特殊物品';
  count: number;
  description: string;
}

export type EventType = '日常事件' | '学业事件' | '人际事件' | '压力事件' | '随机事件' | '暧昧事件' | '成长事件';

export interface EventEffect {
  energy?: number;
  mood?: number;
  stress?: number;
  money?: number;
  efficiency?: number;
  exam?: number;
  favor?: number;
  trust?: number;
  intimacy?: number;
  respect?: number;
  health?: number;
  chinese?: number;
  math?: number;
  english?: number;
}

export interface GameEvent {
  id: string;
  title: string;
  type: EventType;
  scene: Location;
  npcPool: string[];
  trigger: {
    minTurn?: number;
    maxStress?: number;
    minMood?: number;
    minEnergy?: number;
  };
  narrativeSeeds: string[];
  actions: string[];
  effect: EventEffect;
  track: '学业成长线' | '关系成长线' | '班级融入线' | '自我成长线';
}

export interface TurnResult {
  title: string;
  content: string;
  effectsLabel: string;
  options: string[];
  eventType: EventType;
  eventId: string;
  npcId?: string;
}

export interface EventProgress {
  unlocked: string[];
  timeline: string[];
  tracks: Record<'学业成长线' | '关系成长线' | '班级融入线' | '自我成长线', number>;
}

export interface WorldBook {
  campusTone: string;
  realismLevel: string;
  supernatural: string;
  relationshipBoundaries: string;
  writingStyle: string;
  customNotes: string;
}

export interface ApiConfig {
  deepseepApi: string;
}

export interface GameState {
  hero: HeroProfile;
  time: TimeState;
  attributes: Attributes;
  npcs: Npc[];
  inventory: InventoryItem[];
  eventProgress: EventProgress;
  current: TurnResult;
  recentLogs: string[];
  worldBook: WorldBook;
  apiConfig: ApiConfig;
  theme: '樱粉' | '薰衣草';
}
