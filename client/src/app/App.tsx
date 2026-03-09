import { NavLink, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppStore } from './store';
import { MainPage } from '../pages/MainPage';
import { GradesPage } from '../pages/GradesPage';
import { RelationshipPage } from '../pages/RelationshipPage';
import { ClubsPage } from '../pages/ClubsPage';
import { SavesPage } from '../pages/SavesPage';
import { SummaryPage } from '../pages/SummaryPage';
import { EndingPage } from '../pages/EndingPage';

const tabs = [
  { to: '/', label: '剧情' },
  { to: '/relationships', label: '人脉' },
  { to: '/grades', label: '属性' },
  { to: '/summary', label: '事件' },
  { to: '/clubs', label: '资产' },
  { to: '/saves', label: '设置' }
];

export const App = () => {
  const init = useAppStore((s) => s.init);
  useEffect(() => { init(); }, [init]);

  return (
    <div className="mobileShell">
      <div className="phoneFrame">
        <header className="titleBar">AI高中生活模拟器</header>
        <main className="phoneContent">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/grades" element={<GradesPage />} />
            <Route path="/relationships" element={<RelationshipPage />} />
            <Route path="/clubs" element={<ClubsPage />} />
            <Route path="/saves" element={<SavesPage />} />
            <Route path="/summary" element={<SummaryPage />} />
            <Route path="/ending" element={<EndingPage />} />
          </Routes>
        </main>
        <nav className="bottomNav">
          {tabs.map((tab) => <NavLink key={tab.to} to={tab.to}>{tab.label}</NavLink>)}
        </nav>
      </div>
    </div>
  );
};
