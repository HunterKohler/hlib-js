import { Mutable, Primitive } from "./basic";

export type DeepMutable<T> = T extends Primitive | Date | RegExp
    ? T
    : T extends Readonly<ReadonlyMap<infer K, infer V>>
    ? Mutable<Map<DeepMutable<K>, DeepMutable<V>>>
    : T extends Readonly<ReadonlySet<infer U>>
    ? Mutable<Set<DeepMutable<U>>>
    : T extends object
    ? { -readonly [K in keyof T]: DeepMutable<T[K]> }
    : unknown;
