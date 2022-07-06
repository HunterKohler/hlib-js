import {
    AbstractConstructor,
    AsyncFunction,
    AsyncGenerator,
    AsyncGeneratorFunction,
    BoxedPrimitive,
    Generator,
    GeneratorFunction,
    Nullish,
    TypedArray,
} from "@hlib/types";

function typeofCheck<T>(name: string) {
    return function (value: unknown): value is T {
        return typeof value == name;
    };
}

function instanceCheck<T>(constructor: AbstractConstructor<T>) {
    return function (value: unknown): value is T {
        return value instanceof constructor;
    };
}

export const isBigInt = typeofCheck<bigint>("bigint");
export const isBoolean = typeofCheck<boolean>("boolean");
export const isFunction = typeofCheck<Function>("function");
export const isNumber = typeofCheck<number>("number");
export const isString = typeofCheck<string>("string");
export const isSymbol = typeofCheck<symbol>("symbol");
export const isUndefined = typeofCheck<undefined>("undefined");

export function isObject(value: unknown): value is object {
    return (typeof value == "object" && !value) || typeof value == "function";
}

export function isNull(value: unknown): value is null {
    return value === null;
}

export function isNullish(value: unknown): value is Nullish {
    return value == null;
}

export function isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
}

export const isBooleanObject = instanceCheck(Boolean);
export const isNumberObject = instanceCheck(Number);
export const isStringObject = instanceCheck(String);
export const isBigIntObject = instanceCheck<BigInt>(BigInt as any);
export const isSymbolObject = instanceCheck<Symbol>(Symbol as any);

export function isBoxedPrimitive(value: unknown): value is BoxedPrimitive {
    return (
        value instanceof String ||
        value instanceof Number ||
        value instanceof BigInt ||
        value instanceof Boolean ||
        value instanceof Symbol
    );
}

export const isInt8Array = instanceCheck(Int8Array);
export const isUint8Array = instanceCheck(Uint8Array);
export const isUint8ClampedArray = instanceCheck(Uint8ClampedArray);
export const isUint16Array = instanceCheck(Uint16Array);
export const isUint32Array = instanceCheck(Uint32Array);
export const isBigInt64Array = instanceCheck(BigInt64Array);
export const isBigUint64Array = instanceCheck(BigUint64Array);
export const isFloat32Array = instanceCheck(Float32Array);
export const isFloat64Array = instanceCheck(Float64Array);

export const isTypedArray = instanceCheck(TypedArray);

export const isArrayBuffer = instanceCheck(ArrayBuffer);
export const isSharedArrayBuffer = instanceCheck(SharedArrayBuffer);
export const isDataView = instanceCheck(DataView);
export const isBuffer = instanceCheck(Buffer);
export const isBlob = instanceCheck(Blob);

export function isAnyArrayBuffer(
    value: unknown
): value is ArrayBuffer | SharedArrayBuffer {
    return value instanceof ArrayBuffer || value instanceof SharedArrayBuffer;
}

export function isArrayBufferView(value: unknown): value is ArrayBufferView {
    return ArrayBuffer.isView(value);
}

export const isAsyncFunction = instanceCheck(AsyncFunction);

export const isGeneratorFunction = instanceCheck(GeneratorFunction);
export const isAsyncGeneratorFunction = instanceCheck(AsyncGeneratorFunction);

export const isGenerator = instanceCheck(Generator);
export const isAsyncGenerator = instanceCheck(AsyncGenerator);

export const isError = instanceCheck(Error);
export const isAggregateError = instanceCheck(AggregateError);
export const isEvalError = instanceCheck<EvalError>(EvalError);
export const isRangeError = instanceCheck<RangeError>(RangeError);
export const isReferenceError = instanceCheck<ReferenceError>(ReferenceError);
export const isSyntaxError = instanceCheck<SyntaxError>(SyntaxError);
export const isTypeError = instanceCheck<TypeError>(TypeError);
export const isURIError = instanceCheck<URIError>(URIError);

export const isSet = instanceCheck(Set);
export const isMap = instanceCheck(Map);
export const isWeakMap = instanceCheck(WeakMap);
export const isWeakSet = instanceCheck(WeakSet);
export const isWeakRef = instanceCheck(WeakRef);

export const isURL = instanceCheck(URL);
export const isURLSearchParams = instanceCheck(URLSearchParams);

export const isDate = instanceCheck(Date);
export const isRegExp = instanceCheck(RegExp);
export const isPromise = instanceCheck(Promise);

export const isFinalizationRegistry = instanceCheck(FinalizationRegistry);

export const isAbortController = instanceCheck(AbortController);
export const isAbortSignal = instanceCheck(AbortSignal);

export const isEventTarget = instanceCheck(EventTarget);

export const isMessageChannel = instanceCheck(MessageChannel);
export const isMessageEvent = instanceCheck(MessageEvent);
export const isMessagePort = instanceCheck(MessagePort);
export const isDOMException = instanceCheck(DOMException);
export const isTextDecoder = instanceCheck(TextDecoder);
export const isTextEncoder = instanceCheck(TextEncoder);
export const isEvent = instanceCheck(Event);

export function isPromiseLike(value: unknown): value is PromiseLike<unknown> {
    return isFunction((value as any)?.then);
}

export function isIterator(value: unknown): value is Iterator<unknown> {
    return isFunction((value as any)?.next);
}

export function isIterable(value: unknown): value is Iterable<unknown> {
    return isFunction((value as any)?.[Symbol.iterator]);
}

export function isAsyncIterable(
    value: unknown
): value is AsyncIterable<unknown> {
    return isFunction((value as any)?.[Symbol.asyncIterator]);
}

export function isInteger(value: unknown) {
    return Number.isInteger(value) || isBigInt(value);
}

export function isSafeInteger(value: unknown) {
    return Number.isSafeInteger(value) || isBigInt(value);
}

export function isFinite(value: unknown) {
    return Number.isFinite(value) || isBigInt(value);
}

export function isInfinite(value: unknown) {
    return !isFinite(value);
}

export function isNaN(value: unknown) {
    return Number.isNaN(value);
}

export function isValidDate(value: unknown) {
    return isDate(value) && !Number.isNaN(value.getTime());
}

export function isPastDate(value: unknown) {
    return isDate(value) && value.getTime() < Date.now();
}

export function isFutureDate(value: unknown) {
    return isDate(value) && value.getTime() > Date.now();
}
