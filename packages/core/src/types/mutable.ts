import { Primitive } from "./primitive";

export type Mutable<T> = { -readonly [K in keyof T]: T[K] };

export type DeepMutable<T> = T extends Primitive | Date | RegExp
    ? T
    : T extends Readonly<ReadonlyMap<infer K, infer V>>
    ? Mutable<Map<DeepMutable<K>, DeepMutable<V>>>
    : T extends Readonly<ReadonlySet<infer U>>
    ? Mutable<Set<DeepMutable<U>>>
    : T extends object
    ? { -readonly [K in keyof T]: DeepMutable<T[K]> }
    : unknown;
