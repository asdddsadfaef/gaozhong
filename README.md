# 《AI高中生活模拟器》

一个可运行、可扩展、可继续开发的高中生活模拟网页游戏原型。项目包含规则引擎 + AI叙事 + NPC社会模拟 + 多系统联动。

## 功能总览

- 三学年时间系统（高一/高二/高三、上/下学期、每周7天、白天/傍晚/夜晚）
- 玩家属性、资源、心理、家庭、学科成绩系统
- 50+可执行行动（学习/社交/社团/生活/感情/特殊）
- 12核心NPC + 20普通NPC，8维关系值与关系阶段可扩展
- NPC回合自动行动模拟，玩家不在场时校园继续运转
- 6社团（篮球社/文学社/音乐社/学生会/动漫社/辩论社）
- 100+日常事件模板 + 12大型阶段事件 + 24剧情线节点
- 考试系统（小测/月考/期中/期末/模拟考/高考框架）
- 12结局原型
- AI Narrative Service（OpenAI-compatible）+ 无Key本地回退叙事
- 多存档槽位（JSON文件），并预留SQLite适配接口

## 技术栈

- 前端：React + TypeScript + Vite + Zustand + React Router
- 后端：Node.js + Express + TypeScript
- 数据：本地JSON存档（`saves/`）+ SQLite接口预留
- AI：OpenAI-compatible chat completion + Zod Schema校验 + fallback

## 目录结构

```text
/client
  /src/app
  /src/pages
  /src/components
  /src/features
  /src/services
  /src/styles
  /src/types
/server
  /src/routes
  /src/engine
  /src/services
  /src/ai
  /src/content
  /src/persistence
  /src/schemas
  /src/types
/content
.env.example
```

## 环境变量

复制 `.env.example` 到 `.env` 并按需填写：

```bash
cp .env.example .env
```

- `PORT`: 后端端口
- `OPENAI_BASE_URL`: OpenAI兼容接口根地址
- `OPENAI_API_KEY`: 可选，不填将使用本地回退叙事
- `OPENAI_MODEL`: 模型名
- `SAVE_PATH`: 存档目录

## 本地启动

```bash
npm install
npm run dev
```

- 前端：<http://localhost:5173>
- 后端：<http://localhost:3001>

生产构建：

```bash
npm run build
npm run start
```

类型检查：

```bash
npm run check
```

## AI模式 vs 回退模式

- **AI模式**（配置`OPENAI_API_KEY`）
  - 使用 Prompt Builder 注入世界状态、最近行动、人物信息、事件骨架
  - 输出必须为结构化JSON，经过 Zod 校验
- **回退模式**（未配置Key/超时/校验失败）
  - 自动切换本地叙事模板生成器
  - 依然输出同结构JSON，保证游戏可玩性

## 规则与AI边界

- 数值变动、事件合法性、考试计算全部由规则引擎控制
- AI仅负责叙事文本、对白、可读化选项与摘要

## 后续扩展建议

1. 将`content`目录改为可编辑JSON并支持热加载。
2. 引入SQLite/Prisma实现全量持久化。
3. 增加关系网络图可视化（d3-force）。
4. 增加多角色视角与班级生态仪表盘。
5. 扩展高三冲刺与高考后志愿系统。
