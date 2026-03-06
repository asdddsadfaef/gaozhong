const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = Number(process.env.PORT || 3000);
const PUBLIC_DIR = path.join(__dirname, 'public');

const SYSTEM_PROMPT = `你是“高中生活模拟器”的剧情引擎。
你必须输出严格 JSON，结构如下：
{
  "narration": "当前剧情描述（80~180字）",
  "events": ["事件1", "事件2"],
  "choices": [
    { "text": "选项文案", "effect": {"study": 0, "mood": 0, "social": 0, "money": 0, "health": 0} },
    { "text": "选项文案", "effect": {...} },
    { "text": "选项文案", "effect": {...} }
  ]
}
要求：
1) 风格是青春校园，积极健康。
2) 每个 effect 的数值范围是 -15 到 +15。
3) 选项必须体现高中生日常（学习、人际、社团、家庭、压力管理等）。
4) narration 中自然衔接上下文，不要重复。
5) 严禁输出 JSON 以外的任何文字。`;

function clamp(num, min, max) {
  return Math.max(min, Math.min(max, num));
}

function buildFallbackStory(state, actionText) {
  const scenes = [
    {
      narration: `周一清晨，你背着书包冲进教学楼，班主任突然宣布下周月考提前。你感到一阵紧张，但也意识到这是证明自己的机会。你准备如何安排今天？`,
      events: ['月考提前', '时间管理压力上升'],
      choices: [
        { text: '午休去图书馆刷题', effect: { study: 10, mood: -3, social: -2, money: 0, health: -2 } },
        { text: '找学霸同桌组队复习', effect: { study: 6, mood: 2, social: 6, money: 0, health: 0 } },
        { text: '先去操场跑步放松再学习', effect: { study: 3, mood: 6, social: 1, money: 0, health: 7 } }
      ]
    },
    {
      narration: `社团招新周到了，你站在公告栏前，文学社、篮球队和机器人社都在招人。你想提升履历，也担心学习被分散。${actionText ? `因为你刚刚选择了“${actionText}”，现在更需要做出平衡。` : ''}`,
      events: ['社团招新', '课余时间被重新分配'],
      choices: [
        { text: '加入机器人社，冲击竞赛奖项', effect: { study: 5, mood: 3, social: 4, money: -2, health: -1 } },
        { text: '加入篮球队，锻炼和交友并重', effect: { study: -2, mood: 7, social: 8, money: 0, health: 6 } },
        { text: '暂不参加社团，专注文化课', effect: { study: 8, mood: -1, social: -3, money: 0, health: 0 } }
      ]
    },
    {
      narration: `晚自习后，妈妈发来消息说家里最近开销紧张，希望你尽量节省。你看着想买的资料和周末计划，心里有些纠结。`,
      events: ['家庭预算收紧', '消费决策出现冲突'],
      choices: [
        { text: '买二手资料并自己整理笔记', effect: { study: 6, mood: 1, social: 0, money: 6, health: 0 } },
        { text: '坚持买新资料，提升学习效率', effect: { study: 8, mood: 0, social: 0, money: -8, health: 0 } },
        { text: '找同学共享资料并互相讲题', effect: { study: 5, mood: 3, social: 5, money: 4, health: 0 } }
      ]
    }
  ];

  const index = Number(state.turn || 0) % scenes.length;
  return scenes[index];
}

function normalizeStory(story) {
  if (!story || typeof story !== 'object') return null;
  if (!Array.isArray(story.choices) || story.choices.length < 3) return null;

  return {
    narration: String(story.narration || '新的一天开始了，你准备好迎接挑战。'),
    events: Array.isArray(story.events) ? story.events.slice(0, 3).map((e) => String(e)) : [],
    choices: story.choices.slice(0, 3).map((choice) => ({
      text: String(choice.text || '继续行动'),
      effect: {
        study: clamp(Number(choice.effect?.study || 0), -15, 15),
        mood: clamp(Number(choice.effect?.mood || 0), -15, 15),
        social: clamp(Number(choice.effect?.social || 0), -15, 15),
        money: clamp(Number(choice.effect?.money || 0), -15, 15),
        health: clamp(Number(choice.effect?.health || 0), -15, 15)
      }
    }))
  };
}

async function requestAiStory(payload) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY not configured');

  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const baseUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      temperature: 0.9,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: JSON.stringify(payload) }
      ]
    })
  });

  if (!response.ok) throw new Error(`AI request failed: ${response.status} ${response.statusText}`);

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error('AI response missing content');

  return JSON.parse(content);
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS'
  });
  res.end(JSON.stringify(data));
}

function serveStatic(res, pathname) {
  const safePath = pathname === '/' ? '/index.html' : pathname;
  const filePath = path.join(PUBLIC_DIR, safePath);
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      fs.readFile(path.join(PUBLIC_DIR, 'index.html'), (fallbackErr, fallbackData) => {
        if (fallbackErr) {
          res.writeHead(404);
          res.end('Not Found');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(fallbackData);
      });
      return;
    }

    const ext = path.extname(filePath);
    const map = {
      '.html': 'text/html; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.js': 'application/javascript; charset=utf-8',
      '.json': 'application/json; charset=utf-8'
    };

    res.writeHead(200, { 'Content-Type': map[ext] || 'text/plain; charset=utf-8' });
    res.end(data);
  });
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 1_000_000) {
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS'
    });
    res.end();
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/story') {
    try {
      const body = await readBody(req);
      const state = body.state || {};
      const actionText = body.actionText || '';
      const history = Array.isArray(body.history) ? body.history.slice(-8) : [];

      try {
        const aiRaw = await requestAiStory({ state, actionText, history });
        const aiStory = normalizeStory(aiRaw);
        if (!aiStory) throw new Error('Invalid AI story format');
        sendJson(res, 200, { source: 'ai', ...aiStory });
      } catch (error) {
        const fallback = buildFallbackStory(state, actionText);
        sendJson(res, 200, { source: 'fallback', ...fallback, debug: error.message });
      }
    } catch (error) {
      sendJson(res, 400, { error: error.message });
    }
    return;
  }

  if (req.method === 'GET') {
    serveStatic(res, decodeURIComponent(url.pathname));
    return;
  }

  res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Method Not Allowed');
});

server.listen(PORT, () => {
  console.log(`High school simulator running at http://localhost:${PORT}`);
});
