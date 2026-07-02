import { graciaPlugin } from "@gracia/web-sdk/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
    plugins: [react(), mkcert(), ...graciaPlugin({ bundle: "core", dedupe: true })],
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
