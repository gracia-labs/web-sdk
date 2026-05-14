// Vite plugins for @gracia/web-sdk integration — see README #2, #3, #4.

import fs from "node:fs";
import type { Plugin } from "vite";

/** README #2: serve GraciaWebCore.js from node_modules with COOP/COEP headers. */
export function serveGraciaWasm(wasmPath: string): Plugin {
  return {
    name: "serve-gracia-wasm",
    apply: "serve",

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && /\/GraciaWebCore\.js(\?.*)?$/.test(req.url)) {
          try {
            const stat = fs.statSync(wasmPath);
            res.setHeader("Content-Type", "application/javascript");
            res.setHeader("Content-Length", String(stat.size));
            res.setHeader("Cache-Control", "no-cache");
            res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
            res.setHeader(
              "Cross-Origin-Embedder-Policy",
              "require-corp",
            );
            fs.createReadStream(wasmPath).pipe(res);
            return;
          } catch {
            // File not found — fall through to default handler
          }
        }
        next();
      });
    },
  };
}

/** README #3: silence Vite's unanalyzable dynamic import warning. */
export function suppressGraciaWarning(): Plugin {
  return {
    name: "suppress-gracia-sdk-warning",
    apply: "serve",
    configResolved(config) {
      const originalWarn = config.logger.warn;
      config.logger.warn = (msg, options) => {
        if (typeof msg === "string" && msg.includes("GraciaSDK.js"))
          return;
        originalWarn(msg, options);
      };
    },
  };
}

/** README #4: append `?v=<version>` to bust browser/CDN caches after upgrades. */
export function graciaCacheBust(sdkVersion: string): Plugin {
  return {
    name: "gracia-cache-bust",
    apply: "build",
    renderChunk(code) {
      if (!code.includes('"GraciaWebCore.js"')) return null;
      return code.replace(
        '"GraciaWebCore.js"',
        `"GraciaWebCore.js?v=${sdkVersion}"`,
      );
    },
  };
}
