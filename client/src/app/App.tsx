import { NavLink, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppStore } from './store';
import { StoryPage } from '../pages/StoryPage';
import { NetworkPage } from '../pages/NetworkPage';
import { AttributesPage } from '../pages/AttributesPage';
import { EventsPage } from '../pages/EventsPage';
import { AssetsPage } from '../pages/AssetsPage';
import { SettingsPage } from '../pages/SettingsPage';

const tabs = [
  { to: '/', label: '剧情' },
  { to: '/network', label: '人脉' },
  { to: '/attributes', label: '属性' },
  { to: '/events', label: '事件' },
  { to: '/assets', label: '资产' },
  { to: '/settings', label: '设置' }
];

export const App = () => {
  const { game, init } = useAppStore();
  useEffect(() => { init(); }, [init]);

  return (
    <div className={`mobileShell ${game.theme === '薰衣草' ? 'lavender' : ''}`}>
      <div className="phoneFrame">
        <header className="topHeader card">
          <div className="topLine">
            <h1>AI高中生活模拟器</h1>
            <span>回合 {game.time.turn}</span>
          </div>
          <div className="heroLine">
            <strong>{game.hero.name}</strong>
            <div className="chips">
              <span>{game.hero.gender}</span><span>{game.hero.familyBackground}</span><span>{game.hero.className}</span><span>{game.hero.moodTag}</span>
            </div>
          </div>
          <div className="statsGrid">
            <p>容貌 {game.attributes.core.容貌}</p><p>智商 {game.attributes.core.智商}</p><p>情商 {game.attributes.core.情商}</p><p>金钱 {game.attributes.state.金钱}</p>
          </div>
          <div className="subStats">年级排名 {game.attributes.academy.年级排名} ｜ 学习效率 {game.attributes.academy.学习效率} ｜ 模拟考分数 {game.attributes.academy.模拟考分数}</div>
        </header>

        <main className="phoneContent">
          <Routes>
            <Route path="/" element={<StoryPage />} />
            <Route path="/network" element={<NetworkPage />} />
            <Route path="/attributes" element={<AttributesPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/assets" element={<AssetsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>

        <nav className="bottomNav">
          {tabs.map((tab) => <NavLink key={tab.to} to={tab.to}>{tab.label}</NavLink>)}
        </nav>
      </div>
    </div>
  );
};
