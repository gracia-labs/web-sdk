import {
  useGraciaPlayer,
  useGraciaPlaylist,
  XROverlay,
  type GraciaPlayerState,
} from "@gracia/web-sdk";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

declare const __GRACIA_MODULE_URL__: string;

// ---------------------------------------------------------------------------
// Demo content — replace with your own streaming IDs and tokens
// ---------------------------------------------------------------------------

// JS-side API calls are proxied through Vite (see README #11, vite.config.ts).
const STREAMING_API = "/api/market/api/v1/streaming/content";
const DEMO_URL = "/api/market/api/v1/demo";
const DEMO_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3NzMyMjg4OTcsImV4cCI6MTg5NDM2MTY0MH0.U9kEeoph8JFV9zZ9ht7F7NAFpaLRIKRuMyFAYR9xqsw";

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  // README #12: XR overlay requires THREE + optional peer deps
  const overlay = useMemo(() => new XROverlay(THREE), []);

  const gracia = useGraciaPlayer({
    containerRef,
    overlay,
    moduleUrl: __GRACIA_MODULE_URL__,
    eventLogger: {
      event: (name: string, data?: Record<string, unknown>) =>
        console.log(`[gracia] ${name}`, data),
      error: (error: Error, data?: Record<string, unknown>) =>
        console.error(`[gracia] error (${data?.phase})`, error),
    },
  });

  const playlist = useGraciaPlaylist(gracia);

  // README #6: close() before unmount so the player stops streaming
  const graciaRef = useRef(gracia);
  useEffect(() => {
    graciaRef.current = gracia;
  });
  useEffect(
    () => () => {
      graciaRef.current.close();
    },
    [],
  );

  // Load demo sources once the engine is ready
  useEffect(() => {
    if (!gracia.isInitialized) return;
    loadDemoSources(playlist);
  }, [gracia.isInitialized]);

  const showLoader =
    !gracia.isContentReady && !gracia.error && gracia.isInitialized;

  return (
    <div style={appStyle}>
      {/* The SDK renders into this container */}
      <div ref={containerRef} style={canvasWrapStyle} />

      {showLoader && <Loader progress={gracia.progress} />}

      <div style={overlayStyle}>
        <TopBar gracia={gracia} playlist={playlist} />
        <div style={{ flex: 1 }} />
        <BottomBar gracia={gracia} playlist={playlist} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Centered loader
// ---------------------------------------------------------------------------

function Loader({ progress }: { progress: number }) {
  return (
    <div style={loaderOverlayStyle}>
      <div style={loaderContainerStyle}>
        <svg width="48" height="48" viewBox="0 0 48 48" style={spinnerSvgStyle}>
          <circle
            cx="24" cy="24" r="20"
            fill="none"
            stroke="rgba(255,255,255,.1)"
            strokeWidth="3"
          />
          <circle
            cx="24" cy="24" r="20"
            fill="none"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${Math.PI * 40}`}
            strokeDashoffset={`${Math.PI * 40 * (1 - progress / 100)}`}
            style={{ transition: "stroke-dashoffset 0.3s ease", transform: "rotate(-90deg)", transformOrigin: "center" }}
          />
        </svg>
        {progress > 0 && (
          <span style={loaderTextStyle}>{Math.round(progress)}%</span>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Top bar — mode buttons + source selector + scene navigation
// ---------------------------------------------------------------------------

function TopBar({
  gracia,
  playlist,
}: {
  gracia: GraciaPlayerState;
  playlist: ReturnType<typeof useGraciaPlaylist>;
}) {
  const { xr } = gracia;
  const isXR = gracia.mode === "vr" || gracia.mode === "ar";

  return (
    <div style={topBarStyle}>
      <div style={modeGroupStyle}>
        <button
          style={{
            ...modeBtnStyle,
            ...(gracia.mode === "pw" ? modeBtnActiveStyle : {}),
          }}
          onClick={() => xr.setMode("pw")}
        >
          2D
        </button>
        {xr.vrSupported && (
          <button
            style={{
              ...modeBtnStyle,
              ...(gracia.mode === "vr" ? modeBtnActiveStyle : {}),
            }}
            onClick={() =>
              xr.setMode(gracia.mode === "vr" ? "pw" : "vr")
            }
          >
            {gracia.mode === "vr" ? "Exit VR" : "VR"}
          </button>
        )}
        {xr.arSupported && (
          <button
            style={{
              ...modeBtnStyle,
              ...(gracia.mode === "ar" ? modeBtnActiveStyle : {}),
            }}
            onClick={() =>
              xr.setMode(gracia.mode === "ar" ? "pw" : "ar")
            }
          >
            {gracia.mode === "ar" ? "Exit AR" : "AR"}
          </button>
        )}
      </div>

      {!isXR && (
        <>
          <div style={topSepStyle} />

          <SourceDropdown
            sources={playlist.sources}
            currentIndex={playlist.index}
            onSelect={(i) => playlist.goTo(i)}
          />

          <div style={sceneNavStyle}>
            <button
              style={navBtnStyle}
              disabled={!playlist.hasPrev}
              onClick={() => playlist.prev()}
            >
              <IconChevronLeft />
            </button>
            <span style={{ fontSize: 12, opacity: 0.5 }}>
              {playlist.total > 0
                ? `${playlist.index + 1} / ${playlist.total}`
                : "—"}
            </span>
            <button
              style={navBtnStyle}
              disabled={!playlist.hasNext}
              onClick={() => playlist.next()}
            >
              <IconChevronRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Bottom bar — playback controls + error display
// ---------------------------------------------------------------------------

function BottomBar({
  gracia,
  playlist,
}: {
  gracia: GraciaPlayerState;
  playlist: ReturnType<typeof useGraciaPlaylist>;
}) {
  const { playback } = gracia;
  const isXR = gracia.mode === "vr" || gracia.mode === "ar";

  const progressPct =
    playback.duration > 0
      ? (playback.currentTime / playback.duration) * 100
      : 0;

  if (isXR) return null;

  const playIcon = playback.isBuffering || playback.isSeeking
    ? <IconSpinner />
    : playback.isPlaying
      ? <IconPause />
      : <IconPlay />;

  return (
    <div style={bottomBarStyle}>
      {gracia.error && (
        <div style={errorBannerStyle}>{gracia.error.message}</div>
      )}

      <div style={controlsRowStyle}>
        <button style={playBtnStyle} onClick={() => playback.togglePlay()}>
          {playIcon}
        </button>

        <SeekBar
          progress={progressPct}
          duration={playback.duration}
          onSeek={(t) => playback.seek(t)}
        />

        <span style={timeStyle}>
          {fmt(playback.currentTime)} / {fmt(playback.duration)}
        </span>

        <button style={muteBtnStyle} onClick={() => playback.toggleMute()}>
          {playback.isMuted ? <IconMuted /> : <IconVolume />}
        </button>
      </div>

      <div style={statusBarStyle}>
        {playlist.currentSource?.label && (
          <span style={tagStyle}>{playlist.currentSource.label}</span>
        )}
        {gracia.isRebuffering && (
          <span style={{ ...tagStyle, background: "rgba(255,180,60,.15)", color: "rgba(255,180,60,.9)" }}>
            rebuffering
          </span>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Seek bar
// ---------------------------------------------------------------------------

function SeekBar({
  progress,
  duration,
  onSeek,
}: {
  progress: number;
  duration: number;
  onSeek: (t: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const getTime = useCallback(
    (e: React.PointerEvent) => {
      const rect = ref.current!.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      return ratio * duration;
    },
    [duration],
  );

  return (
    <div
      ref={ref}
      style={trackStyle}
      onPointerDown={(e) => {
        e.preventDefault();
        dragging.current = true;
        ref.current!.setPointerCapture(e.pointerId);
        onSeek(getTime(e));
      }}
      onPointerMove={(e) => {
        if (dragging.current) onSeek(getTime(e));
      }}
      onPointerUp={(e) => {
        dragging.current = false;
        ref.current!.releasePointerCapture(e.pointerId);
      }}
      onPointerCancel={() => {
        dragging.current = false;
      }}
    >
      <div style={{ ...fillStyle, width: `${progress}%` }} />
      <div style={{ ...thumbStyle, left: `${progress}%` }} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Source dropdown
// ---------------------------------------------------------------------------

function SourceDropdown({
  sources,
  currentIndex,
  onSelect,
}: {
  sources: { label?: string; id?: string }[];
  currentIndex: number;
  onSelect: (i: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const label =
    currentIndex >= 0 && sources[currentIndex]
      ? (sources[currentIndex].label ?? sources[currentIndex].id ?? "Untitled")
      : "Select source…";

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        style={{
          ...ddToggleStyle,
          ...(open ? ddToggleOpenStyle : {}),
        }}
        onClick={() => setOpen(!open)}
      >
        <span>{label}</span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          style={{
            marginLeft: 8,
            transition: "transform .2s ease",
            transform: open ? "rotate(180deg)" : "rotate(0)",
          }}
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div style={ddMenuStyle}>
          <div style={ddMenuScrollStyle}>
            {sources.map((s, i) => {
              const isActive = i === currentIndex;
              const isHovered = i === hovered;
              return (
                <button
                  key={s.id ?? i}
                  style={{
                    ...ddItemStyle,
                    ...(isActive ? ddItemActiveStyle : {}),
                    ...(isHovered && !isActive ? ddItemHoverStyle : {}),
                  }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(-1)}
                  onClick={() => {
                    onSelect(i);
                    setOpen(false);
                  }}
                >
                  {isActive && (
                    <span style={{ marginRight: 6, fontSize: 9 }}>●</span>
                  )}
                  {s.label ?? s.id ?? `Source ${i + 1}`}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Demo source loader
// ---------------------------------------------------------------------------

async function loadDemoSources(
  playlist: ReturnType<typeof useGraciaPlaylist>,
) {
  try {
    const demos: { streamingId: string; label?: string }[] = await (
      await fetch(DEMO_URL)
    ).json();

    await playlist.loadFromApi(
      demos.map((d) => ({
        streamingId: d.streamingId,
        token: DEMO_TOKEN,
        label: d.label,
        settings: { resetPositionOnStart: true },
      })),
      STREAMING_API,
    );
  } catch (err) {
    console.warn("Failed to load demo sources:", err);
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function fmt(t: number) {
  if (!Number.isFinite(t) || t < 0) return "0:00";
  return `${~~(t / 60)}:${String(~~t % 60).padStart(2, "0")}`;
}

// ---------------------------------------------------------------------------
// SVG icons
// ---------------------------------------------------------------------------

const svgProps = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function IconPlay() {
  return <svg {...svgProps}><polygon points="6,3 20,12 6,21" fill="currentColor" stroke="none" /></svg>;
}

function IconPause() {
  return <svg {...svgProps}><rect x="5" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none" /><rect x="15" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none" /></svg>;
}

function IconSpinner() {
  return (
    <svg {...svgProps} style={{ animation: "spin .8s linear infinite" }}>
      <path d="M12 2a10 10 0 0 1 10 10" strokeWidth="2.5" />
    </svg>
  );
}

function IconVolume() {
  return (
    <svg {...svgProps}>
      <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="currentColor" stroke="none" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function IconMuted() {
  return (
    <svg {...svgProps}>
      <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="currentColor" stroke="none" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

function IconChevronLeft() {
  return <svg {...svgProps} width={12} height={12}><polyline points="15,18 9,12 15,6" /></svg>;
}

function IconChevronRight() {
  return <svg {...svgProps} width={12} height={12}><polyline points="9,6 15,12 9,18" /></svg>;
}

// ---------------------------------------------------------------------------
// Styles (inline to keep the example self-contained)
// ---------------------------------------------------------------------------

const appStyle: React.CSSProperties = {
  position: "relative",
  width: "100vw",
  height: "100vh",
  background: "#000",
  overflow: "hidden",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
  color: "#fff",
};

const canvasWrapStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
};

const loaderOverlayStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  zIndex: 5,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(0,0,0,.6)",
  backdropFilter: "blur(4px)",
};

const loaderContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 14,
};

const spinnerSvgStyle: React.CSSProperties = {
  animation: "none",
};

const loaderTextStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 500,
  color: "rgba(255,255,255,.7)",
  letterSpacing: "0.02em",
};

const overlayStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  zIndex: 10,
  pointerEvents: "none",
  display: "flex",
  flexDirection: "column",
  padding: "14px 16px",
};

const topBarStyle: React.CSSProperties = {
  pointerEvents: "auto",
  display: "flex",
  gap: 10,
  alignItems: "center",
  flexWrap: "wrap",
};

const modeGroupStyle: React.CSSProperties = {
  display: "flex",
  gap: 2,
  background: "rgba(255,255,255,.06)",
  borderRadius: 6,
  padding: 2,
};

const modeBtnStyle: React.CSSProperties = {
  padding: "5px 12px",
  border: 0,
  borderRadius: 4,
  background: "none",
  color: "rgba(255,255,255,.45)",
  cursor: "pointer",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.03em",
  transition: "all .15s ease",
  whiteSpace: "nowrap",
};

const modeBtnActiveStyle: React.CSSProperties = {
  background: "rgba(255,255,255,.12)",
  color: "#fff",
};

const topSepStyle: React.CSSProperties = {
  width: 1,
  height: 20,
  background: "rgba(255,255,255,.12)",
};

const bottomBarStyle: React.CSSProperties = {
  pointerEvents: "auto",
  display: "flex",
  flexDirection: "column",
  gap: 6,
};

const controlsRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
};

const playBtnStyle: React.CSSProperties = {
  width: 30,
  height: 30,
  border: 0,
  borderRadius: "50%",
  background: "rgba(255,255,255,.15)",
  color: "#fff",
  fontSize: 14,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const muteBtnStyle: React.CSSProperties = { ...playBtnStyle };

const trackStyle: React.CSSProperties = {
  flex: 1,
  height: 4,
  background: "rgba(255,255,255,.1)",
  borderRadius: 2,
  position: "relative",
  cursor: "pointer",
};

const fillStyle: React.CSSProperties = {
  position: "absolute",
  inset: "0 auto 0 0",
  borderRadius: 2,
  background: "rgba(255,255,255,.5)",
  pointerEvents: "none",
};

const thumbStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  width: 12,
  height: 12,
  background: "#fff",
  borderRadius: "50%",
  transform: "translate(-50%,-50%)",
  boxShadow: "0 1px 6px #0008",
  pointerEvents: "none",
};

const timeStyle: React.CSSProperties = {
  fontSize: 11,
  opacity: 0.35,
  minWidth: 80,
  textAlign: "right",
  fontWeight: 500,
};

const sceneNavStyle: React.CSSProperties = {
  display: "flex",
  gap: 6,
  alignItems: "center",
};

const navBtnStyle: React.CSSProperties = {
  width: 24,
  height: 24,
  border: "1px solid rgba(255,255,255,.2)",
  borderRadius: 4,
  background: "rgba(255,255,255,.06)",
  color: "rgba(255,255,255,.6)",
  cursor: "pointer",
  fontSize: 11,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const ddToggleStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "6px 12px",
  border: "1px solid rgba(255,255,255,.15)",
  borderRadius: 6,
  background: "rgba(255,255,255,.06)",
  color: "rgba(255,255,255,.7)",
  cursor: "pointer",
  fontSize: 12,
  fontWeight: 500,
  whiteSpace: "nowrap",
  letterSpacing: "0.01em",
  transition: "all .15s ease",
  textShadow: "0 1px 3px rgba(0,0,0,.5)",
};

const ddToggleOpenStyle: React.CSSProperties = {
  borderColor: "rgba(255,255,255,.3)",
  color: "#fff",
  background: "rgba(255,255,255,.1)",
};

const ddMenuStyle: React.CSSProperties = {
  position: "absolute",
  top: "calc(100% + 6px)",
  left: 0,
  zIndex: 30,
  minWidth: 180,
  border: "1px solid rgba(255,255,255,.1)",
  borderRadius: 8,
  background: "rgba(18,18,18,.96)",
  backdropFilter: "blur(16px) saturate(1.4)",
  boxShadow: "0 12px 40px rgba(0,0,0,.5), 0 2px 8px rgba(0,0,0,.3)",
  padding: "5px",
  overflow: "hidden",
};

const ddMenuScrollStyle: React.CSSProperties = {
  maxHeight: 260,
  overflowY: "auto",
};

const ddItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  width: "100%",
  padding: "7px 10px",
  border: 0,
  borderRadius: 5,
  background: "none",
  color: "rgba(255,255,255,.55)",
  cursor: "pointer",
  fontSize: 12,
  fontWeight: 400,
  textAlign: "left",
  whiteSpace: "nowrap",
  transition: "all .1s ease",
  letterSpacing: "0.01em",
};

const ddItemActiveStyle: React.CSSProperties = {
  color: "#fff",
  fontWeight: 600,
  background: "rgba(255,255,255,.08)",
};

const ddItemHoverStyle: React.CSSProperties = {
  background: "rgba(255,255,255,.06)",
  color: "rgba(255,255,255,.85)",
};

const errorBannerStyle: React.CSSProperties = {
  background: "rgba(255,80,80,.15)",
  color: "rgba(255,80,80,.9)",
  padding: "6px 12px",
  borderRadius: 6,
  fontSize: 12,
};

const statusBarStyle: React.CSSProperties = {
  display: "flex",
  gap: 8,
  alignItems: "center",
  fontSize: 10,
  color: "rgba(255,255,255,.3)",
};

const tagStyle: React.CSSProperties = {
  padding: "2px 6px",
  borderRadius: 3,
  background: "rgba(255,255,255,.08)",
};
