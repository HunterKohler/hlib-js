import { ReverseString } from "./reverse";

export type Trim<S extends string> = TrimStart<TrimEnd<S>>;

export type TrimStart<S extends string> = //
    S extends `${LineTerminator | WhiteSpace}${infer T}` ? TrimStart<T> : S;

export type TrimEnd<S extends string> = //
    ReverseString<TrimStart<ReverseString<S>>>;

/**
 * @see https://tc39.es/ecma262/#prod-LineTerminator
 */
type LineTerminator = "\u000A" | "\u000D" | "\u2028" | "\u2029";

/**
 * @see https://tc39.es/ecma262/#prod-WhiteSpace
 */
type WhiteSpace =
    | "\u0009"
    | "\u000B"
    | "\u000C"
    | "\uFEFF"
    | "\u0020"
    | "\u00a0"
    | "\u1680"
    | "\u2000"
    | "\u2001"
    | "\u2002"
    | "\u2003"
    | "\u2004"
    | "\u2005"
    | "\u2006"
    | "\u2007"
    | "\u2008"
    | "\u2009"
    | "\u200a"
    | "\u202f"
    | "\u205f"
    | "\u3000";
