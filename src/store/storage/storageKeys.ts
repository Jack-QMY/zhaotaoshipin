//存缓存
export const RecordKeys = {
    me: 'me',
} as const;

export type ItemKeys = typeof RecordKeys;
