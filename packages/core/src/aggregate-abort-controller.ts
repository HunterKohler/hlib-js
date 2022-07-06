function attachSignal(controller: AbortController, signal: AbortSignal) {
    if (signal.aborted) {
        controller.abort(signal.reason);
    } else if (signal != controller.signal) {
        attachSignalEvents(controller, signal);
    }
}

function attachSignalEvents(controller: AbortController, signal: AbortSignal) {
    const onAbort = () => {
        controller.abort(signal.reason);
    };

    signal.addEventListener("abort", onAbort);
    controller.signal.addEventListener("abort", () =>
        signal.removeEventListener("abort", onAbort)
    );
}

export class AggregateAbortController {
    private readonly _controller: AbortController;

    public constructor(...signals: AbortSignal[]) {
        this._controller = new AbortController();
        this.add(...signals);
    }

    public get signal() {
        return this._controller.signal;
    }

    public add(...signals: AbortSignal[]) {
        for (const signal of signals) {
            attachSignal(this._controller, signal);
        }
    }
}
