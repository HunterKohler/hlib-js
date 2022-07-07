import { describe, expect, it } from "@jest/globals";
import { Queue } from "./queue";

function expectQueueItems<T>(queue: Queue<T>, ...items: T[]) {
    expect(queue.front).toBe(items.at(0));
    expect(queue.back).toBe(items.at(-1));
    expect(queue.size).toBe(items.length);

    let it = queue.values();
    for (let i = 0; i < items.length; i++) {
        expect(it.next().value).toEqual(items[i]);
    }

    expect(it.next().done).toBe(true);
}

describe("Queue", function () {
    describe("front", function () {
        it("returns undefined for empty queue", function () {
            const queue = new Queue();

            expect(queue.front).toBeUndefined();
        });

        it("returns first item for non-empty queue", function () {
            const queue = new Queue([1, 2, 3]);

            expect(queue.front).toBe(1);
        });
    });

    describe("back", function () {
        it("returns undefined for empty queue", function () {
            const queue = new Queue();

            expect(queue.back).toBeUndefined();
        });

        it("returns last item for non-empty queue", function () {
            const queue = new Queue([1, 2, 3]);

            expect(queue.back).toBe(3);
        });
    });

    describe("size", function () {
        it("returns queue size", function () {
            const queue = new Queue([1, 2, 3]);

            expect(queue.size).toBe(3);
        });
    });

    describe("constructor()", function () {
        it("creates empty queue", function () {
            const queue = new Queue();

            expectQueueItems(queue);
        });
    });

    describe("constructor(items)", function () {
        it("created queue of items", function () {
            const queue = new Queue([1, 2, 3]);

            expectQueueItems(queue, 1, 2, 3);
        });
    });

    describe("push(...items)", function () {
        it("adds 'items' to back of empty queue", function () {
            const queue = new Queue();
            expectQueueItems(queue);

            queue.push(1, 2, 3);
            expectQueueItems(queue, 1, 2, 3);
        });

        it("adds 'items' to back of non-empty queue", function () {
            const queue = new Queue([1, 2, 3]);
            expectQueueItems(queue, 1, 2, 3);

            queue.push(-3, -2, -1);
            expectQueueItems(queue, 1, 2, 3, -3, -2, -1);
        });
    });

    describe("pop()", function () {
        it.each([
            ["returns 'undefined' for empty queue", 0],
            ["returns and removes front for single-item queue", 1],
            ["returns and removes front for multi-item queue", 10],
        ])("%s", function (msg, count) {
            const items = new Array(count).fill(null).map((_, i) => i);
            const queue = new Queue(items);
            const front = items.splice(0, 1)[0];
            const result = queue.pop();

            expect(result).toBe(front);
            expectQueueItems(queue, ...items);
        });
    });

    const iterMethods = [Symbol.iterator, "values", "keys"] as const;

    describe.each(iterMethods)("%s()", function (method) {
        it("iterates over queue items", function () {
            const items = [1, 2, 3];
            const queue = new Queue(items);

            expect([...queue[method]()]).toEqual([1, 2, 3]);
        });
    });

    describe("entries()", function () {
        it("iterates over queue entries", function () {
            const items = [1, 2, 3];
            const queue = new Queue(items);

            expect([...queue.entries()]).toEqual([
                [1, 1],
                [2, 2],
                [3, 3],
            ]);
        });
    });
});
