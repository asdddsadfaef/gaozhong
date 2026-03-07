/**
 * 预留的 SQLite 接口封装。
 * 后续可替换 saveRepository 的文件存档实现。
 */
export interface SQLiteAdapter {
  init: () => Promise<void>;
  save: (slotId: string, payload: unknown) => Promise<void>;
  load: (slotId: string) => Promise<unknown | null>;
}

export const createSQLiteAdapter = (): SQLiteAdapter => ({
  init: async () => undefined,
  save: async () => undefined,
  load: async () => null
});
