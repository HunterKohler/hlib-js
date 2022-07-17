import { Words } from "./words";

export type PascalCase<S extends string> = S extends S
    ? string extends S
        ? string
        : ApplyCapitalize<Words<S>, "">
    : never;

type ApplyCapitalize<W extends string[], Acc extends string> = W extends []
    ? Acc
    : W extends [infer T extends string, ...infer U extends string[]]
    ? ApplyCapitalize<U, `${Acc}${Capitalize<Lowercase<T>>}`>
    : null;
