class QueueNode<T> {
    public constructor(public readonly value: T, public next?: QueueNode<T>) {}
}

export class Queue<T> {
    private _front?: QueueNode<T>;
    private _back?: QueueNode<T>;
    private _size: number;

    public constructor(items?: Iterable<T>) {
        this._size = 0;

        if (items) {
            this.push(...items);
        }
    }

    public static get [Symbol.species]() {
        return this;
    }

    public get [Symbol.toStringTag]() {
        return "Queue";
    }

    public get size() {
        return this._size;
    }

    public get empty() {
        return !this._size;
    }

    public get front() {
        return this._front?.value;
    }

    public get back() {
        return this._back?.value;
    }

    public push(...items: T[]) {
        if (!items.length) {
            return;
        }

        let i = 0;

        if (!this.front) {
            this._front = new QueueNode(items[i++]);
            this._back = this._front;
        }

        while (i < items.length) {
            this._back!.next = new QueueNode(items[i++]);
            this._back = this._back!.next;
        }

        this._size += items.length;
    }

    public pop() {
        const front = this._front;

        if (!front) {
            return;
        } else if (front == this._back) {
            this.clear();
        } else {
            this._front = front.next;
            this._size--;
        }

        return front.value;
    }

    public clear() {
        this._front = undefined;
        this._back = undefined;
        this._size = 0;
    }

    public [Symbol.iterator]() {
        return this.values();
    }

    public keys() {
        return this.values();
    }

    public *values(): IterableIterator<T> {
        for (let node = this._front; node; node = node.next) {
            yield node.value;
        }
    }

    public *entries(): IterableIterator<[T, T]> {
        for (const value of this.values()) {
            yield [value, value];
        }
    }
}
