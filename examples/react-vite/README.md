# Gracia — React + Vite Example

Minimal React app using `@gracia/web-sdk` from the repo `public/` package (`dist/` is committed, so no build step is needed).

## Quick start

From repo root:

```bash
bun install
bun serve:vite
```

`serve:vite` installs this example's dependencies before starting Vite — the example is a separate package, so the root `bun install` does not cover it.

Or from this directory:

```bash
bun install
bun dev
```

Open `https://localhost:6931` (mkcert provides a local HTTPS cert).

## LAN / device testing

WebGPU and WebXR need a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts). `localhost` counts, but LAN IPs like `192.168.x.x` do not, so use HTTPS there. This example includes `vite-plugin-mkcert` so dev serves over HTTPS; open `https://<your-lan-ip>:6931` from a phone or tablet on the same network.

## Integration

```ts
// vite.config.ts
import { graciaPlugin } from "@gracia/web-sdk/vite-plugin";

export default defineConfig({
  plugins: [react(), mkcert(), ...graciaPlugin({ bundle: "core", dedupe: true })],
});
```

`graciaPlugin` handles:

- Reading `gracia-manifest.json` from the installed SDK
- Aliasing `@gracia/web-sdk/core|aio|wasm` to hashed artifacts
- Serving WASM in dev + copying it on build
- `__GRACIA_MODULE_URL__` define for `useGraciaPlayer({ moduleUrl })`
- Optional `dedupe: true` for React / Three apps

### Peer resolution in this example

`dedupe: true` covers `react`, `react-dom`, `three`, and `@react-three/fiber`. That is
enough for a normal install, where the SDK sits in your own `node_modules` and Vite
resolves its remaining peers from there.

This example instead loads the bundle from `../../dist` (`file:../..`), which is outside
the app, so Vite resolves the core bundle's bare imports from `public/dist/` — where none
of the peers exist. `vite.config.ts` therefore passes an explicit `dedupe` array listing
every peer the core bundle imports (adding `@react-three/uikit`, `@pmndrs/pointer-events`,
and `@preact/signals-core`), and `@preact/signals-core` is a direct dependency so it is
hoisted to the app's `node_modules` rather than left nested under `@react-three/uikit`.

```tsx
// App.tsx
import { useGraciaPlayer } from "@gracia/web-sdk/core";

const gracia = useGraciaPlayer({
  containerRef,
  moduleUrl: __GRACIA_MODULE_URL__,
});
```

## Demo-only config

This example adds a market API proxy in `vite.config.ts` and loads demo streams in `App.tsx`. Remove those for your own app.

## Peer dependencies

This example uses React 19 + `@react-three/fiber` v9, matching the SDK's optional peer spec for XR overlay integration.
