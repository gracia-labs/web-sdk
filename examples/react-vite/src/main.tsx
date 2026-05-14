import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

// README #7: check WebGPU early to avoid opaque WASM crash
function WebGPUGate() {
  if (!navigator.gpu) {
    return (
      <div style={errorStyle}>
        <h1>WebGPU is not available</h1>
        <p>
          Gracia SDK requires a browser with WebGPU support.
          <br />
          Try Chrome 113+, Edge 113+, or Safari 18+.
        </p>
        <p style={{ fontSize: 13, opacity: 0.6 }}>
          <code>navigator.gpu</code> is <code>undefined</code>
        </p>
      </div>
    );
  }

  // README #1: COOP/COEP required for SharedArrayBuffer
  if (!self.crossOriginIsolated) {
    return (
      <div style={errorStyle}>
        <h1>Cross-origin isolation required</h1>
        <p>
          The server must send these headers on every response:
        </p>
        <pre style={preStyle}>
{`Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp`}
        </pre>
        <p style={{ fontSize: 13, opacity: 0.6 }}>
          <code>self.crossOriginIsolated</code> is <code>false</code>
          <br />
          Check the Vite config — see <code>vite.config.ts</code> and
          the README for details.
        </p>
      </div>
    );
  }

  return <App />;
}

// README #5: StrictMode double-mounts in dev — intentionally left ON
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WebGPUGate />
  </StrictMode>,
);

const errorStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  fontFamily: "system-ui, sans-serif",
  color: "#e0e0e0",
  background: "#111",
  textAlign: "center",
  padding: 32,
};

const preStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  padding: "12px 20px",
  borderRadius: 8,
  fontSize: 13,
  textAlign: "left",
};
