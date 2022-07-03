import { AbstractConstructor } from "./basic";

export type TypedArrayConstructor = Pick<
    ArrayConstructor,
    keyof ArrayConstructor
> &
    AbstractConstructor<TypedArray, []>;

export type TypedArray =
    | Int8Array
    | Uint8Array
    | Uint8ClampedArray
    | Uint16Array
    | Uint32Array
    | BigInt64Array
    | BigUint64Array
    | Float32Array
    | Float64Array;

export const TypedArray = Reflect.getPrototypeOf(
    Int8Array
) as TypedArrayConstructor;
