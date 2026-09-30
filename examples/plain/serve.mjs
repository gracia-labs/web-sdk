import { existsSync, readFileSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import { extname, isAbsolute, join, relative, sep } from "node:path";
import selfsigned from "selfsigned";

const PUBLIC = join(import.meta.dirname, "../..");
const SOURCES = join(PUBLIC, "sources.json");
const PAGES = join(import.meta.dirname, "pages");
const DIST = join(PUBLIC, "dist");
const PID = join(PUBLIC, ".server.pid");
const NO_STORE = "no-cache, no-store, must-revalidate";

const respond = (body, init = {}) => new Response(body, init);

const notFound = () =>
    respond("Not found\n", {
        status: 404,
        headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": NO_STORE },
    });

const html = (body) =>
    respond(body, {
        headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": NO_STORE },
    });

export function safeJoin(root, rel) {
    let decoded;
    try {
        decoded = decodeURIComponent(rel);
    } catch {
        return null;
    }
    const path = join(root, decoded);
    const inside = relative(root, path);
    if (inside === ".." || inside.startsWith(`..${sep}`) || isAbsolute(inside)) return null;
    return path;
}

function manifestReader(distDir) {
    const file = join(distDir, "gracia-manifest.json");
    let cached = null;
    let mtime = -1;
    return () => {
        const stat = statSync(file, { throwIfNoEntry: false });
        if (!stat) {
            if (cached) return cached;
            throw new Error(`cannot read ${file}: missing`);
        }
        if (stat.mtimeMs === mtime) return cached;
        const m = JSON.parse(readFileSync(file, "utf-8"));
        if (!m.aio?.hash || !m.wasm?.hash) {
            throw new Error(`cannot read ${file}: missing aio.hash or wasm.hash`);
        }
        cached = m;
        mtime = stat.mtimeMs;
        return m;
    };
}

const contentType = (path, fallback) => {
    if (path.endsWith(".js") || path.endsWith(".mjs")) return "text/javascript; charset=utf-8";
    if (path.endsWith(".json")) return "application/json; charset=utf-8";
    if (path.endsWith(".wasm")) return "application/wasm";
    if (path.endsWith(".html")) return "text/html; charset=utf-8";
    return fallback;
};

export async function serveFile(req, path) {
    const file = Bun.file(path);
    if (!(await file.exists())) return null;

    const headers = { "Cache-Control": "no-cache, must-revalidate", "Accept-Ranges": "bytes" };
    const type = contentType(path, file.type);
    if (type) headers["Content-Type"] = type;

    const range = req.headers.get("Range");
    if (range) {
        const m = /^bytes=(\d+)-(\d*)$/.exec(range);
        if (m) {
            const start = +m[1];
            const end = m[2] ? Math.min(+m[2], file.size - 1) : file.size - 1;
            if (start >= file.size || start > end) {
                return respond(null, {
                    status: 416,
                    headers: { ...headers, "Content-Range": `bytes */${file.size}` },
                });
            }
            return respond(file.slice(start, end + 1), {
                status: 206,
                headers: {
                    ...headers,
                    "Content-Range": `bytes ${start}-${end}/${file.size}`,
                    "Content-Length": String(end - start + 1),
                },
            });
        }
    }

    return respond(file, { headers });
}

function killPrevious(pidFile) {
    if (!existsSync(pidFile)) return;
    try {
        process.kill(+readFileSync(pidFile, "utf-8"));
    } catch {}
    unlinkSync(pidFile);
}

/**
 * @param {{
 *   distDir?: string,
 *   https?: { port: number } | null,
 *   http?: { port: number, hostname?: string } | null,
 *   localContent?: string | null,
 *   headInject?: string,
 *   routes?: Record<string, (req: Request, pathname: string) => Response | Promise<Response | null> | null>,
 *   pidFile?: string | null,
 * }} [options]
 */
export async function createServer({
    distDir = DIST,
    https = { port: 6931 },
    http = null,
    localContent = null,
    headInject = "",
    routes = {},
    pidFile = PID,
} = {}) {
    if (!existsSync(SOURCES)) writeFileSync(SOURCES, `${JSON.stringify({ sources: [] })}\n`);
    const manifest = manifestReader(distDir);
    manifest();

    const resolve = (pathname) => {
        if (pathname.startsWith("/dist/"))
            return safeJoin(distDir, pathname.slice("/dist/".length));
        const leaf = pathname === "/" ? "index.html" : pathname.slice(1);
        if (!leaf.endsWith(".html")) return safeJoin(PUBLIC, leaf);
        const direct = safeJoin(PAGES, leaf);
        if (!direct || existsSync(direct)) return direct;
        const internal = safeJoin(PAGES, `__${leaf}`);
        return internal && existsSync(internal) ? internal : direct;
    };

    const patchHtml = (text) => {
        const m = manifest();
        const patched = text
            .replaceAll("__SDK_HASH__", m.aio.hash.slice(0, 16))
            .replaceAll("__WASM_HASH__", m.wasm.hash.slice(0, 16))
            .replaceAll("__DEMO_DOMAIN__", "");
        return headInject ? patched.replace(/<head[^>]*>/i, (tag) => tag + headInject) : patched;
    };

    async function fetch(req) {
        const { pathname, search } = new URL(req.url);

        if (pathname.startsWith("/api/market/api/v1/demo")) {
            const upstream = await globalThis.fetch(
                `https://market.gracia.ai/api/v1/demo${search}`,
                {
                    headers: { Accept: "application/json" },
                },
            );
            return respond(upstream.body, {
                status: upstream.status,
                headers: {
                    "Content-Type": upstream.headers.get("Content-Type") || "application/json",
                },
            });
        }

        if (pathname === "/api/sources") {
            return respond(await Bun.file(SOURCES).text(), {
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache, must-revalidate",
                },
            });
        }

        for (const [prefix, handler] of Object.entries(routes)) {
            if (!pathname.startsWith(prefix)) continue;
            const res = await handler(req, pathname);
            if (res) return res;
        }

        if (localContent && pathname.startsWith("/local-content/")) {
            const path = safeJoin(localContent, pathname.slice("/local-content/".length));
            return (path && (await serveFile(req, path))) || notFound();
        }

        const path = resolve(pathname);
        if (!path) return notFound();

        if (path.endsWith(".html")) {
            const file = Bun.file(path);
            if (await file.exists()) return html(patchHtml(await file.text()));
        }

        const file = await serveFile(req, path);
        if (file) return file;

        if (pathname.startsWith("/dist/") || extname(pathname)) return notFound();

        return html(patchHtml(await Bun.file(resolve("/")).text()));
    }

    if (pidFile) killPrevious(pidFile);

    const servers = [];
    const urls = [];
    if (https) {
        const tls = await selfsigned.generate([{ name: "commonName", value: "localhost" }], {
            days: 365,
            extensions: [
                {
                    name: "subjectAltName",
                    altNames: [
                        { type: 2, value: "localhost" },
                        { type: 7, ip: "127.0.0.1" },
                    ],
                },
            ],
        });
        const server = Bun.serve({
            port: https.port,
            idleTimeout: 30,
            tls: { key: tls.private, cert: tls.cert },
            fetch,
        });
        servers.push(server);
        urls.push(`https://localhost:${server.port}`);
    }
    if (http) {
        const server = Bun.serve({
            hostname: http.hostname ?? "127.0.0.1",
            port: http.port,
            idleTimeout: 30,
            fetch,
        });
        servers.push(server);
        urls.push(`http://localhost:${server.port}`);
    }

    const removePid = () => {
        if (!pidFile) return;
        try {
            unlinkSync(pidFile);
        } catch {}
    };
    if (pidFile) {
        writeFileSync(pidFile, String(process.pid));
        for (const sig of ["SIGINT", "SIGTERM"]) {
            process.on(sig, () => {
                removePid();
                process.exit(0);
            });
        }
    }

    return {
        urls,
        stop() {
            for (const server of servers) server.stop(true);
            removePid();
        },
    };
}

if (import.meta.main) {
    try {
        const { urls } = await createServer();
        console.log(urls.join("\n"));
    } catch (err) {
        console.error(`[gracia] ${err.message}`);
        console.error("[gracia] run `bun run build` before `bun run serve`.");
        process.exit(1);
    }
}
