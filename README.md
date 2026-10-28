# Gracia Web SDK

Volumetric video player for the web. Lifelike 3D content in the browser — flat screen, VR, or AR — with a single JavaScript import.

**Live demos:** [Player](https://demo.gracia.ai/) · [Vanilla UI](https://demo.gracia.ai/vanilla.html) · [React](https://demo.gracia.ai/react.html) · [Three.js](https://demo.gracia.ai/three.html) · [PlayCanvas](https://demo.gracia.ai/playcanvas.html)

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
| `GraciaAIO.js` | Self-contained demo bundle (includes Three.js, React, styled player, mount helper) |

`GraciaSDK.js` loads peer dependencies on demand — only what you use. `GraciaAIO.js` bundles third-party libraries unmodified under their original licenses.

## Installation

```bash
npm install github:gracia-labs/web-sdk              # core SDK
npm install github:gracia-labs/web-sdk three        # + Three.js
npm install github:gracia-labs/web-sdk playcanvas   # + PlayCanvas
npm install github:gracia-labs/web-sdk react        # + React hooks
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
| `react` | `useGraciaPlayer`, `useGraciaPlaylist`, `GraciaReactPlayer` |
| `react-dom` | `mountGraciaPlayer`, `GraciaReactPlayer` |
| `@react-three/fiber` | XR UI panels (R3F-based) |
| `@react-three/uikit` | XR UI panels |
| `@preact/signals-core` | XR UI reactive state |
| `@pmndrs/pointer-events` | XR pointer events |

## Quick Start

The fastest path is the **styled player** — drop-in UI with playback, seek, scene switching, fullscreen, and VR/AR where supported. Default styles are auto-installed and scoped under `.gr-player`.

React apps import from `@gracia/web-sdk/core`. Plain HTML pages import from `@gracia/web-sdk/aio` (React bundled inside).

### React

```tsx
import { GraciaReactPlayer } from "@gracia/web-sdk/core";

export function Player() {
  return (
    <GraciaReactPlayer
      streaming={[{ streamingId: "content-id", token: "view-token", label: "Demo" }]}
      localFiles
      sceneSelector="menu"
    />
  );
}
```

With the Vite plugin, WASM is wired at build time — no `moduleUrl` prop needed. Streaming tokens resolve against the Gracia market API by default.

### Plain HTML

```html
<script type="importmap">{ "imports": {
  "@gracia/web-sdk/aio": "/path/to/GraciaAIO.<hash>.js",
  "@gracia/web-sdk/wasm": "/path/to/GraciaWebCore.<hash>.js"
} }</script>
<div id="player"></div>
<script type="module">
  import { mountGraciaPlayer } from "@gracia/web-sdk/aio";

  const player = mountGraciaPlayer(document.querySelector("#player"), {
    streaming: [{ streamingId: "content-id", token: "view-token", label: "Demo" }],
    localFiles: true,
    sceneSelector: "menu",
    moduleUrl: "@gracia/web-sdk/wasm",
  });

  player.update({ streaming: [{ streamingId: "next-id", token: "view-token", label: "Next" }] });
  player.unmount();
</script>
```

Run the local demo: clone the repo, `bun install && bun serve`, then open `https://localhost:6931`.

## Examples

Each HTML demo is self-contained — open the source for a full working integration.

| Integration | Demo | Source | Description |
|-------------|------|--------|-------------|
| **Styled player** — `GraciaReactPlayer` / `mountGraciaPlayer` | [Player](https://demo.gracia.ai/) | [`examples/plain/pages/index.html`](examples/plain/pages/index.html) | Recommended starting point — pretty player, playlist, local files, XR |
| **Vanilla JS** — `GraciaApp` + custom UI | [Vanilla UI](https://demo.gracia.ai/vanilla.html) | [`examples/plain/pages/vanilla.html`](examples/plain/pages/vanilla.html) | Low-level `GraciaApp` with hand-built controls (no styled player) |
| **React hooks** — `useGraciaPlayer` | [React](https://demo.gracia.ai/react.html) | [`examples/plain/pages/react.html`](examples/plain/pages/react.html) | Declarative integration with hooks and playlist |
| **Three.js** — `SplatsMesh` | [Three.js](https://demo.gracia.ai/three.html) | [`examples/plain/pages/three.html`](examples/plain/pages/three.html) | Splats as a standard Three.js mesh with environment relighting |
| **PlayCanvas** — `GraciaSplats` | [PlayCanvas](https://demo.gracia.ai/playcanvas.html) | [`examples/plain/pages/playcanvas.html`](examples/plain/pages/playcanvas.html) | Splats with depth testing and automatic shadow casting |

### Full project examples

| Stack | Source | Description |
|-------|--------|-------------|
| **React + Vite + TypeScript** | [`examples/react-vite`](examples/react-vite) | Production-ready Vite setup with `GraciaReactPlayer`, WASM serving, Strict Mode, and cleanup patterns |

## Vite Plugin (Recommended)

The SDK ships a unified Vite plugin that handles WASM serving, content-hash cache busting, dynamic import warning suppression, and build-time defines — all in one call:

```ts
import { graciaPlugin } from "@gracia/web-sdk/vite-plugin";

export default defineConfig({
  plugins: [react(), ...graciaPlugin({ bundle: "core" })],
});
```

The plugin provides:

- **Manifest + aliases:** reads `gracia-manifest.json`, resolves `@gracia/web-sdk/core|aio|wasm`
- **Dev:** serves hashed WASM during Vite dev
- **Build:** copies WASM to `assets/` with its content-hashed filename
- **Optional dedupe:** pass `dedupe: true` for React/Three apps
- **Defines:** injects `__GRACIA_MODULE_URL__` for the player; optionally `__GRACIA_STREAMING_BASE_URL__` when `streamingBaseUrl` is set

**Custom streaming API** — omit `streamingBaseUrl` to use the default market endpoint. Pass it only when your app needs a different URL (for example a dev proxy):

```ts
...graciaPlugin({
  bundle: "core",
  streamingBaseUrl: "/api/market/api/v1/streaming/content", // non-default only
})
```

## Serving `GraciaWebCore.js` (non-Vite)

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

## Caching

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

## API Overview

### Core

| Export | Description |
|--------|------------|
| `GraciaPlayer` | Core player — play, pause, seek, render |
| `GraciaApp` | High-level standalone player with camera, XR, mode switching |
| `SplatsMesh` | Three.js `Mesh` subclass for scene graph integration |
| `GraciaSplats` | PlayCanvas integration — splats with depth testing and shadow casting |

### React Hooks

| Hook / export | Description |
|---------------|------------|
| `useGraciaPlayer(options)` | Manages player lifecycle, returns reactive state |
| `useGraciaPlaylist(gracia)` | Multi-source playlist with next/prev/goTo |
| `GraciaReactPlayer` | Styled React player component |
| `mountGraciaPlayer` | Vanilla mount helper for the styled player |
| `GRACIA_PLAYER_DEFAULT_CSS` | Default player CSS string |
| `installGraciaPlayerStyles` | Installs scoped default styles into `document.head` or a shadow root |

### Styled player

`GraciaReactPlayer` and `mountGraciaPlayer` share the same props. Pass `sources` or `streaming` (`streamingId` + token); when both are set, `streaming` wins. Metadata resolves against the market API by default — override only via `graciaPlugin({ streamingBaseUrl })` or `buildApiSources(items, baseUrl)`.

| Prop | Default | Description |
|------|---------|-------------|
| `sources` / `streaming` | — | Pre-built scenes, or id + token pairs the player resolves |
| `scenario` | — | Where a branching pack opens; see [Branching](#branching) |
| `controls` | `true` | Built-in playback, scene, and XR UI |
| `sceneSelector` | `"stepper"` | `"tabs"` or `"menu"` for playlists |
| `cameraControls` | `false` | 2D camera selector (`orbit` / `trackball` / `fly`) |
| `localFiles` | `false` | When `true`, adds open-file control for `.mint` / `.sog` from disk |
| `muted` | `false` | Initial mute on first ready only |
| `xrOverlay` | modern UI | `false` disables in-headset UI |
| `style` / `className` | — | Root styles; use `--gr-player-*` variables (no `theme` prop) |
| callbacks | — | `onReady`, `onProgress`, `onModeChange`, `onSceneChange`, `onError`, … |
| `eventLogger` | — | Low-level UI/error events |

Imperative handle (`ref.current` or `mountGraciaPlayer(...).player`): `play`, `pause`, `seek`, `next`/`prev`/`goTo`, `setMode`, `setCameraControls`, `toggleFullscreen`, `openLocalFile`. See [`examples/react-vite`](examples/react-vite) and [`index.html`](examples/plain/pages/index.html).

For custom UI, use `useGraciaPlayer`, `useGraciaPlaylist`, and `XROverlay` instead.

### Branching

A pack branches when its scenes say what follows them: at a fork the viewer picks the next scene, in 2D and in the headset. Add these fields to the scenes of `streaming` or `sources`:

| Scene field | Description |
|-------|-------------|
| `sceneOrder` | The scene's id in the pack, unique; links point at it. Defaults to the scene's position in the list, from 0 |
| `nextSceneOrders` | Ids of the scenes that may follow. Unset plays the next scene in the list, `[]` ends the story, two or more make a fork |
| `modalTitle` | The question asked at this scene's fork |
| `scenarioName` | Label of the choice that leads to this scene |

The `scenario` prop holds the part that belongs to the whole pack. It is needed only when the story may open at more than one scene:

| `scenario` field | Description |
|-------|-------------|
| `roots` | Ids of the scenes the story may open at. Two or more ask the viewer before anything plays |
| `defaultRoot` | The opening taken when nobody answers |
| `modalTitle` | The question asked by that first fork |

```js
mountGraciaPlayer(root, {
  streaming: [
    { streamingId: "<intro>", token, label: "Intro", nextSceneOrders: [1, 2], modalTitle: "Where do we go?" },
    { streamingId: "<rooftop>", token, label: "Rooftop", scenarioName: "The rooftop", nextSceneOrders: [] },
    { streamingId: "<inside>", token, label: "Inside", scenarioName: "Stay inside" },
    { streamingId: "<party>", token, label: "Party", nextSceneOrders: [] },
  ],
});
```

`sources` take the same fields beside `url`. [`examples/plain/pages/branching`](examples/plain/pages/branching/index.html) is a working pack.

- A fork is asked as its scene runs out; the scene then holds on its last frame. After 15 s with no answer, the first choice is taken.
- The scene menu lists the route taken: its scenes, each fork with the number of the branch taken, and a dash for each scene still ahead of an unanswered fork. Picking a fork asks it again, so the viewer can change the answer. A branching pack always uses the menu, whatever `sceneSelector` says.
- A link to a scene the pack doesn't have stops the player with an error that names it (`onError`, phase `"scenario"`).
- `eventLogger` receives `scenario_prompt` `{ from, reopened }` and `scenario_choose` `{ from, to, scenarioName }`. A choice made by the countdown is not reported.
- `sources`, `streaming` and `scenario` restart the story when their identity changes: memoize them.

### XR

| Export | Description |
|--------|------------|
| `XROverlay` | Full XR experience — hand tracking, grab-to-move, UI panels |
| `BoundaryRenderer` | Scene boundary warning in 2D and XR (outline, walls, darkening) from each source's `bounds`; pass as `boundaryRenderer` to `useGraciaPlayer` or `GraciaApp.create`. Works with any overlay |
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
- **HTTPS** — WebGPU and WebXR require a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts) on non-localhost origins
- **WebXR** — VR/AR modes only (Meta Quest Browser, etc.)

## Gracia Streaming Infrastructure

One option for delivering your content is Gracia's own reliable streaming infrastructure — scenes are hosted and served for you, with per-scene access control. See **[docs.gracia.ai/streaming-usage](https://docs.gracia.ai/streaming-usage)** for how to use it.

## Analytics and privacy

For scenes streamed from Gracia, the player reports playback to Gracia Labs — details in [PRIVACY.md](PRIVACY.md).

- **Sent** — content ID, seconds played and which parts of the scene, random IDs for the page load and the browser tab
- **Never sent** — names, emails, user or account IDs, cookies, page URLs, location
- **IP address** — used only to rate-limit reports, not stored with them
- **Stored in the browser** — only the tab's ID, in `sessionStorage` under `gr-wt`, until the tab closes
- **Integrators** — don't pass personal data (user IDs, emails, your users' tokens) to the SDK

To turn it off, set this before the player opens a scene, importing from the bundle you use (`core` or `aio`):

```js
import { GraciaPlayer } from "@gracia/web-sdk/core";

GraciaPlayer.reportWatchTime = false;
```

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
