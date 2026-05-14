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
| **Vanilla JS** — `GraciaApp` | [Player](https://demo.gracia.ai/) | [`index.html`](index.html) | Full-featured player with camera, XR, playback controls |
| **React** — Hooks | [React](https://demo.gracia.ai/react.html) | [`react.html`](react.html) | Declarative integration with `useGraciaPlayer` and `useGraciaPlaylist` |
| **Three.js** — `SplatsMesh` | [Three.js](https://demo.gracia.ai/three.html) | [`three.html`](three.html) | Splats as a standard Three.js mesh with environment relighting |
| **PlayCanvas** — `GraciaSplats` | [PlayCanvas](https://demo.gracia.ai/playcanvas.html) | [`playcanvas.html`](playcanvas.html) | Splats with depth testing and automatic shadow casting |

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

### Serving `GraciaWebCore.js`

`GraciaWebCore.js` is precompiled Emscripten glue — serve it as a **static file**, not processed by your bundler.

**Vite** — [`vite-plugin-static-copy`](https://github.com/sapphi-red/vite-plugin-static-copy):

```ts
viteStaticCopy({ targets: [{ src: 'node_modules/@gracia/web-sdk/dist/GraciaWebCore.js', dest: 'assets' }] })
```

**Webpack** — [`copy-webpack-plugin`](https://github.com/webpack-contrib/copy-webpack-plugin):

```js
new CopyPlugin({ patterns: [{ from: 'node_modules/@gracia/web-sdk/dist/GraciaWebCore.js', to: 'assets/GraciaWebCore.js' }] })
```

Then reference it:

```js
useGraciaPlayer({ containerRef, moduleUrl: '/assets/GraciaWebCore.js' });
```

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

Proprietary — Gracia Labs. All rights reserved.
