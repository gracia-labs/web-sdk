# Gracia Web SDK

Volumetric video player for the web. Lifelike 3D content in the browser — flat screen, VR, or AR — with a single JavaScript import.

**Live demos:** [Player](https://vega.gracia.ai/) · [React](https://vega.gracia.ai/react.html) · [Three.js](https://vega.gracia.ai/three.html)

## Highlights

- **WebGPU + WASM** — hardware-accelerated volumetric playback at scale
- **Cross-platform** — 2D, VR, and AR from one SDK; optimized for Meta Quest 3/3S, Pico 4 Ultra, Apple Vision Pro
- **Adaptive streaming** — seek, buffer, and switch scenes seamlessly
- **Developer-first** — React hooks, Three.js mesh, vanilla JS — pick your stack
- **XR built-in** — hand tracking, grab-to-move, spatial audio, environment relighting
- **Modular** — zero required deps; tree-shake what you don't need

## Distribution

| File | Description |
|------|-------------|
| `Vega.js` | WASM engine — core playback runtime (zero JS dependencies) |
| `VegaSDK.js` | Tree-shakeable ES module — player, Three.js, React hooks, XR |
| `VegaDemo.js` | Self-contained demo bundle (includes Three.js, React, etc.) |

`VegaSDK.js` loads peer dependencies on demand — only what you use. `VegaDemo.js` bundles third-party libraries unmodified under their original licenses.

## Installation

```bash
npm install github:gracia-labs/web-sdk              # core SDK
npm install github:gracia-labs/web-sdk three        # + Three.js
npm install github:gracia-labs/web-sdk react gl-matrix  # + React hooks & standalone app
```

Or add directly to `package.json`:

```json
"gracia-web-sdk": "github:gracia-labs/web-sdk"
```

All peer dependencies are optional — install only what your integration needs:

| Peer dependency | Required for |
|-----------------|-------------|
| `three` | `SplatsMesh`, `XROverlay`, XR controls |
| `react` | `useVegaPlayer`, `useVegaPlaylist` hooks |
| `gl-matrix` | `VegaApp` standalone 2D+XR player |
| `@react-three/fiber` | XR UI panels (R3F-based) |
| `@react-three/uikit` | XR UI panels |
| `@preact/signals-core` | XR UI reactive state |
| `@pmndrs/pointer-events` | XR pointer events |

## Quick Start

### Vanilla JS — VegaApp

Full-featured player with built-in camera, XR support and playback controls:

```html
<div id="canvasWrap" style="position:fixed;inset:0"></div>

<script type="importmap">
{ "imports": {
    "gracia-web-sdk/wasm": "./dist/Vega.js",
    "gracia-web-sdk": "./dist/VegaDemo.js"
} }
</script>

<script type="module">
import { buildApiSources, VegaApp, XROverlay, THREE } from 'gracia-web-sdk';
import ModuleFactory from 'gracia-web-sdk/wasm';

let overlay;
try { overlay = new XROverlay(THREE); } catch {}

const app = await VegaApp.create(
    opts => ModuleFactory({ ...opts }),
    { container: document.getElementById('canvasWrap'), overlay, mode: 'pw' }
);

// Callbacks: app.onProgress, app.onReady, app.onModeChange, app.onSceneChange

const data = await (await fetch('/api/sources')).json();
app.sources = await buildApiSources(data.items, data.baseUrl);
app.start();
app.loadScene(0);

await app.setMode('vr');   // enter VR
await app.setMode('pw');   // back to 2D
app.supports('ar');        // check support
</script>
```

### React — Hooks

Declarative integration with `useVegaPlayer` and `useVegaPlaylist`:

```jsx
import { useRef, useEffect } from 'react';
import { useVegaPlayer, useVegaPlaylist, buildApiSources } from 'gracia-web-sdk';

function Player() {
    const containerRef = useRef(null);
    const vega = useVegaPlayer({ containerRef, moduleUrl: '/dist/Vega.js' });
    const playlist = useVegaPlaylist(vega);
    const { playback, xr } = vega;

    useEffect(() => {
        if (!vega.isInitialized) return;
        fetch('/api/sources').then(r => r.json()).then(async data => {
            playlist.setSources(await buildApiSources(data.items, data.baseUrl));
        });
    }, [vega.isInitialized]);

    return (
        <div style={{ position: 'relative', height: '100%' }}>
            <div ref={containerRef} style={{ position: 'absolute', inset: 0 }} />
            <button onClick={() => playback.togglePlay()}>
                {playback.isBuffering ? '...' : playback.isPlaying ? 'Pause' : 'Play'}
            </button>
            <button onClick={() => playback.toggleMute()}>{playback.isMuted ? 'Unmute' : 'Mute'}</button>
            <input type="range" min={0} max={playback.duration} value={playback.currentTime}
                onChange={e => playback.seek(+e.target.value)} />

            {/* xr.setMode('pw' | 'vr' | 'ar'), xr.vrSupported, xr.arSupported */}
            <button disabled={!xr.vrSupported}
                onClick={() => xr.setMode(vega.mode === 'vr' ? 'pw' : 'vr')}>
                {vega.mode === 'vr' ? 'Exit VR' : 'VR'}
            </button>

            <button disabled={!playlist.hasPrev} onClick={() => playlist.prev()}>Prev</button>
            <span>{playlist.index + 1}/{playlist.total} {playlist.currentSource?.label}</span>
            <button disabled={!playlist.hasNext} onClick={() => playlist.next()}>Next</button>
        </div>
    );
}
```

### Three.js — SplatsMesh

Volumetric playback as a standard Three.js mesh:

```js
import { SplatsMesh, EnvLighting, THREE } from 'gracia-web-sdk';
import ModuleFactory from 'gracia-web-sdk/wasm';

const renderer = new THREE.WebGLRenderer({ antialias: true });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.05, 200);

const splats = await SplatsMesh.create(opts => ModuleFactory({ ...opts }), renderer);
splats.enableMesh = true;
scene.add(splats);

splats.position.set(0, -0.7, 0.9);   // position like any Three.js object
splats.scale.setScalar(0.5);

splats.player.open({ url: 'https://api.example.com/stream/id/', token: 'your-token' });
splats.player.play();

// Relight splats to match your scene
const env = new EnvLighting(probe.sh.toArray()).prepare(lightDir);
splats.player.setEnvLighting(env, 1.0);

(function animate() { requestAnimationFrame(animate); renderer.render(scene, camera); })();
```

## Cross-Origin Isolation

Vega spawns Web Workers that depend on `SharedArrayBuffer`, which requires a **cross-origin isolated** context. Your server must send these headers on every HTML/JS response:

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

### Serving `Vega.js`

`Vega.js` is precompiled Emscripten glue — serve it as a **static file**, not processed by your bundler.

**Vite** — [`vite-plugin-static-copy`](https://github.com/sapphi-red/vite-plugin-static-copy):

```ts
viteStaticCopy({ targets: [{ src: 'node_modules/gracia-web-sdk/dist/Vega.js', dest: 'assets' }] })
```

**Webpack** — [`copy-webpack-plugin`](https://github.com/webpack-contrib/copy-webpack-plugin):

```js
new CopyPlugin({ patterns: [{ from: 'node_modules/gracia-web-sdk/dist/Vega.js', to: 'assets/Vega.js' }] })
```

Then reference it:

```js
useVegaPlayer({ containerRef, moduleUrl: '/assets/Vega.js' });
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
| `VegaPlayer` | Core player — play, pause, seek, render |
| `VegaApp` | High-level standalone player with camera, XR, mode switching |
| `SplatsMesh` | Three.js `Mesh` subclass for scene graph integration |

### React Hooks

| Hook | Description |
|------|------------|
| `useVegaPlayer(options)` | Manages player lifecycle, returns reactive state |
| `useVegaPlaylist(vega)` | Multi-source playlist with next/prev/goTo |

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

## License

Proprietary — Gracia Labs. All rights reserved.
