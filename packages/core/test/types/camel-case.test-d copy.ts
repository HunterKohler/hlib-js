import { expectType } from "tsd";
import { CamelCase } from "@hlib/core";
import { WORD_TEST_CASES } from "./test-cases/words";

expectType<CamelCase<WORD_TEST_CASES[0]>>("" as Uncapitalize<string>);
expectType<CamelCase<WORD_TEST_CASES[1]>>("");
expectType<CamelCase<WORD_TEST_CASES[2]>>("");
expectType<CamelCase<WORD_TEST_CASES[3]>>("xyzAbcUvw");
expectType<CamelCase<WORD_TEST_CASES[4]>>("xyzAbcUvw");
expectType<CamelCase<WORD_TEST_CASES[5]>>("xyZABcUvW");
expectType<CamelCase<WORD_TEST_CASES[6]>>("camelCaseIdentifier");
expectType<CamelCase<WORD_TEST_CASES[7]>>("snakeCaseIdentifier");
expectType<CamelCase<WORD_TEST_CASES[8]>>("pascalCaseIdentifier");
expectType<CamelCase<WORD_TEST_CASES[9]>>("constantCaseIdentifier");
expectType<CamelCase<WORD_TEST_CASES[10]>>("nullThen1Nums2");
expectType<CamelCase<WORD_TEST_CASES[11]>>("123456789");
expectType<CamelCase<WORD_TEST_CASES[12]>>("123456789");
expectType<CamelCase<WORD_TEST_CASES[13]>>("num1Num2Num3Num4");
