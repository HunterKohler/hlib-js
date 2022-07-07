import { describe, expect, it } from "@jest/globals";
import { List, ListItem } from "./list";

function expectListItems(list: List, ...items: ListItem[]) {
    expect(list.front).toBe(items.at(0));
    expect(list.back).toBe(items.at(-1));
    expect(list.size).toBe(items.length);

    let pos = list.front;
    for (let i = 0; i < items.length; i++) {
        expect(pos?.prev).toBe(items[i - 1]);
        expect(pos).toBe(items[i]);
        expect(pos?.next).toBe(items[i + 1]);

        pos = pos?.next;
    }
}

function makeListItems(n: number) {
    return new Array(n).fill(null).map(() => new ListItem());
}

describe("List", function () {
    describe("front", function () {
        it("returns undefined for empty list", function () {
            const list = new List();

            expect(list.front).toBeUndefined();
        });

        it("returns first item for non-empty list", function () {
            const item = new ListItem();
            const list = new List([item]);

            expect(list.front).toBe(item);
        });
    });

    describe("back", function () {
        it("returns undefined for empty list", function () {
            const list = new List();

            expect(list.back).toBeUndefined();
        });

        it("returns last item for non-empty list", function () {
            const item = new ListItem();
            const list = new List([item]);

            expect(list.back).toBe(item);
        });
    });

    describe("size", function () {
        it("returns list size", function () {
            const items = makeListItems(3);
            const list = new List();

            expect(list.size).toBe(0);

            list.pushBack(...items);
            expect(list.size).toBe(items.length);
        });
    });

    describe("constructor()", function () {
        it("creates empty list", function () {
            const list = new List();

            expectListItems(list);
        });
    });

    describe("constructor(items)", function () {
        it("created list of items", function () {
            const items = makeListItems(3);
            const list = new List(items);

            expectListItems(list, ...items);
        });
    });

    describe("pushFront(...items)", function () {
        it("adds 'items' to front of empty list", function () {
            const list = new List();
            const items = makeListItems(10);

            list.pushFront(...items);

            expectListItems(list, ...items);
        });

        it("adds 'items' to front of non-empty list", function () {
            const items = makeListItems(10);
            const newItems = makeListItems(10);
            const list = new List(items);

            list.pushFront(...newItems);

            expectListItems(list, ...newItems, ...items);
        });
    });

    describe("pushBack(...items)", function () {
        it("adds 'items' to back of empty list", function () {
            const list = new List();
            const items = makeListItems(10);

            list.pushBack(...items);

            expectListItems(list, ...items);
        });

        it("adds 'items' to back of non-empty list", function () {
            const items = makeListItems(10);
            const newItems = makeListItems(10);
            const list = new List(items);

            list.pushBack(...newItems);

            expectListItems(list, ...items, ...newItems);
        });
    });

    describe("popFront()", function () {
        it.each([
            ["returns 'undefined' for empty list", 0],
            ["returns and removes front for single-item list", 1],
            ["returns and removes front for multi-item list", 10],
        ])("%s", function (msg, count) {
            const items = makeListItems(count);
            const list = new List(items);
            const front = items.splice(0, 1)[0];
            const result = list.popFront();

            expect(result).toBe(front);
            expectListItems(list, ...items);
        });
    });

    describe("popBack()", function () {
        it.each([
            ["returns 'undefined' for empty list", 0],
            ["returns and removes back for single-item list", 1],
            ["returns and removes back for multi-item list", 10],
        ])("%s", function (msg, count) {
            const items = makeListItems(count);
            const list = new List(items);
            const back = items.splice(-1)[0];
            const result = list.popBack();

            expect(result).toBe(back);
            expectListItems(list, ...items);
        });
    });

    describe("insert(pos, ...items)", function () {
        it("inserts 'items' after 'pos'", function () {
            const pos = new ListItem();
            const before = makeListItems(3);
            const insert = makeListItems(3);
            const after = makeListItems(3);
            const init = [...before, pos, ...after];
            const result = [...before, pos, ...insert, ...after];
            const list = new List(init);

            list.insert(pos, ...insert);

            expectListItems(list, ...result);
        });
    });

    describe("remove(pos)", function () {
        it.each([
            ["front", 0],
            ["back", 1],
            ["middle", 5],
        ])("removes and resets 'pos' from %s", function (msg, idx) {
            const items = makeListItems(10);
            const list = new List(items);
            const pos = items.splice(idx, 1)[0];

            list.remove(pos);

            expect(pos.prev).toBeUndefined();
            expect(pos.next).toBeUndefined();

            expectListItems(list, ...items);
        });
    });

    describe("remove(first, last)", function () {
        it.each([
            ["'first' in front, 'last' in middle", 0, 5],
            ["'first' in middle, 'last' in back", 5, 9],
            ["'first' in front, 'last' in back", 0, 9],
        ])(
            "removes items from 'first' to 'last' with %s",
            function (msg, firstIdx, lastIdx) {
                const items = makeListItems(10);
                const list = new List(items);
                const removed = items.splice(firstIdx, lastIdx - firstIdx + 1);
                const first = removed[0];
                const last = removed[removed.length - 1];

                list.remove(first, last);

                for (const item of removed) {
                    expect(item.next).toBeUndefined();
                    expect(item.prev).toBeUndefined();
                }

                expectListItems(list, ...items);
            }
        );

        it("throws 'TypeError' and ignores for invalid range", function () {
            const items = makeListItems(10);
            const list = new List(items);

            expect(function () {
                list.remove(items[6], items[2]);
            }).toThrowError(TypeError);

            expectListItems(list, ...items);
        });
    });

    const iterMethods = [Symbol.iterator, "values", "keys"];

    describe.each(iterMethods)("%s()", function (method) {
        it("iterates over list items", function () {
            const items = makeListItems(10);
            const list = new List(items) as any;

            const res = [...list[method]()].every(
                (item, i) => item == items[i]
            );

            expect(res).toBe(true);
        });
    });

    describe("entries()", function () {
        it("iterates over list entries", function () {
            const items = makeListItems(10);
            const list = new List(items);
            const entries = items.map((item) => [item, item]);
            const res = [...list.entries()].every(
                ([a, b], i) => a == entries[i][0] && b == entries[i][1]
            );

            expect(res).toBe(true);
        });
    });
});
