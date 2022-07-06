import { Primitive } from "./primitive";

export type DeepPartial<T> = T extends Primitive | Date | RegExp
    ? T
    : T extends Readonly<ReadonlyMap<infer K, infer V>>
    ? Partial<Map<DeepPartial<K>, DeepPartial<V>>>
    : T extends Readonly<ReadonlySet<infer U>>
    ? Partial<Set<DeepPartial<U>>>
    : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : unknown;
