import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

function WebGPUGate() {
    if (!navigator.gpu) {
        return (
            <div style={errorStyle}>
                <h1>WebGPU is not available</h1>
                <p>Gracia requires Chrome 113+, Edge 113+, or Safari 18+.</p>
            </div>
        );
    }

    if (!self.crossOriginIsolated) {
        return (
            <div style={errorStyle}>
                <h1>Cross-origin isolation required</h1>
                <p>
                    Enable COOP/COEP — <code>graciaPlugin()</code> sets the headers in dev and
                    preview.
                </p>
            </div>
        );
    }

    return <App />;
}

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
