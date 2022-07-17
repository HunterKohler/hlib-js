import { expectType } from "tsd";
import { Words } from "@hlib/core";
import { WORD_TEST_CASES } from "./test-cases/words";

expectType<Words<WORD_TEST_CASES[0]>>([] as string[]);
expectType<Words<WORD_TEST_CASES[1]>>([]);
expectType<Words<WORD_TEST_CASES[2]>>([]);
expectType<Words<WORD_TEST_CASES[3]>>(["xyz", "abc", "uvw"]);
expectType<Words<WORD_TEST_CASES[4]>>(["XYZ", "ABC", "UVW"]);
expectType<Words<WORD_TEST_CASES[5]>>(["Xy", "Z", "a", "Bc", "Uv", "W"]);
expectType<Words<WORD_TEST_CASES[6]>>(["camel", "Case", "Identifier"]);
expectType<Words<WORD_TEST_CASES[7]>>(["snake", "case", "identifier"]);
expectType<Words<WORD_TEST_CASES[8]>>(["Pascal", "Case", "Identifier"]);
expectType<Words<WORD_TEST_CASES[9]>>(["CONSTANT", "CASE", "IDENTIFIER"]);
expectType<Words<WORD_TEST_CASES[10]>>(["null", "THEN", "1", "nums", "2"]);
expectType<Words<WORD_TEST_CASES[11]>>(["123456789"]);
expectType<Words<WORD_TEST_CASES[12]>>(["1", "2", "34567", "89"]);
expectType<Words<WORD_TEST_CASES[13]>>([
    "num",
    "1",
    "num",
    "2",
    "Num",
    "3",
    "NUM",
    "4",
]);
