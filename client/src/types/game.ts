export type ActionCategory = '学习类' | '社交类' | '社团类' | '生活类' | '感情类' | '特殊类';

export interface NarrativeScene {
  sceneTitle: string;
  narration: string;
  dialogue: string[];
  optionTexts: string[];
  moodTags: string[];
  memorySummary: string;
  optionalLogEntry?: string;
}

export interface GameState {
  time: { day: number; week: number; timeSlot: string; yearStage: string; semester: string };
  player: any;
  npcs: any[];
  relationships: Record<string, any>;
  logs: string[];
  examRecords: any[];
  ending?: string;
}

export interface ActionDefinition {
  id: string;
  name: string;
  category: ActionCategory;
  description: string;
}
