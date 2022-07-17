import { RequiredKeyOf } from "./required-key-of";

export type OptionalKeyOf<T> = Exclude<keyof T, RequiredKeyOf<T>>;
