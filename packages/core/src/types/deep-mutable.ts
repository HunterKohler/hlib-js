import { Primitive } from "./primitive";

export type DeepMutable<T> = T extends Primitive | Date | RegExp
    ? T
    : T extends ReadonlyMap<infer K, infer V>
    ? DeepMutableMap<K, V>
    : T extends ReadonlySet<infer U>
    ? DeepMutableSet<U>
    : T extends object
    ? DeepMutableObject<T>
    : unknown;

type DeepMutableMap<K, V> = Map<DeepMutable<K>, DeepMutable<V>>;
type DeepMutableSet<T> = Set<DeepMutable<T>>;
type DeepMutableObject<T> = { -readonly [K in keyof T]: T[K] };
