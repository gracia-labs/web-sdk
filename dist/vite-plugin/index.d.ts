import { Plugin } from 'vite';

interface GraciaArtifact {
    filename: string;
    hash: string;
    size: number;
}
interface GraciaManifest {
    buildDate: string;
    aio: GraciaArtifact;
    core: GraciaArtifact;
    wasm: GraciaArtifact;
}
interface GraciaPluginOptions {
    /** Defaults to `gracia-manifest.json` in `distPath`. */
    manifest?: GraciaManifest;
    /** Which SDK bundle the app imports: `@gracia/web-sdk/core` or `@gracia/web-sdk/aio`. */
    bundle: "core" | "aio";
    /** Local directory containing hashed artifacts. */
    distPath?: string;
    /** Production asset origin. Defaults to Vite `base`. */
    baseUrl?: string;
    /** Output subdirectory for WASM in production builds. Default: `assets`. */
    assetsDir?: string;
    /** Override dev-time WASM URL. Defaults to `/<vite-base>/<manifest.wasm.filename>`. */
    wasmDevUrl?: string;
    /** Override production WASM URL. Defaults to `<baseUrl>/<assetsDir>/<manifest.wasm.filename>`. */
    wasmBuildUrl?: string;
    /** Dedupe shared deps when using React/Three alongside the SDK. */
    dedupe?: boolean | string[];
}
declare global {
    /** Injected by `graciaPlugin` — hashed WASM module URL. */
    const __GRACIA_MODULE_URL__: string;
}
declare function graciaPlugin(opts: GraciaPluginOptions): Plugin[];

export { type GraciaArtifact, type GraciaManifest, type GraciaPluginOptions, graciaPlugin };
