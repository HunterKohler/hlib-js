export class Deferred<T> {
    private readonly _promise: Promise<T>;
    private readonly _resolve!: (value: T | PromiseLike<T>) => void;
    private readonly _reject!: (reason: unknown) => void;
    private _resolved = false;
    private _rejected = false;

    private _checkResolved() {
        if (this._resolved) {
            throw new TypeError("Deferred has already been resolved");
        }
    }

    public get resolved() {
        return this._resolved;
    }

    public get rejected() {
        return this._rejected;
    }

    public get promise() {
        return this._promise;
    }

    public constructor() {
        this._promise = new Promise((resolve, reject) => {
            (this._resolve as any) = resolve;
            (this._reject as any) = reject;
        });
    }

    public reject(reason: unknown) {
        this._checkResolved();
        this._resolved = true;
        this._rejected = true;
        this._reject(reason);
    }

    public async then<R1 = T, R2 = never>(
        onFulfilled?: (value: T) => R1 | PromiseLike<R1>,
        onRejected?: (reason: unknown) => R2 | PromiseLike<R2>
    ) {
        return this._promise.then(onFulfilled, onRejected);
    }

    public async catch<R = never>(
        onRejected?: (reason: unknown) => R | PromiseLike<R>
    ) {
        return this._promise.catch(onRejected);
    }

    public async finally(onFinally?: () => void) {
        return this._promise.finally(onFinally);
    }
}
