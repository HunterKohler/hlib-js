import { AnyIterable } from "./any";

export type IterableType<T extends AnyIterable> = //
    T extends { [Symbol.iterator](): Iterator<infer U, any, any> } ? U : never;

export type IterableReturnType<T extends AnyIterable> = //
    T extends { [Symbol.iterator](): Iterator<any, infer U, any> } ? U : never;

export type IterableNextType<T extends AnyIterable> = //
    T extends { [Symbol.iterator](): Iterator<any, any, infer U> } ? U : never;
