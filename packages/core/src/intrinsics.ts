export interface AsyncFunctionConstructor {
    new (...args: string[]): AsyncFunction;
    (...args: string[]): AsyncFunction;
    readonly prototype: AsyncFunction;
}

export interface AsyncFunction extends Function {
    readonly [Symbol.toStringTag]: string;
    (...args: any[]): Promise<any>;
}

export interface StringIterator extends IterableIterator<string> {
    readonly [Symbol.toStringTag]: string;
}

export interface RegExpStringIterator extends IterableIterator<string> {
    readonly [Symbol.toStringTag]: string;
}

export interface ArrayIterator<T = unknown> extends IterableIterator<T> {
    readonly [Symbol.toStringTag]: string;
}

export interface SetIterator<T = unknown> extends IterableIterator<T> {
    readonly [Symbol.toStringTag]: string;
}

export interface MapIterator<T = unknown> extends IterableIterator<T> {
    readonly [Symbol.toStringTag]: string;
}

export interface TypedArrayConstructor {
    new (...args: any[]): TypedArray;

    readonly prototype: TypedArray;
    readonly [Symbol.species]: TypedArrayConstructor;

    from<T extends TypedArray>(
        this: new (...args: any[]) => T,
        arrayLike: Iterable<number>,
        mapper?: (v: number, k: number) => number,
        thisArg?: any,
    ): T;

    from<T extends TypedArray>(
        this: new (...args: any[]) => T,
        arrayLike: ArrayLike<number>,
    ): Uint8ClampedArray;

    from<T, U>(
        this: new (...args: any[]) => T,
        arrayLike: ArrayLike<U>,
        mapper: (v: U, k: number) => number,
        thisArg?: any,
    ): Uint8ClampedArray;

    of<T extends TypedArray>(
        this: new (...args: any[]) => T,
        ...items: TypedArrayElement<T>[]
    ): T;
}

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

export type TypedArrayElement<T extends TypedArray> = //
    T extends Record<number, infer U> ? U : never;

export const StringIteratorPrototype = //
    Reflect.getPrototypeOf(""[Symbol.iterator]()) as StringIterator;

export const ArrayIteratorPrototype = //
    Reflect.getPrototypeOf([].keys()) as ArrayIterator;

export const IteratorPrototype = //
    Reflect.getPrototypeOf(ArrayIteratorPrototype) as Iterable<unknown>;

export const AsyncFunction = async function () {}
    .constructor as AsyncFunctionConstructor;

export const AsyncGeneratorFunction = async function* () {}
    .constructor as AsyncGeneratorFunctionConstructor;

export const GeneratorFunction = function* () {}
    .constructor as GeneratorFunctionConstructor;

export const AsyncIteratorPrototype = Reflect.getPrototypeOf(
    AsyncGeneratorFunction.prototype.prototype,
) as AsyncIterable<unknown>;

export const SetIteratorPrototype = Reflect.getPrototypeOf(
    new Set().keys(),
)! as SetIterator;

export const MapIteratorPrototype = Reflect.getPrototypeOf(
    new Map().keys(),
)! as MapIterator;

export const TypedArray = Reflect.getPrototypeOf(
    Uint8Array,
)! as TypedArrayConstructor;

export const ThrowTypeError = (function () {
    // Declare "use strict" explicitly to guard against down-leveling without a
    // global strict declaration in non-esm modules on a transpilation step.
    "use strict";

    return Reflect.getOwnPropertyDescriptor(arguments, "callee")!
        .get as () => never;
})();

export const RegExpStringIteratorPrototype = Reflect.getPrototypeOf(
    /./[Symbol.matchAll](""),
)! as RegExpStringIterator;

export const intrinsics = {
    AggregateError,
    Array,
    ArrayBuffer,
    ArrayIteratorPrototype,
    // AsyncFromSyncIteratorPrototype, // Unreachable
    AsyncFunction,
    AsyncGeneratorFunction,
    AsyncIteratorPrototype,
    Atomics,
    BigInt,
    BigInt64Array,
    BigUint64Array,
    Boolean,
    DataView,
    Date,
    decodeURI,
    decodeURIComponent,
    encodeURI,
    encodeURIComponent,
    Error,
    eval,
    EvalError,
    FinalizationRegistry,
    Float32Array,
    Float64Array,
    // ForInIteratorPrototype, // Unreachable
    Function,
    GeneratorFunction,
    Int8Array,
    Int16Array,
    Int32Array,
    isFinite,
    isNaN,
    IteratorPrototype,
    JSON,
    Map,
    MapIteratorPrototype,
    Math,
    Number,
    Object,
    parseFloat,
    parseInt,
    Promise,
    Proxy,
    RangeError,
    ReferenceError,
    Reflect,
    RegExp,
    RegExpStringIteratorPrototype,
    Set,
    SetIteratorPrototype,
    SharedArrayBuffer,
    String,
    StringIteratorPrototype,
    Symbol,
    SyntaxError,
    ThrowTypeError,
    TypedArray,
    TypeError,
    Uint8Array,
    Uint8ClampedArray,
    Uint16Array,
    Uint32Array,
    URIError,
    WeakMap,
    WeakRef,
    WeakSet,
} as const;
