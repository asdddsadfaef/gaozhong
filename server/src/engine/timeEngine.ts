import { GameTime, TimeSlot } from '../types/game.js';

const slots: TimeSlot[] = ['白天', '傍晚', '夜晚'];

export function advanceTime(time: GameTime): GameTime {
  const idx = slots.indexOf(time.timeSlot);
  const nextIdx = (idx + 1) % slots.length;
  const isNextDay = nextIdx === 0;
  const nextDay = isNextDay ? time.day + 1 : time.day;
  const nextWeek = Math.floor((nextDay - 1) / 7) + 1;

  let yearStage = time.yearStage;
  let semester = time.semester;
  if (nextWeek > 24 && time.yearStage === '高一') {
    yearStage = '高二';
    semester = '上学期';
  } else if (nextWeek > 48 && time.yearStage === '高二') {
    yearStage = '高三';
    semester = '上学期';
  } else if (nextWeek % 12 === 0 && nextIdx === 0) {
    semester = semester === '上学期' ? '下学期' : '上学期';
  }

  return { ...time, timeSlot: slots[nextIdx], day: nextDay, week: nextWeek, yearStage, semester };
}
