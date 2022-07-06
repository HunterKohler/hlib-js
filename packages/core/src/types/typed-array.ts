// 'ArrayConstructor' is not accurate for the 'TypedArrayConstructor', but the
// purpose of exporting the abstract constructor is mainly type checking.
export type TypedArrayConstructor = Pick<
    ArrayConstructor,
    keyof ArrayConstructor
> &
    (abstract new () => TypedArray);

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
