import { existsSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import selfsigned from "selfsigned";

const PUBLIC = join(import.meta.dirname, "../..");
const sources = join(PUBLIC, "sources.json");
if (!existsSync(sources)) writeFileSync(sources, `${JSON.stringify({ sources: [] })}\n`);
const PAGES = join(import.meta.dirname, "pages");
const DIST = join(PUBLIC, "dist");
const PORT = 6931;
const PID = join(PUBLIC, ".server.pid");

if (existsSync(PID)) {
    try {
        process.kill(+readFileSync(PID, "utf-8"));
    } catch {}
    unlinkSync(PID);
}

const tls = await selfsigned.generate([{ name: "commonName", value: "localhost" }], {
    days: 365,
    extensions: [{ name: "subjectAltName", altNames: [{ type: 2, value: "localhost" }, { type: 7, ip: "127.0.0.1" }] }],
});

const coi = (headers = new Headers()) => {
    headers.set("Cross-Origin-Embedder-Policy", "require-corp");
    headers.set("Cross-Origin-Opener-Policy", "same-origin");
    headers.set("Cross-Origin-Resource-Policy", "same-origin");
    return headers;
};

const respond = (body, init = {}) => new Response(body, { ...init, headers: coi(new Headers(init.headers)) });

const resolve = (pathname) => {
    if (pathname.startsWith("/dist/")) return join(PUBLIC, pathname.slice(1));
    const leaf = pathname === "/" ? "index.html" : pathname.slice(1);
    if (!leaf.endsWith(".html")) return join(PUBLIC, leaf);
    const direct = join(PAGES, leaf);
    if (existsSync(direct)) return direct;
    const internal = join(PAGES, `__${leaf}`);
    return existsSync(internal) ? internal : direct;
};

const patchHtml = (html) => {
    try {
        const m = JSON.parse(readFileSync(join(DIST, "gracia-manifest.json"), "utf-8"));
        return html
            .replaceAll("__SDK_HASH__", m.aio.hash.slice(0, 16))
            .replaceAll("__WASM_HASH__", m.wasm.hash.slice(0, 16))
            .replaceAll("__DEMO_DOMAIN__", "");
    } catch {
        return html.replaceAll("__DEMO_DOMAIN__", "");
    }
};

async function serveFile(req, path) {
    const file = Bun.file(path);
    if (!(await file.exists())) return null;

    const headers = { "Cache-Control": "no-cache, must-revalidate", "Accept-Ranges": "bytes" };
    if (file.type) headers["Content-Type"] = file.type;

    const range = req.headers.get("Range");
    if (range) {
        const m = /^bytes=(\d+)-(\d*)$/.exec(range);
        if (m) {
            const start = +m[1];
            const end = m[2] ? +m[2] : file.size - 1;
            if (start >= file.size || start > end) {
                return respond(null, { status: 416, headers: { ...headers, "Content-Range": `bytes */${file.size}` } });
            }
            return respond(file.slice(start, end + 1), {
                status: 206,
                headers: { ...headers, "Content-Range": `bytes ${start}-${end}/${file.size}`, "Content-Length": String(end - start + 1) },
            });
        }
    }

    return respond(file, { headers });
}

Bun.serve({
    port: PORT,
    tls: { key: tls.private, cert: tls.cert },
    async fetch(req) {
        const { pathname, search } = new URL(req.url);

        if (pathname.startsWith("/api/market/api/v1/demo")) {
            const upstream = await fetch(`https://market.gracia.ai/api/v1/demo${search}`, {
                headers: { Accept: "application/json" },
            });
            return respond(upstream.body, {
                status: upstream.status,
                headers: { "Content-Type": upstream.headers.get("Content-Type") || "application/json" },
            });
        }

        if (pathname === "/api/sources") {
            const file = Bun.file(sources);
            return respond(await file.text(), {
                headers: { "Content-Type": "application/json", "Cache-Control": "no-cache, must-revalidate" },
            });
        }

        const path = resolve(pathname);
        if (path.endsWith(".html")) {
            const file = Bun.file(path);
            if (await file.exists()) {
                return respond(patchHtml(await file.text()), {
                    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-cache, no-store, must-revalidate" },
                });
            }
        }

        return (await serveFile(req, path)) ?? respond(patchHtml(await Bun.file(resolve("/")).text()), {
            headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-cache, no-store, must-revalidate" },
        });
    },
});

writeFileSync(PID, String(process.pid));
for (const sig of ["SIGINT", "SIGTERM"]) {
    process.on(sig, () => {
        try {
            unlinkSync(PID);
        } catch {}
        process.exit(0);
    });
}

console.log(`https://localhost:${PORT}`);
