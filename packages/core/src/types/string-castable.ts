import { Primitive } from "./primitive";

export type StringCastable = Exclude<Primitive, symbol>;
