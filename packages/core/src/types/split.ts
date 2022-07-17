export type Split<
    Input extends string,
    Delim extends string = "",
> = Input extends Input
    ? Delim extends Delim
        ? TailSplit<Input, Delim, []>
        : never
    : never;

type TailSplit<
    S extends string,
    D extends string,
    Acc extends string[],
> = S extends `${infer Head}${D}${infer Tail}`
    ? TailSplit<Tail, D, [...Acc, Head]>
    : never;
