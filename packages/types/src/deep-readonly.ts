import { Primitive } from "./basic";

export type DeepReadonly<T> = T extends Primitive | Date | RegExp
    ? T
    : T extends Readonly<ReadonlyMap<infer K, infer V>>
    ? Readonly<ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>>
    : T extends Readonly<ReadonlySet<infer U>>
    ? Readonly<ReadonlySet<DeepReadonly<U>>>
    : T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : unknown;
