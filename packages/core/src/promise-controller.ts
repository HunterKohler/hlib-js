export class PromiseController<T> {
    private readonly _promise: Promise<T>;
    private readonly _resolve!: (value: T | PromiseLike<T>) => void;
    private readonly _reject!: (reason: unknown) => void;
    private _resolved = false;
    private _rejected = false;

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

    public resolve(value: T) {
        this._resolved = true;
        this._rejected = false;
        this._resolve(value);
    }

    public reject(reason: unknown) {
        this._resolved = true;
        this._rejected = true;
        this._reject(reason);
    }
}
