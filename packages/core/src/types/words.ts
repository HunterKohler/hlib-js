import { AsciiDigit, AsciiLower, AsciiUpper } from "./ascii";

/**
 * Matches words under the pattern: [0-9]+|[A-Z]?[a-z]+|[A-Z]+(?![a-z])
 */
export type Words<S extends string> = S extends S
    ? string extends S
        ? string[]
        : WordsAgg<S, []>
    : never;

type WordsAgg<S extends string, L extends string[]> = S extends ""
    ? L
    : S extends `${AsciiUpper}${AsciiLower}${string}`
    ? PascalWord<S, L>
    : S extends `${AsciiUpper}${string}`
    ? UpperWord<S, L>
    : S extends `${AsciiLower}${string}`
    ? CharsetWord<S, L, AsciiLower>
    : S extends `${AsciiDigit}${string}`
    ? CharsetWord<S, L, AsciiDigit>
    : S extends `${string}${infer Tail}`
    ? WordsAgg<Tail, L>
    : never;

type PascalWord<
    S extends string,
    L extends string[],
> = S extends `${infer Head extends AsciiUpper}${infer Tail extends `${AsciiLower}${string}`}`
    ? CharsetWord<Tail, L, AsciiLower, Head>
    : never;

type UpperWord<
    S extends string,
    L extends string[],
    W extends string = "",
> = S extends `${AsciiUpper}${AsciiLower}${string}`
    ? WordsAgg<S, [...L, W]>
    : S extends `${infer Next extends AsciiUpper}${infer Tail}`
    ? UpperWord<Tail, L, `${W}${Next}`>
    : WordsAgg<S, [...L, W]>;

type CharsetWord<
    S extends string,
    L extends string[],
    C extends string,
    W extends string = "",
> = S extends `${infer Next extends C}${infer Tail}`
    ? CharsetWord<Tail, L, C, `${W}${Next}`>
    : WordsAgg<S, [...L, W]>;
