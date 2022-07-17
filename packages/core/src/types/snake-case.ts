import { Join } from "./join";
import { Words } from "./words";

export type SnakeCase<S extends string> = Lowercase<Join<Words<S>, "_">>;
