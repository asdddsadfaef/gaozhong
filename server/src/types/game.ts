export type TimeSlot = '白天' | '傍晚' | '夜晚';
export type YearStage = '高一' | '高二' | '高三';
export type Semester = '上学期' | '下学期';

export interface GameTime {
  day: number;
  week: number;
  timeSlot: TimeSlot;
  yearStage: YearStage;
  semester: Semester;
}

export type StatKey = '智力' | '自律' | '情商' | '魅力' | '意志' | '创造力' | '运动能力' | '叛逆值' | '敏感度';
export type ResourceKey = '精力' | '心情' | '压力' | '健康' | '金钱' | '声望' | '家庭支持' | '自由度';
export type Subject = '语文' | '数学' | '英语' | '物理' | '化学' | '生物' | '历史' | '政治' | '地理';

export interface SubjectState {
  mastery: number;
  interest: number;
  stability: number;
  examSkill: number;
}

export interface PlayerState {
  name: string;
  stats: Record<StatKey, number>;
  resources: Record<ResourceKey, number>;
  subjects: Record<Subject, SubjectState>;
  psych: Record<'焦虑' | '倦怠' | '成就感' | '自我认同' | '孤独感' | '归属感', number>;
  family: {
    家境: '拮据' | '普通' | '小康' | '优渥';
    父母期待: number;
    管教严格度: number;
    情绪支持: number;
    是否住校: boolean;
  };
  clubId?: string;
}

export interface Relationship {
  好感: number;
  信任: number;
  熟悉: number;
  暧昧: number;
  敬佩: number;
  嫉妒: number;
  敌意: number;
  依赖: number;
}

export interface NPC {
  id: string;
  name: string;
  gender: string;
  isCore: boolean;
  personalityTags: string[];
  familyTag: string;
  academics: number;
  socialRole: string;
  currentGoal: string;
  emotion: string;
  romanceable?: boolean;
}

export interface WorldState {
  time: GameTime;
  player: PlayerState;
  npcs: NPC[];
  relationships: Record<string, Relationship>;
  actionHistory: string[];
  activeStoryFlags: string[];
  logs: string[];
  examRecords: ExamRecord[];
  ending?: string;
}

export interface ActionDefinition {
  id: string;
  name: string;
  category: '学习类' | '社交类' | '社团类' | '生活类' | '感情类' | '特殊类';
  description: string;
  cost: Partial<Record<ResourceKey, number>>;
  gain: Partial<Record<ResourceKey, number>>;
  statGain?: Partial<Record<StatKey, number>>;
  relationshipDelta?: Partial<Relationship>;
  requiredClub?: string;
  requiredFlag?: string;
  addedFlags?: string[];
  subjectFocus?: Subject;
}

export interface EventTemplate {
  id: string;
  title: string;
  type: '日常' | '条件' | '人物线' | '阶段' | '心理危机' | '隐藏';
  triggerFlag?: string;
  minWeek?: number;
  npcId?: string;
  skeleton: string;
}

export interface ClubDefinition {
  id: string;
  name: string;
  fixedBonus: string;
  schedule: string;
  exclusiveNpcIds: string[];
  positions: string[];
  endingBias: string;
}

export interface ExamRecord {
  examType: '小测' | '月考' | '期中' | '期末' | '模拟考' | '高考';
  week: number;
  scores: Record<Subject, number>;
  ranking: number;
  teacherComment: string;
  parentFeedback: string;
}

export interface StoryArcNode {
  id: string;
  arc: string;
  title: string;
  requiredFlags: string[];
  grantFlags: string[];
}

export interface NarrativeScene {
  sceneTitle: string;
  narration: string;
  dialogue: string[];
  optionTexts: string[];
  moodTags: string[];
  memorySummary: string;
  optionalLogEntry?: string;
}

export interface SaveSlot {
  slotId: string;
  updatedAt: string;
  state: WorldState;
}
