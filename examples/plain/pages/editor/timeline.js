import { clamp, el } from "./ui.js";

const fmt = (t) =>
    !Number.isFinite(t) || t < 0 ? "0:00" : `${~~(t / 60)}:${String(~~t % 60).padStart(2, "0")}`;

const ICON = { play: "▶", pause: "⏸", spin: "⟳" };

/** Scrub bar for the dynamic scene. Returns a `tick` to call each frame. */
export function mountTimeline(host, viewer) {
    const fill = el("div", { class: "fill" });
    const thumb = el("div", { class: "thumb" });
    const track = el("div", { class: "track" }, [fill, thumb]);
    const time = el("span", { class: "time" });
    const play = el("button", { class: "play", type: "button", "aria-label": "Play or pause" });

    host.append(el("div", { class: "card bar" }, [play, track, time]));

    let dragging = false;
    let icon = "";

    const setIcon = (next) => {
        if (next === icon) return;
        icon = next;
        const size = next === "play" ? 13 : 11;
        const nudge = next === "play" ? ";margin-left:2px" : "";
        play.innerHTML = `<span class="${next === "spin" ? "spin" : ""}" style="font-size:${size}px${nudge}">${ICON[next]}</span>`;
    };
    setIcon("play");

    const at = (clientX) => {
        const rect = track.getBoundingClientRect();
        return clamp((clientX - rect.left) / rect.width);
    };
    const show = (pct) => {
        fill.style.width = thumb.style.left = `${pct * 100}%`;
    };
    const scrub = (clientX) => {
        const pct = at(clientX);
        show(pct);
        viewer.seek(pct * viewer.playback.duration);
    };

    play.addEventListener("click", () => viewer.togglePlay());
    track.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        dragging = true;
        track.setPointerCapture(e.pointerId);
        scrub(e.clientX);
    });
    track.addEventListener("pointermove", (e) => dragging && scrub(e.clientX));
    track.addEventListener("pointerup", (e) => {
        dragging = false;
        track.releasePointerCapture(e.pointerId);
    });
    track.addEventListener("pointercancel", () => {
        dragging = false;
    });

    return () => {
        const { hasVideo, isPlaying, isBuffering, currentTime, duration } = viewer.playback;
        host.classList.toggle("on", hasVideo);
        if (!hasVideo) return;
        setIcon(isBuffering ? "spin" : isPlaying ? "pause" : "play");
        if (!dragging && duration > 0) show(clamp(currentTime / duration));
        time.textContent = `${fmt(currentTime)} / ${fmt(duration)}`;
    };
}
