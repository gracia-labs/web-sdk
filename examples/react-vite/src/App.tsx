import { GraciaReactPlayer } from "@gracia/web-sdk/core";
import type { GraciaPlayerProps, StreamingItem } from "@gracia/web-sdk/core";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

const DEMO_URL = "/api/market/api/v1/demo";
const DEMO_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3NzMyMjg4OTcsImV4cCI6MTg5NDM2MTY0MH0.U9kEeoph8JFV9zZ9ht7F7NAFpaLRIKRuMyFAYR9xqsw";

interface DemoItem {
  streamingId: string;
  label?: string;
}

const playerLogger = {
  event: (name, data) => console.log(`[gracia] ${name}`, data),
  error: (error, data) => console.error(`[gracia] error (${data?.phase})`, error),
} satisfies NonNullable<GraciaPlayerProps["eventLogger"]>;

async function loadDemoItems(): Promise<StreamingItem[]> {
  const demos = (await (await fetch(DEMO_URL)).json()) as DemoItem[];

  return demos.map((demo) => ({
    streamingId: demo.streamingId,
    token: DEMO_TOKEN,
    label: demo.label,
    settings: { resetPositionOnStart: true },
  }));
}

export default function App() {
  const [streaming, setStreaming] = useState<StreamingItem[]>([]);
  const [demoError, setDemoError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    loadDemoItems()
      .then((items) => {
        if (!cancelled) setStreaming(items);
      })
      .catch((error) => {
        if (!cancelled) setDemoError(error instanceof Error ? error.message : String(error));
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main style={pageStyle}>
      <GraciaReactPlayer
        streaming={streaming}
        localFiles
        style={playerStyle}
        eventLogger={playerLogger}
        sceneSelector="menu"
      />
      {demoError && <div style={demoErrorStyle}>{demoError}</div>}
    </main>
  );
}

const pageStyle: CSSProperties = {
  position: "relative",
  width: "100vw",
  height: "100vh",
  margin: 0,
  overflow: "hidden",
  background: "#0d1115",
};

const playerStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  minHeight: "100vh",
  borderRadius: 0,
};

const demoErrorStyle: CSSProperties = {
  position: "absolute",
  top: 16,
  left: "50%",
  zIndex: 20,
  transform: "translateX(-50%)",
  padding: "10px 14px",
  border: "1px solid rgba(248,113,113,.25)",
  borderRadius: 12,
  background: "rgba(127,29,29,.82)",
  color: "rgba(255,255,255,.9)",
  font: "400 13px/1.4 system-ui, sans-serif",
  boxShadow: "0 4px 32px rgba(0,0,0,.25)",
  backdropFilter: "blur(12px)",
};
