import { boundsShape, THREE } from "@gracia/web-sdk/aio";

const SEGMENTS = 64;
const COLOR = 0xff8a2b;

const SHAPE_KEYS = ["type", "angleDeg", "tiltDeg", "layers"];

export const shapeOf = (bounds) =>
    Object.fromEntries(
        SHAPE_KEYS.filter((k) => bounds[k] !== undefined).map((k) => [k, bounds[k]]),
    );

function ring(at) {
    const points = [];
    for (let i = 0; i < SEGMENTS; i++) {
        points.push(...at((i / SEGMENTS) * Math.PI * 2), ...at(((i + 1) / SEGMENTS) * Math.PI * 2));
    }
    return points;
}

function segmentsGeometry(points) {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    return geom;
}

const RING_NORMAL = new THREE.Vector3(0, 0, 1);
const _eye = new THREE.Vector3();

/**
 * The boundary volume, placed by the object's own transform, so its `scale` is literally the
 * volume's full size, matching the metadata.
 */
export class BoundsObject extends THREE.Group {
    #metric = new THREE.Group();
    #fill;
    #edges;
    #silhouette;
    #shape = {};
    #key = "";

    constructor(shape) {
        super();
        this.#fill = new THREE.Mesh(
            new THREE.BufferGeometry(),
            new THREE.MeshBasicMaterial({
                color: COLOR,
                transparent: true,
                opacity: 0.06,
                side: THREE.DoubleSide,
                depthWrite: false,
            }),
        );
        this.#edges = new THREE.LineSegments(
            new THREE.BufferGeometry(),
            new THREE.LineBasicMaterial({ color: COLOR, transparent: true, opacity: 0.9 }),
        );
        this.#silhouette = new THREE.LineSegments(
            segmentsGeometry(ring((a) => [Math.cos(a), Math.sin(a), 0])),
            this.#edges.material,
        );
        this.#metric.add(this.#fill, this.#edges);
        this.add(this.#metric, this.#silhouette);
        this.setShape(shape);
    }

    get shapeType() {
        return this.#shape.type;
    }

    get shape() {
        return this.#shape;
    }

    /** Swaps geometry in place so an attached gizmo keeps its target. */
    setShape(shape) {
        this.#shape = shapeOf(shape);
        this.#silhouette.visible = this.shapeType === "sphere";
        this.refresh();
    }

    refresh() {
        const s = this.scale;
        const key = JSON.stringify([this.#shape, s.x, s.y, s.z]);
        if (key === this.#key) return;
        this.#key = key;
        const shape = boundsShape(this.#shape, [s.x / 2, s.y / 2, s.z / 2]);
        const { positions, indices } = shape.mesh;

        const fill = new THREE.BufferGeometry();
        fill.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        fill.setIndex(new THREE.BufferAttribute(indices, 1));
        this.#fill.geometry.dispose();
        this.#fill.geometry = fill;
        this.#edges.geometry.dispose();
        this.#edges.geometry = segmentsGeometry(shape.lines);
        this.#metric.scale.set(1 / s.x, 1 / s.y, 1 / s.z);
    }

    /** Keeps a sphere's rim ring on its silhouette as seen from `camera`, so it always reads as round. */
    faceCamera(camera) {
        if (this.shapeType !== "sphere") return;
        const r = 0.5;
        this.updateMatrixWorld();
        const eye = this.worldToLocal(camera.getWorldPosition(_eye));
        const d = eye.length();
        const silhouette = this.#silhouette;
        silhouette.visible = d > r;
        if (!silhouette.visible) return;
        const k = (r * r) / (d * d);
        silhouette.position.copy(eye).multiplyScalar(k);
        silhouette.scale.setScalar(r * Math.sqrt(1 - k));
        silhouette.quaternion.setFromUnitVectors(RING_NORMAL, eye.divideScalar(d));
    }

    dispose() {
        this.#fill.geometry.dispose();
        this.#edges.geometry.dispose();
        this.#silhouette.geometry.dispose();
        this.#fill.material.dispose();
        this.#edges.material.dispose();
    }
}
