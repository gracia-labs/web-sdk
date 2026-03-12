import * as gl_matrix from 'gl-matrix';
import { mat4 } from 'gl-matrix';
import { RefObject } from 'react';
import * as three from 'three';
import { Mesh, BufferGeometry } from 'three';
import * as _preact_signals_core from '@preact/signals-core';

declare class EnvLighting {
    constructor(coefs?: ArrayLike<number>);
    coefficients: Float32Array;
    prepare(lightDir: {
        x: number;
        y: number;
        z: number;
    }, contrast?: number, band2Scale?: number): this;
    normalize(contrast?: number): this;
}

declare class SyncedAudio {
    el: HTMLAudioElement | null;
    rate: number;
    load(url: string): Promise<void>;
    get ready(): boolean;
    sync(vt: number): void;
    pause(): void;
    dispose(): void;
    #private;
}

declare class GraciaPlayer {
    static create(Module: any, { canvas, gl }?: {
        canvas?: HTMLCanvasElement;
        gl?: WebGLRenderingContext | WebGL2RenderingContext;
    }): Promise<GraciaPlayer>;
    constructor(app: any);
    get app(): any;
    attachGL(gl: WebGLRenderingContext | WebGL2RenderingContext): void;
    detachGL(): void;
    initPure(selector: string): void;
    shutdown(): void;
    set drawMode(v: number);
    get drawMode(): number;
    get isReady(): boolean;
    get progress(): number;
    get duration(): number;
    get currentTime(): number;
    get isPlaying(): boolean;
    get isSeeking(): boolean;
    get isBuffering(): boolean;
    get lastFetchStatus(): number;
    get supportsImmediateSeek(): boolean;
    play(): void;
    pause(): void;
    seek(t: number): boolean;
    setSpeed(s: number): void;
    close(): void;
    open(src: object): Promise<number> | undefined;
    get audio(): SyncedAudio | null;
    loadAudio(url: string): Promise<void>;
    syncAudio(): void;
    pauseAudio(): void;
    getBBoxCenter(): number[] | null;
    setCamera(viewL: ArrayLike<number>, projL: ArrayLike<number>, viewR?: ArrayLike<number>, projR?: ArrayLike<number>): void;
    getBBox(): {
        minX: number;
        minY: number;
        minZ: number;
        maxX: number;
        maxY: number;
        maxZ: number;
    } | null;
    getModelMatrix(): Float32Array | null;
    setModelMatrix(elements: ArrayLike<number>): void;
    setEnvLighting(env: EnvLighting | number[] | Float32Array, scale?: number): void;
    clearEnvLighting(): void;
    frame(dt: number, w: number, h: number, drawMode: number): void;
    preprocess(dt: number, w: number, h: number, mesh: number): number;
    render(mode: number, x: number, y: number, w: number, h: number, eye: number): void;
    renderMesh(mvpElements: ArrayLike<number>, x: number, y: number, w: number, h: number): void;
    renderMotionMV(x: number, y: number, w: number, h: number): void;
    canMotion(): boolean;
    hasMultiview(): boolean;
    resetXR(): void;
    get profilingSupported(): boolean;
    set profilingEnabled(v: boolean);
    get profilingEnabled(): boolean;
    get profilingResults(): {
        totalMs: number;
        preprocessMs?: number;
        sortMs?: number;
        renderMs?: number;
    } | null;
    dispose(): void;
    #private;
}

declare function presetToLightProbe(p: EnvPreset): EnvLighting;
declare const ENV_PRESETS: Record<EnvPresetName$1, EnvPreset | null>;
type EnvPreset = {
    ambient: number[];
    topDown: number[];
    frontBack?: number[] | undefined;
    leftRight?: number[] | undefined;
};
type EnvPresetName$1 = "daylight" | "cloudy" | "sunset" | "indoor" | "shade" | "night" | "off";

declare class GraciaXR$1 {
    constructor(player: GraciaPlayer, gl: WebGL2RenderingContext);
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
    renderFrame(dt: number, frame: XRFrame): Float32Array | null;
    #private;
}

declare class Camera2D {
    static "__#private@#DEFAULT": mat4;
    static "__#private@#CORR": mat4;
    constructor(canvas: any);
    setBBox(bbox: any): void;
    setSceneTransform(t: any): void;
    update(dt: any): void;
    getViewPose(): gl_matrix.IndexedCollection | null;
    getProjectionMatrix(w: any, h: any): mat4;
    getModelMatrix(): gl_matrix.IndexedCollection | null;
    getAudioPosition(out: Float32Array): Float32Array | null;
    getTransform(): {
        scale: number;
        qx: number;
        qy: number;
        qz: number;
        qw: number;
        tx: number;
        ty: number;
        tz: number;
    };
    setTransform(scale: any, qx: any, qy: any, qz: any, qw: any, tx: any, ty: any, _tz: any, immediate?: boolean): void;
    zoom(f: any): void;
    rotate(dx: any, dy: any): void;
    pan(dx: any, dy: any): void;
    reset(): void;
    resetRotation(): void;
    dispose(): void;
    #private;
}

declare class GraciaRenderer {
    constructor(player: GraciaPlayer, canvas: HTMLCanvasElement);
    get canvas(): HTMLCanvasElement;
    get gl(): WebGL2RenderingContext | null;
    get isHybrid(): boolean;
    initPure(): void;
    initHybrid(): void;
    switchBackend(hybrid: boolean): void;
    frame(dt: number): void;
    dispose(): void;
    #private;
}

declare class GraciaApp {
    static create(Module: any, { container, overlay, mode, audioContext }?: {
        container: HTMLElement;
        overlay?: any;
        layers?: any[];
        mode?: string;
        audioContext?: AudioContext | null;
    }): Promise<GraciaApp>;
    onProgress: ((pct: number) => void) | null;
    onReady: (() => void) | null;
    onError: ((statusOrError: number | Error) => void) | null;
    onFrame: (() => void) | null;
    onBeforeFrame: ((dt: number) => void) | null;
    onModeChange: ((mode: string, prevMode: string) => void) | null;
    onSceneChange: ((src: any, idx: number) => void) | null;
    get player(): GraciaPlayer | null;
    get renderer(): GraciaRenderer | null;
    get camera(): Camera2D | null;
    get canvas(): HTMLCanvasElement;
    get gl(): WebGLRenderingContext | WebGL2RenderingContext;
    get audioContext(): AudioContext | null;
    get mode(): string;
    get fallbackMode(): string;
    get xr(): GraciaXR$1 | null;
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
    setAudio(url: string, destination?: AudioNode): void;
    setVolume(v: number): void;
    setInitialTransform(tf: {
        rotation?: {
            x: number;
            y: number;
            z: number;
            w: number;
        };
        scale?: {
            x: number;
            y: number;
            z: number;
        };
        translation?: {
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
    reset(): void;
    invalidateBBox(): void;
    setInitialTransform(t: any): void;
    get scene(): any;
    get debug(): boolean;
    get scale(): number;
    get leftHand(): XRHandState;
    get rightHand(): XRHandState;
    set locked(v: boolean);
    get locked(): boolean;
    resetToInitial(): void;
    update(frame: XRFrame, ref: XRReferenceSpace, sources: XRInputSource[], uiActive: boolean, uiDragging?: boolean): void;
    #private;
}

type EnvPresetName = EnvPresetName$1;

type GraciaMode = "pw" | "hw" | "vr" | "ar";
interface GraciaSource {
    url: string;
    id?: string;
    label?: string;
    displayName?: string;
    audio?: string;
    initialTransform?: {
        rotation?: {
            x: number;
            y: number;
            z: number;
            w: number;
        };
        scale?: {
            x: number;
            y: number;
            z: number;
        };
        translation?: {
            x: number;
            y: number;
            z: number;
        };
    } | null;
    locked?: boolean;
    resetPositionOnStart?: boolean;
    autoSwitchToNext?: boolean;
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
    isSeeking: boolean;
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

interface StreamingItem {
    streamingId: string;
    token: string;
    label?: string;
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

declare class SplatsMesh extends Mesh<BufferGeometry<three.NormalBufferAttributes, three.BufferGeometryEventMap>, three.Material | three.Material[], three.Object3DEventMap> {
    static create(Module: any, threeRenderer: three.WebGLRenderer): Promise<SplatsMesh>;
    constructor(player: GraciaPlayer);
    enableMesh: boolean;
    onBeforeRender: (renderer: any, _scene: any, camera: any) => void;
    onBeforeShadow: (renderer: any, _object: any, _camera: any, shadowCamera: any) => void;
    get player(): GraciaPlayer;
    setAudio(url: string, listener: three.AudioListener): Promise<void>;
    disposeAudio(): void;
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

declare class DebugOverlay {
    constructor(THREE: any, debug?: boolean);
    get scene(): any;
    get debug(): boolean;
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
    drawHands(left: any, right: any): void;
    #private;
}

declare class ModernControls extends ControlsBase {
    constructor(THREE: any);
    onMuteToggle: null;
    onLockToggle: null;
    onReset: null;
    update({ loading, playing, spinning, buffering, progress, timeText, presetName, muted, locked, sceneText, sceneLabel, bannerText, }: {
        loading?: boolean | undefined;
        playing?: boolean | undefined;
        spinning?: boolean | undefined;
        buffering?: boolean | undefined;
        progress?: number | undefined;
        timeText?: string | undefined;
        presetName?: null | undefined;
        muted?: boolean | undefined;
        locked?: boolean | undefined;
        sceneText?: null | undefined;
        sceneLabel?: null | undefined;
        bannerText?: null | undefined;
    }): void;
    #private;
}

declare class XROverlay {
    constructor(THREE: any, { debug, uiStyle }?: {
        debug?: boolean | undefined;
        uiStyle?: string | undefined;
    });
    set uiStyle(v: string);
    get uiStyle(): string;
    get grabScale(): any;
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
    set bannerText(t: string | null);
    get bannerText(): string | null;
    set eventLogger(cb: null);
    get eventLogger(): null;
    set directGrab(v: boolean);
    get directGrab(): boolean;
    setInitialTransform(t: any): void;
    setPreset(name: any): void;
    init(player: any, sess: any, bind: any, ref: any, gl: any, _ar?: boolean): Promise<any[]>;
    frame(dt: any, frame: any, ref: any, pose: any, sources: any, player: any): void;
    renderEye(gl: any, fbo: any, view: any, x: any, y: any, w: any, h: any): void;
    onRefReset(): void;
    render(_gl: any, _eyes: any): void;
    dispose(): void;
    #private;
}

export { ClassicControls, DebugOverlay, ENV_PRESETS, EnvLighting, type EnvPresetName, GraciaApp, type GraciaCamera, type GraciaEventLogger, type GraciaMode, type GraciaPlayback, GraciaPlayer, type GraciaPlayerState, type GraciaPlaylist, type GraciaSource, type GraciaXR, ModernControls, QuadLayer, SceneManipulator, SplatsMesh, type StreamingItem, type UseGraciaPlayerOptions, XROverlay, buildApiSources, fetchStreamingMetadata, presetToLightProbe, useGraciaPlayer, useGraciaPlaylist };
