# @gracia/web-sdk — React + Vite Integration Example

A minimal but production-ready React + Vite + TypeScript project that integrates the Gracia volumetric video player. This example demonstrates every integration pitfall and how to solve it.

## Quick start

```bash
cd examples/react-vite
npm install
npm run dev
```

Open `https://localhost:6931`. Demo content loads automatically.

## What this example covers

| # | Pitfall | What breaks without the fix |
|---|---------|---------------------------|
| 1 | [Cross-Origin Isolation](#1-cross-origin-isolation-coopcoep) | WASM pthreads fail — blank screen, no error |
| 2 | [WASM static serving](#2-graciawebcorejs-must-be-a-static-file) | `import()` fails — player never initializes |
| 3 | [Dynamic import warning](#3-dynamic-import-warning) | Noisy console warning on every page load |
| 4 | [Cache busting](#4-cache-busting) | Stale WASM after SDK upgrade |
| 5 | [React Strict Mode](#5-react-strict-mode) | Double initialization in dev (not a bug) |
| 6 | [Cleanup on unmount](#6-cleanup-on-unmount) | Memory leak — WASM/WebGPU resources not freed |
| 7 | [WebGPU check](#7-webgpu-gate) | Opaque WASM crash |
| 8 | [HTTPS requirement](#8-https) | `SharedArrayBuffer` unavailable |
| 9 | [React dedupe](#9-resolvededupe) | "Invalid hook call" errors |
| 10 | [Preview headers](#10-vite-preview-headers) | `vite preview` fails silently |
| 11 | [Third-party resources under COEP](#11-third-party-resources-under-coep) | Images/fonts from CDNs blocked |
| 12 | [XR overlay peer dependencies](#12-xr-overlay-peer-dependencies) | `TypeError: Cannot read properties of undefined (reading 'S')` |
| 13 | [React 18 vs 19 — R3F versions](#13-react-18-vs-react-19--r3f-version-matrix) | `ERESOLVE unable to resolve dependency tree` |

---

## Pitfall details

### 1. Cross-Origin Isolation (COOP/COEP)

**File:** `vite.config.ts` — `server.headers`

The SDK uses Emscripten with pthreads, which requires `SharedArrayBuffer`. Browsers only expose `SharedArrayBuffer` in a [cross-origin isolated](https://developer.mozilla.org/en-US/docs/Web/API/Window/crossOriginIsolated) context. Your server must send two headers on **every** response:

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

**What happens without it:** The page loads, the SDK initializes, but the WASM module silently fails to spawn workers. You see a blank canvas with no error in the console (or a generic `SharedArrayBuffer is not defined`).

**Safari note:** Use `require-corp`, not `credentialless` — Safari does not support `credentialless` for cross-origin isolation.

### 2. GraciaWebCore.js must be a static file

**Files:** `vite.config.ts` (viteStaticCopy), `src/vite-plugins/gracia.ts` (serveGraciaWasm)

`GraciaWebCore.js` is a precompiled Emscripten WASM loader. Vite's bundler will break it if it tries to process it. Two things are needed:

- **Build:** Use `vite-plugin-static-copy` to copy `GraciaWebCore.js` from `node_modules` into `dist/assets/`.
- **Dev:** A custom middleware plugin intercepts requests for `GraciaWebCore.js` and serves the real file from `node_modules` with proper headers. Without this, Vite resolves the dynamic import into `.vite/deps/` where the file doesn't exist.

**What happens without it:** `import()` of the WASM module fails with a 404 or a parse error. The player shows "Initialization failed".

### 3. Dynamic import warning

**File:** `src/vite-plugins/gracia.ts` (suppressGraciaWarning)

The SDK uses `import(variable)` to dynamically load the WASM module at runtime. Vite cannot statically analyze this and prints a warning on every page load:

```
The above dynamic import cannot be analyzed by Vite.
```

The `suppressGraciaWarning` plugin filters out warnings mentioning `GraciaSDK.js`.

**What happens without it:** Harmless but noisy — one warning per page load during development.

### 4. Cache busting

**File:** `src/vite-plugins/gracia.ts` (graciaCacheBust)

Since `GraciaWebCore.js` is served as a static file, its filename never changes between SDK versions. Browsers and CDNs may serve a stale copy after an upgrade.

The `graciaCacheBust` plugin rewrites `"GraciaWebCore.js"` to `"GraciaWebCore.js?v=0.0.53"` inside the built chunks.

**What happens without it:** After upgrading `@gracia/web-sdk`, users may get a cached old WASM module that is incompatible with the new SDK JS, causing subtle runtime errors.

### 5. React Strict Mode

**File:** `src/main.tsx`

In development, React 18 `StrictMode` double-mounts every component. This means `useGraciaPlayer` will:

1. Create a WASM engine instance
2. Immediately `stop()` + `dispose()` it (cleanup from first mount)
3. Create a second instance (second mount)

This is **correct behavior**. The hook handles it gracefully. However, you'll see extra console output during init. The gracia-app production project disables StrictMode to avoid this — this example deliberately enables it to prove the cleanup works.

**What happens without StrictMode:** Everything works, but you lose React's safety checks for effect cleanup bugs.

### 6. Cleanup on unmount

**File:** `src/App.tsx` — `graciaRef` + `useEffect`

`useGraciaPlayer` handles `dispose()` internally on unmount, but if you've opened content via the playlist, you should `close()` it first so the player stops streaming before the engine tears down.

The key pattern is using a **ref** to capture the latest `gracia` value, because the cleanup function of `useEffect(…, [])` closes over the value from the initial render:

```tsx
const graciaRef = useRef(gracia);
useEffect(() => { graciaRef.current = gracia; });
useEffect(() => () => { graciaRef.current.close(); }, []);
```

**What happens without it:** WASM resources, WebGPU buffers, and active network requests may not be released on navigation. In SPAs with route-based unmounting, this causes memory leaks.

### 7. WebGPU gate

**File:** `src/main.tsx`

The SDK requires WebGPU (`navigator.gpu`). If `navigator.gpu` is `undefined`, the WASM module initialization crashes with a non-descriptive error. Check early and show a fallback:

```tsx
if (!navigator.gpu) return <FallbackMessage />;
```

**What happens without it:** Users on unsupported browsers see a blank page or an opaque console error like `TypeError: Cannot read properties of undefined`.

### 8. HTTPS

`SharedArrayBuffer` requires a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts). `localhost` is exempt, but any other hostname (including LAN IPs like `192.168.x.x`) needs HTTPS.

For LAN testing, uncomment `https: true` in `vite.config.ts` or use `vite-plugin-mkcert`.

**What happens without it:** Everything works on `localhost`, but fails on LAN — `crossOriginIsolated` is `false` even with correct headers.

### 9. `resolve.dedupe`

**File:** `vite.config.ts` — `resolve.dedupe`

If Vite resolves `react` through two different paths (your app's `node_modules` and the SDK's peer dependency resolution), you end up with two React instances. React hooks require a single instance — two Reacts = broken hooks.

```ts
resolve: {
  dedupe: ['react', 'react-dom'],
}
```

**What happens without it:** `Invalid hook call. Hooks can only be called inside of the body of a function component.` — one of React's most confusing error messages.

### 10. Vite preview headers

**File:** `vite.config.ts` — `preview.headers`

`vite preview` (used to test production builds locally) does **not** use `server.headers`. It requires a separate `preview.headers` block with the same COOP/COEP headers.

**What happens without it:** `npm run build && npm run preview` works for everything except the Gracia player — `SharedArrayBuffer` is unavailable because `crossOriginIsolated` is `false`.

### 11. Third-party resources under COEP

When using `Cross-Origin-Embedder-Policy: require-corp`, **every** cross-origin resource (images, fonts, scripts from CDNs) must include a `Cross-Origin-Resource-Policy: cross-origin` response header. Resources without it are blocked.

Options:
- Ask the CDN to add the header (Google Fonts does this)
- Use `credentialless` instead of `require-corp` (but Safari won't be isolated)
- Proxy the resources through your own server
- Use an iframe with `credentialless` for embedded third-party content

**What happens without awareness:** Google Fonts load fine, but that random image CDN or embedded iframe breaks silently.

### 12. XR overlay peer dependencies

**File:** `package.json`

If you use `XROverlay` (needed for VR/AR UI panels), importing it from `@gracia/web-sdk` pulls in `@react-three/fiber`'s reconciler at module load time. The reconciler depends on several packages that are listed as **optional** peer deps of the SDK — npm won't auto-install them, but they crash at runtime if missing:

```
@react-three/fiber    — reconciler / canvas
@react-three/uikit    — XR UI panels
@preact/signals-core  — reactive state (used by uikit)
@pmndrs/pointer-events — XR pointer/hand events
gl-matrix             — matrix math for GraciaApp
```

**What happens without them:** `TypeError: Cannot read properties of undefined (reading 'S')` at `createReconciler` — the R3F event system tries to access `@preact/signals-core` internals that don't exist.

If you don't need XR, you can skip all of these and remove the `XROverlay` import + `overlay` prop from `useGraciaPlayer`.

### 13. React 18 vs React 19 — R3F version matrix

**File:** `package.json`

The SDK's `peerDependencies` list `@react-three/fiber: ">=9.0.0"`, but **R3F v9 requires React 19**. If your project uses React 18, you must use **R3F v8** instead:

| React version | @react-three/fiber | three |
|---------------|-------------------|-------|
| React 18 | `^8.18.0` | `0.160.0` |
| React 19 | `>=9.0.0` | `>=0.170.0` |

This example uses React 18 + R3F v8 — the same combination used in production by gracia-app.

**What happens without the right versions:** `npm install` fails with `ERESOLVE unable to resolve dependency tree` — R3F v9's `peerDependencies` require `react@">=19 <19.3"` which conflicts with React 18.

**npm-specific fix:** Even with R3F v8, npm's strict peer resolution sees a conflict with the SDK's `peerDependencies` (`@react-three/fiber: ">=9.0.0"`). Since this is an **optional** peer dep and v8 is fully compatible, we add `.npmrc` with `legacy-peer-deps=true`. pnpm and yarn handle this automatically — only npm needs this flag.

---

## Production deployment

For production, your web server (Nginx, Cloudflare, etc.) must also send COOP/COEP headers. Example Nginx config:

```nginx
server {
    add_header Cross-Origin-Opener-Policy  "same-origin"  always;
    add_header Cross-Origin-Embedder-Policy "require-corp" always;

    location ~* \.(js|wasm|css|html)$ {
        add_header Cross-Origin-Opener-Policy  "same-origin"  always;
        add_header Cross-Origin-Embedder-Policy "require-corp" always;
    }
}
```

Note: Nginx's `add_header` in a nested `location` block **replaces** (not appends to) parent headers — repeat them in every location that serves SDK files.

## File overview

```
├── .npmrc                      legacy-peer-deps for npm (React 18 + R3F v8)
├── index.html                  Entry HTML
├── package.json                Dependencies
├── tsconfig.json               TypeScript config
├── vite.config.ts              Vite config with all pitfall solutions
├── README.md                   This file
└── src/
    ├── main.tsx                Entry — StrictMode, WebGPU gate, COOP check
    ├── App.tsx                 Player component with controls
    ├── vite-env.d.ts           Type declaration for __GRACIA_MODULE_URL__
    └── vite-plugins/
        └── gracia.ts           Three Vite plugins for SDK integration
```
