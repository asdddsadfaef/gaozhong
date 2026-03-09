import { ApiConfig, HeroProfile, WorldBook } from '../types/game';

export const defaultHero: HeroProfile = {
  name: '沈知夏',
  gender: '女',
  familyBackground: '普通家庭',
  className: '高一(3)班',
  moodTag: '想变得更好',
  romanceStatus: '单身',
  streamPreference: '偏文科'
};

export const defaultWorldBook: WorldBook = {
  campusTone: '偏现实校园',
  realismLevel: '90%现实 + 10%戏剧化',
  supernatural: '默认不允许超自然元素',
  relationshipBoundaries: '慢热关系推进，尊重彼此边界',
  writingStyle: '轻小说叙事，重场景与情绪',
  customNotes: ''
};

export const defaultApiConfig: ApiConfig = {
  deepseepApi: ''
};

export const relationStages = [
  { min: 0, label: '有些疏远' },
  { min: 25, label: '普通朋友' },
  { min: 40, label: '关系升温中' },
  { min: 55, label: '学习搭子' },
  { min: 70, label: '默契同盟' },
  { min: 82, label: '暧昧未明' },
  { min: 92, label: '重要的人' }
];
