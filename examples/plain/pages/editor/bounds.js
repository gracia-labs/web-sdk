import { THREE } from "@gracia/web-sdk/aio";

const SEGMENTS = 64;
const COLOR = 0xff8a2b;

export const halfAngleOf = (angleDeg = 90) =>
    (Math.min(360, Math.max(1, Math.abs(angleDeg))) * Math.PI) / 360;

function sectorGeometry(angleDeg) {
    const halfAngle = halfAngleOf(angleDeg);
    const positions = [0, -0.5, 0, 0, 0.5, 0];
    const indices = [];

    for (let i = 0; i <= SEGMENTS; i++) {
        const a = -halfAngle + (i / SEGMENTS) * halfAngle * 2;
        const x = Math.sin(a) * 0.5;
        const z = Math.cos(a) * 0.5;
        positions.push(x, -0.5, z, x, 0.5, z);
    }

    for (let i = 0; i < SEGMENTS; i++) {
        const b0 = 2 + i * 2;
        const t0 = b0 + 1;
        const b1 = b0 + 2;
        const t1 = b0 + 3;
        indices.push(0, b0, b1, 1, t1, t0, b0, t0, b1, b1, t0, t1);
    }

    // A partial sector needs its two radial faces closed off.
    if (halfAngle < Math.PI - 1e-6) {
        const lastBottom = 2 + SEGMENTS * 2;
        indices.push(0, 1, 2, 2, 1, 3);
        indices.push(0, lastBottom, 1, lastBottom, lastBottom + 1, 1);
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
}

function volumeGeometry(type, angleDeg) {
    if (type === "sphere") return new THREE.SphereGeometry(0.5, 32, 20);
    if (type === "sector") return sectorGeometry(angleDeg);
    return new THREE.BoxGeometry(1, 1, 1);
}

/** Three great circles, drawn as segments. */
function sphereOutline() {
    const points = [];
    const ring = (at) => {
        for (let i = 0; i < SEGMENTS; i++) {
            points.push(...at((i / SEGMENTS) * Math.PI * 2), ...at(((i + 1) / SEGMENTS) * Math.PI * 2));
        }
    };
    ring((a) => [Math.cos(a) * 0.5, Math.sin(a) * 0.5, 0]);
    ring((a) => [Math.cos(a) * 0.5, 0, Math.sin(a) * 0.5]);
    ring((a) => [0, Math.cos(a) * 0.5, Math.sin(a) * 0.5]);

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    return geom;
}

/**
 * A sphere is smooth, so EdgesGeometry finds no edges above any sane angle threshold and the
 * volume would render with no outline at all. Give it explicit rings instead.
 */
function outlineGeometry(type, volume) {
    return type === "sphere" ? sphereOutline() : new THREE.EdgesGeometry(volume, 20);
}

/**
 * The boundary volume: unit-sized geometry placed by the object's own transform, so its
 * `scale` is literally the volume's full size, matching the metadata.
 */
export class BoundsObject extends THREE.Group {
    #fill;
    #edges;

    constructor(type, angleDeg = 90) {
        super();
        this.type = type;
        this.angleDeg = angleDeg;

        const geom = volumeGeometry(type, angleDeg);
        this.#fill = new THREE.Mesh(
            geom,
            new THREE.MeshBasicMaterial({
                color: COLOR,
                transparent: true,
                opacity: 0.06,
                side: THREE.DoubleSide,
                depthWrite: false,
            }),
        );
        this.#edges = new THREE.LineSegments(
            outlineGeometry(type, geom),
            new THREE.LineBasicMaterial({ color: COLOR, transparent: true, opacity: 0.9 }),
        );
        this.add(this.#fill, this.#edges);
    }

    /** Swaps geometry in place so an attached gizmo keeps its target. */
    setShape(type, angleDeg) {
        if (type === this.type && angleDeg === this.angleDeg) return;
        this.type = type;
        this.angleDeg = angleDeg;

        const geom = volumeGeometry(type, angleDeg);
        this.#fill.geometry.dispose();
        this.#edges.geometry.dispose();
        this.#fill.geometry = geom;
        this.#edges.geometry = outlineGeometry(type, geom);
    }

    dispose() {
        this.#fill.geometry.dispose();
        this.#edges.geometry.dispose();
        this.#fill.material.dispose();
        this.#edges.material.dispose();
    }
}
