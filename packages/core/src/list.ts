class ListItemData<Item extends ListItem> {
    public next?: Item;
    public prev?: Item;
}

let getListItemData: <Item extends ListItem>(item: Item) => ListItemData<Item>;

function linkListItems(prev: ListItem, next: ListItem) {
    getListItemData(prev).next = next;
    getListItemData(next).prev = prev;
}

function resetListItem(item: ListItem) {
    const data = getListItemData(item);

    data.next = undefined;
    data.prev = undefined;
}

function tryCollectListItems(first: ListItem, last: ListItem) {
    const items = [first];

    while (first != last) {
        const next = first.next;
        if (!next) {
            return undefined;
        }

        items.push(next);
        first = next;
    }

    return items;
}

export class ListItem {
    private _data: ListItemData<this>;

    static {
        getListItemData = (item) => item._data;
    }

    static get [Symbol.species]() {
        return this;
    }

    public constructor() {
        this._data = new ListItemData();
    }

    public get next() {
        return this._data.next;
    }

    public get prev() {
        return this._data.prev;
    }
}

export class List<Item extends ListItem = ListItem> {
    private _front?: Item;
    private _back?: Item;
    private _size: number;

    static get [Symbol.species]() {
        return this;
    }

    public constructor(items?: Iterable<Item>) {
        this._size = 0;

        if (items) {
            this.pushBack(...items);
        }
    }

    public get front() {
        return this._front;
    }

    public get back() {
        return this._back;
    }

    public get size() {
        return this._size;
    }

    public pushBack(...items: Item[]) {
        if (items.length) {
            if (!this._back) {
                this._back = items.shift()!;
                this._front = this._back;
                this._size = 1;
                resetListItem(this._back);
            }

            this.insert(this._back, ...items);
        }
    }

    public pushFront(...items: Item[]) {
        if (items.length) {
            const [first, ...rest] = items;

            if (this._front) {
                linkListItems(first, this._front);
                this._front = first;
            } else {
                resetListItem(first);
                this._front = first;
                this._back = first;
            }

            this._size++;
            this.insert(first, ...rest);
        }
    }

    public popBack() {
        const back = this._back;
        if (!back) {
            return;
        }

        this.remove(back);
        return back;
    }

    public popFront() {
        const front = this._front;
        if (!front) {
            return;
        }

        this.remove(front);
        return front;
    }

    public remove(first: Item, last?: Item) {
        last ??= first;

        const items = tryCollectListItems(first, last ?? first);
        if (!items) {
            throw new TypeError("Invalid 'ListItem' range");
        }

        const prev = first.prev;
        const next = last.next;

        for (const item of items) {
            resetListItem(item);
        }

        if (prev) {
            getListItemData(prev).next = next;
        } else {
            this._front = next;
        }

        if (next) {
            getListItemData(next).prev = prev;
        } else {
            this._back = prev;
        }

        this._size -= items.length;
    }

    public insert(pos: Item, ...items: Item[]) {
        const next = pos.next;

        for (const item of items) {
            linkListItems(pos, item);
            pos = item;
        }

        if (next) {
            linkListItems(pos, next);
        } else {
            this._back = pos;
        }

        this._size += items.length;
    }

    public [Symbol.iterator]() {
        return this.values();
    }

    public keys() {
        return this.values();
    }

    public *values(): IterableIterator<Item> {
        for (let node = this._front; node; node = node.next) {
            yield node;
        }
    }

    public *entries(): IterableIterator<[Item, Item]> {
        for (const item of this.values()) {
            yield [item, item];
        }
    }
}
