# Gracia — React + Vite Example

Minimal React app using `@gracia/web-sdk` from the repo `public/` package (run `bun build` at repo root first).

## Quick start

From repo root:

```bash
bun install
bun build
bun serve:vite
```

Or from this directory:

```bash
bun install
bun dev
```

Open `https://localhost:6931` (mkcert provides a local HTTPS cert).

## LAN / device testing

`SharedArrayBuffer` needs a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts). `localhost` counts, but LAN IPs like `192.168.x.x` do not — use HTTPS there. This example includes `vite-plugin-mkcert` so dev serves over HTTPS; open `https://<your-lan-ip>:6931` from a phone or tablet on the same network.

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
- COOP/COEP headers on dev + preview (required for Gracia WASM pthreads)
- Optional `dedupe: true` for React / Three apps

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
