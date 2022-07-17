import { AnyAsyncIterable } from "./any";

export type AsyncIterableType<T extends AnyAsyncIterable> = //
    T extends { [Symbol.asyncIterator](): AsyncIterator<infer U, any, any> }
        ? U
        : never;

export type AsyncIterableReturnType<T extends AnyAsyncIterable> = //
    T extends { [Symbol.asyncIterator](): AsyncIterator<any, infer U, any> }
        ? U
        : never;

export type AsyncIterableNextType<T extends AnyAsyncIterable> = //
    T extends { [Symbol.asyncIterator](): AsyncIterator<any, any, infer U> }
        ? U
        : never;
