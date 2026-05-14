import fs from "node:fs";
import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import { viteStaticCopy } from "vite-plugin-static-copy";

import {
  graciaCacheBust,
  serveGraciaWasm,
  suppressGraciaWarning,
} from "./src/vite-plugins/gracia";

const graciaWasm = path.resolve(
  __dirname,
  "node_modules/@gracia/web-sdk/dist/GraciaWebCore.js",
);

const graciaVersion: string = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "node_modules/@gracia/web-sdk/package.json"),
    "utf-8",
  ),
).version;

export default defineConfig(({ command }) => {
  const isLocal = command === "serve";

  return {
    plugins: [
      react(),
      mkcert(),

      // --- @gracia/web-sdk plugins (see src/vite-plugins/gracia.ts) ---
      serveGraciaWasm(graciaWasm),
      suppressGraciaWarning(),
      graciaCacheBust(graciaVersion),

      // README #2: copy WASM glue as-is — must not be bundled
      viteStaticCopy({
        targets: [{ src: graciaWasm, dest: "assets" }],
      }),
    ],

    server: {
      // README #1: COOP/COEP for SharedArrayBuffer
      port: 6931,
      headers: {
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Embedder-Policy": "require-corp",
      },

      // README #11: proxy API calls to avoid CORS / COEP issues
      proxy: {
        "/api/market": {
          target: "https://market.gracia.ai",
          changeOrigin: true,
          secure: true,
          rewrite: (p) => p.replace(/^\/api\/market/, ""),
        },
      },
    },

    // README #10: preview needs its own COOP/COEP headers
    preview: {
      headers: {
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Embedder-Policy": "require-corp",
      },
    },

    define: {
      // README #2, #4: WASM module URL with cache-bust in production
      __GRACIA_MODULE_URL__: JSON.stringify(
        isLocal
          ? "/GraciaWebCore.js"
          : `/assets/GraciaWebCore.js?v=${graciaVersion}`,
      ),
    },

    resolve: {
      // README #9: prevent duplicate React / Three.js instances
      dedupe: ["react", "react-dom", "three", "@react-three/fiber"],
    },
  };
});
