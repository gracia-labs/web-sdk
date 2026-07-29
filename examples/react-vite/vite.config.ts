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
            dedupe: true,
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
