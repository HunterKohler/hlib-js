export type ValueOf<T> = T[keyof T];

export type StringKeysOf<T> = `${Extract<keyof T, string | number>}`;

export type SymbolKeysOf<T> = Extract<keyof T, symbol>;

export type Mutable<T> = { -readonly [K in keyof T]: T[K] };

export type Nullish = undefined | null;

export type Primitive =
    | bigint
    | boolean
    | null
    | number
    | string
    | symbol
    | undefined;

export type TypeName =
    | "bigint"
    | "boolean"
    | "number"
    | "string"
    | "symbol"
    | "undefined"
    | "object"
    | "function";

export type BoxedPrimitive = BigInt | Boolean | Number | String | Symbol;

export type Constructor<T = unknown, Args extends unknown[] = any[]> = new (
    ...args: Args
) => T;

export type AbstractConstructor<
    T = unknown,
    Args extends unknown[] = any[]
> = abstract new (...args: Args) => T;

export type LegacyConstructor<
    T = unknown,
    Args extends unknown[] = any[]
> = (new (...args: Args) => T) & ((...args: Args) => T);

export type Class<T = unknown, Args extends unknown[] = any[]> = (new (
    ...args: Args
) => T) & { readonly prototype: T };

export type AbstractClass<
    T = unknown,
    Args extends unknown[] = any[]
> = (abstract new (...args: Args) => T) & { readonly prototype: T };

export type LegacyClass<T = unknown, Args extends unknown[] = any[]> = (new (
    ...args: Args
) => T) &
    ((...args: Args) => T) & { readonly prototype: T };

export interface AsyncFunctionContructor {
    new (...args: string[]): AsyncFunction;
    (...args: string[]): AsyncFunction;
    readonly prototype: AsyncFunction;
}

export interface AsyncFunction extends Function {
    (...args: any[]): Promise<any>;
}

export const AsyncFunction = async function () {}
    .constructor as AsyncFunctionContructor;

export const GeneratorFunction = function* () {}
    .constructor as GeneratorFunctionConstructor;

export const AsyncGeneratorFunction = async function* () {}
    .constructor as AsyncGeneratorFunctionConstructor;

export type GeneratorConstructor = AbstractConstructor<Generator>;

export const Generator = (function* () {})()
    .constructor as GeneratorConstructor;

export type AsyncGeneratorConstructor = AbstractConstructor<AsyncGenerator>;

export const AsyncGenerator = (async function* () {})()
    .constructor as AsyncGeneratorConstructor;
