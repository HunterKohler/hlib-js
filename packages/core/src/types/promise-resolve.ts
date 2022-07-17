export type PromiseResolve<T> = (
    value: Awaited<T> | PromiseLike<Awaited<T>>,
) => void;
