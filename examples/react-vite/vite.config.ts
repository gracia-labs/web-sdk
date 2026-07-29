import { graciaPlugin } from "@gracia/web-sdk/vite-plugin";
import react from "@vitejs/plugin-react";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";

const sdkDist = resolve(dirname(fileURLToPath(import.meta.url)), "../../dist");

export default defineConfig({
    plugins: [
        react(),
        mkcert(),
        ...graciaPlugin({
            bundle: "core",
            // The SDK bundle is loaded from ../../dist, outside this package, so Vite
            // resolves its bare imports from there instead of from the app. Dedupe
            // pins every peer the core bundle imports to this app's node_modules.
            dedupe: [
                "react",
                "react-dom",
                "three",
                "@react-three/fiber",
                "@react-three/uikit",
                "@pmndrs/pointer-events",
                "@preact/signals-core",
            ],
            distPath: sdkDist,
            streamingBaseUrl: "/api/market/api/v1/streaming/content",
        }),
    ],
    server: {
        port: 6931,
        proxy: {
            "/api/market": {
                target: "https://market.gracia.ai",
                changeOrigin: true,
                secure: true,
                rewrite: (path) => path.replace(/^\/api\/market/, ""),
            },
        },
    },
});
