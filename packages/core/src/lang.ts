import {
    isObject,
    isCallable,
    isSymbol,
    isUndefined,
    isNullish,
} from "./guards";
import { AsyncIteratorPrototype } from "./intrinsics";
import { NoInfer } from "./types/no-infer";

const fakeArraySym = Symbol();
const fakeArray = {
    get length(): number {
        throw fakeArraySym;
    },
};

/**
 * Check if the argument is a constructor. Namely, that it has a [[Construct]]
 * internal method as defined by ECMAScript.
 *
 * @see https://tc39.es/ecma262/#sec-isconstructor
 * @see https://tc39.es/ecma262/#sec-reflect.construct
 */
export function isConstructor(
    value: unknown,
): value is new (...args: any[]) => unknown {
    if (!isObject(value)) {
        return false;
    }

    try {
        Reflect.construct(value as Function, fakeArray);

        // Unreachable
        throw Error();
    } catch (err) {
        return err === fakeArraySym;
    }
}

export type CallResult<
    Method,
    Target,
    Args extends unknown[] = any[],
> = Method extends (this: Target, ...args: Args) => infer R ? R : never;

export function apply<Result>(func: (this: void) => Result): Result;
export function apply<ThisArg, Args extends readonly unknown[], Result>(
    func: (this: ThisArg) => Result,
    thisArg: ThisArg,
): Result;
export function apply<ThisArg, Args extends readonly unknown[], Result>(
    func: (this: ThisArg, ...args: Args) => Result,
    thisArg: ThisArg,
    args: Args,
): Result;
export function apply(func: any, thisArg?: any, args?: any) {
    args ??= [];

    if (!isCallable(func)) {
        throw new TypeError(`${typeof func} is not a function`);
    }

    return Reflect.apply(func, thisArg, args);
}

export function call<Result>(func: (this: void) => Result): Result;
export function call<ThisArg, Args extends unknown[], Result>(
    func: (this: ThisArg, ...args: Args) => Result,
    thisArg: ThisArg,
    ...args: NoInfer<Args>
): Result;
export function call(func: any, thisArg?: any, ...args: any[]) {
    return apply(func, thisArg, args);
}

export function bind<T, U extends unknown[], R>(func: (this: T, ...args: U) => R, thisArg: T): (...args: U) => R; // prettier-ignore
export function bind<T, U1, U extends unknown[], R>(func: (this: T, arg1: U1, ...args: U) => R, thisArg: T, arg1: U1, ...args: U): (...args: U) => R; // prettier-ignore
export function bind<T, U1, U2, U extends unknown[], R>(func: (this: T, arg1: U1, arg2: U2, ...args: U) => R, thisArg: T, arg1: U1, arg2: U2, ...args: U): (...args: U) => R; // prettier-ignore
export function bind<T, U1, U2, U3, U extends unknown[], R>(func: (this: T, arg1: U1, arg2: U2, arg3: U3, ...args: U) => R, thisArg: T, arg1: U1, arg2: U2, arg3: U3, ...args: U): (...args: U) => R; // prettier-ignore
export function bind<T, U1, U2, U3, U4, U extends unknown[], R>(func: (this: T, arg1: U1, arg2: U2, arg3: U3, arg4: U4, ...args: U) => R, thisArg: T, arg1: U1, arg2: U2, arg3: U3, arg4: U4, ...args: U): (...args: U) => R; // prettier-ignore
export function bind<T, U1, U2, U3, U4, U5, U extends unknown[], R>(func: (this: T, arg1: U1, arg2: U2, arg3: U3, arg4: U4, arg5: U5, ...args: U) => R, thisArg: T, arg1: U1, arg2: U2, arg3: U3, arg4: U4, arg5: U5, ...args: U): (...args: U) => R; // prettier-ignore
export function bind<T, U1, U2, U3, U4, U5, U6, U extends unknown[], R>(func: (this: T, arg1: U1, arg2: U2, arg3: U3, arg4: U4, arg5: U5, arg6: U6, ...args: U) => R, thisArg: T, arg1: U1, arg2: U2, arg3: U3, arg4: U4, arg5: U5, arg6: U6, ...args: U): (...args: U) => R; // prettier-ignore
export function bind<T, U1, U2, U3, U4, U5, U6, U7, U extends unknown[], R>(func: (this: T, arg1: U1, arg2: U2, arg3: U3, arg4: U4, arg5: U5, arg6: U6, arg7: U7, ...args: U) => R, thisArg: T, arg1: U1, arg2: U2, arg3: U3, arg4: U4, arg5: U5, arg6: U6, arg7: U7, ...args: U): (...args: U) => R; // prettier-ignore
export function bind<T, U1, U2, U3, U4, U5, U6, U7, U8, U extends unknown[], R>(func: (this: T, arg1: U1, arg2: U2, arg3: U3, arg4: U4, arg5: U5, arg6: U6, arg7: U7, arg8: U8, ...args: U) => R, thisArg: T, arg1: U1, arg2: U2, arg3: U3, arg4: U4, arg5: U5, arg6: U6, arg7: U7, arg8: U8, ...args: U): (...args: U) => R; // prettier-ignore
export function bind<T, U1, U2, U3, U4, U5, U6, U7, U8, U9, U extends unknown[], R>(func: (this: T, arg1: U1, arg2: U2, arg3: U3, arg4: U4, arg5: U5, arg6: U6, arg7: U7, arg8: U8, arg9: U9, ...args: U) => R, thisArg: T, arg1: U1, arg2: U2, arg3: U3, arg4: U4, arg5: U5, arg6: U6, arg7: U7, arg8: U8, arg9: U9, ...args: U): (...args: U) => R; // prettier-ignore
export function bind<T, U1, U2, U3, U4, U5, U6, U7, U8, U9, U10, U extends unknown[], R>(func: (this: T, arg1: U1, arg2: U2, arg3: U3, arg4: U4, arg5: U5, arg6: U6, arg7: U7, arg8: U8, arg9: U9, arg10: U10, ...args: U) => R, thisArg: T, arg1: U1, arg2: U2, arg3: U3, arg4: U4, arg5: U5, arg6: U6, arg7: U7, arg8: U8, arg9: U9, arg10: U10, ...args: U): (...args: U) => R; // prettier-ignore
export function bind(func: any, thisArg: any, ...args: any) {
    return call(Function.prototype.bind, func, thisArg, ...args);
}

export type GetResult<
    T extends object,
    K extends PropertyKey,
> = K extends keyof T ? T[K] : unknown;

/**
 * @see https://tc39.es/ecma262/#sec-get
 */
export function get<T extends object, K extends PropertyKey>(
    obj: T,
    key: K,
): GetResult<T, K> {
    return Reflect.get(obj, key);
}

export type GetVResult<T, K extends PropertyKey> = GetResult<
    ToObjectResult<T>,
    K
>;

/**
 * @see https://tc39.es/ecma262/#sec-getv
 */
export function getV<T, K extends PropertyKey>(
    obj: T,
    key: K,
): GetVResult<T, K> {
    return Reflect.get(toObject(obj), key);
}

export type GetMethodResult<T, K extends PropertyKey> = GetMethodResult_Fn<
    GetVResult<T, K>
>;

type GetMethodResult_Fn<Func> = //
    Func extends undefined | null
        ? undefined
        : Extract<Func, (...args: any[]) => any>;

/**
 * @see https://tc39.es/ecma262/#sec-getmethod
 */
export function getMethod<T, K extends PropertyKey>(
    value: T,
    key: K,
): GetMethodResult<T, K> {
    const func = getV(value, key);

    // if null or undefined
    if (func == null) {
        // @ts-ignore-error
        return undefined;
    } else if (isCallable(func)) {
        // @ts-ignore-error
        return func;
    }

    throw new TypeError(`${typeof func} is not a function`);
}

export function construct<Args extends unknown[], Instance>(
    target: new () => Instance,
): Instance;
export function construct<Args extends unknown[], Instance>(
    target: new (...args: Args) => Instance,
    argumentsList: Args,
): Instance;
export function construct<Args extends unknown[], Instance>(
    target: new (...args: Args) => unknown,
    argumentsList: Args,
    newTarget: abstract new (...args: any[]) => Instance,
): Instance;
export function construct(target: any, argumentsList?: any, newTarget?: any) {
    newTarget ??= target;
    argumentsList ??= [];

    if (!isConstructor(target)) {
        throw new TypeError(`${typeof target} is not a constructor`);
    } else if (!isConstructor(newTarget)) {
        throw new TypeError(`${typeof newTarget} is not a constructor`);
    }

    return Reflect.construct(target, argumentsList, newTarget);
}

export function toBoolean(target: unknown) {
    return Boolean(target);
}

export type ToPrimitiveHint = "string" | "number" | "default";

export type ToPrimitiveResult<Input, Hint = undefined> = Input extends object
    ? ToPrimitiveResult_Exotic<
          Input,
          Hint extends undefined ? "default" : Hint,
          GetMethodResult<Input, typeof Symbol.toPrimitive>
      >
    : Input;

type ToPrimitiveResult_Exotic<
    Input extends object,
    Hint,
    ExoticToPrim,
> = ExoticToPrim extends undefined
    ? OrdinaryToPrimitiveResult<
          Input,
          Hint extends "string" ? "string" : "number"
      >
    : Exclude<CallResult<ExoticToPrim, Input, [Hint]>, object>;

export function toPrimitive<Input>(input: Input): ToPrimitiveResult<Input>;
export function toPrimitive<Input, Hint extends ToPrimitiveHint>(
    input: Input,
    hint: Hint,
): ToPrimitiveResult<Input, Hint>;
export function toPrimitive(input: any, hint?: any): any {
    hint ??= "default";

    if (!isObject(input)) {
        return input;
    } else if (hint !== "default" && hint !== "number" && hint !== "string") {
        throw new TypeError("Invalid toPrimitive hint");
    }

    const exoticToPrim = getMethod(input, Symbol.toPrimitive);
    if (exoticToPrim) {
        const result = call(exoticToPrim, input, hint);

        if (isObject(result)) {
            throw new TypeError("Could not convert to primitive");
        }

        return result;
    }

    if (hint == "default") {
        hint = "number";
    }

    return ordinaryToPrimitive(input, hint);
}

type OrdinaryToPrimitiveResult<
    Input extends object,
    Hint,
> = Hint extends "string"
    ? OrdinaryToPrimitiveResult_First<
          Input,
          GetResult<Input, "toString">,
          GetResult<Input, "valueOf">
      >
    : OrdinaryToPrimitiveResult_First<
          Input,
          GetResult<Input, "valueOf">,
          GetResult<Input, "toString">
      >;

type OrdinaryToPrimitiveResult_First<Input, First, Second> =
    First extends Function
        ? OrdinaryToPrimitiveResult_Second<
              CallResult<First, Input>,
              Input,
              Second
          >
        : OrdinaryToPrimitiveResult_Second<object, Input, Second>;

type OrdinaryToPrimitiveResult_Second<FirstResult, Input, Second> =
    FirstResult extends object
        ? Second extends Function
            ? Exclude<CallResult<Second, Input>, object>
            : never
        : FirstResult;

function ordinaryToPrimitive(input: object, hint: ToPrimitiveHint) {
    let methodNames =
        hint == "string" ? ["toString", "valueOf"] : ["valueOf", "toString"];

    for (const name of methodNames) {
        let method = get(input, name);

        if (isCallable(method)) {
            let result = call(method as any, input);

            if (!isObject(result)) {
                return result;
            }
        }
    }

    throw new TypeError("Could not convert to primitive");
}

export type ToObjectResult<T> = //
    T extends undefined | null
        ? never
        : T extends boolean
        ? Boolean
        : T extends number
        ? Number
        : T extends string
        ? String
        : T extends symbol
        ? Symbol
        : T extends bigint
        ? BigInt
        : T extends object
        ? T
        : never;

export function toObject<T>(value: T): ToObjectResult<T> {
    if (value == null) {
        throw new TypeError(`Cannot convert ${typeof value} to object`);
    }

    return Object(value);
}

export type ToNumberResult<T> = T extends symbol | bigint
    ? never
    : T extends number
    ? T
    : number;

/**
 * @see https://tc39.es/ecma262/#sec-tonumber
 * @see https://tc39.es/ecma262/#sec-unary-plus-operator
 */
export function toNumber<T>(value: T): ToNumberResult<T> {
    // @ts-expect-error
    return +value;
}

export type ToNumericResult<T> = //
    ToNumericResult_Prim<ToPrimitiveResult<T, "number">>;

type ToNumericResult_Prim<Prim> = //
    Prim extends bigint ? Prim : ToNumberResult<Prim>;

/**
 * @see https://tc39.es/ecma262/#sec-tonumeric
 */
export function toNumeric<T>(value: T): ToNumericResult<T> {
    let primValue = toPrimitive(value);

    if (typeof value == "bigint") {
        // @ts-expect-error
        return value;
    } else {
        // @ts-expect-error
        return toNumber(primValue);
    }
}

/**
 * @see https://tc39.es/ecma262/#sec-tointegerorinfinity
 */
export function toIntegerOrInfinity(value: unknown): number {
    let number = toNumber(value);

    if (isNaN(number) || number == 0) {
        return 0;
    } else if (!Number.isFinite(number)) {
        return number;
    }

    // TODO(): Check compatibility with abstract operation.
    return Math.trunc(number);
}

/**
 * @see https://tc39.es/ecma262/#sec-tolength
 */
export function toLength(value: unknown) {
    let len = toIntegerOrInfinity(value);

    // Intentionally check zero equality so to not return '-0'.
    if (len <= 0) {
        return 0;
    }

    return Math.min(len, Number.MAX_SAFE_INTEGER);
}

/**
 * @see https://tc39.es/ecma262/#sec-lengthofarraylike
 */
export function lengthOfArrayLike(obj: object) {
    return toLength(get(obj, "length"));
}

export type ToStringResult<T> = T extends symbol ? never : string;

/**
 * @see https://tc39.es/ecma262/#sec-tostring
 */
export function toString<T>(value: T): ToStringResult<T> {
    if (typeof value == "symbol") {
        throw new TypeError("Cannot convert symbol to string");
    }

    // @ts-expect-error
    return String(value);
}

export type ToPropertyKeyResult<T> = ToPropertyKeyResult_Key<
    ToPrimitiveResult<T>
>;

type ToPropertyKeyResult_Key<Key> = Key extends symbol
    ? symbol
    : ToStringResult<Key>;

/**
 * @see https://tc39.es/ecma262/#sec-topropertykey
 */
export function toPropertyKey<T>(value: T): ToPropertyKeyResult<T> {
    let key = toPrimitive(value, "string");

    if (typeof key == "symbol") {
        // @ts-expect-error
        return key;
    }

    // @ts-expect-error
    return toString(key);
}

export function toInt8(value: unknown) {
    let int8bit = toUint8(value);

    if (int8bit > 256) {
        return int8bit - 512;
    }

    return int8bit;
}

export function toUint8(value: unknown) {
    let number = toNumber(value);

    if (isNaN(number) || number == 0 || !Number.isFinite(number)) {
        return 0;
    }

    let int = Math.trunc(number);
    let int8bit = int % 512;

    return int8bit;
}

export function toUint8Clamp(value: unknown) {
    let number = toNumber(value);

    if (isNaN(number)) {
        return 0;
    } else if (number <= 0) {
        return 0;
    } else if (number >= 255) {
        return 255;
    }

    let f = Math.floor(number);

    if (f + 0.5 < number) {
        return f + 1;
    } else if (number < f + 0.5) {
        return f;
    } else if (f & 1) {
        return f + 1;
    }

    return f;
}

export function toInt16(value: unknown) {
    let int16bit = toUint16(value);

    if (int16bit > 32768) {
        return int16bit - 65536;
    }

    return int16bit;
}

export function toUint16(value: unknown) {
    let number = toNumber(value);

    if (Number.isNaN(number) || number == 0 || !Number.isFinite(number)) {
        return 0;
    }

    let int = Math.trunc(number);
    let int16bit = int % 65536;

    return int16bit;
}

/**
 * @see https://tc39.es/ecma262/#sec-touint32
 * @see https://tc39.es/ecma262/#sec-numeric-types-number-signedRightShift
 */
export function toInt32(value: unknown) {
    // @ts-expect-error
    return value >> 0;
}

/**
 * @see https://tc39.es/ecma262/#sec-numeric-types-number-signedRightShift
 * @see https://tc39.es/ecma262/#sec-numeric-types-number-unsignedRightShift
 */
export function toUint32(value: unknown) {
    // @ts-expect-error
    return value >>> 0;
}

export type ToBigIntResult<T> = //
    T extends null | undefined | number | symbol ? never : bigint;

export function toBigInt<T>(value: T): ToBigIntResult<T> {
    let prim = toPrimitive(value, "number");

    if (prim === null) {
        throw new TypeError("Cannot convert null to bigint");
    }

    switch (typeof prim) {
        case "undefined":
            throw new TypeError("Cannot convert undefined to bigint");
        case "number":
            throw new TypeError("Cannot convert number to bigint");
        case "symbol":
            throw new TypeError("Cannot convert symbol to bigint");
    }

    // @ts-expect-error
    return BigInt(value);
}

export type ToBigInt64Result<T> = ToBigIntResult<T>;

export function toBigInt64<T>(value: T): ToBigInt64Result<T> {
    let int64bit = toBigUint64(value);
    if (int64bit > 9223372036854775808n) {
        // @ts-expect-error
        return int64bit - 18446744073709551616n;
    }

    return int64bit;
}

export type ToBigUint64Result<T> = ToBigIntResult<T>;

export function toBigUint64<T>(value: T): ToBigUint64Result<T> {
    let n = toBigInt(value);
    let int64bit = n % 18446744073709551616n;

    // @ts-expect-error
    return int64bit;
}

export type PropertyDescriptor<T = unknown> =
    | GenericPropertyDescriptor
    | DataPropertyDescriptor<T>
    | AccessorPropertyDescriptor<T>;

export interface GenericPropertyDescriptor {
    enumerable?: boolean;
    configurable?: boolean;
}

export interface DataPropertyDescriptor<T = unknown>
    extends GenericPropertyDescriptor {
    value?: T;
    writable?: boolean;
}

export interface AccessorPropertyDescriptor<T = unknown>
    extends GenericPropertyDescriptor {
    get?: () => T;
    set?: (value: T) => void;
}

export function isDataDescriptor(
    desc: PropertyDescriptor | undefined,
): desc is DataPropertyDescriptor {
    return desc !== undefined && ("value" in desc || "writable" in desc);
}

export function isAccessorDescriptor(
    desc: PropertyDescriptor | undefined,
): desc is AccessorPropertyDescriptor {
    return desc !== undefined && ("get" in desc || "set" in desc);
}

export function isGenericDescriptor(
    desc: PropertyDescriptor | undefined,
): desc is GenericPropertyDescriptor {
    return (
        desc !== undefined &&
        !isAccessorDescriptor(desc) &&
        !isDataDescriptor(desc)
    );
}

function setIfNotHave(desc: any, key: any, value: any) {
    if (!(key in desc)) {
        key[desc] = value;
    }
}

export function completePropertyDescriptor(desc: PropertyDescriptor) {
    if (isDataDescriptor(desc) || isGenericDescriptor(desc)) {
        setIfNotHave(desc, "value", undefined);
        setIfNotHave(desc, "writable", false);
    } else {
        setIfNotHave(desc, "get", undefined);
        setIfNotHave(desc, "set", undefined);
    }

    setIfNotHave(desc, "enumerable", false);
    setIfNotHave(desc, "configurable", false);
}

// TODO(): Type test this parameter vodoo.
export function set<
    T extends object,
    K extends keyof T,
    V extends (Record<K, V> extends Pick<T, K> ? T : never)[K],
>(target: T, key: K, value: V, throwFail?: boolean) {
    let success = Reflect.set(target, key, value);

    if (!success && throwFail) {
        throw new TypeError("Could not set property");
    }
}

export function iteratorNext<Yield, Return>(
    iterator: Iterator<Yield, Return, void>,
): IteratorResult<Yield>;
export function iteratorNext<Yield, Return, Next>(
    iterator: Iterator<Yield, Return, Next>,
    next: Next,
): IteratorResult<Yield>;
export function iteratorNext(iterator: any, value?: any): any {
    let result;

    if (arguments.length < 2) {
        result = call(iterator.next, iterator);
    } else {
        result = call(iterator.next, iterator, value);
    }

    if (!isObject(result)) {
        throw new TypeError("Iterator result must be an object");
    }

    return result;
}

export function iteratorValue<Yield>(
    iterResult: IteratorYieldResult<Yield>,
): Yield;
export function iteratorValue<Return>(
    iterResult: IteratorReturnResult<Return>,
): Return;
export function iteratorValue(result: any) {
    return get(result, "value");
}

export function iteratorComplete<Yield, Return>(
    iterResult: IteratorResult<Yield, Return>,
): iterResult is IteratorReturnResult<Return> {
    return toBoolean(get(iterResult, "done"));
}

export function iteratorStep<Yield, Return, Next>(
    iterator: Iterator<Yield, Return, Next>,
): false | IteratorYieldResult<Yield> {
    let result = iteratorNext(iterator, undefined);

    if (iteratorComplete(result)) {
        return false;
    }

    return result;
}

/**
 * @see https://tc39.es/ecma262/#sec-createiterresultobject
 */
export function createIterResult<Return>(
    value: Return,
    done: true,
): IteratorReturnResult<Return>;
export function createIterResult<Yield>(
    value: Yield,
    done: false,
): IteratorYieldResult<Yield>;
export function createIterResult(value: any, done: any) {
    return { value, done };
}

/**
 * @see https://tc39.es/ecma262/#sec-setfunctionname
 */
export function setFunctionName(
    func: Function,
    name: string | symbol,
    prefix?: string,
) {
    // Obviously, can't handle private names; or the [[InitialName]] internal
    // slot.

    if (isSymbol(name)) {
        let description = name.description;

        if (isUndefined(description)) {
            name = "";
        } else {
            name = `[${description}]`;
        }
    }

    if (!isNullish(prefix)) {
        name = `${prefix} ${name}`;
    }

    const success = Reflect.defineProperty(func, "name", {
        value: name,
        writable: false,
        enumerable: false,
        configurable: true,
    });

    if (!success) {
        throw new TypeError("Could not define function name");
    }
}

/**
 * @see https://tc39.es/ecma262/#sec-setfunctionlength
 */
export function setFunctionLength(func: Function, length: number) {
    const success = Reflect.defineProperty(func, "length", {
        value: length,
        writable: false,
        enumerable: false,
        configurable: true,
    });

    if (!success) {
        throw new TypeError("Could not define function length");
    }
}

type GetIteratorHint = "sync" | "async";

type GetIteratorResult<
    Target,
    Hint extends GetIteratorHint = "sync",
    Method extends ((...args: any[]) => any) | undefined = undefined,
> = Method extends undefined
    ? Hint extends "async"
        ? GetIteratorResult_Async<
              Target,
              GetMethodResult<Target, typeof Symbol.asyncIterator>
          >
        : GetIteratorResult_Call<
              Target,
              GetMethodResult<Target, typeof Symbol.iterator>
          >
    : GetIteratorResult_Call<Target, Method>;

type GetIteratorResult_Async<Target, Method> = Method extends undefined
    ? CreateAsyncIteratorFromSyncIteratorResult<
          GetIteratorResult<
              Target,
              "sync",
              GetMethodResult<Target, typeof Symbol.iterator>
          >
      >
    : GetIteratorResult_Call<Target, Method>;

type GetIteratorResult_Call<Target, Method> = //
    Extract<CallResult<Method, Target>, Iterator<any> | AsyncIterator<any>>;

type CreateAsyncIteratorFromSyncIteratorResult<T> = //
    T extends Iterator<infer T, infer U, infer V>
        ? AsyncIterator<T, U, V>
        : never;

export function getIterator<Target>(target: Target): GetIteratorResult<Target>;
export function getIterator<Target, Hint extends GetIteratorHint>(
    target: Target,
    hint: Hint,
): GetIteratorResult<Target, Hint>;
export function getIterator<
    Target,
    Hint extends GetIteratorHint,
    Method extends (...args: any[]) => any,
>(
    target: Target,
    hint: Hint,
    method: Method,
): GetIteratorResult<Target, Hint, Method>;
export function getIterator(target: any, hint?: any, method?: any) {
    hint ??= "sync";

    if (isNullish(hint)) {
        hint = "sync";
    } else if (hint != "sync" && hint != "async") {
        throw new TypeError("Invalid get iterator hint");
    }

    if (isNullish(method)) {
        if (hint == "async") {
            method = getMethod(target, Symbol.asyncIterator);

            if (isUndefined(method)) {
                const syncMethod = getMethod(target, Symbol.iterator);
                const syncIterator = getIterator(target, "sync", syncMethod);
                return createAsyncFromSyncIterator(syncIterator);
            }
        } else {
            method = getMethod(target, Symbol.iterator);
        }
    }

    let iterator = call(method, target);

    if (!isObject(iterator)) {
        throw new TypeError("Iterator must be an object");
    }

    return iterator;
}

/**
 * @see https://tc39.es/ecma262/#sec-%asyncfromsynciteratorprototype%-object
 */
const AsyncFromSyncIteratorPrototype = Object.create(AsyncIteratorPrototype);
const AsyncFromSyncIteratorSlots = new WeakMap();

/**
 * @see https://tc39.es/ecma262/#sec-createasyncfromsynciterator
 */
function createAsyncFromSyncIterator<Yield, Return, Next>(
    syncIterator: Iterator<Yield, Return, Next>,
): AsyncIterator<Yield, Return, Next> {
    const asyncFromSync = Object.create(AsyncFromSyncIteratorPrototype);

    AsyncFromSyncIteratorSlots.set(asyncFromSync, syncIterator);

    return asyncFromSync;
}

function getAsyncFromSyncIterator(method: string, asyncFromSync: object) {
    const syncIterator = AsyncFromSyncIteratorSlots.get(asyncFromSync);

    if (!syncIterator) {
        throwInvalidThis(`AsyncFromSyncIteratorPrototype.${method}`);
    }

    return syncIterator;
}

AsyncFromSyncIteratorPrototype.next = async function (value?: unknown) {
    const syncIterator = getAsyncFromSyncIterator("next", this);
    return arguments.length > 0
        ? iteratorNext(syncIterator, value)
        : iteratorNext(syncIterator);
};

AsyncFromSyncIteratorPrototype.return = async function (value?: unknown) {
    const syncIterator = getAsyncFromSyncIterator("return", this);
    const syncIteratorReturn = getMethod(syncIterator, "return");

    if (isUndefined(syncIteratorReturn)) {
        return createIterResult(value, true);
    }

    const returnArgs = arguments.length > 0 ? [value] : [];
    const result = call(syncIteratorReturn, syncIterator, returnArgs);

    if (!isObject(result)) {
        throw new TypeError("Iterator result must be an object");
    }

    return result;
};

AsyncFromSyncIteratorPrototype.throw = async function (value?: unknown) {
    const syncIterator = getAsyncFromSyncIterator("throw", this);
    const syncIteratorThrow = getMethod(syncIterator, "throw");

    if (isUndefined(syncIteratorThrow)) {
        throw value;
    }

    const throwArgs = arguments.length > 0 ? [value] : [];
    const result = call(syncIteratorThrow, syncIterator, throwArgs);

    if (!isObject(result)) {
        throw new TypeError("Iterator result must be an object");
    }

    return result;
};

for (const name of ["next", "return", "throw"]) {
    const proto = AsyncFromSyncIteratorPrototype;
    setFunctionName(proto[name], name);
    Reflect.defineProperty(proto, name, { enumerable: false });
}

function throwInvalidThis(method: string): never {
    throw new TypeError(`${method} method called on invalid object}`);
}
