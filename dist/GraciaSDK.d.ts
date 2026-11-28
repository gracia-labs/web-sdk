import * as playcanvas from 'playcanvas';
import * as react from 'react';
import { RefObject, CSSProperties, ReactNode } from 'react';
import * as three from 'three';
import { Mesh, BufferGeometry, Object3D } from 'three';
import * as _preact_signals_core from '@preact/signals-core';

declare function loadGraciaModule(wasmSpecifier?: string): Promise<any>;

declare class GraciaPlayer$1 {
    static create(Player: any, { canvas, gl, backend, maxSplatsCount, xrCompatible }?: {
        canvas?: HTMLCanvasElement;
        gl?: WebGLRenderingContext | WebGL2RenderingContext;
        backend?: "pure" | "hybrid";
        maxSplatsCount?: number;
        xrCompatible?: boolean;
    }): Promise<GraciaPlayer$1>;
    static preferredFormat(): GPUTextureFormat;
    static #gl2(canvas: any): any;
    constructor(player: Player, device: GPUDevice);
    player: Player;
    get device(): GPUDevice;
    get backend(): "pure" | "hybrid" | null;
    get buildUnixTime(): number;
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
    renderHybridViewport(w: number, h: number, { enableMesh }?: {
        enableMesh?: boolean;
    }): void;
    frame(w: any, h: any, drawMode: any): void;
    renderMesh(mvpElements: any, x: any, y: any, w: any, h: any): void;
    set drawMode(v: number);
    get drawMode(): number;
    get isReady(): boolean;
    get progress(): any;
    get duration(): any;
    get playbackRange(): {
        start: any;
        end: any;
    };
    get ended(): any;
    get currentTime(): any;
    get isPlaying(): any;
    get isBuffering(): boolean;
    get lastFetchStatus(): any;
    get status(): number;
    get opset(): number;
    get maxOpset(): number;
    play(): void;
    pause(): void;
    seek(t: any): void;
    setPlaybackRange(start: number, end: number): void;
    clearPlaybackRange(): void;
    get speed(): any;
    setSpeed(s: number): void;
    close(): void;
    clearVideo(): void;
    clearEnvironment(): void;
    open(src: {
        type?: "static" | "grv";
        url?: string;
        file?: File;
        localFile?: File;
        token?: string;
        audio?: string;
        head?: ArrayBuffer | Uint8Array;
        sounds?: boolean;
    }): Promise<void>;
    get audioEnabled(): boolean;
    enableAudio(): void;
    disableAudio(): void;
    setVolume(v: any): void;
    loadAudio(url: any): Promise<void>;
    setAudioSourceMatrix(matrixWorld: any, localPosition: any, positionScale: any): void;
    setAudioListenerMatrix(matrixWorld: any): void;
    setAudioPanner(attr: any): void;
    setCamera(viewL: any, projL: any): void;
    getBBox(): {
        minX: number;
        minY: number;
        minZ: number;
        maxX: number;
        maxY: number;
        maxZ: number;
    } | null;
    getViewpoints(): {
        display: {
            position: number[];
            rotation: number[];
        } | null;
        vr: {
            position: number[];
            rotation: number[];
        } | null;
    };
    get hasSounds(): boolean;
    getModelMatrix(): Float32Array;
    setModelMatrix(elements: any): void;
    enterXR(options?: {
        mode?: "vr" | "ar";
        features?: string[];
    }): Promise<any>;
    setStaticModelMatrix(elements: any): void;
    setEnvLighting(coefs: ArrayLike<number>, scale?: number): void;
    clearEnvLighting(): void;
    dispose(): void;
    #private;
}

declare class SceneBoundary {
    get active(): boolean;
    get darkness(): number;
    get outlineOpacity(): number;
    get outlineUrgent(): boolean;
    setBounds(config: object | null): this;
    setRoomMatrix(m: ArrayLike<number> | null): this;
    queueIntro(): this;
    reset(): this;
    update(head: ArrayLike<number> | {
        x: number;
        y: number;
        z: number;
    }, dt: number): this;
    ribbon(width: number): Float32Array<ArrayBuffer>;
    #private;
}

declare function envCoefsFromSH27(sh: any, lightDir?: null, contrast?: number): Float32Array<ArrayBuffer>;
declare function envCoefsFromPreset(p: any): Float32Array<ArrayBuffer>;

declare const axis: Readonly<{
    X: readonly number[];
    Y: readonly number[];
    Z: readonly number[];
    FORWARD: readonly number[];
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
    function absLogRatio(a: any, b: any): number;
    function outside(v: any, threshold: any): boolean;
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
    addScaled(v: any, s: any): this;
    sub(a: any, b: any): this;
    subXYZ(a: any, b: any): any;
    scale(s: any): this;
    multiplyXYZ(x?: number, y?: number, z?: number): this;
    normalize(fallback?: readonly number[]): any;
    lerp(to: any, t: any): this;
    midXYZ(a: any, b: any): any;
    transformMat4(m: any): this;
    transformMat4Direction(m: any): this;
    transformQuat(q: any): this;
    toXYZ(): {
        x: any;
        y: any;
        z: any;
    };
    distanceXYZ(v: any): number;
    get sqrLen(): number;
    get xzLen(): number;
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
    fromQuat(q: any): this;
    fromTransform(transform: any): this;
    fromRotationTranslationScale(q: any, v: any, s: any): this;
    1: number | undefined;
    2: number | undefined;
    3: number | undefined;
    4: number | undefined;
    6: number | undefined;
    7: number | undefined;
    8: number | undefined;
    9: number | undefined;
    11: number | undefined;
    translate(v: any): this;
    scale(v: any): this;
    fromPivot(position: any, rotation: any, scale: any, pivot: any, base: any): any;
    pointTo(out: any, p?: readonly number[], scale?: number): any;
    poseTo(out: any): any;
    get determinant3(): number;
    decompose(position: any, rotation: any, scale: any): this;
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

declare class GraciaApp {
    static create(Module: any, { container, overlay, boundaryRenderer, mode, xrBackend, }?: {
        container: HTMLElement;
        overlay?: any;
        boundaryRenderer?: any;
        mode?: string;
        xrBackend?: "auto" | "webgl" | "webgpu";
    }): Promise<GraciaApp>;
    onProgress: ((pct: number) => void) | null;
    onReady: (() => void) | null;
    onError: ((statusOrError: number | Error, phase?: "load") => void) | null;
    onFrame: (() => void) | null;
    onModeChange: ((mode: string, prevMode: string) => void) | null;
    onSceneChange: ((src: any, idx: number) => void) | null;
    onSceneEnd: ((src: any, idx: number) => void) | null;
    get player(): GraciaPlayer$1 | null;
    get camera(): any;
    get mode(): string;
    get fallbackMode(): string;
    get xr(): null;
    get xrBackend(): "webgl" | "webgpu";
    checkXR(): Promise<void>;
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
    setBackground(color: string | null | undefined): void;
    setInitialTransform(tf: SceneTransform$1 | null): void;
    setBounds(bounds: SceneBounds$1 | null): void;
    setAudioPosition(pos: {
        x: number;
        y: number;
        z: number;
    } | null): void;
    dispose(): void;
    #private;
}
type SceneBounds$1 = {
    type: "box" | "sphere" | "sector";
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
    angleDeg?: number;
};
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

type SpawnOf = (out: Float32Array, viewpoint: Float32Array, head: Float32Array) => Float32Array;

declare class SceneManipulator {
    constructor(player: any, { directGrab, spawnOf }: {
        directGrab?: boolean;
        spawnOf: SpawnOf;
    });
    setOverlay(overlay: any): void;
    reset(): void;
    invalidateBBox(): void;
    setInitialTransform(t: any, viewpoint?: {
        position: number[];
        rotation: number[];
    } | null): void;
    get scale(): number;
    get roomMatrix(): Float32Array;
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

type EnvPresetName = EnvPresetName$1;

declare class GraciaSplats {
    static attach(player: GraciaPlayer$1, app: playcanvas.Application, camera: playcanvas.Entity): GraciaSplats;
    constructor(player: GraciaPlayer$1, app: playcanvas.Application, camera: playcanvas.Entity);
    enableMesh: boolean;
    get player(): GraciaPlayer$1;
    setAudio(url: string): Promise<void>;
    setAudioPanner(attr: Partial<PannerNode>): void;
    set entity(e: playcanvas.Entity | null);
    get entity(): playcanvas.Entity | null;
    dispose(): void;
    renderFrame(): void;
    #private;
}

type GraciaMode = "pw" | "hw" | "vr" | "ar";
type XRBackend = "auto" | "webgl" | "webgpu";
type CameraControlsType = "orbit" | "look";
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
interface SceneBounds {
    type: "box" | "sphere" | "sector";
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
    angleDeg?: number;
}
interface GraciaSource {
    url: string;
    id?: string;
    label?: string;
    displayName?: string;
    audio?: string;
    type?: "static" | "grv";
    head?: ArrayBuffer | Uint8Array;
    initialTransform?: SceneTransform | null;
    staticTransform?: SceneTransform | null;
    bounds?: SceneBounds | null;
    staticUrl?: string;
    background?: string;
    controls?: CameraControlsType;
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
    xrBackend?: XRBackend;
    overlay?: any;
    boundaryRenderer?: any;
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
    hasSounds: boolean;
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
    controlsType: CameraControlsType;
    zoom(factor: number): void;
    reset(): void;
    setControls(type: CameraControlsType): void;
}
interface GraciaXR {
    vrSupported: boolean;
    arSupported: boolean;
    isActive: boolean;
    backend: "webgl" | "webgpu";
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
    rawMetadata?: Partial<GraciaSource>;
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
    bounds?: SceneBounds | null;
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
interface GraciaPlaylistOptions {
    onSceneEnd?(source: GraciaSource, index: number): void;
}
declare function useGraciaPlaylist(gracia: GraciaPlayerState, options?: GraciaPlaylistOptions): GraciaPlaylist;

type SceneSelectorMode = "menu" | "stepper" | "tabs";
type XROverlayConfig = {
    uiStyle?: "modern" | "classic";
    bannerText?: string;
};
type XROverlayProp = false | XROverlayConfig | undefined;
interface CommonProps {
    muted?: boolean;
    controls?: boolean;
    cameraControls?: boolean;
    sceneSelector?: SceneSelectorMode;
    localFiles?: boolean;
    xrOverlay?: XROverlayProp;
    xrBackend?: XRBackend;
    className?: string;
    style?: CSSProperties;
    children?: ReactNode | ((api: GraciaPlayerRenderProps) => ReactNode);
    moduleFactory?: () => Promise<unknown>;
    onReady?: () => void;
    onProgress?: (percent: number) => void;
    onModeChange?: (mode: GraciaMode, prevMode: GraciaMode) => void;
    onXRStart?: () => void;
    onXREnd?: () => void;
    onSceneChange?: (source: GraciaSource, index: number) => void;
    onError?: (error: Error, data?: Record<string, unknown>) => void;
    eventLogger?: GraciaEventLogger;
}
interface GraciaPlayerRenderProps {
    gracia: GraciaPlayerState;
    playlist: GraciaPlaylist;
}
type GraciaPlayerProps = CommonProps & {
    sources?: GraciaSource[];
    streaming?: StreamingItem[];
};
interface GraciaPlayerHandle {
    readonly gracia: GraciaPlayerState;
    readonly playlist: GraciaPlaylist;
    readonly cameraControlsType: CameraControlsType;
    play(): void;
    pause(): void;
    seek(time: number): void;
    open(source: string | GraciaSource): void;
    close(): void;
    next(): void;
    prev(): void;
    goTo(index: number): void;
    resetCamera(): void;
    setCameraControls(type: CameraControlsType): void;
    setMode(mode: GraciaMode): Promise<void>;
    toggleFullscreen(): Promise<void>;
    openLocalFile(): Promise<void>;
}
interface MountedGraciaPlayer {
    readonly player: GraciaPlayerHandle | null;
    update(nextProps: GraciaPlayerProps): void;
    unmount(): void;
    openLocalFile(): Promise<void>;
}

declare const GraciaPlayer: react.ForwardRefExoticComponent<CommonProps & {
    sources?: GraciaSource[];
    streaming?: StreamingItem[];
} & react.RefAttributes<GraciaPlayerHandle>>;

declare const GRACIA_PLAYER_DEFAULT_CSS: string;
declare function installGraciaPlayerStyles(root?: Document | ShadowRoot): void;

declare function mountGraciaPlayer(container: Element | DocumentFragment, props: GraciaPlayerProps): MountedGraciaPlayer;

declare class SplatsMesh extends Mesh<BufferGeometry<three.NormalBufferAttributes, three.BufferGeometryEventMap>, three.Material<three.MaterialEventMap> | three.Material<three.MaterialEventMap>[], three.Object3DEventMap> {
    constructor(player: GraciaPlayer$1);
    enableMesh: boolean;
    onBeforeRender: (renderer: any, _scene: any, camera: any) => void;
    onBeforeShadow: (renderer: any, _object: any, _camera: any, shadowCamera: any) => void;
    get player(): GraciaPlayer$1;
    setAudio(url: string): Promise<void>;
    dispose(): void;
    #private;
}

declare class SplatsRendererW3 {
    static attach(player: GraciaPlayer$1, threeRenderer: three.WebGPURenderer): SplatsRendererW3;
    constructor(player: GraciaPlayer$1, renderer: three.WebGPURenderer);
    root: Object3D<three.Object3DEventMap>;
    get player(): GraciaPlayer$1;
    render(renderer: three.WebGPURenderer, scene: three.Scene, camera: three.Camera, overlayScene?: three.Scene): void;
    setStaticModelMatrix(elements: ArrayLike<number>): void;
    dispose(): void;
    #private;
}

declare class BoundaryRenderer {
    constructor(THREE: any);
    init(gl: WebGL2RenderingContext | null, gpu?: {
        device: GPUDevice;
        format: GPUTextureFormat;
    } | null): void;
    sync(boundary: SceneBoundary): void;
    renderEye(gl: any, fbo: any, view: any, x: any, y: any, w: any, h: any): void;
    renderViews(eyes: Array<{
        view: XRView;
        projection: ArrayLike<number>;
        sub: XRGPUSubImage;
    }>): void;
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
    mountReact(element: any): Promise<void>;
    rayHitQuad(origin: any, direction: any, sphereIdx: any): {
        x: number;
        y: number;
    } | null;
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
    init(session: any, binding: any, ref: any, gl: any, gpu?: null): Promise<null>;
    show(): void;
    recenter(): void;
    hide(): void;
    applyPose(x: any, y: any, z: any, qx: any, qy: any, qz: any, qw: any): void;
    updatePosition(pose: any): void;
    drawContent(frame: any): void;
    renderEye(gl: any, view: any, x: any, y: any, w: any, h: any): void;
    renderViews(eyes: any): void;
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
    onAbLoopToggle: null;
    onAbLoopSet: null;
    update({ loading, playing, spinning, buffering, progress, timeText, presetName, muted, locked, scaleLocked, abLoop, sceneText, sceneLabel, bannerText, }: {
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
        abLoop?: {
            phase: string;
            start: number;
            end: number;
            gap: number;
        } | undefined;
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
    set bannerText(t: string | null);
    get bannerText(): string | null;
    set eventLogger(cb: null);
    get eventLogger(): null;
    syncPreset(name: any): void;
    init(player: any, sess: any, bind: any, ref: any, gl: any, gpu?: {
        device: GPUDevice;
        format: GPUTextureFormat;
    } | null): Promise<void>;
    frame(dt: any, frame: any, pose: any, player: any): void;
    renderEye(gl: any, fbo: any, view: any, x: any, y: any, w: any, h: any): void;
    renderViews(eyes: any, frame: any): void;
    onRefReset(): void;
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

export { BoundaryRenderer, type CameraControlsType, ClassicControls, DebugRenderer, ENV_PRESETS, type EnvPresetName, GRACIA_PLAYER_DEFAULT_CSS, GraciaApp, type GraciaCamera, type GraciaEventLogger, type GraciaMode, type GraciaPlayback, GraciaPlayer$1 as GraciaPlayer, type GraciaPlayerHandle, type GraciaPlayerProps, type GraciaPlayerState, type GraciaPlaylist, type GraciaPlaylistOptions, GraciaPlayer as GraciaReactPlayer, type GraciaSource, GraciaSplats, type GraciaXR, Mat4, ModernControls, type MountedGraciaPlayer, QuadLayer, Quat, type SceneBounds, SceneManipulator, SceneOverlay, type SceneSelectorMode, type SceneTransform, SplatsMesh, SplatsRendererW3, type StreamingItem, type StreamingItemSettings, type UseGraciaPlayerOptions, Vec3$1 as Vec3, type XRBackend, XROverlay, XRRayRenderer, axis, bbox, buildApiSources, envCoefsFromPreset, envCoefsFromSH27, fetchStreamingMetadata, installGraciaPlayerStyles, loadGraciaModule, mat4, mountGraciaPlayer, num, envCoefsFromPreset as presetToLightProbe, quat, useGraciaPlayer, useGraciaPlaylist, vec3 };
