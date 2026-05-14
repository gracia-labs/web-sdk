/// <reference types="vite/client" />

/**
 * Absolute URL to the GraciaWebCore.js WASM module.
 * Injected by Vite via `define` in vite.config.ts.
 *
 * - Dev:   "/GraciaWebCore.js" (served by the custom middleware)
 * - Build: "/assets/GraciaWebCore.js?v=<sdkVersion>"
 */
declare const __GRACIA_MODULE_URL__: string;
