import {
    POLYGON_MAX_CORNERS,
    POLYGON_MAX_LAYERS,
    SECTOR_TILT_MAX,
    sectorApexShift,
    THREE,
} from "@gracia/web-sdk/aio";

const MIN_SIZE = 0.1;
const STEP = 0.01;
const DEG = 180 / Math.PI;
const SCREEN_SIZE = 0.011;
const DRAG_SLOP = 3;
const HOVER_SCALE = 1.35;
const EDGE_PICK = 5;
const EDGE_END = 0.08;
const FACE_COLOR = 0x7ad7ff;
const HOVER_OPACITY = 0.14;
const PICKED_OPACITY = 0.32;
const GRAZING = 0.08;
const RIM = 1.35;
const PICKED_RIM = 1.8;
const TIP_OFFSET = 16;

const STYLES = {
    corner: { color: 0xff8a2b, size: 1, opacity: 1 },
    top: { color: 0xffffff, size: 0.85, opacity: 1 },
    ring: { color: 0xffc08a, size: 0.85, opacity: 1 },
    ghost: { color: 0xffffff, size: 0.75, opacity: 0.45 },
    size: { color: 0x7ad7ff, size: 0.9, opacity: 1 },
};

const snap = (v, step = STEP) => Math.round(v / step) * step;
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const xyz = (v) => ({ x: v.x, y: v.y, z: v.z });
const metres = (v) => `${v.toFixed(2)} m`;
const halfOf = (b) => [b.scale.x / 2, b.scale.y / 2, b.scale.z / 2];

class Frame {
    constructor(b) {
        this.position = new THREE.Vector3(b.position.x, b.position.y, b.position.z);
        this.rotation = new THREE.Quaternion(
            b.rotation.x,
            b.rotation.y,
            b.rotation.z,
            b.rotation.w,
        );
        this.inverse = this.rotation.clone().invert();
    }

    toWorld(local) {
        return local.clone().applyQuaternion(this.rotation).add(this.position);
    }

    toLocal(world) {
        return world.clone().sub(this.position).applyQuaternion(this.inverse);
    }

    rayToLocal(ray) {
        return new THREE.Ray(
            ray.origin.clone().sub(this.position).applyQuaternion(this.inverse),
            ray.direction.clone().applyQuaternion(this.inverse),
        );
    }
}

function onLevel(ray, y) {
    if (Math.abs(ray.direction.y) < GRAZING) return null;
    const t = (y - ray.origin.y) / ray.direction.y;
    return t > 0 ? ray.at(t, new THREE.Vector3()) : null;
}

function onUpright(ray, through) {
    const normal = new THREE.Vector3(ray.direction.x, 0, ray.direction.z);
    if (normal.lengthSq() < 1e-8) return null;
    normal.normalize();
    const t = through.clone().sub(ray.origin).dot(normal) / ray.direction.dot(normal);
    return t > 0 ? ray.at(t, new THREE.Vector3()) : null;
}

function moveFace(b, axis, sign, at) {
    const fixed = (-sign * b.scale[axis]) / 2;
    const size = Math.max(MIN_SIZE, snap(sign * (at - fixed)));
    const offset = new THREE.Vector3();
    offset[axis] = fixed + (sign * size) / 2;
    return {
        ...b,
        position: xyz(new Frame(b).toWorld(offset)),
        scale: { ...b.scale, [axis]: size },
    };
}

const heightHandle = (b, at) => ({
    id: "height",
    kind: "size",
    at,
    plane: "upright",
    label: () => `Height ${metres(b.scale.y)}`,
    drag: (q) => moveFace(b, "y", 1, q.y),
});

function boxHandles(b) {
    const [hx, hy, hz] = halfOf(b);
    const faces = [
        ["x", 1, hx, "Width"],
        ["x", -1, hx, "Width"],
        ["z", 1, hz, "Depth"],
        ["z", -1, hz, "Depth"],
    ];
    return [
        ...faces.map(([axis, sign, h, name]) => ({
            id: `face:${axis}${sign}`,
            kind: "size",
            at: new THREE.Vector3(axis === "x" ? sign * h : 0, 0, axis === "z" ? sign * h : 0),
            plane: 0,
            label: () => `${name} ${metres(b.scale[axis])}`,
            drag: (q) => moveFace(b, axis, sign, q[axis]),
        })),
        heightHandle(b, new THREE.Vector3(0, hy, 0)),
    ];
}

function sphereHandles(b) {
    const r = b.scale.x / 2;
    return [
        {
            id: "radius",
            kind: "size",
            at: new THREE.Vector3(r, 0, 0),
            plane: 0,
            label: () => `Diameter ${metres(b.scale.x)}`,
            drag: (q) => {
                const size = Math.max(MIN_SIZE, snap(2 * Math.hypot(q.x, q.z)));
                return { ...b, scale: { x: size, y: size, z: size } };
            },
        },
    ];
}

function sectorHandles(b) {
    const half = halfOf(b);
    const [, hy] = half;
    const r = Math.min(half[0], half[2]);
    const angle = b.angleDeg ?? 90;
    const theta = (angle * Math.PI) / 360;
    const shift = sectorApexShift(b, half);
    const reach = [
        sectorApexShift({ ...b, tiltDeg: -SECTOR_TILT_MAX }, half),
        sectorApexShift({ ...b, tiltDeg: SECTOR_TILT_MAX }, half),
    ];
    const handles = [
        {
            id: "radius",
            kind: "size",
            at: new THREE.Vector3(0, -hy, r),
            plane: -hy,
            label: () => `Radius ${metres(r)}`,
            drag: (q) => {
                const size = Math.max(MIN_SIZE, snap(2 * Math.hypot(q.x, q.z)));
                return { ...b, scale: { ...b.scale, x: size, z: size } };
            },
        },
        ...[-1, 1].map((side) => ({
            id: `angle:${side}`,
            kind: "size",
            at: new THREE.Vector3(side * r * Math.sin(theta), -hy, r * Math.cos(theta)),
            plane: -hy,
            label: () => `Angle ${Math.round(angle)}°`,
            drag: (q) => ({
                ...b,
                angleDeg: clamp(Math.round(2 * Math.atan2(Math.abs(q.x), q.z) * DEG), 1, 360),
            }),
        })),
        heightHandle(b, new THREE.Vector3(0, hy, r)),
    ];
    if (angle < 360) {
        handles.push({
            id: "tilt",
            kind: "top",
            at: new THREE.Vector3(0, hy, shift),
            plane: hy,
            label: () => `Near edge tilt ${Math.round(b.tiltDeg ?? 0)}°`,
            drag: (q) => {
                const top = clamp(q.z, reach[0], reach[1]);
                return { ...b, tiltDeg: Math.round(Math.atan2(top, b.scale.y) * DEG) };
            },
        });
    }
    return handles;
}

function polygonBounds(b, layers) {
    const all = layers.flat();
    const range = (axis) => {
        const values = all.map((c) => c[axis]);
        const lo = Math.min(...values);
        const hi = Math.max(...values);
        return [(lo + hi) / 2, Math.max(hi - lo, MIN_SIZE)];
    };
    const [cx, sx] = range("x");
    const [cy, sy] = range("y");
    const [cz, sz] = range("z");
    return {
        ...b,
        position: xyz(new Frame(b).toWorld(new THREE.Vector3(cx, cy, cz))),
        scale: { x: sx, y: sy, z: sz },
        layers: layers.map((ring) =>
            ring.map((c) => ({
                ...c,
                x: (c.x - cx) / sx,
                y: (c.y - cy) / sy,
                z: (c.z - cz) / sz,
            })),
        ),
    };
}

const lerp3 = (a, c, t) => ({
    x: a.x + (c.x - a.x) * t,
    y: a.y + (c.y - a.y) * t,
    z: a.z + (c.z - a.z) * t,
});

const vec = (c) => new THREE.Vector3(c.x, c.y, c.z);

const toMetric = (b) =>
    b.layers.map((ring) =>
        ring.map((c) => ({ x: c.x * b.scale.x, y: c.y * b.scale.y, z: c.z * b.scale.z })),
    );

const POINT_LABELS = {
    corner: "Floor corner · drag: move this edge · Shift+drag: up/down · double-click: remove",
    top: "Top corner · drag: lean · Shift+drag: up/down · double-click: remove",
    ring: "Ring point · drag: bend the wall · Shift+drag: up/down · double-click: remove the ring",
};

const POINT_NAMES = { corner: "Floor corner", top: "Top corner", ring: "Ring point" };

function polygonHandles(b) {
    const layers = toMetric(b);
    const last = layers.length - 1;
    const n = layers[0].length;
    const handles = [];
    const edit = (change) =>
        polygonBounds(
            b,
            layers.map((ring, k) => ring.map((c, i) => change(c, k, i))),
        );

    layers.forEach((ring, k) => {
        const kind = k === 0 ? "corner" : k === last ? "top" : "ring";
        ring.forEach((c, i) => {
            handles.push({
                id: `point:${k}:${i}`,
                key: `${k}:${i}`,
                name: POINT_NAMES[kind],
                kind,
                at: vec(c),
                plane: c.y,
                label: () => POINT_LABELS[kind],
                drag: (q) => {
                    const dx = snap(q.x) - c.x;
                    const dz = snap(q.z) - c.z;
                    return edit((p, m, j) =>
                        j === i && (m === k || k === 0) ? { ...p, x: p.x + dx, z: p.z + dz } : p,
                    );
                },
                lift: (q) => edit((p, m, j) => (j === i && m === k ? { ...p, y: snap(q.y) } : p)),
                remove: () => {
                    if (kind === "ring") {
                        return polygonBounds(
                            b,
                            layers.filter((_, m) => m !== k),
                        );
                    }
                    if (n <= 3) return null;
                    return polygonBounds(
                        b,
                        layers.map((r) => r.filter((_, j) => j !== i)),
                    );
                },
            });
        });
    });

    const top = layers[last];
    const centre = top.reduce(
        (sum, c) => ({ x: sum.x + c.x / n, y: Math.max(sum.y, c.y), z: sum.z + c.z / n }),
        { x: 0, y: Number.NEGATIVE_INFINITY, z: 0 },
    );
    handles.push(heightHandle(b, vec(centre)));
    return handles;
}

function polygonEdges(b) {
    const layers = toMetric(b);
    const n = layers[0].length;
    const edges = [];
    if (n < POLYGON_MAX_CORNERS) {
        layers.forEach((ring, k) => {
            ring.forEach((c, i) => {
                const j = (i + 1) % n;
                edges.push({
                    from: vec(c),
                    to: vec(ring[j]),
                    label: "Click or drag to add a corner",
                    insert: (t) => ({
                        bounds: polygonBounds(
                            b,
                            layers.map((r) => [
                                ...r.slice(0, i + 1),
                                lerp3(r[i], r[j], t),
                                ...r.slice(i + 1),
                            ]),
                        ),
                        id: `point:${k}:${i + 1}`,
                    }),
                });
            });
        });
    }
    if (layers.length < POLYGON_MAX_LAYERS) {
        for (let k = 0; k < layers.length - 1; k++) {
            layers[k].forEach((c, i) => {
                edges.push({
                    from: vec(c),
                    to: vec(layers[k + 1][i]),
                    label: "Click or drag to add a ring around the walls here",
                    insert: (t) => {
                        const ring = layers[k].map((p, j) => lerp3(p, layers[k + 1][j], t));
                        return {
                            bounds: polygonBounds(b, [
                                ...layers.slice(0, k + 1),
                                ring,
                                ...layers.slice(k + 1),
                            ]),
                            id: `point:${k + 1}:${i}`,
                        };
                    },
                });
            });
        }
    }
    return edges;
}

const HANDLES = {
    box: boxHandles,
    sphere: sphereHandles,
    sector: sectorHandles,
    polygon: polygonHandles,
};

const _basis = new THREE.Matrix4();
const UP = new THREE.Vector3(0, 1, 0);
const basisOf = (along, normal) =>
    new THREE.Quaternion().setFromRotationMatrix(_basis.makeBasis(along, UP, normal));
const centreOf = (points) =>
    points.reduce((sum, p) => sum.add(p), new THREE.Vector3()).divideScalar(points.length);

function boxFaces(b) {
    const half = halfOf(b);
    const faces = [];
    ["x", "y", "z"].forEach((axis, a) => {
        const [u, v] = [0, 1, 2].filter((k) => k !== a);
        for (const sign of [1, -1]) {
            const corner = (cu, cv) => {
                const p = new THREE.Vector3();
                p.setComponent(a, sign * half[a]);
                p.setComponent(u, cu * half[u]);
                p.setComponent(v, cv * half[v]);
                return p;
            };
            const quad = [corner(-1, -1), corner(1, -1), corner(1, 1), corner(-1, 1)];
            const normal = new THREE.Vector3().setComponent(a, sign);
            const along = axis === "y" ? new THREE.Vector3(1, 0, 0) : normal.clone().cross(UP);
            faces.push({
                id: `face:${axis}${sign}`,
                name: axis === "y" ? (sign > 0 ? "Top" : "Bottom") : "Wall",
                triangles: [
                    [quad[0], quad[1], quad[2]],
                    [quad[0], quad[2], quad[3]],
                ],
                normal,
                centre: centreOf(quad),
                basis:
                    axis === "y"
                        ? new THREE.Quaternion().setFromUnitVectors(
                              new THREE.Vector3(0, 0, 1),
                              normal,
                          )
                        : basisOf(along, normal),
                box: { axis, sign },
            });
        }
    });
    return faces;
}

function polygonFaces(b) {
    const layers = toMetric(b);
    const n = layers[0].length;
    const last = layers.length - 1;
    let area = 0;
    layers[0].forEach((c, i) => {
        const next = layers[0][(i + 1) % n];
        area += c.x * next.z - next.x * c.z;
    });
    const side = Math.sign(area);
    const faces = [];

    for (let k = 0; k < last; k++) {
        for (let i = 0; i < n; i++) {
            const j = (i + 1) % n;
            const corners = [layers[k][i], layers[k + 1][i], layers[k + 1][j], layers[k][j]].map(
                vec,
            );
            const [bi, ti, tj, bj] = corners;
            const ex = layers[k][j].x - layers[k][i].x + layers[k + 1][j].x - layers[k + 1][i].x;
            const ez = layers[k][j].z - layers[k][i].z + layers[k + 1][j].z - layers[k + 1][i].z;
            const normal = new THREE.Vector3(ez, 0, -ex).multiplyScalar(side).normalize();
            const along = new THREE.Vector3(ex, 0, ez).multiplyScalar(-side).normalize();
            faces.push({
                id: `wall:${k}:${i}`,
                name: last > 1 ? "Part of a wall" : "Wall",
                triangles: [
                    [bi, ti, tj],
                    [bi, tj, bj],
                ],
                normal,
                centre: centreOf(corners),
                basis: basisOf(along, normal),
                keys: [`${k}:${i}`, `${k + 1}:${i}`, `${k + 1}:${j}`, `${k}:${j}`],
            });
        }
    }

    for (const [k, name, up] of [
        [last, "Top", 1],
        [0, "Bottom", -1],
    ]) {
        const ring = layers[k].map(vec);
        const tris = THREE.ShapeUtils.triangulateShape(
            ring.map((p) => new THREE.Vector2(p.x, p.z)),
            [],
        );
        faces.push({
            id: `cap:${k}`,
            name,
            triangles: tris.map((t) => t.map((i) => ring[i])),
            normal: new THREE.Vector3(0, up, 0),
            centre: centreOf(ring),
            basis: new THREE.Quaternion(),
            keys: ring.map((_, i) => `${k}:${i}`),
        });
    }
    return faces;
}

const FACES = { box: boxFaces, polygon: polygonFaces };

const ALL_MODES = ["translate", "rotate", "scale"];
const ALL_AXES = ["X", "Y", "Z"];

export class ShapeHandles {
    #camera;
    #dom;
    #onChange;
    #onCommit;
    #onSelect;
    #gizmoActive;
    #clearGizmoHover;
    #group = new THREE.Group();
    #geometry = new THREE.SphereGeometry(1, 16, 12);
    #materials = new Map();
    #pickedRim;
    #dots = [];
    #handles = [];
    #edges = [];
    #faces = [];
    #bounds = null;
    #frame = null;
    #shape = "";
    #hover = null;
    #drag = null;
    #press = null;
    #ghostDot;
    #hoverMesh;
    #pickedMesh;
    #picked = [];
    #snapshot = null;
    #raycaster = new THREE.Raycaster();
    #tip = document.createElement("div");

    constructor({ camera, dom, onChange, onCommit, onSelect, gizmoActive, clearGizmoHover }) {
        this.#camera = camera;
        this.#dom = dom;
        this.#onChange = onChange;
        this.#onCommit = onCommit;
        this.#onSelect = onSelect;
        this.#gizmoActive = gizmoActive;
        this.#clearGizmoHover = clearGizmoHover;
        this.#tip.className = "handle-tip";
        document.body.append(this.#tip);
        const material = (color, opacity) =>
            new THREE.MeshBasicMaterial({
                color,
                transparent: true,
                opacity,
                depthTest: false,
                depthWrite: false,
            });
        for (const [kind, style] of Object.entries(STYLES)) {
            this.#materials.set(kind, {
                fill: material(style.color, style.opacity),
                rim: material(0x111114, 0.75 * style.opacity),
            });
        }
        this.#pickedRim = material(FACE_COLOR, 1);
        this.#ghostDot = this.#dot("ghost");
        this.#ghostDot.visible = false;
        this.#hoverMesh = this.#faceMesh(HOVER_OPACITY);
        this.#pickedMesh = this.#faceMesh(PICKED_OPACITY);
        addEventListener("pointerdown", this.#onDown, { capture: true });
        addEventListener("pointermove", this.#onMove, { capture: true });
        addEventListener("pointerup", this.#onUp, { capture: true });
        addEventListener("dblclick", this.#onDoubleClick, { capture: true });
    }

    get object() {
        return this.#group;
    }

    get selection() {
        const items = this.#items();
        if (!items.length) return null;
        const box = items.find((item) => item.box);
        if (box) {
            return {
                name: box.name,
                modes: ["translate"],
                axes: ["Z"],
                position: this.#frame.toWorld(box.centre),
                quaternion: this.#frame.rotation.clone().multiply(box.basis),
            };
        }
        const keys = this.#keys(items);
        const points = [...keys].map((key) => this.#find(`point:${key}`).at);
        const face = items.find((item) => item.basis);
        const local = face?.basis ?? new THREE.Quaternion();
        return {
            name: items.length === 1 ? items[0].name : `${items.length} parts`,
            modes: keys.size > 1 ? ALL_MODES : ["translate"],
            axes: ALL_AXES,
            position: this.#frame.toWorld(centreOf(points)),
            quaternion: this.#frame.rotation.clone().multiply(local),
        };
    }

    clearSelection() {
        this.#pick([]);
    }

    beginTransform() {
        const selection = this.selection;
        if (!selection) return;
        const items = this.#items();
        this.#snapshot = {
            bounds: this.#bounds,
            frame: this.#frame,
            box: items.find((item) => item.box),
            keys: this.#keys(items),
            centre: this.#frame.toLocal(selection.position),
            basis: this.#frame.inverse.clone().multiply(selection.quaternion),
            position: selection.position,
            quaternion: selection.quaternion,
        };
    }

    transform(position, quaternion, scale) {
        const s = this.#snapshot;
        if (!s) return null;
        const offset = position.clone().sub(s.position).applyQuaternion(s.frame.inverse);
        offset.set(snap(offset.x), snap(offset.y), snap(offset.z));
        if (s.box) {
            const { axis, sign } = s.box.box;
            const a = { x: 0, y: 1, z: 2 }[axis];
            const half = halfOf(s.bounds)[a];
            return moveFace(s.bounds, axis, sign, sign * (half + offset.dot(s.box.normal)));
        }
        const turn = s.frame.inverse
            .clone()
            .multiply(quaternion.clone().multiply(s.quaternion.clone().invert()))
            .multiply(s.frame.rotation);
        const unturn = s.basis.clone().invert();
        return polygonBounds(
            s.bounds,
            toMetric(s.bounds).map((ring, k) =>
                ring.map((c, i) => {
                    if (!s.keys.has(`${k}:${i}`)) return c;
                    const v = vec(c)
                        .sub(s.centre)
                        .applyQuaternion(unturn)
                        .multiply(scale)
                        .applyQuaternion(s.basis)
                        .applyQuaternion(turn)
                        .add(s.centre)
                        .add(offset);
                    return { x: v.x, y: v.y, z: v.z };
                }),
            ),
        );
    }

    endTransform() {
        this.#snapshot = null;
    }

    set(bounds) {
        this.#bounds = bounds;
        this.#handles = bounds ? HANDLES[bounds.type](bounds) : [];
        this.#frame = bounds ? new Frame(bounds) : null;
        this.#edges =
            bounds?.type === "polygon"
                ? polygonEdges(bounds).map((edge) => ({
                      ...edge,
                      from: this.#frame.toWorld(edge.from),
                      to: this.#frame.toWorld(edge.to),
                  }))
                : [];
        this.#faces = bounds
            ? (FACES[bounds.type]?.(bounds) ?? []).map((face) => ({
                  ...face,
                  world: face.triangles.map((tri) => tri.map((p) => this.#frame.toWorld(p))),
                  facing: face.normal.clone().applyQuaternion(this.#frame.rotation),
              }))
            : [];
        const shape = bounds
            ? `${bounds.type}:${bounds.layers?.length ?? 0}:${bounds.layers?.[0].length ?? 0}`
            : "";
        if (shape !== this.#shape) {
            this.#shape = shape;
            if (this.#picked.length) this.#pick([]);
        }
        while (this.#dots.length < this.#handles.length) this.#dots.push(this.#dot("corner"));
        this.#dots.forEach((dot, i) => {
            const handle = this.#handles[i];
            dot.visible = !!handle;
            if (!handle) return;
            this.#paint(dot, handle.kind, this.#picked.includes(handle.id));
            dot.position.copy(this.#frame.toWorld(handle.at));
            dot.userData.handle = handle;
        });
        if (this.#hover) this.#hover = this.#find(this.#hover.id);
        this.#ghostDot.visible = false;
        this.#showFaces(
            this.#pickedMesh,
            this.#items().filter((item) => item.world),
        );
        this.#showFaces(this.#hoverMesh, []);
        if (this.#drag) this.#showTip(this.#find(this.#drag.id)?.label());
    }

    update() {
        const eye = this.#camera.position;
        const active = this.#drag?.id ?? this.#hover?.id;
        for (const dot of [...this.#dots, this.#ghostDot]) {
            if (!dot.visible) continue;
            const kind = dot.userData.kind;
            const grow = dot.userData.handle && dot.userData.handle.id === active ? HOVER_SCALE : 1;
            dot.scale.setScalar(
                dot.position.distanceTo(eye) * SCREEN_SIZE * STYLES[kind].size * grow,
            );
        }
    }

    #items() {
        return this.#picked
            .map((id) => this.#faces.find((f) => f.id === id) ?? this.#find(id))
            .filter(Boolean);
    }

    #keys(items) {
        return new Set(items.flatMap((item) => item.keys ?? (item.key ? [item.key] : [])));
    }

    #pick(ids) {
        this.#picked = ids;
        this.set(this.#bounds);
        this.#onSelect();
    }

    #toggle(id, add) {
        const box = this.#faces.find((f) => f.id === id)?.box;
        if (!add || box || this.#items().some((item) => item.box)) {
            this.#pick(this.#picked.length === 1 && this.#picked[0] === id ? [] : [id]);
            return;
        }
        this.#pick(
            this.#picked.includes(id)
                ? this.#picked.filter((p) => p !== id)
                : [...this.#picked, id],
        );
    }

    #faceMesh(opacity) {
        const mesh = new THREE.Mesh(
            new THREE.BufferGeometry(),
            new THREE.MeshBasicMaterial({
                color: FACE_COLOR,
                transparent: true,
                opacity,
                depthTest: false,
                depthWrite: false,
                side: THREE.DoubleSide,
            }),
        );
        mesh.renderOrder = 19;
        mesh.visible = false;
        this.#group.add(mesh);
        return mesh;
    }

    #showFaces(mesh, faces) {
        mesh.visible = faces.length > 0;
        if (!mesh.visible) return;
        mesh.geometry.dispose();
        mesh.geometry = new THREE.BufferGeometry().setFromPoints(
            faces.flatMap((face) => face.world.flat()),
        );
    }

    #dot(kind) {
        const dot = new THREE.Group();
        const rim = new THREE.Mesh(this.#geometry);
        rim.renderOrder = 20;
        const fill = new THREE.Mesh(this.#geometry);
        fill.renderOrder = 21;
        dot.add(rim, fill);
        this.#paint(dot, kind);
        this.#group.add(dot);
        return dot;
    }

    #paint(dot, kind, picked = false) {
        const { fill, rim } = this.#materials.get(kind);
        dot.children[0].material = picked ? this.#pickedRim : rim;
        dot.children[0].scale.setScalar(picked ? PICKED_RIM : RIM);
        dot.children[1].material = fill;
        dot.userData.kind = kind;
    }

    #find(id) {
        return this.#handles.find((h) => h.id === id) ?? null;
    }

    #ray(e) {
        const rect = this.#dom.getBoundingClientRect();
        const ndc = new THREE.Vector2(
            ((e.clientX - rect.left) / rect.width) * 2 - 1,
            -((e.clientY - rect.top) / rect.height) * 2 + 1,
        );
        this.#raycaster.setFromCamera(ndc, this.#camera);
        return this.#raycaster.ray;
    }

    #pickDot(e) {
        if (!this.#handles.length) return null;
        this.#ray(e);
        const rims = this.#dots.filter((d) => d.visible).map((d) => d.children[0]);
        const hit = this.#raycaster.intersectObjects(rims, false)[0];
        return hit ? hit.object.parent.userData.handle : null;
    }

    #pickEdge(e) {
        if (!this.#edges.length) return null;
        const ray = this.#ray(e);
        const rect = this.#dom.getBoundingClientRect();
        let best = null;
        for (const edge of this.#edges) {
            const u = edge.to.clone().sub(edge.from);
            const w = edge.from.clone().sub(ray.origin);
            const a = u.dot(u);
            const b = u.dot(ray.direction);
            const denom = a - b * b;
            if (denom < 1e-9) continue;
            const t = clamp((b * ray.direction.dot(w) - u.dot(w)) / denom, EDGE_END, 1 - EDGE_END);
            const at = edge.from.clone().addScaledVector(u, t);
            const screen = at.clone().project(this.#camera);
            const px = Math.hypot(
                ((screen.x + 1) / 2) * rect.width + rect.left - e.clientX,
                ((1 - screen.y) / 2) * rect.height + rect.top - e.clientY,
            );
            if (px < EDGE_PICK && (!best || px < best.px)) best = { edge, t, at, px };
        }
        return best;
    }

    #pickFace(e) {
        if (!this.#faces.length) return null;
        const ray = this.#ray(e);
        const hit = new THREE.Vector3();
        let best = null;
        for (const face of this.#faces) {
            if (face.facing.dot(ray.direction) >= 0) continue;
            for (const [a, b, c] of face.world) {
                if (!ray.intersectTriangle(a, b, c, false, hit)) continue;
                const distance = hit.distanceTo(ray.origin);
                if (!best || distance < best.distance) best = { face, distance };
            }
        }
        return best?.face ?? null;
    }

    #under(e) {
        if (e.target !== this.#dom) return {};
        const dot = this.#pickDot(e);
        if (dot) return { dot };
        if (this.#gizmoActive()) return { gizmo: true };
        const ghost = this.#pickEdge(e);
        if (ghost) return { ghost };
        const face = this.#pickFace(e);
        return face ? { face } : {};
    }

    #showTip(text, e) {
        const tip = this.#tip;
        tip.style.display = text ? "block" : "none";
        if (!text) return;
        tip.textContent = text;
        if (!e) return;
        const beside = (at, size, room) =>
            at + TIP_OFFSET + size > room ? at - TIP_OFFSET - size : at + TIP_OFFSET;
        tip.style.left = `${beside(e.clientX, tip.offsetWidth, innerWidth)}px`;
        tip.style.top = `${beside(e.clientY, tip.offsetHeight, innerHeight)}px`;
    }

    #faceTip(face) {
        if (this.#picked.includes(face.id))
            return `${face.name} · selected · Shift+click: deselect`;
        const add = face.box ? "" : " · Shift+click: add";
        return `${face.name} · click to select${add}`;
    }

    #dotTip(handle) {
        if (!handle.key) return handle.label();
        const state = this.#picked.includes(handle.id) ? "selected" : "click: select";
        return `${handle.label()} · ${state}`;
    }

    #hoverAt(e) {
        const { dot, ghost, face } = this.#under(e);
        this.#hover = dot ?? null;
        this.#ghostDot.visible = !!ghost;
        if (ghost) this.#ghostDot.position.copy(ghost.at);
        const lit = face && !this.#picked.includes(face.id) ? [face] : [];
        this.#showFaces(this.#hoverMesh, lit);
        this.#dom.style.cursor = dot ? "grab" : ghost ? "copy" : face ? "pointer" : "";
        this.#showTip(
            dot ? this.#dotTip(dot) : (ghost?.edge.label ?? (face && this.#faceTip(face))),
            e,
        );
        return dot;
    }

    #onDown = (e) => {
        if (e.button !== 0) return;
        const { dot, ghost, face, gizmo } = this.#under(e);
        const empty = !dot && !ghost && !face && !gizmo;
        this.#press = { x: e.clientX, y: e.clientY, face, empty };
        if (!dot && !ghost) return;
        e.stopPropagation();
        e.preventDefault();
        let handle = dot;
        if (ghost) {
            const { bounds, id } = ghost.edge.insert(ghost.t);
            this.#onChange(bounds);
            handle = this.#find(id);
            if (!handle) return;
        }
        this.#drag = {
            id: handle.id,
            handle,
            frame: this.#frame,
            vertical: e.shiftKey && !!handle.lift,
            shift: e.shiftKey,
            x: e.clientX,
            y: e.clientY,
            moved: !!ghost,
        };
        this.#hover = handle;
        this.#dom.setPointerCapture(e.pointerId);
        this.#dom.style.cursor = "grabbing";
        this.#showTip(handle.label(), e);
    };

    #onMove = (e) => {
        const drag = this.#drag;
        if (!drag) {
            if (e.buttons) return;
            if (this.#hoverAt(e)) {
                e.stopPropagation();
                this.#clearGizmoHover();
            }
            return;
        }
        e.stopPropagation();
        drag.moved ||= Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > DRAG_SLOP;
        if (drag.moved) {
            const { handle, frame, vertical } = drag;
            const local = frame.rayToLocal(this.#ray(e));
            const point =
                vertical || handle.plane === "upright"
                    ? onUpright(local, handle.at)
                    : onLevel(local, handle.plane);
            if (point) this.#onChange(vertical ? handle.lift(point) : handle.drag(point));
        }
        this.#showTip(this.#find(drag.id)?.label(), e);
    };

    #onUp = (e) => {
        const press = this.#press;
        this.#press = null;
        const click = press && Math.hypot(e.clientX - press.x, e.clientY - press.y) <= DRAG_SLOP;
        const drag = this.#drag;
        if (!drag) {
            if (!click) return;
            if (press.face) this.#toggle(press.face.id, e.shiftKey);
            else if (press.empty && e.target === this.#dom) this.clearSelection();
            else return;
            this.#hoverAt(e);
            return;
        }
        e.stopPropagation();
        if (this.#dom.hasPointerCapture(e.pointerId)) this.#dom.releasePointerCapture(e.pointerId);
        this.#drag = null;
        if (drag.moved) this.#onCommit();
        else if (drag.handle.key) this.#toggle(drag.id, drag.shift);
        this.#hoverAt(e);
    };

    #onDoubleClick = (e) => {
        if (e.target !== this.#dom) return;
        const handle = this.#pickDot(e);
        if (!handle?.remove) return;
        e.stopPropagation();
        const bounds = handle.remove();
        if (!bounds) return;
        this.#hover = null;
        this.#onChange(bounds);
        this.#onCommit();
    };
}
