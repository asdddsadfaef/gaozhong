const initialState = {
  turn: 0,
  study: 60,
  mood: 65,
  social: 55,
  money: 50,
  health: 70
};

const labels = {
  study: '📚 学业',
  mood: '🙂 心情',
  social: '🤝 人际',
  money: '💰 零花',
  health: '💪 健康'
};

let state = { ...initialState };
let history = [];
let pendingChoices = [];

const statsEl = document.getElementById('stats');
const turnEl = document.getElementById('turn');
const sourceEl = document.getElementById('story-source');
const narrationEl = document.getElementById('narration');
const eventsEl = document.getElementById('events');
const choicesEl = document.getElementById('choices');
const logEl = document.getElementById('log');

function clamp(num, min, max) {
  return Math.max(min, Math.min(max, num));
}

function renderStats() {
  statsEl.innerHTML = '';
  Object.keys(labels).forEach((key) => {
    const card = document.createElement('div');
    card.className = 'stat-card';
    card.innerHTML = `<div class="stat-name">${labels[key]}</div><div class="stat-value">${state[key]}</div>`;
    statsEl.appendChild(card);
  });
  turnEl.textContent = String(state.turn);
}

function renderStory(story) {
  narrationEl.textContent = story.narration;
  eventsEl.innerHTML = '';
  (story.events || []).forEach((event) => {
    const li = document.createElement('li');
    li.textContent = event;
    eventsEl.appendChild(li);
  });

  choicesEl.innerHTML = '';
  pendingChoices = story.choices;
  story.choices.forEach((choice, idx) => {
    const btn = document.createElement('button');
    btn.className = 'btn choice';
    btn.textContent = `${idx + 1}. ${choice.text}`;
    btn.addEventListener('click', () => takeChoice(choice));
    choicesEl.appendChild(btn);
  });
}

function effectToText(effect) {
  return Object.entries(effect)
    .filter(([, delta]) => delta !== 0)
    .map(([key, delta]) => {
      const cls = delta > 0 ? 'delta-good' : 'delta-bad';
      const sign = delta > 0 ? '+' : '';
      return `<span class="${cls}">${labels[key]} ${sign}${delta}</span>`;
    })
    .join('，');
}

function pushLog(actionText, effect) {
  const li = document.createElement('li');
  li.innerHTML = `<strong>${actionText}</strong> → ${effectToText(effect) || '状态平稳'}`;
  logEl.prepend(li);
}

function applyEffect(effect) {
  Object.keys(labels).forEach((key) => {
    const delta = Number(effect[key] || 0);
    state[key] = clamp(state[key] + delta, 0, 100);
  });
}

async function fetchStory(actionText = '开始新的校园日常') {
  sourceEl.textContent = '加载中...';
  choicesEl.innerHTML = '<button class="btn choice" disabled>剧情生成中...</button>';

  const res = await fetch('/api/story', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ state, actionText, history })
  });

  if (!res.ok) {
    throw new Error('剧情接口请求失败');
  }

  const story = await res.json();
  sourceEl.textContent = story.source === 'ai' ? 'AI实时生成' : '本地剧情兜底';
  renderStory(story);
  if (story.debug) {
    console.warn('Fallback reason:', story.debug);
  }
}

async function takeChoice(choice) {
  applyEffect(choice.effect);
  state.turn += 1;
  history.push({ turn: state.turn, action: choice.text, state: { ...state } });
  pushLog(choice.text, choice.effect);
  renderStats();
  await fetchStory(choice.text);
}

async function takeCustomAction() {
  const input = document.getElementById('custom-action-input');
  const text = input.value.trim();
  if (!text) return;

  const randomEffect = {
    study: Math.round((Math.random() - 0.2) * 8),
    mood: Math.round((Math.random() - 0.5) * 8),
    social: Math.round((Math.random() - 0.4) * 8),
    money: Math.round((Math.random() - 0.55) * 6),
    health: Math.round((Math.random() - 0.45) * 8)
  };

  applyEffect(randomEffect);
  state.turn += 1;
  history.push({ turn: state.turn, action: text, state: { ...state } });
  pushLog(`自定义行动：${text}`, randomEffect);
  renderStats();
  input.value = '';
  await fetchStory(text);
}

async function startGame() {
  state = { ...initialState };
  history = [];
  renderStats();
  logEl.innerHTML = '';
  await fetchStory('开学第一天，准备迎接挑战');
}

document.getElementById('start-btn').addEventListener('click', () => {
  startGame().catch((err) => {
    narrationEl.textContent = `启动失败：${err.message}`;
  });
});

document.getElementById('custom-action-btn').addEventListener('click', () => {
  takeCustomAction().catch((err) => {
    narrationEl.textContent = `自定义行动失败：${err.message}`;
  });
});

renderStats();
