export type AnyIterator = Iterator<any, any, any>;
export type AnyAsyncIterator = AsyncIterator<any, any, any>;

export type AnyIterable = { [Symbol.iterator](): AnyIterator };
export type AnyAsyncIterable = { [Symbol.asyncIterator](): AnyAsyncIterator };

export type AnyFunction = (...args: any[]) => unknown;
export type AnyConstructor = abstract new (...args: any[]) => unknown;

export type AnySet = Set<any>;
export type AnyMap = Map<any, any>;

export type AnyWeakMap = WeakMap<object, any>;
export type AnyWeakSet = WeakSet<object>;

export type AnyWeakRef = WeakRef<object>;
