export interface ReadonlyDict<T> {
    readonly [K: string]: T | undefined;
}
