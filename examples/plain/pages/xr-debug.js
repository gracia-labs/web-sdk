import { BoundaryRenderer } from "@gracia/web-sdk/aio";

export const XR_BACKENDS = ["auto", "webgpu", "webgl"];

const FORCED = { outlineOpacity: 1, darkness: 0.5, outlineUrgent: true };
const BINDING_FLAG = "chrome://flags/#webxr-webgpu-binding";
const LAYERS_FLAG = "chrome://flags/#webxr-projection-layers";
const LINKS = [
    { label: "WebXR/WebGPU binding flag: Enabled", url: BINDING_FLAG },
    { label: "WebXR Projection Layers flag: Enabled, then Relaunch", url: LAYERS_FLAG },
    {
        label: "Quest Browser: Experimental Web Platform features too",
        url: "chrome://flags/#enable-experimental-web-platform-features",
    },
    {
        label: "This page, WebGPU XR + forced boundary",
        url: `${location.origin}/?xr=webgpu&boundary=force`,
    },
    { label: "GPU and WebGPU status", url: "chrome://gpu" },
    {
        label: "WebXR + WebGPU support check",
        url: "https://immersive-web.github.io/webxr-samples/webgpu/",
    },
];
const VISIBLE = 0.002;
const MAX_LINES = 300;
const COLLAPSED_KEY = "xr-debug-collapsed";

const CSS = `
.xr-debug { position: fixed; top: 76px; right: 16px; z-index: 60; width: min(380px, calc(100vw - 32px));
    max-height: calc(100vh - 152px); display: flex; flex-direction: column; padding: 8px 10px;
    border: 1px solid rgba(255,255,255,.14); border-radius: 10px; background: rgba(20,22,26,.9);
    color: #e9f2ff; font: 12px/1.35 ui-monospace, Menlo, monospace; backdrop-filter: blur(10px); }
.xr-debug header { display: flex; align-items: center; gap: 8px; }
.xr-debug header b { flex: 1; }
.xr-debug button, .xr-debug select { font: inherit; color: inherit; background: rgba(255,255,255,.08);
    border: 1px solid rgba(255,255,255,.18); border-radius: 6px; padding: 2px 8px; }
.xr-debug.collapsed .body { display: none; }
body:has(.gr-player__camera-panel) .xr-debug { display: none; }
.xr-debug .body { display: flex; flex-direction: column; gap: 6px; margin-top: 6px; min-height: 0; overflow: auto; }
.xr-debug dl { display: grid; grid-template-columns: max-content 1fr; gap: 2px 10px; margin: 0; }
.xr-debug dt { color: rgba(233,242,255,.6); }
.xr-debug dd { margin: 0; }
.xr-debug .yes { color: #4ade80; }
.xr-debug .no { color: #f87171; }
.xr-debug label { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.xr-debug .actions { display: flex; gap: 6px; }
.xr-debug summary { cursor: pointer; color: rgba(233,242,255,.8); }
.xr-debug .link { display: grid; grid-template-columns: 1fr auto; gap: 2px 6px; margin-top: 6px; }
.xr-debug .link span { grid-column: 1 / -1; color: rgba(233,242,255,.6); }
.xr-debug .link input { min-width: 0; font: inherit; color: inherit; background: rgba(0,0,0,.35);
    border: 1px solid rgba(255,255,255,.12); border-radius: 6px; padding: 2px 6px; }
.xr-debug pre { margin: 0; padding: 6px; min-height: 60px; max-height: 24vh; overflow: auto;
    white-space: pre-wrap; word-break: break-word; background: rgba(0,0,0,.35); border-radius: 6px; }
`;

const yesNo = (v) =>
    v == null ? "—" : `<span class="${v ? "yes" : "no"}">${v ? "yes" : "no"}</span>`;
const num = (v) => v.toFixed(2);

/**
 * @param {{ player: any }} mounted the mountGraciaPlayer handle
 * @param {{ xrBackend: string }} options the XR backend the page asked for
 * @returns {{ error: (error: Error, data?: { phase?: string }) => void }}
 */
export function mountXRDebug(mounted, { xrBackend }) {
    const params = new URLSearchParams(location.search);
    let force = params.get("boundary") === "force";

    const style = document.createElement("style");
    style.textContent = CSS;
    const root = document.createElement("div");
    root.className = "xr-debug";
    root.classList.toggle("collapsed", localStorage.getItem(COLLAPSED_KEY) === "1");
    root.innerHTML = `
        <header><b>XR debug</b><button data-act="toggle"></button></header>
        <div class="body">
            <dl></dl>
            <label>XR backend (reloads)
                <select data-ctl="xr">${XR_BACKENDS.map((b) => `<option>${b}</option>`).join("")}</select></label>
            <label>Force boundary (red outline + dark 50%)
                <input type="checkbox" data-ctl="boundary"></label>
            <details><summary>Links</summary>${LINKS.map(
                (l) =>
                    `<div class="link"><span>${l.label}</span><input readonly><button>Copy</button></div>`,
            ).join("")}</details>
            <div class="actions"><button data-act="copy">Copy log</button><button data-act="clear">Clear log</button></div>
            <pre></pre>
        </div>`;
    document.head.append(style);
    document.body.append(root);

    const rows = root.querySelector("dl");
    const logEl = root.querySelector("pre");
    const toggle = root.querySelector('[data-act="toggle"]');
    const xrSelect = root.querySelector('[data-ctl="xr"]');
    const forceBox = root.querySelector('[data-ctl="boundary"]');
    xrSelect.value = xrBackend;
    forceBox.checked = force;

    const entries = [];
    const logText = () =>
        entries.map((e) => `${e.time} ${e.text}${e.count > 1 ? ` ×${e.count}` : ""}`).join("\n");
    const log = (text) => {
        const last = entries.at(-1);
        if (last?.text === text) last.count++;
        else entries.push({ time: new Date().toTimeString().slice(0, 8), text, count: 1 });
        if (entries.length > MAX_LINES) entries.shift();
        logEl.textContent = logText();
        logEl.scrollTop = logEl.scrollHeight;
    };

    const syncToggle = () => {
        toggle.textContent = root.classList.contains("collapsed") ? "show" : "hide";
    };
    syncToggle();
    toggle.onclick = () => {
        root.classList.toggle("collapsed");
        localStorage.setItem(COLLAPSED_KEY, root.classList.contains("collapsed") ? "1" : "0");
        syncToggle();
    };
    xrSelect.onchange = () => {
        const next = new URLSearchParams(location.search);
        next.set("xr", xrSelect.value);
        location.search = next.toString();
    };
    forceBox.onchange = () => {
        force = forceBox.checked;
        const next = new URLSearchParams(location.search);
        if (force) next.set("boundary", "force");
        else next.delete("boundary");
        history.replaceState(null, "", next.size ? `?${next}` : location.pathname);
        log(`Boundary forced: ${force ? "on" : "off"}`);
    };
    const copy = async (text, button, input = null) => {
        let copied = false;
        try {
            await navigator.clipboard.writeText(text);
            copied = true;
        } catch {
            if (input) {
                input.focus();
                input.select();
                copied = document.execCommand("copy");
            }
        }
        button.dataset.label ??= button.textContent;
        button.textContent = copied ? "Copied" : input ? "Selected" : "Failed";
        setTimeout(() => (button.textContent = button.dataset.label), 1500);
        return copied;
    };
    root.querySelectorAll(".link").forEach((row, i) => {
        const input = row.querySelector("input");
        input.value = LINKS[i].url;
        input.onfocus = () => input.select();
        row.querySelector("button").onclick = () =>
            copy(input.value, row.querySelector("button"), input);
    });
    root.querySelector('[data-act="copy"]').onclick = (e) => copy(logText(), e.currentTarget);
    root.querySelector('[data-act="clear"]').onclick = () => {
        entries.length = 0;
        logEl.textContent = "";
    };

    for (const level of ["error", "warn"]) {
        const original = console[level];
        console[level] = (...args) => {
            original.apply(console, args);
            log(`console.${level}: ${args.map((a) => a?.message ?? String(a)).join(" ")}`);
        };
    }
    addEventListener("error", (e) => log(`error: ${e.message}`));
    addEventListener("unhandledrejection", (e) =>
        log(`unhandled rejection: ${e.reason?.message ?? e.reason}`),
    );

    const boundary = watchBoundary(log, () => (force ? FORCED : null));
    watchSessions(log);
    const hasBinding = "XRGPUBinding" in globalThis;
    root.querySelector("details").open = !hasBinding;

    const ua = navigator.userAgent;
    const browser = ua.match(
        /OculusBrowser\/[\d.]*\d|PicoBrowser\/[\d.]*\d|Chrome\/[\d.]*\d|Version\/[\d.]*\d Safari/,
    );
    log(`Browser: ${browser?.[0] ?? ua}`);
    log(
        `WebGPU: ${navigator.gpu ? "yes" : "no"}, XRGPUBinding: ${"XRGPUBinding" in globalThis ? "yes" : "no"}`,
    );
    log(`XR backend requested: ${xrBackend}`);
    if (!hasBinding)
        log(
            `No XRGPUBinding: WebGPU XR needs ${BINDING_FLAG} and ${LAYERS_FLAG} enabled, then a browser relaunch`,
        );
    if (force) log("Boundary forced: on");

    const nextBackend = (app) =>
        xrBackend === "webgpu" && !hasBinding
            ? "none (needs XRGPUBinding)"
            : (app?.xrBackend ?? "—");

    let lastMode = null;
    let appSeen = false;
    const refresh = () => {
        const gracia = mounted.player?.gracia;
        const app = gracia?.app;
        const xr = app?.xr;
        const mode = app?.mode ?? null;
        const session = xr?.api ?? null;

        if (app && !appSeen) {
            appSeen = true;
            log(
                `Player ready: VR ${gracia.xr?.vrSupported ? "yes" : "no"}, AR ${gracia.xr?.arSupported ? "yes" : "no"}, next XR session: ${nextBackend(app)}`,
            );
        }
        if (mode && mode !== lastMode) {
            const info = session
                ? ` (${session}${xr.layeredActive ? ", layered" : ""}${xr.aswActive ? ", ASW" : ""})`
                : "";
            log(`Mode: ${lastMode ?? "—"} → ${mode}${info}`);
            lastMode = mode;
        }

        const b = boundary.state;
        rows.innerHTML = [
            ["WebGPU", yesNo(!!navigator.gpu)],
            ["XRGPUBinding", hasBinding ? yesNo(true) : `${yesNo(false)} (flags in Links)`],
            ["VR / AR", `${yesNo(gracia?.xr?.vrSupported)} / ${yesNo(gracia?.xr?.arSupported)}`],
            [
                "XR backend",
                `asked ${xrBackend} → ${session ? `session ${session}` : `next ${nextBackend(app)}`}`,
            ],
            [
                "Mode",
                mode
                    ? `${mode}${session && xr.layeredActive ? " · layered" : ""}${session && xr.aswActive ? " · ASW" : ""}`
                    : "—",
            ],
            ["Boundary path", b.path],
            ["Scene bounds", yesNo(b.active)],
            [
                "Boundary now",
                `outline ${num(b.outline)} · dark ${num(b.darkness)}${b.urgent ? " · red" : ""}`,
            ],
            ["Boundary max", `outline ${num(b.maxOutline)} · dark ${num(b.maxDarkness)}`],
            ["Drawn", `WebGPU ${b.gpuFrames} frames · WebGL ${b.glPasses} eye passes`],
        ]
            .map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`)
            .join("");
    };
    refresh();
    setInterval(refresh, 250);

    return {
        error: (error, data) =>
            log(
                `Player error${data?.phase ? ` (${data.phase})` : ""}: ${error?.name ?? "Error"}: ${error?.message ?? error}`,
            ),
    };
}

function watchSessions(log) {
    const xr = navigator.xr;
    if (!xr) return;
    const request = xr.requestSession.bind(xr);
    const list = (features) => [...(features ?? [])].filter(Boolean).join(", ") || "—";
    xr.requestSession = async (mode, init = {}) => {
        log(
            `requestSession ${mode}: required [${list(init.requiredFeatures)}], optional [${list(init.optionalFeatures)}]`,
        );
        try {
            const session = await request(mode, init);
            log(`Session granted: [${list(session.enabledFeatures)}]`);
            return session;
        } catch (e) {
            log(`requestSession failed: ${e?.name}: ${e?.message}`);
            throw e;
        }
    };
}

function watchBoundary(log, forced) {
    const state = {
        path: "—",
        active: null,
        outline: 0,
        darkness: 0,
        urgent: false,
        maxOutline: 0,
        maxDarkness: 0,
        visible: false,
        gpuFrames: 0,
        glPasses: 0,
    };
    const drawnBy = new Set();
    const proto = BoundaryRenderer.prototype;
    const { init, sync, renderEye, renderViews } = proto;

    proto.init = function (gl, gpu = null) {
        Object.assign(state, {
            path: gpu ? `webgpu (${gpu.format})` : "webgl",
            maxOutline: 0,
            maxDarkness: 0,
            gpuFrames: 0,
            glPasses: 0,
        });
        drawnBy.clear();
        log(`Boundary renderer init: ${state.path}`);
        if (gpu && !renderViews)
            log(
                "This SDK build has no BoundaryRenderer.renderViews: no boundary in WebGPU sessions",
            );
        return init.call(this, gl, gpu);
    };

    proto.sync = function (boundary) {
        const f = forced();
        const shown = f
            ? { ...f, active: boundary.active, ribbon: (w) => boundary.ribbon(w) }
            : boundary;
        state.active = boundary.active;
        state.outline = shown.outlineOpacity;
        state.darkness = shown.darkness;
        state.urgent = shown.outlineUrgent;
        state.maxOutline = Math.max(state.maxOutline, state.outline);
        state.maxDarkness = Math.max(state.maxDarkness, state.darkness);
        state.visible = state.outline > VISIBLE || state.darkness > VISIBLE;
        return sync.call(this, shown);
    };

    const drawn = (path) => {
        if (drawnBy.has(path)) return;
        drawnBy.add(path);
        log(`Boundary drawn through ${path}`);
    };

    proto.renderEye = function (...args) {
        if (state.visible) {
            state.glPasses++;
            drawn("WebGL");
        }
        return renderEye.apply(this, args);
    };

    if (renderViews)
        proto.renderViews = function (eyes) {
            if (state.visible) {
                state.gpuFrames++;
                drawn("WebGPU");
            }
            return renderViews.call(this, eyes);
        };

    return { state };
}
