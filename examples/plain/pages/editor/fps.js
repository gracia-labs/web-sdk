import { el } from "./ui.js";

const SAMPLES = 56;
const CEILING = 50; // ms mapped to a full-height bar, so 20fps fills the graph

/**
 * Frame-time readout drawn to match the panels. Replaces the SDK's Stats widget, which ships
 * its own fixed-position canvas and its own look.
 */
export function createFpsMeter() {
    const fps = el("span", { class: "fps-value", text: "--" });
    const ms = el("span", { class: "fps-ms", text: "--" });
    const canvas = el("canvas", { class: "fps-graph", width: SAMPLES * 4, height: 96 });
    const ctx = canvas.getContext("2d");

    const history = new Array(SAMPLES).fill(0);
    let cursor = 0;
    let sinceLabel = 0;
    let frames = 0;
    let accum = 0;

    const draw = () => {
        const { width, height } = canvas;
        const style = getComputedStyle(canvas);
        const accent = style.getPropertyValue("--accent").trim() || "#5b9cf5";
        const barWidth = width / SAMPLES;

        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < SAMPLES; i++) {
            const value = history[(cursor + i) % SAMPLES];
            if (!value) continue;
            const ratio = Math.min(value / CEILING, 1);
            const barHeight = Math.max(2, ratio * height);
            // Green while frames are cheap, amber past 1/60s, red past 1/30s.
            ctx.fillStyle = value > 33 ? "#ff3b30" : value > 17 ? "#ff9f0a" : accent;
            ctx.globalAlpha = 0.25 + 0.75 * (i / SAMPLES);
            ctx.fillRect(i * barWidth, height - barHeight, barWidth - 1, barHeight);
        }
        ctx.globalAlpha = 1;
    };

    return {
        node: el("div", { class: "fps" }, [
            el("div", { class: "fps-row" }, [
                fps,
                el("span", { class: "fps-unit", text: "fps" }),
                el("span", { class: "grow" }),
                ms,
                el("span", { class: "fps-unit", text: "ms" }),
            ]),
            canvas,
        ]),

        /** @param {number} deltaMs time the last frame took */
        sample(deltaMs) {
            history[cursor] = deltaMs;
            cursor = (cursor + 1) % SAMPLES;
            frames++;
            accum += deltaMs;
            sinceLabel += deltaMs;

            if (sinceLabel >= 400) {
                const mean = accum / frames;
                fps.textContent = String(Math.round(1000 / mean));
                ms.textContent = mean.toFixed(1);
                sinceLabel = 0;
                frames = 0;
                accum = 0;
            }
            draw();
        },
    };
}
