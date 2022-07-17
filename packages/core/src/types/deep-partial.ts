import { Primitive } from "./primitive";

export type DeepPartial<T> = T extends Primitive | Date | RegExp
    ? T
    : T extends Map<infer K, infer V>
    ? DeepPartialMap<K, V>
    : T extends Set<infer U>
    ? DeepPartialSet<U>
    : T extends ReadonlyMap<infer K, infer V>
    ? DeepPartialReadonlyMap<K, V>
    : T extends ReadonlySet<infer U>
    ? DeepPartialReadonlySet<U>
    : T extends object
    ? DeepPartialObject<T>
    : unknown;

type DeepPartialMap<K, V> = Map<DeepPartial<K>, DeepPartial<V>>;
type DeepPartialSet<T> = Set<DeepPartial<T>>;
type DeepPartialReadonlyMap<K, V> = ReadonlyMap<DeepPartial<K>, DeepPartial<V>>;
type DeepPartialReadonlySet<T> = ReadonlySet<DeepPartial<T>>;
type DeepPartialObject<T> = { [K in keyof T]?: DeepPartial<T[K]> };
