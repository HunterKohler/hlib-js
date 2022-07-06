export interface Dict<T> {
    [K: string]: T | undefined;
}

export interface ReadonlyDict<T> {
    readonly [K: string]: T | undefined;
}
