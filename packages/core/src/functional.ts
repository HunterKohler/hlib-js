export function constant<T>(value: T) {
    return () => value;
}

export function identity<T>(value: T) {
    return value;
}

export function decrement(value: number): number;
export function decrement(value: bigint): bigint;
export function decrement(value: any): any {
    return --value;
}

export function increment(value: number): number;
export function increment(value: bigint): bigint;
export function increment(value: any): any {
    return ++value;
}

export function negate(value: number): number;
export function negate(value: bigint): bigint;
export function negate(value: any): any {
    return -value;
}

export function add(x: number, y: number): number;
export function add(x: bigint, y: bigint): bigint;
export function add(x: any, y: any): any {
    return x + y;
}

export function subtract(x: number, y: number): number;
export function subtract(x: bigint, y: bigint): bigint;
export function subtract(x: any, y: any): any {
    return x - y;
}

export function multiply(x: number, y: number): number;
export function multiply(x: bigint, y: bigint): bigint;
export function multiply(x: any, y: any): any {
    return x * y;
}

export function divide(x: number, y: number): number;
export function divide(x: bigint, y: bigint): bigint;
export function divide(x: any, y: any): any {
    return x / y;
}

export function mod(x: number, y: number): number;
export function mod(x: bigint, y: bigint): bigint;
export function mod(x: any, y: any): any {
    return x % y;
}

export function min(x: bigint, y: bigint): bigint;
export function min(x: number, y: number): number;
export function min(x: any, y: any): any {
    return x < y ? x : y;
}

export function eq(x: unknown, y: unknown) {
    return x == y;
}

export function neq(x: unknown, y: unknown) {
    return x != y;
}

export function and(x: boolean, y: boolean) {
    return x && y;
}

export function or(x: boolean, y: boolean) {
    return x || y;
}

export function not(value: unknown) {
    return !value;
}

export function le(x: number | bigint, y: number | bigint) {
    return x < y;
}

export function gt(x: number | bigint, y: number | bigint) {
    return x < y;
}

export function leq(x: number | bigint, y: number | bigint) {
    return x < y;
}

export function gte(x: number | bigint, y: number | bigint) {
    return x < y;
}

export function prop<K extends PropertyKey>(key: K) {
    return function <T extends Record<K, any>>(value: T) {
        return value[key];
    };
}

export function unary<A, B extends unknown[], R>(
    fn: (a: A, ...b: B | []) => R,
) {
    return (a: A) => fn(a);
}

export function binary<A, B, C extends unknown[], R>(
    fn: (a: A, b: B, ...c: C | []) => R,
) {
    return (a: A, b: B) => fn(a, b);
}

export function compose<Args extends unknown[], T0, T1>(func0: (...args: Args) => T0): (...args: Args) => T0; // prettier-ignore
export function compose<Args extends unknown[], T0, T1, T2>(func0: (arg: T1) => T0, func1: (...args: Args) => T1): (...args: Args) => T0; // prettier-ignore
export function compose<Args extends unknown[], T0, T1, T2, T3>(func0: (arg: T1) => T0, func1: (arg: T2) => T1, func2: (...args: Args) => T2): (...args: Args) => T0; // prettier-ignore
export function compose<Args extends unknown[], T0, T1, T2, T3, T4>(func0: (arg: T1) => T0, func1: (arg: T2) => T1, func2: (arg: T3) => T2, func3: (...args: Args) => T3): (...args: Args) => T0; // prettier-ignore
export function compose<Args extends unknown[], T0, T1, T2, T3, T4, T5>(func0: (arg: T1) => T0, func1: (arg: T2) => T1, func2: (arg: T3) => T2, func3: (arg: T4) => T3, func4: (...args: Args) => T4): (...args: Args) => T0; // prettier-ignore
export function compose<Args extends unknown[], T0, T1, T2, T3, T4, T5, T6>(func0: (arg: T1) => T0, func1: (arg: T2) => T1, func2: (arg: T3) => T2, func3: (arg: T4) => T3, func4: (arg: T5) => T4, func5: (...args: Args) => T5): (...args: Args) => T0; // prettier-ignore
export function compose<Args extends unknown[], T0, T1, T2, T3, T4, T5, T6, T7>(func0: (arg: T1) => T0, func1: (arg: T2) => T1, func2: (arg: T3) => T2, func3: (arg: T4) => T3, func4: (arg: T5) => T4, func5: (arg: T6) => T5, func6: (...args: Args) => T6): (...args: Args) => T0; // prettier-ignore
export function compose<Args extends unknown[], T0, T1, T2, T3, T4, T5, T6, T7, T8>(func0: (arg: T1) => T0, func1: (arg: T2) => T1, func2: (arg: T3) => T2, func3: (arg: T4) => T3, func4: (arg: T5) => T4, func5: (arg: T6) => T5, func6: (arg: T7) => T6, func7: (...args: Args) => T7): (...args: Args) => T0; // prettier-ignore
export function compose<Args extends unknown[], T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>(func0: (arg: T1) => T0, func1: (arg: T2) => T1, func2: (arg: T3) => T2, func3: (arg: T4) => T3, func4: (arg: T5) => T4, func5: (arg: T6) => T5, func6: (arg: T7) => T6, func7: (arg: T8) => T7, func8: (...args: Args) => T8): (...args: Args) => T0; // prettier-ignore
export function compose<Args extends unknown[], T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(func0: (arg: T1) => T0, func1: (arg: T2) => T1, func2: (arg: T3) => T2, func3: (arg: T4) => T3, func4: (arg: T5) => T4, func5: (arg: T6) => T5, func6: (arg: T7) => T6, func7: (arg: T8) => T7, func8: (arg: T9) => T8, func9: (...args: Args) => T9): (...args: Args) => T0; // prettier-ignore
export function compose(...funcs: any[]) {
    return function (...args: any[]) {
        let index = funcs.length - 1;
        let value = funcs[index--](...args);

        while (index >= 0) {
            value = funcs[index--](value);
        }

        return value;
    };
}

export function pipe<T1, T2>(value: T1, func1: (arg: T1) => T2): T2; // prettier-ignore
export function pipe<T1, T2, T3>(value: T1, func1: (arg: T1) => T2, func2: (arg: T2) => T3): T3; // prettier-ignore
export function pipe<T1, T2, T3, T4>(value: T1, func1: (arg: T1) => T2, func2: (arg: T2) => T3, func3: (arg: T3) => T4): T4; // prettier-ignore
export function pipe<T1, T2, T3, T4, T5>(value: T1, func1: (arg: T1) => T2, func2: (arg: T2) => T3, func3: (arg: T3) => T4, func4: (arg: T4) => T5): T5; // prettier-ignore
export function pipe<T1, T2, T3, T4, T5, T6>(value: T1, func1: (arg: T1) => T2, func2: (arg: T2) => T3, func3: (arg: T3) => T4, func4: (arg: T4) => T5, func5: (arg: T5) => T6): T6; // prettier-ignore
export function pipe<T1, T2, T3, T4, T5, T6, T7>(value: T1, func1: (arg: T1) => T2, func2: (arg: T2) => T3, func3: (arg: T3) => T4, func4: (arg: T4) => T5, func5: (arg: T5) => T6, func6: (arg: T6) => T7): T7; // prettier-ignore
export function pipe<T1, T2, T3, T4, T5, T6, T7, T8>(value: T1, func1: (arg: T1) => T2, func2: (arg: T2) => T3, func3: (arg: T3) => T4, func4: (arg: T4) => T5, func5: (arg: T5) => T6, func6: (arg: T6) => T7, func7: (arg: T7) => T8): T8; // prettier-ignore
export function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9>(value: T1, func1: (arg: T1) => T2, func2: (arg: T2) => T3, func3: (arg: T3) => T4, func4: (arg: T4) => T5, func5: (arg: T5) => T6, func6: (arg: T6) => T7, func7: (arg: T7) => T8, func8: (arg: T8) => T9): T9; // prettier-ignore
export function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(value: T1, func1: (arg: T1) => T2, func2: (arg: T2) => T3, func3: (arg: T3) => T4, func4: (arg: T4) => T5, func5: (arg: T5) => T6, func6: (arg: T6) => T7, func7: (arg: T7) => T8, func8: (arg: T8) => T9, func9: (arg: T9) => T10): T10; // prettier-ignore
export function pipe(value: any, ...funcs: any[]) {
    for (let i = 0; i < funcs.length; i++) {
        value = funcs[i](value);
    }

    return value;
}
