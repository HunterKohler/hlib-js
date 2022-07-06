export interface AsyncFunctionContructor {
    new (...args: string[]): AsyncFunction;
    (...args: string[]): AsyncFunction;
    readonly prototype: AsyncFunction;
}

export interface AsyncFunction extends Function {
    (...args: any[]): Promise<any>;
}

export const AsyncFunction = async function () {}
    .constructor as AsyncFunctionContructor;

export const GeneratorFunction = function* () {}
    .constructor as GeneratorFunctionConstructor;

export const AsyncGeneratorFunction = async function* () {}
    .constructor as AsyncGeneratorFunctionConstructor;

export type GeneratorConstructor = abstract new () => Generator;

export const Generator = (function* () {})()
    .constructor as GeneratorConstructor;

export type AsyncGeneratorConstructor = abstract new () => AsyncGenerator;

export const AsyncGenerator = (async function* () {})()
    .constructor as AsyncGeneratorConstructor;
