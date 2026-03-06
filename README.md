# 高中生活模拟器（AI 自动剧情）

一个可直接运行的网页游戏模拟器，主题为“高中生活”。

- 前端：原生 HTML/CSS/JS
- 后端：Node.js 原生 HTTP 服务（零依赖）
- 核心能力：每回合调用 AI 自动生成剧情与选项
- 兜底机制：AI 不可用时自动切换本地剧情模板

## 功能特性

1. 五维度角色成长系统：学业、心情、人际、零花、健康
2. 每回合动态剧情：根据当前状态 + 历史行为生成新故事
3. 三个剧情选项 + 自定义行动
4. 自动记录成长日志
5. 支持 OpenAI 兼容接口（可配置 base URL 与 model）

## 运行方式

```bash
npm start
```

打开：`http://localhost:3000`

## 环境变量（可选）

复制 `.env.example` 为 `.env` 并填写：

```bash
OPENAI_API_KEY=你的key
OPENAI_MODEL=gpt-4o-mini
OPENAI_BASE_URL=https://api.openai.com/v1
PORT=3000
```

> 若未配置 `OPENAI_API_KEY`，后端会自动使用本地剧情兜底。

## API

### `POST /api/story`

请求体：

```json
{
  "state": {
    "turn": 1,
    "study": 66,
    "mood": 58,
    "social": 60,
    "money": 49,
    "health": 68
  },
  "actionText": "午休去图书馆刷题",
  "history": []
}
```

返回体（示例）：

```json
{
  "source": "ai",
  "narration": "...",
  "events": ["..."],
  "choices": [
    {
      "text": "...",
      "effect": {
        "study": 5,
        "mood": -2,
        "social": 1,
        "money": 0,
        "health": -1
      }
    }
  ]
}
```
