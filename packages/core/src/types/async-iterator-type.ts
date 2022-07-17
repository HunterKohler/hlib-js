import { AnyAsyncIterator } from "./any";

export type AsyncIteratorType<T extends AnyAsyncIterator> = //
    T extends AsyncIterator<infer U, any, any> ? U : never;

export type AsyncIteratorReturnType<T extends AnyAsyncIterator> = //
    T extends AsyncIterator<any, infer Return, any> ? Return : never;

export type AsyncIteratorNextType<T extends AnyAsyncIterator> = //
    T extends AsyncIterator<any, any, infer Next> ? Next : never;
