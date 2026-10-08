const LIMIT = 100;

/** Snapshot stack for undo/redo. Pushing a snapshot equal to the current one is a no-op. */
export class History {
    #stack;
    #index = 0;

    constructor(initial) {
        this.#stack = [JSON.stringify(initial)];
    }

    get canUndo() {
        return this.#index > 0;
    }

    get canRedo() {
        return this.#index < this.#stack.length - 1;
    }

    push(snapshot) {
        const json = JSON.stringify(snapshot);
        if (json === this.#stack[this.#index]) return false;
        this.#stack = [...this.#stack.slice(0, this.#index + 1), json];
        if (this.#stack.length > LIMIT) this.#stack.shift();
        this.#index = this.#stack.length - 1;
        return true;
    }

    undo() {
        if (!this.canUndo) return null;
        return JSON.parse(this.#stack[--this.#index]);
    }

    redo() {
        if (!this.canRedo) return null;
        return JSON.parse(this.#stack[++this.#index]);
    }
}
