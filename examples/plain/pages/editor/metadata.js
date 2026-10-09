import { isValidBounds, SECTOR_TILT_MAX } from "@gracia/web-sdk/aio";

/**
 * Scene metadata as the player and the content admin exchange it.
 *
 * The admin (braindance ManageContent) keeps two textareas holding *bare* JSON objects —
 * `boundsStringified` and `initialSpawnStringified` — and parses them with no unwrapping. So the
 * copy payloads here are bare objects, and paste accepts a bare object coming back.
 */

const isNum = (n) => typeof n === "number" && Number.isFinite(n);

function readVec3(v) {
    if (Array.isArray(v) && v.length >= 3 && v.slice(0, 3).every(isNum)) {
        return { x: v[0], y: v[1], z: v[2] };
    }
    if (!v || typeof v !== "object") return null;
    return isNum(v.x) && isNum(v.y) && isNum(v.z) ? { x: v.x, y: v.y, z: v.z } : null;
}

function readQuat(v) {
    if (Array.isArray(v) && v.length === 4 && v.every(isNum)) {
        return { x: v[0], y: v[1], z: v[2], w: v[3] };
    }
    if (!v || typeof v !== "object") return null;
    return isNum(v.x) && isNum(v.y) && isNum(v.z) && isNum(v.w)
        ? { x: v.x, y: v.y, z: v.z, w: v.w }
        : null;
}

export const IDENTITY_TRS = {
    translation: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0, w: 1 },
    scale: { x: 1, y: 1, z: 1 },
};

/** A transform in the `{translation, rotation, scale}` shape the admin's Initial Spawn uses. */
export function readTrs(raw) {
    if (!raw || typeof raw !== "object") return null;
    const translation = readVec3(raw.translation ?? raw.position);
    const rotation = readQuat(raw.rotation);
    const scale = readVec3(raw.scale);
    if (!translation && !rotation && !scale) return null;
    return {
        translation: translation ?? IDENTITY_TRS.translation,
        rotation: rotation ?? IDENTITY_TRS.rotation,
        scale: scale ?? IDENTITY_TRS.scale,
    };
}

/**
 * Bounds per docs/scene-boundary.md. Anything incomplete, non-finite or non-positively scaled
 * is "no boundary" rather than an error, matching how the player treats it.
 */
export function readBounds(raw) {
    if (!raw || typeof raw !== "object" || !BOUNDS_TYPES.includes(raw.type)) return null;

    const bounds = {
        type: raw.type,
        position: readVec3(raw.position),
        rotation: readQuat(raw.rotation),
        scale: readVec3(raw.scale),
    };
    if (raw.type === "sector") {
        bounds.angleDeg = Math.min(360, Math.max(1, Math.abs(isNum(raw.angleDeg) ? raw.angleDeg : 90)));
        bounds.tiltDeg = Math.min(
            SECTOR_TILT_MAX,
            Math.max(-SECTOR_TILT_MAX, isNum(raw.tiltDeg) ? raw.tiltDeg : 0),
        );
    }
    if (raw.type === "polygon") bounds.layers = raw.layers;
    return isValidBounds(bounds) ? bounds : null;
}

const CONTROLS = ["orbit", "trackball", "fly"];
const BOUNDS_TYPES = ["box", "sphere", "sector", "polygon"];

const isBoundsShape = (v) => !!v && typeof v === "object" && BOUNDS_TYPES.includes(v.type);

function sceneOf(raw) {
    const data = (Array.isArray(raw.sources) ? raw.sources[0] : null) ?? raw.metadata ?? raw;
    if (!data || typeof data !== "object") throw new Error("Expected a JSON object");
    return data;
}

function partsOf(data) {
    const found = {};
    if (typeof data.background === "string") found.background = data.background;
    else if (typeof data.backgroundColor === "string") found.background = data.backgroundColor;
    if (CONTROLS.includes(data.controls)) found.controls = data.controls;

    const initial = readTrs(data.initialTransform ?? data.initialSpawn ?? data.videoTransform);
    if (initial) found.initialTransform = initial;

    const environment = readTrs(data.staticTransform ?? data.environmentTransform);
    if (environment) found.staticTransform = environment;

    if ("bounds" in data) found.bounds = readBounds(data.bounds);
    return found;
}

/**
 * Accepts every shape the editor might be handed: a bare bounds object or bare transform copied
 * out of the admin, a full editor document, a `{sources:[…]}` playlist, or streaming metadata.
 * Returns only the parts that were recognised, so a paste never clears unrelated state.
 */
export function readAny(raw) {
    if (!raw || typeof raw !== "object") throw new Error("Expected a JSON object");

    const bare = readBounds(raw);
    if (bare) return { bounds: bare };

    const data = sceneOf(raw);
    const found = partsOf(data);

    // A lone transform pasted from the admin's Initial Spawn field.
    if (!Object.keys(found).length) {
        const trs = readTrs(data);
        if (!trs) throw new Error("No bounds, transform or metadata found");
        found.initialTransform = trs;
    }
    return found;
}

export const PARTS = {
    initialTransform: "initial spawn",
    staticTransform: "environment transform",
    bounds: "bounds",
};

export function readPart(text, part) {
    const name = PARTS[part];
    const trimmed = text.trim();
    if (!trimmed) throw new Error("The clipboard is empty");

    let raw;
    try {
        raw = JSON.parse(trimmed);
    } catch {
        throw new Error("The clipboard does not hold JSON");
    }
    if (!raw || typeof raw !== "object") throw new Error(`No ${name} in the clipboard`);

    const data = sceneOf(raw);

    if (part === "bounds") {
        const candidate = "bounds" in data ? data.bounds : isBoundsShape(data) ? data : undefined;
        if (candidate === undefined) throw new Error("No bounds in the clipboard");
        if (candidate === null) throw new Error("The copied scene has no bounds");
        const bounds = readBounds(candidate);
        if (!bounds) throw new Error("The bounds in the clipboard are incomplete or invalid");
        return bounds;
    }

    if (isBoundsShape(data)) throw new Error(`The clipboard holds bounds, not ${name}`);
    const found = partsOf(data);
    if (found[part]) return found[part];
    if (!Object.keys(found).length) {
        const trs = readTrs(data);
        if (trs) return trs;
    }
    throw new Error(`No ${name} in the clipboard`);
}

const round = (n) => Math.round(n * 1e6) / 1e6;
const vec3 = (v) => ({ x: round(v.x), y: round(v.y), z: round(v.z) });
const quat = (q) => ({ x: round(q.x), y: round(q.y), z: round(q.z), w: round(q.w) });
const layers = (rings) => rings.map((ring) => ring.map(vec3));

export function serializeBounds(bounds) {
    if (!bounds) return null;
    const out = {
        type: bounds.type,
        position: vec3(bounds.position),
        rotation: quat(bounds.rotation),
        scale: vec3(bounds.scale),
    };
    if (bounds.type === "sector") {
        out.angleDeg = Math.round(bounds.angleDeg ?? 90);
        if (bounds.tiltDeg) out.tiltDeg = Math.round(bounds.tiltDeg);
    }
    if (bounds.type === "polygon") out.layers = layers(bounds.layers);
    return out;
}

export function serializeTrs(trs) {
    return { translation: vec3(trs.translation), rotation: quat(trs.rotation), scale: vec3(trs.scale) };
}

export function serializeDoc(doc) {
    return {
        background: doc.background,
        controls: doc.controls,
        initialTransform: serializeTrs(doc.initialTransform),
        staticTransform: serializeTrs(doc.staticTransform),
        bounds: serializeBounds(doc.bounds),
    };
}

const TRAPEZOID = [
    { x: -0.15, z: -0.5 },
    { x: 0.15, z: -0.5 },
    { x: 0.5, z: 0.5 },
    { x: -0.5, z: 0.5 },
];

export const prism = (corners, heights = [-0.5, 0.5]) =>
    heights.map((y) => corners.map((c) => ({ x: c.x, y, z: c.z })));

export function defaultBounds(type) {
    if (type === "polygon") {
        return {
            type,
            position: { x: 0, y: 1.2, z: 0.5 },
            rotation: { x: 0, y: 0, z: 0, w: 1 },
            scale: { x: 4, y: 2.4, z: 3 },
            layers: prism(TRAPEZOID),
        };
    }
    const sector = type === "sector";
    const radial = sector ? 4 : 2;
    const bounds = {
        type,
        // A sector's apex sits in front of the Viewer, where they look, and opens back toward them.
        position: { x: 0, y: 1.2, z: sector ? -1 : 0 },
        rotation: { x: 0, y: 0, z: 0, w: 1 },
        scale: { x: radial, y: type === "sphere" ? radial : 2.4, z: radial },
    };
    if (sector) {
        bounds.angleDeg = 90;
        bounds.tiltDeg = 0;
    }
    return bounds;
}
