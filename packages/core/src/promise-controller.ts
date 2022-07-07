class PromiseControllerBase<T> {
    public readonly promise: Promise<T>;
    public readonly resolve!: (value: T | PromiseLike<T>) => void;
    public readonly reject!: (reason: unknown) => void;
    public resolved = false;
    public rejected = false;

    public constructor() {
        this.promise = new Promise((resolve, reject) => {
            (this.resolve as any) = resolve;
            (this.reject as any) = reject;
        });
    }
}

export class PromiseController<T> {
    private readonly _base = new PromiseControllerBase<T>();

    public get promise() {
        return this._base.promise;
    }

    public get resolved() {
        return this._base.resolved;
    }

    public get rejected() {
        return this._base.rejected;
    }

    public resolve(value: T) {
        this._base.resolved = true;
        this._base.rejected = false;
        this._base.resolve(value);
    }

    public reject(reason: unknown) {
        this._base.resolved = true;
        this._base.rejected = true;
        this._base.reject(reason);
    }
}
