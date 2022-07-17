import { expectType } from "tsd";
import { PascalCase } from "@hlib/core";
import { WORD_TEST_CASES } from "./test-cases/words";

expectType<PascalCase<WORD_TEST_CASES[0]>>("" as string);
expectType<PascalCase<WORD_TEST_CASES[1]>>("");
expectType<PascalCase<WORD_TEST_CASES[2]>>("");
expectType<PascalCase<WORD_TEST_CASES[3]>>("XyzAbcUvw");
expectType<PascalCase<WORD_TEST_CASES[4]>>("XyzAbcUvw");
expectType<PascalCase<WORD_TEST_CASES[5]>>("XyZABcUvW");
expectType<PascalCase<WORD_TEST_CASES[6]>>("CamelCaseIdentifier");
expectType<PascalCase<WORD_TEST_CASES[7]>>("SnakeCaseIdentifier");
expectType<PascalCase<WORD_TEST_CASES[8]>>("PascalCaseIdentifier");
expectType<PascalCase<WORD_TEST_CASES[9]>>("ConstantCaseIdentifier");
expectType<PascalCase<WORD_TEST_CASES[10]>>("NullThen1Nums2");
expectType<PascalCase<WORD_TEST_CASES[11]>>("123456789");
expectType<PascalCase<WORD_TEST_CASES[12]>>("123456789");
expectType<PascalCase<WORD_TEST_CASES[13]>>("Num1Num2Num3Num4");
