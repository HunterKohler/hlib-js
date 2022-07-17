import { expectType } from "tsd";
import { SnakeCase } from "@hlib/core";
import { WORD_TEST_CASES } from "./test-cases/words";

expectType<SnakeCase<WORD_TEST_CASES[0]>>("" as Lowercase<string>);
expectType<SnakeCase<WORD_TEST_CASES[1]>>("");
expectType<SnakeCase<WORD_TEST_CASES[2]>>("");
expectType<SnakeCase<WORD_TEST_CASES[3]>>("xyz_abc_uvw");
expectType<SnakeCase<WORD_TEST_CASES[4]>>("xyz_abc_uvw");
expectType<SnakeCase<WORD_TEST_CASES[5]>>("xy_z_a_bc_uv_w");
expectType<SnakeCase<WORD_TEST_CASES[6]>>("camel_case_identifier");
expectType<SnakeCase<WORD_TEST_CASES[7]>>("snake_case_identifier");
expectType<SnakeCase<WORD_TEST_CASES[8]>>("pascal_case_identifier");
expectType<SnakeCase<WORD_TEST_CASES[9]>>("constant_case_identifier");
expectType<SnakeCase<WORD_TEST_CASES[10]>>("null_then_1_nums_2");
expectType<SnakeCase<WORD_TEST_CASES[11]>>("123456789");
expectType<SnakeCase<WORD_TEST_CASES[12]>>("1_2_34567_89");
expectType<SnakeCase<WORD_TEST_CASES[13]>>("num_1_num_2_num_3_num_4");
