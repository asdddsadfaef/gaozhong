import { NPC } from '../types/game.js';

export const coreNpcs: NPC[] = [
  { id: 'npc_core_1', name: '林知夏', gender: '女', isCore: true, personalityTags: ['温柔', '自律', '敏感'], familyTag: '教师家庭', academics: 90, socialRole: '班级学习委员', currentGoal: '冲击年级前十', emotion: '专注', romanceable: true },
  { id: 'npc_core_2', name: '周野', gender: '男', isCore: true, personalityTags: ['外向', '仗义', '冲动'], familyTag: '个体经营', academics: 65, socialRole: '篮球社主力', currentGoal: '拿到市赛名次', emotion: '兴奋', romanceable: true },
  { id: 'npc_core_3', name: '沈鹿鸣', gender: '男', isCore: true, personalityTags: ['理性', '克制', '好胜'], familyTag: '医生家庭', academics: 96, socialRole: '竞赛尖子生', currentGoal: '保送名校', emotion: '警惕', romanceable: true },
  { id: 'npc_core_4', name: '程遥', gender: '女', isCore: true, personalityTags: ['文艺', '细腻', '慢热'], familyTag: '单亲家庭', academics: 82, socialRole: '文学社骨干', currentGoal: '发表校园连载', emotion: '平静', romanceable: true },
  { id: 'npc_core_5', name: '许之衡', gender: '男', isCore: true, personalityTags: ['稳重', '野心', '社交强'], familyTag: '公务员家庭', academics: 84, socialRole: '学生会副主席', currentGoal: '竞选主席', emotion: '从容' },
  { id: 'npc_core_6', name: '叶青禾', gender: '女', isCore: true, personalityTags: ['聪明', '毒舌', '洞察'], familyTag: '记者家庭', academics: 88, socialRole: '辩论社队长', currentGoal: '赢下省赛', emotion: '锐利' },
  { id: 'npc_core_7', name: '顾星河', gender: '男', isCore: true, personalityTags: ['寡言', '真诚', '执拗'], familyTag: '工薪家庭', academics: 72, socialRole: '动漫社画手', currentGoal: '完成同人志', emotion: '低落' },
  { id: 'npc_core_8', name: '唐沐', gender: '女', isCore: true, personalityTags: ['阳光', '活力', '坦率'], familyTag: '军人家庭', academics: 76, socialRole: '田径队队长', currentGoal: '冲刺体育特招', emotion: '高昂' },
  { id: 'npc_core_9', name: '陆闻笙', gender: '男', isCore: true, personalityTags: ['幽默', '圆滑', '隐藏焦虑'], familyTag: '重组家庭', academics: 79, socialRole: '班级气氛担当', currentGoal: '不被淘汰到平行班', emotion: '紧张' },
  { id: 'npc_core_10', name: '姜若岚', gender: '女', isCore: true, personalityTags: ['完美主义', '礼貌', '压抑'], familyTag: '企业家庭', academics: 92, socialRole: '钢琴特长生', currentGoal: '艺考与文化双线', emotion: '疲惫' },
  { id: 'npc_core_11', name: '韩以澈', gender: '男', isCore: true, personalityTags: ['叛逆', '聪颖', '防备心强'], familyTag: '留守经历', academics: 83, socialRole: '神秘转学生', currentGoal: '找到归属', emotion: '戒备' },
  { id: 'npc_core_12', name: '白念', gender: '女', isCore: true, personalityTags: ['温和', '共情强', '坚定'], familyTag: '护士家庭', academics: 86, socialRole: '心理委员', currentGoal: '建立心理互助角', emotion: '关切' }
];

const normalNames = ['陈嘉','李沅','王栩','赵宁','吴迪','郑宇','冯珂','蒋帆','韩朵','谢铭','邵晴','宋译','潘毅','姚岚','秦歌','罗岳','魏然','彭悦','袁凯','董禾'];

export const normalNpcs: NPC[] = normalNames.map((name, index) => ({
  id: `npc_normal_${index + 1}`,
  name,
  gender: index % 2 === 0 ? '男' : '女',
  isCore: false,
  personalityTags: index % 3 === 0 ? ['认真'] : ['随和'],
  familyTag: index % 4 === 0 ? '普通' : '小康',
  academics: 55 + (index % 8) * 5,
  socialRole: '同班同学',
  currentGoal: '稳定提升',
  emotion: '日常'
}));

export const allNpcs = [...coreNpcs, ...normalNpcs];
