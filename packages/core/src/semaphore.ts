import { AggregateAbortController } from "./aggregate-abort-controller";
import { isFutureDate, isInteger } from "./guards";
import { List, ListItem } from "./list";
import { PromiseController } from "./promise-controller";

export interface SemaphoreAquireOptions {
    signal?: AbortSignal;
}

export class Semaphore {
    private _base: SemaphoreBase;

    public constructor(count?: number) {
        this._base = new SemaphoreBase(count ?? 1);
    }

    public async aquire(
        count?: number,
        options?: SemaphoreAquireOptions
    ): Promise<void> {
        count ??= 1;
        options ??= {};
        options.signal?.throwIfAborted();

        if (this.tryAquire(count)) {
            return;
        }

        await this._base.aquire(count, options.signal);
    }

    public tryAquire(count?: number): boolean {
        count ??= 1;

        if (!isInteger(count) || count < 1) {
            throw new TypeError("Aquire count must be a positive integer");
        } else if (count > this._base.max) {
            throw new TypeError("Aquire count greater than resource maximum");
        }

        return this._base.tryAquire(count);
    }

    public async tryAquireFor(
        time: number,
        count?: number,
        options?: SemaphoreAquireOptions
    ) {
        count ??= 1;
        options ??= {};
        options.signal?.throwIfAborted();

        if (!isInteger(time) || time < 1) {
            throw new TypeError("Aquire timeout must be a positive integer");
        }

        if (this.tryAquire(count)) {
            return true;
        }

        return this._base.tryAquireFor(time, count, options.signal);
    }

    public async tryAquireUntil(
        time: Date,
        count?: number,
        options?: SemaphoreAquireOptions
    ) {
        count ??= 1;
        options ??= {};
        options.signal?.throwIfAborted();

        if (!isFutureDate(time)) {
            throw new TypeError("Aquire timeout date must be valid and future");
        }

        if (this.tryAquire(count)) {
            return true;
        }

        return this._base.tryAquireFor(
            time.getTime() - Date.now(),
            count,
            options.signal
        );
    }

    public release(count?: number) {
        count ??= 1;

        if (!isInteger(count) || count < 1) {
            throw new TypeError("Release count must be a positive integer");
        } else if (this._base.total + count > this._base.max) {
            throw new TypeError("Release count greater than resource maximum");
        }

        this._base.release(count);
    }
}

class SemaphoreBase {
    public current: number;
    public readonly max: number;
    public readonly waiting: SemaphoreList;

    public get total() {
        return this.current + this.waiting.size;
    }

    public constructor(count: number) {
        this.current = count;
        this.max = count;
        this.waiting = new SemaphoreList();
    }

    public tryAquire(count: number) {
        if (count > this.current) {
            return false;
        }

        this.current -= count;
        return true;
    }

    public async aquire(count: number, signal?: AbortSignal) {
        const latch = new SemaphoreLatch(count, signal);
        this.waiting.pushBack(new SemaphoreListItem(latch));
        await latch.wait();
    }

    public async tryAquireFor(
        time: number,
        count: number,
        signal?: AbortSignal
    ) {
        const controller = new AggregateAbortController();
        const timeoutError = new Error();
        const timeout = setTimeout(() => controller.abort(timeoutError), time);

        if (signal) {
            controller.add(signal);
        }

        try {
            await this.aquire(count, signal);
            return true;
        } catch (error) {
            if (error == timeoutError) {
                return false;
            }

            throw error;
        } finally {
            clearTimeout(timeout);
        }
    }

    public release(count: number) {
        this.current += count;

        while (this.tryNotify()) {}
    }

    public tryNotify() {
        const next = this.waiting.front?.latch;
        if (!next || next.count > this.current) {
            return false;
        }

        this.current -= next.count;
        next.release();
        this.waiting.popFront();

        return true;
    }
}

class SemaphoreLatch {
    private readonly _count: number;
    private readonly _controller = new PromiseController<void>();
    private readonly _signal?: AbortSignal;
    private _onAbort?: () => void;

    public constructor(count: number, signal?: AbortSignal) {
        this._count = count;
        this._signal = signal;

        if (signal) {
            this._onAbort = () => {
                this._controller.reject(signal.reason);
            };

            signal.addEventListener("abort", this._onAbort);
        }
    }

    public get count() {
        return this._count;
    }

    public release() {
        if (this._signal && this._onAbort) {
            this._signal.removeEventListener("abort", this._onAbort);
            this._onAbort = undefined;
        }

        this._controller.resolve();
    }

    public async wait() {
        await this._controller.promise;
    }
}

class SemaphoreList extends List<SemaphoreListItem> {}
class SemaphoreListItem extends ListItem {
    public constructor(public readonly latch: SemaphoreLatch) {
        super();
    }
}
