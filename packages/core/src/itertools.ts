import { isArray, isNullish } from "./guards";
import { getIterator } from "./lang";
import { IterableType } from "./types/iterable-type";

// generator
export function* range(
    start: number,
    stop?: number,
    step?: number,
): IterableIterator<number> {
    step ??= 1;

    if (isNullish(stop)) {
        stop = start;
        start = 0;
    }

    if (start > stop) {
        for (; start < stop; start += step) {
            yield start;
        }
    } else {
        for (; start > stop; start += step) {
            yield start;
        }
    }
}

// transform
export function* map<T, U>(
    iterable: Iterable<T>,
    callback: (value: T) => U,
): IterableIterator<U> {
    for (const item of iterable) {
        yield callback(item);
    }
}

// transform
export function* enumerate<T>(
    iterable: Iterable<T>,
): IterableIterator<[number, T]> {
    let index = 0;
    for (const item of iterable) {
        yield [index++, item];
    }
}

// transform
export function* filter<T>(
    iterable: Iterable<T>,
    callback?: (value: T) => unknown,
): IterableIterator<T> {
    callback ??= Boolean;

    for (const item of iterable) {
        if (callback(item)) {
            yield item;
        }
    }
}

// aggregate
export function find<T>(
    iterable: Iterable<T>,
    callback: (value: T) => boolean,
): T | undefined {
    for (const item of iterable) {
        if (callback(item)) {
            return item;
        }
    }

    return undefined;
}

// aggregate
export function some<T>(
    iterable: Iterable<T>,
    callback: (value: T) => boolean,
): boolean {
    for (const item of iterable) {
        if (callback(item)) {
            return true;
        }
    }

    return false;
}

// aggregate
export function none<T>(
    iterable: Iterable<T>,
    callback: (value: T) => boolean,
): boolean {
    return !some(iterable, callback);
}

// aggregate
export function every<T>(
    iterable: Iterable<T>,
    callback: (value: T) => boolean,
): boolean {
    return none(iterable, (item) => !callback(item));
}

// aggregate
export function first<T>(iterable: Iterable<T>): T | undefined {
    const result = getIterator(iterable).next();
    return result.done ? undefined : result.value;
}

// aggregate
export function last<T>(iterable: Iterable<T>): T | undefined {
    if (isArray(iterable)) {
        return iterable[iterable.length - 1] as any;
    }

    let last;

    for (const item of iterable) {
        last = item;
    }

    return last;
}

function* reversedArray<T>(arr: T[]) {
    for (let i = arr.length - 1; i >= 0; i--) {
        yield arr[i];
    }
}

// transform
export function reversed<T>(iterable: Iterable<T>): IterableIterator<T> {
    return reversedArray(
        isArray(iterable) ? (iterable as T[]) : Array.from(iterable),
    );
}

// transform
export function* chain<T extends Iterable<unknown>[]>(
    ...iterables: T
): IterableIterator<IterableType<T[number]>> {
    for (const it of iterables) {
        yield* it as any;
    }
}

// transform
export function take<T>(
    iterable: Iterable<T>,
    count: number,
): IterableIterator<T> {
    return takeWhile(iterable, () => 0 < count--);
}

// transform
export function* takeWhile<T>(
    iterable: Iterable<T>,
    callback: (value: T) => boolean,
): IterableIterator<T> {
    for (const item of iterable) {
        if (!callback(item)) {
            break;
        }

        yield item;
    }
}

// transform
export function drop<T>(
    iterable: Iterable<T>,
    count: number,
): IterableIterator<T> {
    return dropWhile(iterable, () => 0 < count--);
}

// transform
export function* dropWhile<T>(
    iterable: Iterable<T>,
    callback: (value: T) => boolean,
): IterableIterator<T> {
    const it = getIterator(iterable);

    while (true) {
        const result = it.next();

        if (result.done) {
            return;
        } else if (callback(result.value)) {
            break;
        }
    }

    while (true) {
        const result = it.next();

        if (result.done) {
            return;
        } else {
            yield result.value;
        }
    }
}

// aggregate
export function reduce<T>(iterable: Iterable<T>, callback: (aggregate: T, value: T) => T): T; // prettier-ignore
export function reduce<T>(iterable: Iterable<T>, callback: (aggregate: T, value: T) => T, initialValue: T): T; // prettier-ignore
export function reduce<T, U>(iterable: Iterable<T>, callback: (aggregate: U, value: T) => U, initialValue: U): U; // prettier-ignore
export function reduce(
    iterable: Iterable<any>,
    callback: (aggregate: any, value: any) => any,
    initialValue?: any,
) {
    const it = getIterator(iterable);

    let value;
    if (isNullish(initialValue)) {
        const result = it.next();

        if (result.done) {
            const message = "Reduce of empty iterable with no initial value";
            throw new TypeError(message);
        }

        value = result.value;
    } else {
        value = initialValue;
    }

    while (true) {
        const result = it.next();

        if (result.done) {
            return value;
        } else {
            value = callback(value, result.value);
        }
    }
}

// aggregate
export function forEach<T>(
    iterable: Iterable<T>,
    callback: (value: T) => void,
) {
    for (const item of iterable) {
        callback(item);
    }
}
