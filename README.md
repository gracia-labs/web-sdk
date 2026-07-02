# Gracia Web SDK

Volumetric video player for the web. Lifelike 3D content in the browser — flat screen, VR, or AR — with a single JavaScript import.

**Live demos:** [Player](https://demo.gracia.ai/) · [React](https://demo.gracia.ai/react.html) · [Three.js](https://demo.gracia.ai/three.html) · [PlayCanvas](https://demo.gracia.ai/playcanvas.html)

## Highlights

- **WebGPU + WASM** — hardware-accelerated volumetric playback at scale
- **Cross-platform** — 2D, VR, and AR from one SDK; optimized for Meta Quest 3/3S, Pico 4 Ultra, Apple Vision Pro
- **Adaptive streaming** — seek, buffer, and switch scenes seamlessly
- **Developer-first** — React hooks, Three.js mesh, PlayCanvas, vanilla JS — pick your stack
- **XR built-in** — hand tracking, grab-to-move, spatial audio, environment relighting
- **Modular** — zero required deps; tree-shake what you don't need

## Distribution

| File | Description |
|------|-------------|
| `GraciaWebCore.js` | WASM engine — core playback runtime (zero JS dependencies) |
| `GraciaSDK.js` | Tree-shakeable ES module — player, Three.js, React hooks, XR |
| `GraciaAIO.js` | Self-contained demo bundle (includes Three.js, React, etc.) |

`GraciaSDK.js` loads peer dependencies on demand — only what you use. `GraciaAIO.js` bundles third-party libraries unmodified under their original licenses.

## Installation

```bash
npm install github:gracia-labs/web-sdk              # core SDK
npm install github:gracia-labs/web-sdk three        # + Three.js
npm install github:gracia-labs/web-sdk playcanvas   # + PlayCanvas
npm install github:gracia-labs/web-sdk react gl-matrix  # + React hooks & standalone app
```

Or add directly to `package.json`:

```json
"@gracia/web-sdk": "github:gracia-labs/web-sdk"
```

All peer dependencies are optional — install only what your integration needs:

| Peer dependency | Required for |
|-----------------|-------------|
| `three` | `SplatsMesh`, `XROverlay`, XR controls |
| `playcanvas` | `GraciaSplats` |
| `react` | `useGraciaPlayer`, `useGraciaPlaylist` hooks |
| `gl-matrix` | `GraciaApp` standalone 2D+XR player |
| `@react-three/fiber` | XR UI panels (R3F-based) |
| `@react-three/uikit` | XR UI panels |
| `@preact/signals-core` | XR UI reactive state |
| `@pmndrs/pointer-events` | XR pointer events |

## Quick Start

Each demo below is a self-contained HTML file — view the source for a complete, working example.

| Integration | Demo | Source | Description |
|-------------|------|--------|-------------|
| **Vanilla JS** — `GraciaApp` | [Player](https://demo.gracia.ai/) | [`examples/plain/pages/index.html`](examples/plain/pages/index.html) | Full-featured player with camera, XR, playback controls |
| **React** — Hooks | [React](https://demo.gracia.ai/react.html) | [`examples/plain/pages/react.html`](examples/plain/pages/react.html) | Declarative integration with `useGraciaPlayer` and `useGraciaPlaylist` |
| **Three.js** — `SplatsMesh` | [Three.js](https://demo.gracia.ai/three.html) | [`examples/plain/pages/three.html`](examples/plain/pages/three.html) | Splats as a standard Three.js mesh with environment relighting |
| **PlayCanvas** — `GraciaSplats` | [PlayCanvas](https://demo.gracia.ai/playcanvas.html) | [`examples/plain/pages/playcanvas.html`](examples/plain/pages/playcanvas.html) | Splats with depth testing and automatic shadow casting |

### Full project examples

| Stack | Source | Description |
|-------|--------|-------------|
| **React + Vite + TypeScript** | [`examples/react-vite`](examples/react-vite) | Production-ready Vite setup covering COOP/COEP, WASM serving, Strict Mode, cleanup, and other integration pitfalls |

## Cross-Origin Isolation

Gracia spawns Web Workers that depend on `SharedArrayBuffer`, which requires a **cross-origin isolated** context. Your server must send these headers on every HTML/JS response:

| Header | Value |
|--------|-------|
| `Cross-Origin-Opener-Policy` | `same-origin` |
| `Cross-Origin-Embedder-Policy` | `require-corp` (recommended) or `credentialless` |

Use `require-corp` for full browser support including Safari / Apple Vision Pro. With `credentialless`, Safari will not be isolated. Third-party resources under `require-corp` need `Cross-Origin-Resource-Policy: cross-origin`.

> **HTTPS required.** `SharedArrayBuffer` needs a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts). `localhost` is exempt.

<details><summary><strong>Dev server configs</strong></summary>

**Vite** (`vite.config.ts`)

```ts
export default defineConfig({
  server: { headers: {
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Embedder-Policy': 'require-corp',
  } },
});
```

**Webpack** (`webpack.config.js`)

```js
module.exports = {
  devServer: { headers: {
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Embedder-Policy': 'require-corp',
  } },
};
```

**Express**

```js
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});
```

</details>

<details><summary><strong>Production — Nginx</strong></summary>

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

See [`nginx.conf`](nginx.conf) for a complete example.

</details>

### Vite Plugin (Recommended)

The SDK ships a unified Vite plugin that handles WASM serving, content-hash cache busting, dynamic import warning suppression, and build-time defines — all in one call:

```ts
import { graciaPlugin } from "@gracia/web-sdk/vite-plugin";

export default defineConfig({
  plugins: [react(), ...graciaPlugin({ bundle: "core" })],
});
```

The plugin provides:

- **Manifest + aliases:** reads `gracia-manifest.json`, resolves `@gracia/web-sdk/core|aio|wasm`
- **Dev:** serves hashed WASM with COOP/COEP headers
- **Build:** copies WASM to `assets/` with its content-hashed filename
- **COI:** sets COOP/COEP on dev/preview (required for Gracia)
- **Optional dedupe:** pass `dedupe: true` for React/Three apps
- **Defines:** injects `__GRACIA_MODULE_URL__` for `useGraciaPlayer({ moduleUrl })`

### Serving `GraciaWebCore.js` (non-Vite)

`GraciaWebCore.js` is precompiled Emscripten glue — serve it as a **static file**, not processed by your bundler.

**Webpack** — read the manifest and copy the **hashed** WASM file:

```js
import manifest from "@gracia/web-sdk/manifest";

const wasmHash = manifest.files["GraciaWebCore.js"].hash;
const hashedName = `GraciaWebCore.${wasmHash}.js`;

new CopyPlugin({
  patterns: [{
    from: `node_modules/@gracia/web-sdk/${hashedName}`,
    to: `assets/${hashedName}`,
  }],
});
```

Then reference it:

```js
useGraciaPlayer({ containerRef, moduleUrl: `/assets/GraciaWebCore.${wasmHash}.js` });
```

### Caching

The SDK uses **content-hash filenames** for cache busting. After `npm install`, the package includes a manifest at `@gracia/web-sdk/manifest` (`dist/gracia-manifest.json`) with hashed filenames for each artifact:

```ts
import manifest from "@gracia/web-sdk/manifest";

const wasmHash = manifest.files["GraciaWebCore.js"].hash; // e.g. "a1b2c3d4e5f67890"
const hashedName = `GraciaWebCore.${wasmHash}.js`;         // copy this to your public assets
```

**Vite users:** `graciaPlugin` handles this automatically — no manual steps needed.

**Non-Vite users:** read the manifest to get the hashed filename, copy the corresponding hashed file from `dist/` to your public assets, and pass the URL as `moduleUrl`. This ensures browsers fetch the correct version after SDK upgrades.

**Server cache headers** (recommended):

| Pattern | Cache-Control |
|---------|--------------|
| `*.<hash>.js` | `public, max-age=31536000, immutable` |
| `*.js` (non-hashed) | `no-cache, must-revalidate` |
| `*.html` | `no-cache, no-store, must-revalidate` |

### Verification

```js
self.crossOriginIsolated // → true
```

If `false`, check both headers are present (`DevTools → Network → Headers`) and no sub-resource is missing `Cross-Origin-Resource-Policy`.

## API Overview

### Core

| Export | Description |
|--------|------------|
| `GraciaPlayer` | Core player — play, pause, seek, render |
| `GraciaApp` | High-level standalone player with camera, XR, mode switching |
| `SplatsMesh` | Three.js `Mesh` subclass for scene graph integration |
| `GraciaSplats` | PlayCanvas integration — splats with depth testing and shadow casting |

### React Hooks

| Hook | Description |
|------|------------|
| `useGraciaPlayer(options)` | Manages player lifecycle, returns reactive state |
| `useGraciaPlaylist(gracia)` | Multi-source playlist with next/prev/goTo |

### XR

| Export | Description |
|--------|------------|
| `XROverlay` | Full XR experience — hand tracking, grab-to-move, UI panels |
| `ClassicControls` | Compact VR control panel |
| `ModernControls` | Full-featured VR control panel with mute, lock, drag-to-reposition |

### Utilities

| Export | Description |
|--------|------------|
| `buildApiSources(items, baseUrl)` | Resolve streaming IDs into playable sources |
| `fetchStreamingMetadata(baseUrl, id, token)` | Fetch metadata for a streaming source |
| `ENV_PRESETS` / `presetToLightProbe` | Environment lighting presets for AR |
| `EnvLighting` | Environment lighting for AR scenes |

## Modes

| Mode | Key |
|------|-----|
| 2D | `pw` |
| VR | `vr` |
| AR | `ar` |

## Requirements

- **WebGPU** — `navigator.gpu` required ([support](https://caniuse.com/webgpu)): Chrome 113+, Edge 113+, Safari 18+, Firefox Nightly (flag)
- **HTTPS** — `SharedArrayBuffer` needs a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts) (`localhost` exempt)
- **Cross-Origin Isolation** — COOP + COEP headers (see [above](#cross-origin-isolation))
- **WebXR** — VR/AR modes only (Meta Quest Browser, etc.)

## Content Access & Security

The player needs a **streamingId** (identifies the scene) and a **view token** (authorizes playback). Both can be created in your Gracia account under **Settings → Api Settings**.

> **Important.** **Settings → Api Settings** is available only for partner Gracia accounts. If you want to become a partner, write to support at `support@gracia.ai`.

Base URL: `https://streaming.gracia.ai`

### Option 1: Long-lived View Token (not recommended)

> **Not recommended.** Long-lived tokens are less secure — anyone with the token can watch the content. Use Option 2 whenever possible.

Create a view token in **Settings → Api Settings**, set the `streamingIds` it can access, optionally restrict to specific `domains`, and pass it directly to the player. No backend needed.

Only suitable for: embedded players, kiosks, demo pages where per-user access control is not needed. Always use domain whitelisting to limit exposure.

### Option 2: Short-lived Tokens via Your Backend (recommended)

Implement an endpoint on your backend that your frontend calls when a user wants to watch content. This endpoint verifies access, requests a short-lived view token from Gracia API, and returns the tokens to the frontend. The API token never leaves your server.

Best for: pay-per-view, purchases, subscriptions.

1. Create an **API token** in **Settings → Api Settings**. Store it securely on your server.
2. Implement an endpoint (e.g. `POST /api/streaming-access/{contentId}`) that authenticates the user, checks access, calls Gracia API to issue a view token, and returns `streamingId` + `viewToken`.
3. Your frontend calls this endpoint and passes the received tokens to the player.

```
┌──────────┐         ┌──────────────┐         ┌───────────────┐         ┌──────────────────┐
│  Player  │         │ Your Backend │         │ Your Database │         │ Gracia Streaming │
│ (client) │         │              │         │               │         │       API        │
└────┬─────┘         └──────┬───────┘         └──────┬────────┘         └────────┬─────────┘
     │                      │                        │                           │
     │  1. User wants to    │                        │                           │
     │     watch content    │                        │                           │
     │─────────────────────>│                        │                           │
     │                      │                        │                           │
     │               2. Your backend                 │                           │
     │                  validates access             │                           │
     │                      │                        │                           │
     │                      │  3. Issue view token   │                           │
     │                      │     POST /view-token/issue                         │
     │                      │───────────────────────────────────────────────────>│
     │                      │                        │                           │
     │                      │  4. View token + tokenId                           │
     │                      │<───────────────────────────────────────────────────│
     │                      │                        │                           │
     │                      │  5. Save token state   │                           │
     │                      │     {userId, tokenId}  │                           |
     │                      │───────────────────────>│                           │
     │                      │                        │                           │
     │  6. Return streaming │                        │                           │
     │     ID + view token  │                        │                           │
     │<─────────────────────│                        │                           │
     │                      │                        │                           │
     │  7. Pass streamingId + viewToken to player    │
     │     → player handles playback                 │

```

When persisting issued tokens, store at least `userId` and `tokenId`, so your backend can safely update or revoke token access later.

## OpenAPI Specification

- Specification file: [`api-streaming-view-token.openapi.yaml`](./api-streaming-view-token.openapi.yaml)
- To view it in Swagger Editor, open [Swagger Editor](https://editor.swagger.io/) and load this YAML file (or paste the API content directly).
- You can also use any other Swagger/OpenAPI-compatible editors or viewers supporting the current version of the Specification.

## Acknowledgements

Thanks to [Martin Valigursky](https://github.com/mvaligursky) for help with the PlayCanvas integration.

## License

This repository is covered by two licenses, both in the single [`LICENSE`](./LICENSE) file:

| What | License | Where |
|------|---------|-------|
| **Gracia Web SDK** — `GraciaWebCore.js`, `GraciaSDK.js`, `GraciaAIO.js`, WASM modules, type definitions, and other distributed SDK artifacts | Proprietary | [`LICENSE`](./LICENSE) — Part A |
| **Examples, samples & documentation** — wherever located | MIT | [`LICENSE`](./LICENSE) — Part B |

All other files are © Gracia Labs. Third-party dependencies keep their own licenses.
For special or enterprise licensing, contact support@gracia.ai.

Proprietary — Gracia Labs. All rights reserved.
