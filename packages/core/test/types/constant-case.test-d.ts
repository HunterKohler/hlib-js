import { expectType } from "tsd";
import { ConstantCase } from "@hlib/core";
import { WORD_TEST_CASES } from "./test-cases/words";

expectType<ConstantCase<WORD_TEST_CASES[0]>>("" as Uppercase<string>);
expectType<ConstantCase<WORD_TEST_CASES[1]>>("");
expectType<ConstantCase<WORD_TEST_CASES[2]>>("");
expectType<ConstantCase<WORD_TEST_CASES[3]>>("XYZ_ABC_UVW");
expectType<ConstantCase<WORD_TEST_CASES[4]>>("XYZ_ABC_UVW");
expectType<ConstantCase<WORD_TEST_CASES[5]>>("XY_Z_A_BC_UV_W");
expectType<ConstantCase<WORD_TEST_CASES[6]>>("CAMEL_CASE_IDENTIFIER");
expectType<ConstantCase<WORD_TEST_CASES[7]>>("SNAKE_CASE_IDENTIFIER");
expectType<ConstantCase<WORD_TEST_CASES[8]>>("PASCAL_CASE_IDENTIFIER");
expectType<ConstantCase<WORD_TEST_CASES[9]>>("CONSTANT_CASE_IDENTIFIER");
expectType<ConstantCase<WORD_TEST_CASES[10]>>("NULL_THEN_1_NUMS_2");
expectType<ConstantCase<WORD_TEST_CASES[11]>>("123456789");
expectType<ConstantCase<WORD_TEST_CASES[12]>>("1_2_34567_89");
expectType<ConstantCase<WORD_TEST_CASES[13]>>("NUM_1_NUM_2_NUM_3_NUM_4");
