import {
    FlyControls,
    GraciaPlayer,
    loadGraciaModule,
    OrbitControls,
    SplatsRendererW3,
    THREE,
    TrackballControls,
    TransformControls,
    WebGPURenderer,
} from "@gracia/web-sdk/aio";
import { BoundsObject } from "./bounds.js";
import { defaultBounds, IDENTITY_TRS } from "./metadata.js";
import { createAxes, createEyeMarker, createGrid, createHuman } from "./refs.js";

const DEFAULT_EYE = new THREE.Vector3(2, 2.5, 4);
const DEFAULT_TARGET = new THREE.Vector3(0, 0.4, 0);

const trsOf = (obj) => ({
    translation: { x: obj.position.x, y: obj.position.y, z: obj.position.z },
    rotation: { x: obj.quaternion.x, y: obj.quaternion.y, z: obj.quaternion.z, w: obj.quaternion.w },
    scale: { x: obj.scale.x, y: obj.scale.y, z: obj.scale.z },
});

function applyTrs(obj, trs) {
    if (!trs) return;
    obj.position.set(trs.translation.x, trs.translation.y, trs.translation.z);
    obj.quaternion.set(trs.rotation.x, trs.rotation.y, trs.rotation.z, trs.rotation.w);
    obj.scale.set(trs.scale.x, trs.scale.y, trs.scale.z);
    obj.updateMatrix();
}

const _local = new THREE.Matrix4();

/**
 * Everything three.js: renderer, splat roots, gizmo, boundary volume, render loop. The panels
 * drive it through these methods and never reach into the scene graph themselves.
 */
export class Viewer {
    #player;
    #splats;
    #staticPivot = new THREE.Object3D();
    #overlay = new THREE.Scene();
    #gizmo;
    #controls = null;
    #controlsType = "orbit";
    #refs;
    #bounds = null;
    #target = "video";
    #content = { video: null, environment: null };
    #listeners = new Map();
    #timer = new THREE.Timer();
    #envWorld = new THREE.Matrix4();
    #lastSectorScale = new THREE.Vector2();
    #raf = 0;

    constructor(player, renderer) {
        this.#player = player;
        this.renderer = renderer;
        document.body.prepend(renderer.domElement);

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x2a2a32);
        this.camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.05, 10000);

        this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));
        const sun = new THREE.DirectionalLight(0xffffff, 1.5);
        sun.position.set(5, 10, 7);
        this.scene.add(sun);

        this.#refs = {
            grid: createGrid(),
            axes: createAxes(),
            human: createHuman(),
            viewer: createEyeMarker({ x: 0, y: 1.6, z: 0 }, { x: 0, y: 0.8, z: 1 }, 40, "Viewer", 0x42c6f5),
        };
        for (const ref of Object.values(this.#refs)) this.scene.add(ref);

        this.#gizmo = new TransformControls(this.camera, renderer.domElement);
        this.#gizmo.setSize(0.75);
        this.#gizmo.addEventListener("dragging-changed", (e) => {
            if (this.#controls) this.#controls.enabled = !e.value;
            if (!e.value) this.emit("commit");
        });
        this.#gizmo.addEventListener("mouseDown", () => {
            if (this.#target === "video") this.#pin();
        });
        this.#gizmo.addEventListener("objectChange", () => {
            if (this.#target === "video") this.#unpin();
            if (this.#target === "bounds") this.#linkSectorScale();
            this.emit("transform");
        });

        const helper = this.#gizmo.getHelper();
        helper.traverse((child) => {
            if (!child.material) return;
            for (const m of [child.material].flat()) {
                m.depthTest = false;
                m.depthWrite = false;
            }
        });
        this.#overlay.add(helper);

        this.#splats = SplatsRendererW3.attach(player, renderer);
        this.#splats.root.add(this.#staticPivot);
        this.scene.add(this.#splats.root);
        // Nothing is loaded yet, so there is nothing to transform.
        this.#gizmo.detach();

        this.resetCamera();
        addEventListener("resize", this.#onResize);
    }

    static async create() {
        if (!navigator.gpu) throw new Error("WebGPU is not available in this browser.");

        const GraciaModule = await loadGraciaModule();
        const player = await GraciaPlayer.create(
            (opts) => GraciaModule({ ...opts, print: console.log, printErr: console.error }),
            { canvas: document.createElement("canvas"), maxSplatsCount: 8_000_000 },
        );

        const renderer = new WebGPURenderer({ device: player.device, antialias: false });
        renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
        renderer.setSize(innerWidth, innerHeight);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.8;
        await renderer.init();

        return new Viewer(player, renderer);
    }

    /* ── events ── */

    on(event, fn) {
        const set = this.#listeners.get(event) ?? new Set();
        set.add(fn);
        this.#listeners.set(event, set);
    }

    emit(event) {
        for (const fn of this.#listeners.get(event) ?? []) fn();
    }

    /* ── content ── */

    get content() {
        return this.#content;
    }

    openVideo(source) {
        const trs = trsOf(this.#splats.root);
        this.#player.open(source.handle ? { localFile: source.handle } : { file: source.file });
        applyTrs(this.#splats.root, trs);
        this.#splats.root.updateMatrixWorld(true);
        this.#player.play();
        this.#content = { ...this.#content, video: source.name };
        this.setGizmoTarget(this.#target);
        this.emit("content");
    }

    async openEnvironment(source) {
        const trs = trsOf(this.#staticPivot);
        const file = source.handle ? await source.handle.getFile() : source.file;
        await this.#player.open({ file, type: "static" });
        applyTrs(this.#staticPivot, trs);
        this.#content = { ...this.#content, environment: source.name };
        this.setGizmoTarget(this.#target);
        this.emit("content");
    }

    clearVideo() {
        if (!this.#content.video) return;
        this.#player.clearVideo();
        this.#content = { ...this.#content, video: null };
        this.setGizmoTarget(this.#target);
        this.emit("content");
    }

    clearEnvironment() {
        if (!this.#content.environment) return;
        this.#player.clearEnvironment();
        this.#content = { ...this.#content, environment: null };
        this.setGizmoTarget(this.#target);
        this.emit("content");
    }

    /* ── playback ── */

    get playback() {
        return {
            hasVideo: !!this.#content.video,
            isPlaying: this.#player.isPlaying,
            isBuffering: this.#player.isBuffering,
            currentTime: this.#player.currentTime,
            duration: this.#player.duration ?? 0,
        };
    }

    togglePlay() {
        if (this.#player.isPlaying) this.#player.pause();
        else this.#player.play();
    }

    seek(seconds) {
        this.#player.seek(seconds);
    }

    /* ── transforms ── */

    #object(target) {
        if (target === "bounds") return this.#bounds;
        return target === "environment" ? this.#staticPivot : this.#splats.root;
    }

    getTrs(target = this.#target) {
        const obj = this.#object(target);
        return obj ? trsOf(obj) : IDENTITY_TRS;
    }

    /** One number standing in for the target's size, for the slider. */
    get overallScale() {
        const obj = this.#object(this.#target);
        if (!obj) return 1;
        return Math.cbrt(Math.abs(obj.scale.x * obj.scale.y * obj.scale.z));
    }

    /**
     * Scales proportionally rather than forcing a cube, so a boundary that arrived non-cubic
     * from pasted metadata keeps its shape when resized. The slider is the only resize control.
     */
    setOverallScale(value) {
        const obj = this.#object(this.#target);
        if (!obj) return;
        const current = this.overallScale;
        if (!(current > 0)) return;

        if (this.#target === "video") this.#pin();
        obj.scale.multiplyScalar(value / current);
        obj.updateMatrix();
        if (this.#target === "video") this.#unpin();
        if (this.#target === "bounds") this.#lastSectorScale.set(obj.scale.x, obj.scale.z);
        this.emit("transform");
    }

    /** The environment is a child of the video root, so aligning the video must not drag it along. */
    #pin() {
        this.#staticPivot.updateWorldMatrix(true, false);
        this.#envWorld.copy(this.#staticPivot.matrixWorld);
    }

    #unpin() {
        this.#splats.root.updateMatrixWorld(true);
        _local.copy(this.#splats.root.matrixWorld).invert().multiply(this.#envWorld);
        _local.decompose(
            this.#staticPivot.position,
            this.#staticPivot.quaternion,
            this.#staticPivot.scale,
        );
        this.#staticPivot.updateMatrix();
    }

    /**
     * A sector is a slice of a cylinder, so the player's radius is `min(scale.x, scale.z)`.
     * Keeping the pair equal stops the editor drawing a volume the player will not honour.
     * While dragging, whichever axis just moved wins; for a value arriving from outside there
     * is no "just moved", so collapse to the smaller — the volume actually enforced.
     */
    #linkSectorScale(fromOutside = false) {
        const bounds = this.#bounds;
        if (!bounds || bounds.type !== "sector") return;
        const s = bounds.scale;
        if (fromOutside) s.x = s.z = Math.min(s.x, s.z);
        else if (s.x !== this.#lastSectorScale.x) s.z = s.x;
        else if (s.z !== this.#lastSectorScale.y) s.x = s.z;
        this.#lastSectorScale.set(s.x, s.z);
        bounds.updateMatrix();
    }

    /* ── bounds ── */

    getBounds() {
        const b = this.#bounds;
        if (!b) return null;
        const trs = trsOf(b);
        const bounds = {
            type: b.type,
            position: trs.translation,
            rotation: trs.rotation,
            scale: trs.scale,
        };
        if (b.type === "sector") bounds.angleDeg = b.angleDeg;
        return bounds;
    }

    setBounds(bounds) {
        if (!bounds) {
            this.removeBounds();
            return;
        }
        if (!this.#bounds) {
            this.#bounds = new BoundsObject(bounds.type, bounds.angleDeg ?? 90);
            this.scene.add(this.#bounds);
        } else {
            this.#bounds.setShape(bounds.type, bounds.angleDeg ?? 90);
        }
        applyTrs(this.#bounds, {
            translation: bounds.position,
            rotation: bounds.rotation,
            scale: bounds.scale,
        });
        this.#linkSectorScale(true);
        if (this.#target === "bounds") this.#gizmo.attach(this.#bounds);
        else this.setGizmoTarget(this.#target);
        this.emit("bounds");
    }

    addBounds(type) {
        this.setBounds(defaultBounds(type));
        this.setGizmoTarget("bounds");
        this.emit("commit");
    }

    setBoundsType(type) {
        const current = this.getBounds();
        if (!current) return this.addBounds(type);
        const next = { ...current, type };
        if (type === "sector") next.angleDeg = current.angleDeg ?? 90;
        else delete next.angleDeg;
        this.setBounds(next);
        this.emit("commit");
    }

    setSectorAngle(angleDeg) {
        if (!this.#bounds || this.#bounds.type !== "sector") return;
        this.#bounds.setShape("sector", Math.min(360, Math.max(1, Math.round(angleDeg))));
        this.emit("bounds");
    }

    removeBounds() {
        if (!this.#bounds) return;
        this.#bounds.removeFromParent();
        this.#bounds.dispose();
        this.#bounds = null;
        this.setGizmoTarget(this.#target);
        this.emit("bounds");
    }

    /* ── gizmo ── */

    get gizmoTarget() {
        return this.#target;
    }

    get gizmoMode() {
        return this.#gizmo.mode;
    }

    /** Targets with something behind them right now; the rest are not offered. */
    get availableTargets() {
        const available = [];
        if (this.#content.video) available.push("video");
        if (this.#content.environment) available.push("environment");
        if (this.#bounds) available.push("bounds");
        return available;
    }

    setGizmoTarget(target) {
        const available = this.availableTargets;
        if (!available.includes(target)) target = available[0] ?? null;
        this.#target = target ?? "video";

        const obj = target ? this.#object(target) : null;
        if (obj) this.#gizmo.attach(obj);
        else this.#gizmo.detach();
        this.emit("transform");
    }

    setGizmoMode(mode) {
        this.#gizmo.setMode(mode);
        this.emit("transform");
    }

    /* ── camera & view ── */

    get controlsType() {
        return this.#controlsType;
    }

    setControls(type) {
        if (type === this.#controlsType && this.#controls) return;
        this.#controlsType = type;
        this.resetCamera();
        this.emit("transform");
    }

    resetCamera() {
        this.#controls?.dispose();
        this.camera.position.copy(DEFAULT_EYE);
        this.camera.up.set(0, 1, 0);
        this.camera.lookAt(DEFAULT_TARGET);
        this.camera.updateMatrix();

        if (this.#controlsType === "fly") {
            const fly = new FlyControls(this.camera, this.renderer.domElement);
            fly.movementSpeed = 2;
            fly.rollSpeed = 0.5;
            fly.dragToLook = true;
            this.#controls = fly;
        } else if (this.#controlsType === "trackball") {
            const tb = new TrackballControls(this.camera, this.renderer.domElement);
            tb.rotateSpeed = 4;
            tb.zoomSpeed = 4;
            tb.panSpeed = 1.2;
            tb.dynamicDampingFactor = 0.2;
            tb.target.copy(DEFAULT_TARGET);
            tb.update();
            this.#controls = tb;
        } else {
            const orbit = new OrbitControls(this.camera, this.renderer.domElement);
            orbit.enableDamping = true;
            orbit.dampingFactor = 0.08;
            orbit.target.copy(DEFAULT_TARGET);
            orbit.update();
            this.#controls = orbit;
        }
    }

    get background() {
        return `#${this.scene.background.getHexString()}`;
    }

    setBackground(hex) {
        this.scene.background.setStyle(hex);
    }

    setRefVisible(key, visible) {
        if (this.#refs[key]) this.#refs[key].visible = visible;
    }

    /* ── document ── */

    toDoc() {
        return {
            background: this.background,
            controls: this.#controlsType,
            initialTransform: this.getTrs("video"),
            staticTransform: this.getTrs("environment"),
            bounds: this.getBounds(),
        };
    }

    /** Applies whatever parts a document carries, leaving the rest untouched. */
    applyDoc(doc) {
        if (doc.background) this.setBackground(doc.background);
        if (doc.controls) this.setControls(doc.controls);
        if (doc.initialTransform) {
            // A spawn pasted on its own re-aligns the video only; whatever the document also
            // carries is applied afterwards and wins.
            this.#pin();
            applyTrs(this.#splats.root, doc.initialTransform);
            this.#splats.root.updateMatrixWorld(true);
            this.#unpin();
        }
        if (doc.staticTransform) applyTrs(this.#staticPivot, doc.staticTransform);
        if ("bounds" in doc) this.setBounds(doc.bounds);

        const obj = this.#object(this.#target);
        if (obj) this.#gizmo.attach(obj);
        this.emit("transform");
        this.emit("bounds");
    }

    /* ── loop ── */

    /** @param {(deltaMs: number) => void} [onFrame] called with how long each frame took */
    start(onFrame) {
        let last = performance.now();
        const frame = () => {
            this.#raf = requestAnimationFrame(frame);
            this.#timer.update();

            if (this.#controlsType === "fly") this.#controls.update(this.#timer.getDelta());
            else this.#controls?.update();

            this.#staticPivot.updateMatrix();
            this.#splats.setStaticModelMatrix(this.#staticPivot.matrix.elements);
            this.#splats.render(this.renderer, this.scene, this.camera, this.#overlay);

            const now = performance.now();
            onFrame?.(now - last);
            last = now;
        };
        frame();
    }

    #onResize = () => {
        this.camera.aspect = innerWidth / innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(innerWidth, innerHeight);
    };
}
