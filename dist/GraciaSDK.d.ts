import * as playcanvas from 'playcanvas';
import { RefObject } from 'react';
import * as three from 'three';
import { Mesh, BufferGeometry, Object3D } from 'three';
import * as _preact_signals_core from '@preact/signals-core';

declare function loadGraciaModule(wasmSpecifier?: string): Promise<any>;

declare class ScratchHeap {
    constructor(app: any, size?: number);
    ptr(offset?: number): number;
    get f32(): Float32Array;
    writeF32(data: ArrayLike<number>, offset?: number): void;
    readF32(count: number, offset?: number): Float32Array;
    free(): void;
    #private;
}

declare class GraciaModule {
    static boot(Module: any, canvas: HTMLCanvasElement, { maxSplatsCount }?: {
        maxSplatsCount?: number;
    }): Promise<{
        module: GraciaModule;
        device: GPUDevice;
    }>;
    constructor(app: any);
    get heap(): ScratchHeap;
    get backend(): "pure" | "hybrid" | null;
    get buildUnixTime(): number;
    shutdownApp(): void;
    setCamera(viewL: ArrayLike<number>, projL: ArrayLike<number>, viewR?: ArrayLike<number>, projR?: ArrayLike<number>): void;
    getModelMatrix(): Float32Array | null;
    setModelMatrix(elements: ArrayLike<number>): void;
    initPure(isBGRA: boolean): void;
    pureRenderTo(color: GPUTexture, depth: GPUTexture | null | undefined, w: number, h: number): boolean;
    initHybrid(gl: WebGL2RenderingContext): void;
    hybridFrame(w: number, h: number, drawMode: number): void;
    hybridPreprocess(w: number, h: number): any;
    hybridRender(mode: number, x: number, y: number, w: number, h: number, eye: number): void;
    hybridRenderMesh(mvp: ArrayLike<number>, x: number, y: number, w: number, h: number): void;
    hybridRenderMotionMV(x: number, y: number, w: number, h: number): void;
    hybridCanMotion(): boolean;
    hybridHasMultiview(): boolean;
    hybridReset(): void;
    registerGL(gl: WebGL2RenderingContext): void;
    shutdownBackend(): void;
    dispose(): void;
    addDynamicScene(): any;
    addStaticScene(): any;
    removeScene(id: number): void;
    sceneReady(id: number): boolean;
    sceneProgress(id: number): any;
    sceneDuration(id: number): any;
    sceneIsBuffering(id: number): boolean;
    sceneLastFetchStatus(id: number): any;
    sceneSetTime(id: number, t: number): void;
    sceneSetVisible(id: number, v: boolean): void;
    sceneGetBBox(id: number): {
        minX: number;
        minY: number;
        minZ: number;
        maxX: number;
        maxY: number;
        maxZ: number;
    } | null;
    sceneSetEnvLighting(id: number, coefs: ArrayLike<number>, scale: number): void;
    sceneClearEnvLighting(id: number): void;
    sceneSetModelMatrix(id: number, elements: ArrayLike<number>): void;
    sceneOpen(id: number, url: string): void;
    sceneOpenApi(id: number, url: string, token: string): void;
    sceneOpenLocal(id: number, localId: number): void;
    sceneOpenStatic(id: number, data: Uint8Array): number;
    #private;
}

declare class GraciaPlayer {
    static GL_CANVAS_OPTS: {
        alpha: boolean;
        premultipliedAlpha: boolean;
        depth: boolean;
        stencil: boolean;
        antialias: boolean;
        powerPreference: string;
        xrCompatible: boolean;
    };
    static create(Module: any, { canvas, gl, backend, maxSplatsCount }?: {
        canvas?: HTMLCanvasElement;
        gl?: WebGLRenderingContext | WebGL2RenderingContext;
        backend?: "pure" | "hybrid";
        maxSplatsCount?: number;
    }): Promise<GraciaPlayer>;
    static preferredFormat(): GPUTextureFormat;
    static #gl2(canvas: any): any;
    constructor(mod: GraciaModule, device: GPUDevice);
    get device(): GPUDevice;
    get backend(): "pure" | "hybrid" | null;
    get buildUnixTime(): number;
    get gl(): WebGL2RenderingContext | null;
    get isBGRA(): boolean;
    assertDevice(other: GPUDevice | null | undefined): void;
    configureSurface(context: GPUCanvasContext, opts?: {
        format?: GPUTextureFormat;
        alphaMode?: GPUCanvasAlphaMode;
        usage?: number;
    }): void;
    bindCanvas(canvas: HTMLCanvasElement, opts?: {
        format?: GPUTextureFormat;
        alphaMode?: GPUCanvasAlphaMode;
        usage?: number;
    }): GPUCanvasContext;
    setBackend(backend: "pure" | "hybrid", { canvas, gl }?: {
        canvas?: HTMLCanvasElement;
        gl?: WebGL2RenderingContext;
    }): void;
    present(w: number, h: number): void;
    renderTextures({ color, depth, w, h }: {
        color: GPUTexture;
        depth?: GPUTexture;
        w: number;
        h: number;
    }): boolean;
    copyTexture(src: GPUTexture, dst: GPUTexture, size?: [number, number, number] | null): void;
    renderHybridViewport(w: number, h: number, { gl, drawMode, enableMesh, x, y, eye }?: {
        gl?: WebGL2RenderingContext;
        drawMode?: number;
        enableMesh?: boolean;
        x?: number;
        y?: number;
        eye?: number;
    }): void;
    shutdown(): void;
    set drawMode(v: number);
    get drawMode(): number;
    get isReady(): boolean;
    get progress(): any;
    get duration(): any;
    get currentTime(): number;
    get isPlaying(): boolean;
    get isBuffering(): boolean;
    get lastFetchStatus(): any;
    play(): void;
    pause(): void;
    seek(t: any): void;
    setSpeed(s: any): void;
    close(): void;
    clearVideo(): void;
    clearEnvironment(): void;
    open(src: {
        type?: "static";
        url?: string;
        file?: File;
        localFile?: File;
        token?: string;
        audio?: string;
    }): Promise<void> | undefined;
    get audioContext(): AudioContext | null;
    get audioEnabled(): boolean;
    enableAudio(): void;
    disableAudio(): void;
    setAudioOutput(opts: any): void;
    setVolume(v: any): void;
    loadAudio(url: any): Promise<void>;
    setAudioSpatial(x: any, y: any, z: any): void;
    setAudioSourceMatrix(matrixWorld: any, localPosition: any, positionScale: any): void;
    setAudioListenerMatrix(matrixWorld: any): void;
    setAudioPanner(attr: any): void;
    setCamera(viewL: any, projL: any, viewR: any, projR: any): void;
    getBBox(): {
        minX: number;
        minY: number;
        minZ: number;
        maxX: number;
        maxY: number;
        maxZ: number;
    } | null;
    getModelMatrix(): Float32Array<ArrayBufferLike> | null;
    setModelMatrix(elements: any): void;
    setStaticModelMatrix(elements: any): void;
    setEnvLighting(coefs: ArrayLike<number>, scale?: number): void;
    clearEnvLighting(): void;
    frame(w: any, h: any, drawMode: any): void;
    preprocess(w: any, h: any): any;
    render(mode: any, x: any, y: any, w: any, h: any, eye: any): void;
    renderMesh(mvpElements: any, x: any, y: any, w: any, h: any): void;
    renderMotionMV(x: any, y: any, w: any, h: any): void;
    canMotion(): boolean;
    hasMultiview(): boolean;
    resetXR(): void;
    dispose(): void;
    #private;
}

declare function envCoefsFromSH27(sh: any, lightDir?: null, contrast?: number): Float32Array<ArrayBuffer>;
declare function envCoefsFromPreset(p: any): Float32Array<ArrayBuffer>;

declare const axis: Readonly<{
    X: readonly number[];
    Y: readonly number[];
    Z: readonly number[];
    FORWARD: readonly number[];
    FLIP_X: readonly number[];
    FLIP_Z: readonly number[];
}>;
declare namespace num {
    function clamp(v: any, min: any, max: any): number;
    function clampInt(v: any, min: any, max: any): number;
    function clamp01(v: any): number;
    function unlerp01(v: any, min: any, max: any): number;
    function finite(v: any, fallback?: number): any;
    function wrapPi(rad: any): any;
    function wrap(v: any, period: any): number;
    function wrapDelta(delta: any, period: any): any;
    function signedClamp(v: any, min: any, max: any): number;
    function zoomStep(factor: any, min?: number, max?: number): number;
    function absLogRatio(a: any, b: any): number;
    function outside(v: any, threshold: any): boolean;
    function perspectiveScale(distance: any, fovDeg: any, pixels: any): number;
    function deadzone(v: any, threshold: any): number;
    function deltaSeconds(now: any, last: any, fallback?: number, max?: number): number;
}
declare namespace bbox {
    function center(out: any, b: any): any;
}
declare class Vec3$1 extends Float32Array<ArrayBuffer> {
    constructor(v: any);
    set(x: any, y: any, z: any): any;
    0: any;
    1: any;
    2: any;
    fromXYZ(v: any): any;
    from(v: any): any;
    copy(v: any): any;
    add(v: any): this;
    addXYZ(x?: number, y?: number, z?: number): this;
    addTo(out: any, origin?: readonly number[]): any;
    addScaled(v: any, s: any): this;
    addDelta(current: any, previous: any): this;
    sub(a: any, b: any): this;
    subXYZ(a: any, b: any): any;
    scale(s: any): this;
    multiply(v: any): this;
    multiplyXYZ(x?: number, y?: number, z?: number): this;
    divide(v: any): this;
    clampScalar(min: any, max: any): this;
    normalize(fallback?: readonly number[]): any;
    setLength(len: any, fallback?: readonly number[]): any;
    cross(a: any, b: any): this;
    lerp(to: any, t: any): this;
    midXYZ(a: any, b: any): any;
    fromMat4Column(m: any, column: any): any;
    transformMat4(m: any): this;
    transformMat4Direction(m: any): this;
    transformQuat(q: any): this;
    fromYawPitch(yaw: any, pitch: any): any;
    yawPitch(forward: any): this;
    basisFromForward(up: any, forward: any, worldUp?: readonly number[]): this;
    yawPitchBasis(yaw: any, pitch: any, forward: any, back: any, up: any): this;
    rollBasis(up: any, roll: any): this;
    fromSphereDir(theta: any, phi: any): any;
    polarY(point: any, center: any, minRadius?: number): this;
    equals(v: any, eps?: number): boolean;
    toArray(): any[];
    toXYZ(): {
        x: any;
        y: any;
        z: any;
    };
    distanceXYZ(v: any): number;
    dot(v: any): number;
    get sqrLen(): number;
    get len(): number;
    get xzLen(): number;
    get minComponent(): number;
    get maxAbs(): number;
    set x(v: any);
    get x(): any;
    set y(v: any);
    get y(): any;
    set z(v: any);
    get z(): any;
}
declare class Quat extends Float32Array<ArrayBuffer> {
    constructor(q: any);
    set(x: any, y: any, z: any, w: any): any;
    0: any;
    1: any;
    2: any;
    3: any;
    fromXYZW(q: any): any;
    from(q: any): any;
    copy(q: any): any;
    identity(): any;
    normalize(): any;
    scale(s: any): this;
    setAxisAngle(axis: any, rad: any): any;
    rotatePre(axis: any, rad: any): this;
    rotate(axis: any, rad: any): this;
    mul(a: any, b: any): this;
    invert(q?: this): any;
    slerp(to: any, t: any): any;
    toXYZW(): {
        x: any;
        y: any;
        z: any;
        w: any;
    };
    set x(v: any);
    get x(): any;
    set y(v: any);
    get y(): any;
    set z(v: any);
    get z(): any;
    set w(v: any);
    get w(): any;
}
declare class Mat4 extends Float32Array<ArrayBuffer> {
    constructor(m: any);
    copy(m: any): this;
    identity(): this;
    0: any;
    5: any;
    10: any;
    15: any;
    multiply(a: any, b: any): any;
    preMultiply(m: any): any;
    fromTranslation(v: any): this;
    12: any;
    13: any;
    14: any;
    fromScaling(v: any): this;
    perspective(fovDeg: any, aspect: any, near: any, far: any): this;
    11: number | undefined;
    cameraWorld(eye: any, target: any, up?: readonly number[]): this;
    cameraWorldAxes(eye: any, x: any, y: any, z: any): this;
    1: any;
    2: any;
    3: number | undefined;
    4: any;
    6: any;
    7: number | undefined;
    8: any;
    9: any;
    fromQuat(q: any): this;
    fromTransform(transform: any): this;
    fromRotationTranslationScale(q: any, v: any, s: any): this;
    setPosition(v: any): this;
    translate(v: any): this;
    scale(v: any): this;
    fromPivot(position: any, rotation: any, scale: any, pivot: any, base: any): any;
    pointTo(out: any, p?: readonly number[], scale?: number): any;
    poseTo(out: any): any;
}
declare class Bounds {
    constructor({ type, position, rotation, scale }: {
        type: any;
        position: any;
        rotation: any;
        scale: any;
    });
    clampPoint(point: Float32Array | number[]): void;
    rayLimit(origin: any, dir: any, max: any): number;
    #private;
}
declare namespace vec3 {
    function create(): Vec3$1;
}
declare namespace quat {
    export function create_1(): Quat;
    export { create_1 as create };
}
declare namespace mat4 {
    export function create_2(): Mat4;
    export { create_2 as create };
    export function clone(m: any): Mat4;
    export { pointToImpl as pointTo };
    export { poseToImpl as poseTo };
}
declare function pointToImpl(out: any, m: any, p?: readonly number[], scale?: number): any;
declare function poseToImpl(out: any, m: any): any;

declare const ENV_PRESETS: Record<EnvPresetName$1, EnvPreset | null>;
type EnvPreset = {
    ambient: number[];
    topDown: number[];
    frontBack?: number[] | undefined;
    leftRight?: number[] | undefined;
};
type EnvPresetName$1 = "daylight" | "cloudy" | "sunset" | "indoor" | "shade" | "night" | "off";

type CameraControls = {
    type: "orbit" | "fly" | "trackball";
    update: (dt: number) => void;
    frame: (center: ArrayLike<number> | {
        x: number;
        y: number;
        z: number;
    }, eyePos: ArrayLike<number> | {
        x: number;
        y: number;
        z: number;
    }) => void;
    zoom: (factor: number) => void;
    reset: (target: ArrayLike<number>, eyePos: ArrayLike<number> | {
        x: number;
        y: number;
        z: number;
    }) => void;
    applyConstraints: (hasTransform: boolean) => void;
    setBounds: (bounds: Bounds | null) => void;
    dispose: () => void;
};

declare class Camera2D {
    constructor(canvas: HTMLCanvasElement, controlsType?: "orbit" | "fly" | "trackball");
    get canPresent(): boolean;
    get controls(): CameraControls;
    get controlsType(): "orbit" | "fly" | "trackball";
    setControls(type: "orbit" | "fly" | "trackball"): void;
    setSceneTransform(t: SceneTransform$1 | null): void;
    setAudioPosition(pos: {
        x: number;
        y: number;
        z: number;
    } | null): void;
    setViewZSign(sign: 1 | -1): void;
    setBBox(bounds: {
        minX: number;
        minY: number;
        minZ: number;
        maxX: number;
        maxY: number;
        maxZ: number;
    }): void;
    setCameraBounds(bounds: {
        type: "box" | "sphere";
        position: {
            x: number;
            y: number;
            z: number;
        };
        rotation: {
            x: number;
            y: number;
            z: number;
            w: number;
        };
        scale: {
            x: number;
            y: number;
            z: number;
        };
    } | null): void;
    update(dt: number): void;
    apply(player: GraciaPlayer, w: number, h: number): void;
    zoom(f: number): void;
    reset(): void;
    dispose(): void;
    #private;
}

declare class GraciaXR$1 {
    constructor(player: GraciaPlayer, gl: WebGL2RenderingContext);
    onFrame: ((dt: number, frame: XRFrame) => void) | null;
    onBeforeRender: ((dt: number, frame: XRFrame, ref: XRReferenceSpace, pose: XRViewerPose, sources: XRInputSourceArray, player: any) => void) | null;
    onEyeRender: ((gl: WebGL2RenderingContext, fbo: WebGLFramebuffer, view: XRView, x: number, y: number, w: number, h: number) => void) | null;
    onASWRender: ((gl: WebGL2RenderingContext, eyes: any[]) => void) | null;
    onRefReset: (() => void) | null;
    onSessionEnd: (() => void) | null;
    externalLayers: XRLayer[];
    get session(): XRSession | null;
    get active(): boolean;
    get aswAvailable(): boolean;
    get aswActive(): boolean;
    get layeredActive(): boolean;
    get isAR(): boolean;
    get defaultDt(): number;
    get binding(): XRWebGLBinding | null;
    get refSpace(): XRReferenceSpace | null;
    set soundPosition(pos: {
        x: number;
        y: number;
        z: number;
    } | null);
    enter(ar?: boolean): Promise<{
        isQuest: boolean;
        isPico: boolean;
        isAVP: boolean;
    }>;
    exit(): void;
    renderFrame(dt: number, frame: XRFrame, sourcePositionScale?: number): void;
    #private;
}

type XRHandState = {
    active: boolean;
    gripping: boolean;
    grabRestart: boolean;
    triggerPressed: boolean;
    menuPressed: boolean;
    microSwipe: number;
    isTransientPointer: boolean;
    rayTransform: {
        position: {
            x: number;
            y: number;
            z: number;
        };
        orientation: {
            x: number;
            y: number;
            z: number;
            w: number;
        };
    } | null;
    gripTransform: {
        position: {
            x: number;
            y: number;
            z: number;
        };
        orientation: {
            x: number;
            y: number;
            z: number;
            w: number;
        };
    } | null;
    indexTip: {
        x: number;
        y: number;
        z: number;
    } | null;
    thumbTip: {
        x: number;
        y: number;
        z: number;
    } | null;
    isHandProfile: boolean;
};

declare class SceneManipulator {
    constructor(player: any, overlay?: any, { directGrab }?: {
        directGrab?: boolean;
    });
    setOverlay(overlay: any): void;
    reset(): void;
    invalidateBBox(): void;
    setInitialTransform(t: any, zSign?: 1 | -1): void;
    get scene(): any;
    get scale(): number;
    get leftHand(): XRHandState;
    get rightHand(): XRHandState;
    set locked(v: boolean);
    get locked(): boolean;
    set scaleLocked(v: boolean);
    get scaleLocked(): boolean;
    resetToInitial(): void;
    update(dt: number, frame: XRFrame, ref: XRReferenceSpace, sources: XRInputSource[], uiActive: boolean, uiDragging?: boolean): void;
    #private;
}

declare class GraciaApp {
    static create(Module: any, { container, overlay, mode }?: {
        container: HTMLElement;
        overlay?: any;
        mode?: string;
    }): Promise<GraciaApp>;
    onProgress: ((pct: number) => void) | null;
    onReady: (() => void) | null;
    onError: ((statusOrError: number | Error) => void) | null;
    onFrame: (() => void) | null;
    onBeforeFrame: ((dt: number) => void) | null;
    onModeChange: ((mode: string, prevMode: string) => void) | null;
    onSceneChange: ((src: any, idx: number) => void) | null;
    get player(): GraciaPlayer | null;
    get camera(): Camera2D | null;
    get canvas(): HTMLCanvasElement;
    get gl(): WebGLRenderingContext | WebGL2RenderingContext;
    get audioContext(): AudioContext | null;
    get device(): GPUDevice | null;
    get mode(): string;
    get fallbackMode(): string;
    get xr(): GraciaXR$1 | null;
    get manipulator(): SceneManipulator | null;
    set drawMode(v: number);
    get drawMode(): number;
    supports(mode: string): boolean;
    set sources(arr: any[]);
    get sources(): any[];
    get sceneIndex(): number;
    loadScene(idx: number): void;
    start(): void;
    stop(): void;
    open(src: object): Promise<void>;
    close(): void;
    setMode(mode: string): Promise<void>;
    setAudio(url: string): void;
    setVolume(v: number): void;
    enableAudio(): void;
    disableAudio(): void;
    get audioEnabled(): boolean;
    setAudioPanner(attr: Partial<PannerNode>): void;
    setBackground(color: string | null | undefined): void;
    setInitialTransform(tf: SceneTransform$1 | null, staticTransform?: SceneTransform$1 | null): void;
    reset(): void;
    setControls(type: "orbit" | "fly" | "trackball"): void;
    setCameraBounds(bounds: {
        type: "box" | "sphere";
        position: {
            x: number;
            y: number;
            z: number;
        };
        rotation: {
            x: number;
            y: number;
            z: number;
            w: number;
        };
        scale: {
            x: number;
            y: number;
            z: number;
        };
    } | null): void;
    setAudioPosition(pos: {
        x: number;
        y: number;
        z: number;
    } | null): void;
    dispose(): void;
    #private;
}
type SceneTransform$1 = {
    rotation: {
        x: number;
        y: number;
        z: number;
        w: number;
    };
    translation: {
        x: number;
        y: number;
        z: number;
    };
    scale: {
        x: number;
        y: number;
        z: number;
    };
};

type EnvPresetName = EnvPresetName$1;

declare class GraciaSplats {
    static attach(player: GraciaPlayer, app: playcanvas.Application, camera: playcanvas.Entity): GraciaSplats;
    constructor(player: GraciaPlayer, app: playcanvas.Application, camera: playcanvas.Entity);
    enableMesh: boolean;
    get player(): GraciaPlayer;
    set camera(c: playcanvas.Entity);
    get camera(): playcanvas.Entity;
    setAudio(url: string): Promise<void>;
    setAudioPanner(attr: Partial<PannerNode>): void;
    set entity(e: playcanvas.Entity | null);
    get entity(): playcanvas.Entity | null;
    dispose(): void;
    renderFrame(): void;
    #private;
}

type GraciaMode = "pw" | "hw" | "vr" | "ar";
interface SceneTransform {
    rotation?: {
        x: number;
        y: number;
        z: number;
        w: number;
    };
    translation?: {
        x: number;
        y: number;
        z: number;
    };
    scale?: {
        x: number;
        y: number;
        z: number;
    };
}
interface GraciaSource {
    url: string;
    id?: string;
    label?: string;
    displayName?: string;
    audio?: string;
    initialTransform?: SceneTransform | null;
    staticTransform?: SceneTransform | null;
    staticUrl?: string;
    background?: string;
    controls?: "orbit" | "fly" | "trackball";
    locked?: boolean;
    scaleLocked?: boolean;
    autoSwitchToNext?: boolean;
    resetPositionOnStart?: boolean;
    [key: string]: unknown;
}
interface GraciaEventLogger {
    event?(name: string, data?: Record<string, unknown>): void;
    error?(error: Error, data?: Record<string, unknown>): void;
}
interface UseGraciaPlayerOptions {
    containerRef: RefObject<HTMLElement>;
    mode?: GraciaMode;
    overlay?: any;
    moduleUrl?: string;
    moduleFactory?: () => Promise<any>;
    onReady?: () => void;
    onProgress?: (percent: number) => void;
    onModeChange?: (mode: GraciaMode, prevMode: GraciaMode) => void;
    onXRStart?: () => void;
    onXREnd?: () => void;
    eventLogger?: GraciaEventLogger;
}
interface GraciaPlayback {
    isPlaying: boolean;
    isBuffering: boolean;
    currentTime: number;
    duration: number;
    isMuted: boolean;
    volume: number;
    play(): void;
    pause(): void;
    togglePlay(): void;
    seek(time: number): void;
    setSpeed(speed: number): void;
    setVolume(volume: number): void;
    toggleMute(): void;
    setAudio(url: string): void;
}
interface GraciaCamera {
    zoom(factor: number): void;
    reset(): void;
}
interface GraciaXR {
    vrSupported: boolean;
    arSupported: boolean;
    isActive: boolean;
    setMode(mode: GraciaMode): Promise<void>;
}
interface GraciaPlayerState {
    app: GraciaApp | null;
    device: GPUDevice | null;
    overlay: any | null;
    isInitialized: boolean;
    isLoading: boolean;
    isContentReady: boolean;
    progress: number;
    mode: GraciaMode;
    error: Error | null;
    isRebuffering: boolean;
    open(source: GraciaSource): void;
    close(): void;
    dispose(): void;
    playback: GraciaPlayback;
    camera: GraciaCamera;
    xr: GraciaXR;
}

interface StreamingItemSettings {
    resetPositionOnStart?: boolean;
}
interface StreamingItem {
    streamingId: string;
    token: string;
    label?: string;
    settings?: StreamingItemSettings;
    rawMetadata?: Record<string, string>;
}
interface Vec3 {
    x: number;
    y: number;
    z: number;
}
interface Vec4 {
    x: number;
    y: number;
    z: number;
    w: number;
}
interface StreamingMetadata {
    name: string;
    fileType: {
        type: string;
        version: number;
    };
    renderer: {
        type: string;
        version: number;
    };
    initialSpawn: {
        translation: Vec3;
        rotation: Vec4;
        scale: Vec3;
    };
    videoDuration: number;
    withAudio: boolean;
    slowMoAllowed: boolean;
    isPOV: boolean;
    audioSync: boolean;
    shouldTransitionToNextScene: boolean;
    rewindable: boolean;
    hasBestView: boolean;
}
interface StreamingContentResponse {
    metadata: StreamingMetadata | null;
    audioFileLink: string | null;
}
declare function fetchStreamingMetadata(baseUrl: string, streamingId: string, token: string): Promise<StreamingContentResponse>;
declare function buildApiSources(items: StreamingItem[], baseUrl: string): Promise<GraciaSource[]>;

declare function useGraciaPlayer(options: UseGraciaPlayerOptions): GraciaPlayerState;

interface GraciaPlaylist {
    sources: GraciaSource[];
    index: number;
    total: number;
    currentSource: GraciaSource | null;
    hasNext: boolean;
    hasPrev: boolean;
    hasAudio: boolean;
    setSources(sources: GraciaSource[]): void;
    loadFromApi(items: StreamingItem[], baseUrl: string): Promise<void>;
    next(): void;
    prev(): void;
    goTo(index: number): void;
}
declare function useGraciaPlaylist(gracia: GraciaPlayerState): GraciaPlaylist;

declare class SplatsMesh extends Mesh<BufferGeometry<three.NormalBufferAttributes, three.BufferGeometryEventMap>, three.Material<three.MaterialEventMap> | three.Material<three.MaterialEventMap>[], three.Object3DEventMap> {
    constructor(player: GraciaPlayer);
    enableMesh: boolean;
    onBeforeRender: (renderer: any, _scene: any, camera: any) => void;
    onBeforeShadow: (renderer: any, _object: any, _camera: any, shadowCamera: any) => void;
    get player(): GraciaPlayer;
    setAudio(url: string): Promise<void>;
    setAudioListener(listener: three.AudioListener | null): void;
    setAudioPanner(attr: Partial<PannerNode>): void;
    dispose(): void;
    #private;
}

declare class SplatsRendererW3 {
    static attach(player: GraciaPlayer, threeRenderer: three.WebGPURenderer): SplatsRendererW3;
    constructor(player: GraciaPlayer, renderer: three.WebGPURenderer);
    root: Object3D<three.Object3DEventMap>;
    get player(): GraciaPlayer;
    setAudioListener(listener: three.AudioListener | null): void;
    setAudioPanner(attr: Partial<PannerNode>): void;
    render(renderer: three.WebGPURenderer, scene: three.Scene, camera: three.Camera, overlayScene?: three.Scene): void;
    setStaticModelMatrix(elements: ArrayLike<number>): void;
    dispose(): void;
    #private;
}

declare class QuadLayer {
    constructor(THREE: any, opts: any);
    alpha: number;
    onDragTick: null;
    onDragEnd: null;
    get canvas(): HTMLCanvasElement;
    get scene(): any;
    get pixelWidth(): number;
    get pixelHeight(): number;
    get hitMesh(): any;
    get hitSpheres(): any[];
    get pointer(): null;
    get cursor(): any;
    mountReact(element: any): Promise<void>;
    rayHitQuad(origin: any, direction: any, sphereIdx: any): {
        x: number;
        y: number;
    } | null;
    gazeHitsQuad(viewerPose: any, target: any): boolean;
    get projected(): boolean;
    get layer(): null;
    get pose(): null;
    get visible(): boolean;
    get placing(): boolean;
    get session(): null;
    get interacting(): boolean;
    set dragging(v: boolean);
    get dragging(): boolean;
    set panelDragging(v: boolean);
    get panelDragging(): boolean;
    setPointer(x: any, y: any, pressed: any): void;
    clearPointer(): void;
    initFlat(): void;
    renderFlat(): void;
    init(session: any, binding: any, ref: any, gl: any): Promise<null>;
    show(): void;
    hide(): void;
    setTransform(xform: any): void;
    stash(): void;
    applyPose(x: any, y: any, z: any, qx: any, qy: any, qz: any, qw: any): void;
    updatePosition(pose: any): void;
    drawContent(frame: any): void;
    renderEye(gl: any, view: any, x: any, y: any, w: any, h: any): void;
    handleInput(leftHand: any, rightHand: any, viewerPose: any): boolean;
    dispose(): void;
    #private;
}

declare class ControlsBase {
    constructor(THREE: any, quadConfig: any);
    _quad: QuadLayer;
    _sig: null;
    onPlayPause: null;
    onSeek: null;
    onPresetCycle: null;
    onExit: null;
    onClose: null;
    onSceneNav: null;
    get quad(): QuadLayer;
    _createBaseSignals(): {
        loadingD: _preact_signals_core.Signal<string>;
        contentD: _preact_signals_core.Signal<string>;
        playD: _preact_signals_core.Signal<string>;
        pauseD: _preact_signals_core.Signal<string>;
        spinD: _preact_signals_core.Signal<string>;
        spinR: _preact_signals_core.Signal<number>;
        fillD: _preact_signals_core.Signal<string>;
        spinFast: _preact_signals_core.Signal<boolean>;
    };
    _updatePlayback(s: any, { loading, playing, spinning, buffering, progress }: {
        loading: any;
        playing: any;
        spinning: any;
        buffering: any;
        progress: any;
    }): void;
    render(dt: any): void;
    _seekFromEvent(e: any): void;
    _seekTo(_x: any): void;
    _setProgress(_v: any): void;
}

declare class ClassicControls extends ControlsBase {
    constructor(THREE: any);
    update({ loading, playing, spinning, buffering, progress, timeText, presetName, sceneText, sceneLabel, }: {
        loading?: boolean | undefined;
        playing?: boolean | undefined;
        spinning?: boolean | undefined;
        buffering?: boolean | undefined;
        progress?: number | undefined;
        timeText?: string | undefined;
        presetName?: null | undefined;
        sceneText?: null | undefined;
        sceneLabel?: null | undefined;
    }): void;
    #private;
}

declare class SceneOverlay {
    constructor(THREE: any);
    get scene(): any;
    get anchor(): any;
    get bboxMesh(): any;
    get hasBBox(): boolean;
    rebuildBBox(bb: {
        minX: number;
        minY: number;
        minZ: number;
        maxX: number;
        maxY: number;
        maxZ: number;
    }, sceneTransform: ArrayLike<number>): {
        cx: number;
        cy: number;
        cz: number;
    };
    applyTransform(pos: ArrayLike<number>, scale: number): void;
    hitTest(transform: {
        position: {
            x: number;
            y: number;
            z: number;
        };
        orientation: {
            x: number;
            y: number;
            z: number;
            w: number;
        };
    }): boolean;
    #private;
}

declare class DebugRenderer {
    constructor(THREE: any, sceneOverlay: SceneOverlay);
    update(left: any, right: any): void;
    dispose(): void;
    #private;
}

declare class ModernControls extends ControlsBase {
    constructor(THREE: any);
    onMuteToggle: null;
    onScaleLockToggle: null;
    onLockToggle: null;
    onReset: null;
    update({ loading, playing, spinning, buffering, progress, timeText, presetName, muted, locked, scaleLocked, sceneText, sceneLabel, bannerText, }: {
        loading?: boolean | undefined;
        playing?: boolean | undefined;
        spinning?: boolean | undefined;
        buffering?: boolean | undefined;
        progress?: number | undefined;
        timeText?: string | undefined;
        presetName?: null | undefined;
        muted?: boolean | undefined;
        locked?: boolean | undefined;
        scaleLocked?: boolean | undefined;
        sceneText?: null | undefined;
        sceneLabel?: null | undefined;
        bannerText?: null | undefined;
    }): void;
    #private;
}

declare class XROverlay {
    constructor(THREE: any, { debug, uiStyle, rays }?: {
        debug?: boolean | undefined;
        uiStyle?: string | undefined;
        rays?: boolean | undefined;
    });
    set uiStyle(v: string);
    get uiStyle(): string;
    set manipulator(m: null);
    get manipulator(): null;
    get uiActive(): any;
    get uiDragging(): any;
    get quads(): any[];
    set sources(arr: any[]);
    get sources(): any[];
    set sceneIndex(i: number);
    get sceneIndex(): number;
    set onSceneChange(fn: null);
    get onSceneChange(): null;
    set onPresetChange(fn: null);
    get onPresetChange(): null;
    set onLock(fn: null);
    get onLock(): null;
    set onScaleLock(fn: null);
    get onScaleLock(): null;
    set bannerText(t: string | null);
    get bannerText(): string | null;
    set eventLogger(cb: null);
    get eventLogger(): null;
    setPreset(name: any, scale?: number): void;
    syncPreset(name: any): void;
    init(player: any, sess: any, bind: any, ref: any, gl: any, _ar?: boolean): Promise<any[]>;
    frame(dt: any, frame: any, _ref: any, pose: any, _sources: any, player: any): void;
    renderEye(gl: any, fbo: any, view: any, x: any, y: any, w: any, h: any): void;
    onRefReset(): void;
    render(_gl: any, _eyes: any): void;
    dispose(): void;
    #private;
}

declare class XRRayRenderer {
    static #RAY_LENGTH: number;
    static #START_OFFSET: number;
    static #FADE_IN_FRAC: number;
    static #RADIAL_SEGS: number;
    static #HEIGHT_SEGS: number;
    static #BASE_RADIUS: number;
    static #TIP_RADIUS: number;
    static #BASE_ALPHA: number;
    constructor(THREE: any, scene: any);
    update(left: any, right: any, hitSpheres?: any[], visible?: boolean): void;
    dispose(): void;
    #private;
}

export { ClassicControls, DebugRenderer, ENV_PRESETS, type EnvPresetName, GraciaApp, type GraciaCamera, type GraciaEventLogger, type GraciaMode, type GraciaPlayback, GraciaPlayer, type GraciaPlayerState, type GraciaPlaylist, type GraciaSource, GraciaSplats, type GraciaXR, Mat4, ModernControls, QuadLayer, Quat, SceneManipulator, SceneOverlay, type SceneTransform, SplatsMesh, SplatsRendererW3, type StreamingItem, type StreamingItemSettings, type UseGraciaPlayerOptions, Vec3$1 as Vec3, XROverlay, XRRayRenderer, axis, bbox, buildApiSources, envCoefsFromPreset, envCoefsFromSH27, fetchStreamingMetadata, loadGraciaModule, mat4, num, envCoefsFromPreset as presetToLightProbe, quat, useGraciaPlayer, useGraciaPlaylist, vec3 };
