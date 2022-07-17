import { AnyIterator } from "./any";

export type IteratorType<T extends AnyIterator> = //
    T extends Iterator<infer U, any, any> ? U : never;

export type IteratorReturnType<T extends AnyIterator> = //
    T extends Iterator<any, infer Return, any> ? Return : never;

export type IteratorNextType<T extends AnyIterator> = //
    T extends Iterator<any, any, infer Next> ? Next : never;
