export type Reverse<T extends unknown[]> = T extends [infer Head, ...infer Tail]
    ? [...Reverse<Tail>, Head]
    : T extends []
    ? []
    : T[number][] extends T
    ? T
    : never;

export type ReverseString<S extends string> =
    S extends `${infer Head}${infer Tail}`
        ? `${ReverseString<Tail>}${Head}`
        : S extends ""
        ? ""
        : string extends S
        ? string
        : never;
