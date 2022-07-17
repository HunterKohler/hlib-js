import {
    ArrayIterator,
    ArrayIteratorPrototype,
    AsyncFunction,
    AsyncGeneratorFunction,
    GeneratorFunction,
    MapIterator,
    MapIteratorPrototype,
    RegExpStringIterator,
    RegExpStringIteratorPrototype,
    SetIterator,
    SetIteratorPrototype,
    StringIterator,
    StringIteratorPrototype,
    TypedArray,
} from "./intrinsics";
import { setFunctionName } from "./lang";
import { BoxedPrimitive } from "./types/boxed-primitive";
import { Numeric } from "./types/numeric";
import { Primitive } from "./types/primitive";

function makeInstanceGuard<T>(constructor: abstract new (...args: any[]) => T) {
    function guard(value: unknown): value is T {
        return value instanceof constructor;
    }

    if (constructor.name) {
        setFunctionName(guard, "is" + constructor.name);
    }

    return guard;
}

export function isNumber(value: unknown): value is number {
    return typeof value == "number";
}

export function isString(value: unknown): value is string {
    return typeof value == "string";
}

export function isBigInt(value: unknown): value is bigint {
    return typeof value == "bigint";
}

export function isSymbol(value: unknown): value is symbol {
    return typeof value == "symbol";
}

export function isBoolean(value: unknown): value is boolean {
    return typeof value == "boolean";
}

export function isUndefined(value: unknown): value is undefined {
    return typeof value == "undefined";
}

export function isNull(value: unknown): value is null {
    return value === null;
}

export function isNullish(value: unknown): value is null | undefined {
    return value == null;
}

export function isObject(value: unknown): value is object {
    return (
        (typeof value == "object" && Boolean(value)) ||
        typeof value == "function"
    );
}

export function isCallable(value: unknown): value is Function {
    return typeof value == "function";
}

export function isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
}

export function isPrimitive(value: unknown): value is Primitive {
    return !isObject(value);
}

export function isPropertyKey(value: unknown): value is string | symbol {
    return isString(value) || isSymbol(value);
}

export function isPrototypeOf<T extends object>(
    prototype: T,
    value: unknown,
): value is T {
    return Object.prototype.isPrototypeOf.call(prototype, value as object);
}

export function isInstanceOf<T>(
    value: unknown,
    constructor: abstract new (...args: any[]) => T,
): value is T {
    return value instanceof constructor;
}

export const isInt8Array = makeInstanceGuard(Int8Array);
export const isInt16Array = makeInstanceGuard(Int16Array);
export const isInt32Array = makeInstanceGuard(Int32Array);
export const isUint8Array = makeInstanceGuard(Uint8Array);
export const isUint16Array = makeInstanceGuard(Uint16Array);
export const isUint32Array = makeInstanceGuard(Uint32Array);
export const isUint8ClampedArray = makeInstanceGuard(Uint8ClampedArray);
export const isBigInt64Array = makeInstanceGuard(BigInt64Array);
export const isBigUint64Array = makeInstanceGuard(BigUint64Array);
export const isFloat32Array = makeInstanceGuard(Float32Array);
export const isFloat64Array = makeInstanceGuard(Float64Array);

export const isTypedArray = makeInstanceGuard(TypedArray);

export const isDataView = makeInstanceGuard(DataView);
export const isArrayBuffer = makeInstanceGuard(ArrayBuffer);
export const isSharedArrayBuffer = makeInstanceGuard(SharedArrayBuffer);

export const isError = makeInstanceGuard(Error);
export const isEvalError = makeInstanceGuard(EvalError);
export const isRangeError = makeInstanceGuard(RangeError);
export const isReferenceError = makeInstanceGuard(ReferenceError);
export const isSyntaxError = makeInstanceGuard(SyntaxError);
export const isTypeError = makeInstanceGuard(TypeError);
export const isURIError = makeInstanceGuard(URIError);
export const isAggregateError = makeInstanceGuard(AggregateError);

export const isAsyncFunction = makeInstanceGuard(AsyncFunction);
export const isGeneratorFunction = makeInstanceGuard(GeneratorFunction);
export const isAsyncGeneratorFunction = makeInstanceGuard(
    AsyncGeneratorFunction,
);

export const isDate = makeInstanceGuard(Date);
export const isFinalizationRegistry = makeInstanceGuard(FinalizationRegistry);
export const isPromise = makeInstanceGuard(Promise);
export const isProxy = makeInstanceGuard(Proxy);
export const isRegExp = makeInstanceGuard(RegExp);
export const isSet = makeInstanceGuard(Set);
export const isMap = makeInstanceGuard(Map);
export const isWeakSet = makeInstanceGuard(WeakSet);
export const isWeakMap = makeInstanceGuard(WeakMap);
export const isWeakRef = makeInstanceGuard(WeakRef);

export function isStringIterator(value: unknown): value is StringIterator {
    return isPrototypeOf(StringIteratorPrototype, value);
}

export function isRegExpStringIterator(
    value: unknown,
): value is RegExpStringIterator {
    return isPrototypeOf(RegExpStringIteratorPrototype, value);
}

export function isArrayIterator(value: unknown): value is ArrayIterator {
    return isPrototypeOf(ArrayIteratorPrototype, value);
}

export function isSetIterator(value: unknown): value is SetIterator {
    return isPrototypeOf(SetIteratorPrototype, value);
}

export function isMapIterator(value: unknown): value is MapIterator {
    return isPrototypeOf(MapIteratorPrototype, value);
}

export const isNumberObject = makeInstanceGuard(Number);
export const isStringObject = makeInstanceGuard(String);
export const isBooleanObject = makeInstanceGuard(Boolean);
export const isBigIntObject = makeInstanceGuard<BigInt>(BigInt as any);
export const isSymbolObject = makeInstanceGuard<Symbol>(Symbol as any);

export function isBoxedPrimitive(value: unknown): value is BoxedPrimitive {
    return (
        isNumberObject(value) ||
        isStringObject(value) ||
        isBooleanObject(value) ||
        isBigIntObject(value) ||
        isSymbolObject(value)
    );
}

export function isFinite(value: Numeric) {
    return isBigInt(value) || Number.isFinite(value);
}

export function isInfinite(value: Numeric) {
    return !isFinite(value);
}

export function isInteger(value: Numeric) {
    return isBigInt(value) || Number.isInteger(value);
}

export function isSafeInteger(value: Numeric) {
    return isBigInt(value) || Number.isSafeInteger(value);
}

export function isNaN(value: unknown) {
    return Number.isNaN(value);
}

export function isValidDate(value: unknown) {
    return isDate(value) && !isNaN(value.valueOf());
}

export function isFutureDate(value: unknown) {
    return isDate(value) && value.valueOf() > Date.now();
}

export function isPastDate(value: unknown) {
    return isDate(value) && value.valueOf() < Date.now();
}
