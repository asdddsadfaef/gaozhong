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

export const App = () => {
  const init = useAppStore((s) => s.init);
  useEffect(() => { init(); }, [init]);

  return (
    <div className="shell">
      <header className="topNav">
        <h1>AI高中生活模拟器</h1>
        <nav>
          {['/','/grades','/relationships','/clubs','/saves','/summary','/ending'].map((p, i) => (
            <NavLink key={p} to={p}>{['主界面','成绩','关系','社团','存档','总结','结局'][i]}</NavLink>
          ))}
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/grades" element={<GradesPage />} />
        <Route path="/relationships" element={<RelationshipPage />} />
        <Route path="/clubs" element={<ClubsPage />} />
        <Route path="/saves" element={<SavesPage />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/ending" element={<EndingPage />} />
      </Routes>
    </div>
  );
};
