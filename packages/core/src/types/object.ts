export type ValueOf<T> = T[keyof T];

export type EntryOf<T> = { [K in keyof T]: [K, T[K]] }[keyof T];
