import { PascalCase } from "./pascal-case";

export type CamelCase<S extends string> = Uncapitalize<PascalCase<S>>;
