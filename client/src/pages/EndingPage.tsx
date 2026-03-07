import { useAppStore } from '../app/store';

export const EndingPage = () => {
  const ending = useAppStore((s) => s.game?.ending);
  return <div className="card"><h2>结局页</h2><p>{ending || '尚未触发结局，请继续推进时间。'}</p></div>;
};
