import { Join } from "./join";
import { Words } from "./words";

export type ConstantCase<S extends string> = Uppercase<Join<Words<S>, "_">>;
