import { Primitive } from "./primitive";

export type DeepReadonly<T> = T extends Primitive | RegExp | Date
    ? T
    : T extends ReadonlyMap<infer K, infer V>
    ? DeepReadonlyMap<K, V>
    : T extends ReadonlySet<infer U>
    ? DeepReadonlySet<U>
    : T extends object
    ? DeepReadonlyObject<T>
    : unknown;

type DeepReadonlyMap<K, V> = ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>;
type DeepReadonlySet<T> = ReadonlySet<DeepReadonlySet<T>>;
type DeepReadonlyObject<T> = { readonly [K in keyof T]: T[K] };
