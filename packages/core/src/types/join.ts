import { StringCastable } from "./string-castable";

export type Join<
    Input extends StringCastable[],
    Sep extends string = ",",
> = Input extends []
    ? ""
    : Input[number][] extends Input
    ? string
    : Sep extends Sep
    ? RemoveFirst<TailJoin<Input, Sep, "">>
    : never;

type RemoveFirst<S extends string> = S extends `${string}${infer Tail}`
    ? Tail
    : S;

type TailJoin<
    Input extends StringCastable[],
    Sep extends string,
    Acc extends string,
> = Input extends []
    ? Acc
    : Input extends [
          infer Next extends StringCastable,
          ...infer Tail extends StringCastable[],
      ]
    ? TailJoin<Tail, Sep, `${Acc}${Sep}${Next}`>
    : never;
