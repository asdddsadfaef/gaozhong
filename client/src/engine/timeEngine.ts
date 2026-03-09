import { Location, TimeState } from '../types/game';

const weekdays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
const periods: TimeState['period'][] = ['早晨', '上午', '中午', '下午', '傍晚', '晚上', '深夜'];
const locations: Location[] = ['宿舍', '教室', '食堂', '操场', '图书馆', '校门口', '家里'];

function seasonByMonth(month: number) {
  if ([3, 4, 5].includes(month)) return '春';
  if ([6, 7, 8].includes(month)) return '夏';
  if ([9, 10, 11].includes(month)) return '秋';
  return '冬';
}

export function nextTime(prev: TimeState): TimeState {
  const periodIndex = periods.indexOf(prev.period);
  const wraps = periodIndex === periods.length - 1;
  const nextPeriod = periods[(periodIndex + 1) % periods.length];
  const nextWeekdayIndex = (weekdays.indexOf(prev.weekday) + (wraps ? 1 : 0)) % weekdays.length;
  const nextTurn = prev.turn + 1;
  const monthPlus = wraps && prev.weekday === '周日' && nextPeriod === '早晨';
  const nextMonthRaw = monthPlus ? prev.month + 1 : prev.month;
  const nextMonth = nextMonthRaw > 12 ? 1 : nextMonthRaw;

  const grade = nextTurn > 180 ? '高二' : prev.grade;
  const semester = nextMonth >= 9 || nextMonth <= 1 ? '上学期' : '下学期';

  return {
    ...prev,
    turn: nextTurn,
    period: nextPeriod,
    weekday: weekdays[nextWeekdayIndex],
    month: nextMonth,
    season: seasonByMonth(nextMonth),
    semester,
    grade,
    location: locations[(nextTurn + nextWeekdayIndex) % locations.length]
  };
}

export function formatTimeLabel(time: TimeState) {
  return `${time.grade}｜${time.semester}｜${time.season}｜${time.month}月｜${time.weekday}${time.period}｜${time.location}`;
}
