// prettier-ignore
export type AsciiDigit =
    | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

export type AsciiHexDigit = AsciiDigit | "A" | "B" | "C" | "D" | "F";

// prettier-ignore
export type AsciiUpper =
    | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L"
    | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X"
    | "Y" | "Z";

export type AsciiLower = Lowercase<AsciiUpper>;
export type AsciiAlpha = AsciiUpper | AsciiLower;
export type AsciiAlnum = AsciiAlpha | AsciiDigit;
