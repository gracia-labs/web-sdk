/** Minimal DOM builders. `el` is the only primitive; everything else composes it. */

export function el(tag, props = {}, children = []) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(props)) {
        if (key === "class") node.className = value;
        else if (key === "text") node.textContent = value;
        else if (key === "html") node.innerHTML = value;
        else if (key.startsWith("on")) node.addEventListener(key.slice(2).toLowerCase(), value);
        else if (value !== undefined && value !== null && value !== false) {
            node.setAttribute(key, value === true ? "" : value);
        }
    }
    for (const child of [children].flat()) {
        if (child) node.append(child);
    }
    return node;
}

export const clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

/** An action that does not apply right now is hidden rather than shown greyed out. */
export const show = (node, visible) => {
    node.style.display = visible ? "" : "none";
};

/** Keeps a click inside a summary from collapsing the section it sits in. */
const swallow = (node) => {
    node.addEventListener("click", (e) => e.stopPropagation());
    return node;
};

/**
 * A collapsible titled card. `hint` hides behind a `?` so panels stay quiet until asked, and
 * any section can be folded away to keep the column inside the viewport.
 */
export function section(title, { hint, children = [], aside, open = true } = {}) {
    const body = el("div", { class: "body" }, children);
    // Title, then help, then a spacer, so the collapse chevron always sits at the far right.
    const head = el("summary", { class: "head" }, [el("span", { class: "lbl", text: title })]);

    if (hint) {
        const note = el("div", { class: "hint", html: hint });
        const help = swallow(
            el("button", {
                class: "help",
                type: "button",
                text: "?",
                title: "Show help",
                onClick: () => help.classList.toggle("on", note.classList.toggle("on")),
            }),
        );
        head.append(help);
        body.prepend(note);
    }

    head.append(el("span", { class: "grow" }));
    if (aside) head.append(swallow(aside));
    head.append(el("span", { class: "chev" }));

    const card = el("details", { class: "card sec", open }, [head, body]);
    card.body = body;
    card.setHint = (html) => {
        const note = body.querySelector(".hint");
        if (note) note.innerHTML = html;
    };
    return card;
}

export function button(label, { onClick, title } = {}) {
    return el("button", { class: "btn", type: "button", text: label, title, onClick });
}

/** A small group heading inside a section body, so a run of buttons reads as one thing. */
export function groupLabel(text) {
    return el("div", { class: "group", text });
}

/**
 * Mutually exclusive choices. Returns the element with `.select(value)` so callers can
 * reflect state without rebuilding.
 */
export function segmented(options, value, onChange) {
    const buttons = options.map((option) =>
        el("button", {
            class: `btn${option.value === value ? " on" : ""}`,
            type: "button",
            text: option.label,
            title: option.title,
            onClick: () => onChange(option.value),
        }),
    );
    const node = el("div", { class: "seg" }, buttons);
    node.select = (next) => {
        options.forEach((option, i) => buttons[i].classList.toggle("on", option.value === next));
    };
    node.setHidden = (value, hidden) => {
        const i = options.findIndex((option) => option.value === value);
        if (i >= 0) show(buttons[i], !hidden);
    };
    return node;
}

export function toggle(label, checked, onChange) {
    const input = el("input", { type: "checkbox", checked });
    input.addEventListener("change", () => onChange(input.checked));
    const node = el("label", { class: "toggle" }, [input, document.createTextNode(label)]);
    node.set = (next) => {
        input.checked = next;
    };
    return node;
}

/** Slider paired with a number box; both drive the same value. */
export function slider({ min, max, step, value, digits = 2, onInput, onCommit }) {
    const range = el("input", { type: "range", class: "slider", min, max, step, value });
    const num = el("input", { type: "number", class: "num", min, max, step, value });

    const show = (v) => {
        range.value = v;
        num.value = v.toFixed(digits);
    };
    const push = (raw, commit) => {
        const v = clamp(Number.parseFloat(raw), min, max);
        if (!Number.isFinite(v)) return;
        show(v);
        onInput(v);
        if (commit) onCommit?.();
    };

    range.addEventListener("input", () => push(range.value, false));
    range.addEventListener("change", () => push(range.value, true));
    num.addEventListener("change", () => push(num.value, true));
    num.addEventListener("keydown", (e) => {
        if (e.key === "Enter") num.blur();
    });

    // `grow` so the pair shrinks when it sits beside a label in an outer row.
    const node = el("div", { class: "row grow" }, [range, num]);
    node.set = show;
    return node;
}

export function tag(dotClass, name) {
    const label = el("span", { class: "name", text: name });
    const node = el("span", { class: "tag grow" }, [
        el("span", { class: `dot ${dotClass}` }),
        label,
    ]);
    node.set = (next, on) => {
        label.textContent = next;
        node.firstChild.className = `dot ${on ? dotClass : ""}`;
    };
    return node;
}

/** Copies text, flashing the button label so the click has visible feedback. */
export function copyButton(label, getText, { title } = {}) {
    let timer = 0;
    const node = button(label, {
        title,
        onClick: async () => {
            const text = getText();
            if (text === null) return;
            try {
                await navigator.clipboard.writeText(text);
            } catch {
                const area = el("textarea", { style: "position:fixed;left:-9999px" });
                area.value = text;
                document.body.append(area);
                area.select();
                document.execCommand("copy");
                area.remove();
            }
            node.textContent = "Copied";
            clearTimeout(timer);
            timer = setTimeout(() => {
                node.textContent = label;
            }, 1100);
        },
    });
    return node;
}

export function pickFile(accept) {
    return new Promise((resolve) => {
        if (window.showOpenFilePicker) {
            window
                .showOpenFilePicker({
                    types: [{ description: "Gaussian Splat", accept: { "application/octet-stream": accept } }],
                })
                .then((handles) =>
                    resolve(handles[0] ? { name: handles[0].name, handle: handles[0] } : null),
                )
                .catch(() => resolve(null));
            return;
        }
        const input = el("input", { type: "file", accept: accept.join(","), style: "display:none" });
        input.addEventListener("change", () => {
            const file = input.files[0];
            resolve(file ? { name: file.name, file } : null);
            input.remove();
        });
        document.body.append(input);
        input.click();
    });
}

export function pickJsonText() {
    return new Promise((resolve) => {
        if (window.showOpenFilePicker) {
            window
                .showOpenFilePicker({ types: [{ description: "JSON", accept: { "application/json": [".json"] } }] })
                .then(async (handles) =>
                    resolve(handles[0] ? await (await handles[0].getFile()).text() : null),
                )
                .catch(() => resolve(null));
            return;
        }
        const input = el("input", { type: "file", accept: ".json,application/json", style: "display:none" });
        input.addEventListener("change", async () => {
            resolve(input.files[0] ? await input.files[0].text() : null);
            input.remove();
        });
        document.body.append(input);
        input.click();
    });
}

export function downloadJson(filename, text) {
    const url = URL.createObjectURL(new Blob([text], { type: "application/json" }));
    el("a", { href: url, download: filename }).click();
    URL.revokeObjectURL(url);
}

export function fatal(message) {
    document.body.append(el("div", { class: "fatal", text: message }));
}
