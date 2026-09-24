import { createFpsMeter } from "./fps.js";
import { History } from "./history.js";
import { readAny, serializeBounds, serializeDoc, serializeTrs } from "./metadata.js";
import { mountTimeline } from "./timeline.js";
import {
    button,
    copyButton,
    downloadJson,
    el,
    fatal,
    pickFile,
    pickJsonText,
    groupLabel,
    section,
    segmented,
    show,
    slider,
    tag,
    toggle,
} from "./ui.js";
import { Viewer } from "./viewer.js";

const left = document.getElementById("colLeft");
const right = document.getElementById("colRight");

let viewer;
try {
    viewer = await Viewer.create();
} catch (error) {
    console.error("[editor]", error);
    fatal(error instanceof Error ? error.message : String(error));
    throw error;
}

const history = new History(viewer.toDoc());
let restoring = false;

/* ── Left column: everything that becomes metadata ── */

const undo = button("\u21B6  Undo", { title: "Cmd+Z", onClick: () => travel(history.undo()) });
const redo = button("\u21B7  Redo", { title: "Shift+Cmd+Z", onClick: () => travel(history.redo()) });
const toolbar = el("div", { class: "card toolbar" }, [undo, redo]);
left.append(toolbar);

const videoTag = tag("video", "No video");
const envTag = tag("env", "No environment");
const clearVideo = button("Clear", { onClick: () => commit(() => viewer.clearVideo()) });
const clearEnv = button("Clear", { onClick: () => commit(() => viewer.clearEnvironment()) });

left.append(
    section("Content", {
        hint: "<b>Video</b> is the dynamic .mint scene, <b>environment</b> a static .sog. Moving the video keeps the environment where it is in the world.",
        children: [
            el("div", { class: "row" }, [
                videoTag,
                button("Open", {
                    onClick: async () => {
                        const source = await pickFile([".mint"]);
                        if (source) commit(() => viewer.openVideo(source));
                    },
                }),
                clearVideo,
            ]),
            el("div", { class: "row" }, [
                envTag,
                button("Open", {
                    onClick: async () => {
                        const source = await pickFile([".sog"]);
                        if (!source) return;
                        await viewer.openEnvironment(source);
                        viewer.emit("commit");
                    },
                }),
                clearEnv,
            ]),
        ],
    }),
);

const boundsTypes = segmented(
    [
        { value: "box", label: "Box" },
        { value: "sphere", label: "Sphere" },
        { value: "sector", label: "Sector" },
    ],
    null,
    (value) => viewer.setBoundsType(value),
);

const angle = slider({
    min: 1,
    max: 360,
    step: 1,
    value: 90,
    digits: 0,
    onInput: (value) => viewer.setSectorAngle(value),
    onCommit: () => viewer.emit("commit"),
});
const angleRow = el("div", { class: "row" }, [el("span", { class: "lbl w", text: "Angle" }), angle]);
const removeRow = el("div", { class: "row" }, [
    button("Remove boundary", { onClick: () => commit(() => viewer.removeBounds()) }),
]);

left.append(
    section("Boundary", {
        hint: "The volume a viewer is expected to stay inside, placed around the <b>Viewer</b>. Moving the video does not move it. A <b>sector</b> is a slice of a cylinder, so its X and Z size stay linked.",
        children: [boundsTypes, angleRow, removeRow],
    }),
);

const targets = segmented(
    [
        { value: "video", label: "Video" },
        { value: "environment", label: "Environment" },
        { value: "bounds", label: "Bounds" },
    ],
    "video",
    (value) => viewer.setGizmoTarget(value),
);

const modes = segmented(
    [
        { value: "translate", label: "Move", title: "W" },
        { value: "rotate", label: "Rotate", title: "E" },
    ],
    "translate",
    (value) => viewer.setGizmoMode(value),
);

const scale = slider({
    min: 0.05,
    max: 10,
    step: 0.01,
    value: 1,
    onInput: (value) => viewer.setOverallScale(value),
    onCommit: () => viewer.emit("commit"),
});

const transformCard = section("Transform", {
    hint: "Drag the gizmo to place things — <b>W</b> to move, <b>E</b> to rotate. The slider resizes the whole thing, keeping its proportions.",
    children: [
        targets,
        modes,
        el("div", { class: "row" }, [el("span", { class: "lbl w", text: "Scale" }), scale]),
    ],
});
left.append(transformCard);

// `controls` and `background` are both exported scene metadata, so they belong on this side
// even though the camera also happens to be how you look around.
const CAMERA_HINTS = {
    orbit: "<b>Left-drag</b> rotate · <b>right-drag</b> pan · <b>scroll</b> zoom",
    trackball: "<b>Left-drag</b> rotate freely · <b>right-drag</b> pan · <b>scroll</b> zoom",
    fly: "<b>W/S</b> forward · <b>A/D</b> strafe · <b>R/F</b> up and down · <b>Q/E</b> roll · <b>drag</b> to look",
};

const bgInput = el("input", { type: "color", class: "swatch", value: viewer.background });
bgInput.addEventListener("input", () => viewer.setBackground(bgInput.value));
bgInput.addEventListener("change", () => viewer.emit("commit"));

const cameras = segmented(
    [
        { value: "orbit", label: "Orbit" },
        { value: "trackball", label: "Trackball" },
        { value: "fly", label: "Fly" },
    ],
    "orbit",
    (value) => {
        viewer.setControls(value);
        sceneCard.setHint(CAMERA_HINTS[value]);
    },
);

const sceneCard = section("Surroundings", {
    hint: CAMERA_HINTS.orbit,
    children: [
        cameras,
        el("div", { class: "row" }, [
            el("span", { class: "lbl", text: "Background" }),
            bgInput,
            el("span", { class: "grow" }),
            button("Reset view", { onClick: () => viewer.resetCamera() }),
        ]),
    ],
});
left.append(sceneCard);

const copyBounds = copyButton(
    "Bounds",
    () => JSON.stringify(serializeBounds(viewer.getBounds()), null, 2),
    { title: "Copy the bounds object for the admin's Bounds field" },
);
const copySpawn = copyButton(
    "Initial spawn",
    () => JSON.stringify(serializeTrs(viewer.getTrs("video")), null, 2),
    { title: "Copy the transform for the admin's Initial Spawn field" },
);

// Hidden wholesale when neither value exists, so no orphan heading is left behind.
const copyGroup = el("div", { class: "stack" }, [
    groupLabel("Copy for the admin"),
    el("div", { class: "row" }, [copyBounds, copySpawn]),
]);

const json = el("textarea", { class: "json", spellcheck: "false" });
const jsonError = el("div", { class: "err" });
let dirty = false;

const applyBtn = button("Apply", {
    title: "Apply the edited JSON to the scene",
    onClick: () => applyJson(json.value),
});
const revertBtn = button("Revert", {
    title: "Discard edits and show the scene's current values",
    onClick: () => {
        setDirty(false);
        sync();
    },
});

function setDirty(next) {
    dirty = next;
    show(applyBtn, next);
    show(revertBtn, next);
    if (!next) {
        json.classList.remove("bad");
        jsonError.textContent = "";
    }
}

json.addEventListener("input", () => setDirty(true));

function applyJson(text) {
    try {
        viewer.applyDoc(readAny(JSON.parse(text)));
        setDirty(false);
        viewer.emit("commit");
    } catch (error) {
        json.classList.add("bad");
        jsonError.textContent = error instanceof Error ? error.message : String(error);
    }
}

left.append(
    section("Metadata", {
        hint: "The two <b>copy</b> buttons give the bare objects the content admin's Bounds and Initial Spawn fields expect. The JSON below is the whole scene — edit it and press Apply, or paste in anything copied out of the admin.",
        children: [
            copyGroup,

            groupLabel("Whole scene as JSON"),
            json,
            jsonError,
            el("div", { class: "row" }, [
                applyBtn,
                revertBtn,
                el("span", { class: "grow" }),
                copyButton("Copy", () => json.value, { title: "Copy the whole scene JSON" }),
            ]),

            groupLabel("File"),
            el("div", { class: "row" }, [
                button("Load\u2026", {
                    title: "Replace the scene from a JSON file",
                    onClick: async () => {
                        const text = await pickJsonText();
                        if (text !== null) applyJson(text);
                    },
                }),
                button("Save\u2026", {
                    title: "Download the whole scene JSON",
                    onClick: () => downloadJson("scene-metadata.json", json.value),
                }),
            ]),
        ],
    }),
);

/* ── Right column: view state that never leaves the editor ── */

const SHOW = [
    ["grid", "Grid"],
    ["axes", "Axes"],
    ["human", "Human"],
    ["viewer", "Viewer"],
];

right.append(
    section("Show", {
        hint: "Reference objects drawn only in the editor. None of this is exported.",
        children: [
            el(
                "div",
                { class: "grid2" },
                SHOW.map(([key, label]) => toggle(label, true, (on) => viewer.setRefVisible(key, on))),
            ),
        ],
    }),
);

const fpsMeter = createFpsMeter();
right.append(section("Performance", { children: [fpsMeter.node] }));

/* ── Sync: panels read state back off the viewer ── */

function sync() {
    const { video, environment } = viewer.content;
    videoTag.set(video ?? "No video", !!video);
    envTag.set(environment ?? "No environment", !!environment);
    show(clearVideo, !!video);
    show(clearEnv, !!environment);

    const canTransform = viewer.availableTargets;
    show(transformCard, canTransform.length > 0);
    targets.setHidden("video", !video);
    targets.setHidden("environment", !environment);
    targets.select(viewer.gizmoTarget);
    modes.select(viewer.gizmoMode);
    scale.set(viewer.overallScale);

    const bounds = viewer.getBounds();
    boundsTypes.select(bounds?.type ?? null);
    targets.setHidden("bounds", !bounds);
    show(angleRow, bounds?.type === "sector");
    if (bounds?.type === "sector") angle.set(bounds.angleDeg ?? 90);
    show(removeRow, !!bounds);
    show(copyBounds, !!bounds);
    show(copySpawn, !!video);
    show(copyGroup, !!bounds || !!video);

    bgInput.value = viewer.background;
    cameras.select(viewer.controlsType);

    if (!dirty) json.value = JSON.stringify(serializeDoc(viewer.toDoc()), null, 2);
}

/** Runs an edit and records one history step for it. */
function commit(action) {
    action();
    viewer.emit("commit");
}

function travel(doc) {
    if (!doc) return;
    restoring = true;
    viewer.applyDoc(doc);
    restoring = false;
    sync();
    syncHistoryButtons();
}

function syncHistoryButtons() {
    show(undo, history.canUndo);
    show(redo, history.canRedo);
    // An empty toolbar is worse than no toolbar, so it appears with the first edit.
    show(toolbar, history.canUndo || history.canRedo);
}

for (const event of ["transform", "bounds", "content"]) viewer.on(event, sync);
viewer.on("commit", () => {
    if (!restoring) history.push(viewer.toDoc());
    sync();
    syncHistoryButtons();
});

addEventListener("keydown", (e) => {
    const node = e.target;
    if (node && (node.tagName === "INPUT" || node.tagName === "TEXTAREA")) return;

    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        travel(e.shiftKey ? history.redo() : history.undo());
        return;
    }
    // Fly controls own WASD, so mode shortcuts would fight them.
    if (e.metaKey || e.ctrlKey || e.altKey || viewer.controlsType === "fly") return;
    const mode = { w: "translate", e: "rotate" }[e.key.toLowerCase()];
    if (mode) viewer.setGizmoMode(mode);
});

const tickTimeline = mountTimeline(document.getElementById("timeline"), viewer);
setInterval(tickTimeline, 1000 / 30);

sync();
syncHistoryButtons();
viewer.start((deltaMs) => fpsMeter.sample(deltaMs));
