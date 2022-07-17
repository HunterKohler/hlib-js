import { PromiseReject } from "./promise-reject";
import { PromiseResolve } from "./promise-resolve";

export type PromiseExecutor<T> = (
    resolve: PromiseResolve<T>,
    reject: PromiseReject,
) => void;
