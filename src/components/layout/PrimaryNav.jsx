// PrimaryNav: Work fills column 2, Gallery fills column 3. Each is a grey,
// square-cornered button that sits between the same guide lines as the
// S/R/I stack, white label right aligned on its second guide line.
// Hover: wherever the pointer goes, a small eye-tracking heatmap blooms
// (green, yellow, orange, red) and slowly cools.
// Click: the blue drains out of the current button and flows into the one
// clicked, then that page opens. From the intro (nothing blue yet) the blue
// floods in from the point that was clicked.
// Reduced motion: no heat, no flow; the click just navigates.
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LINKS = [
  { to: "/work", label: "Work" },
  { to: "/gallery", label: "Gallery" },
];

const FLOW_MS = 640;
const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// 256-step palette: transparent, then green, yellow, orange, red.
function palette() {
  const stops = [
    [0.0, [0, 0, 0, 0]],
    [0.15, [40, 190, 70, 120]],
    [0.45, [240, 220, 40, 175]],
    [0.7, [245, 140, 30, 200]],
    [1.0, [225, 35, 30, 220]],
  ];
  const out = new Uint8ClampedArray(256 * 4);
  for (let i = 0; i < 256; i++) {
    const t = i / 255;
    let k = 0;
    while (k < stops.length - 2 && t > stops[k + 1][0]) k++;
    const [t0, c0] = stops[k];
    const [t1, c1] = stops[k + 1];
    const f = Math.min(1, Math.max(0, (t - t0) / (t1 - t0)));
    for (let c = 0; c < 4; c++) out[i * 4 + c] = c0[c] + (c1[c] - c0[c]) * f;
  }
  return out;
}
const PALETTE = typeof window !== "undefined" ? palette() : null;

function Heat({ live }) {
  const ref = useRef(null);
  const state = useRef({ heat: null, w: 0, h: 0, raf: 0 });

  useEffect(() => {
    const cv = ref.current;
    const s = state.current;
    const fit = () => {
      const r = cv.getBoundingClientRect();
      s.w = Math.max(1, Math.round(r.width));
      s.h = Math.max(1, Math.round(r.height));
      cv.width = s.w; cv.height = s.h;
      s.heat = new Float32Array(s.w * s.h);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(cv);

    const draw = () => {
      const ctx = cv.getContext("2d");
      const img = ctx.createImageData(s.w, s.h);
      let any = false;
      for (let i = 0; i < s.heat.length; i++) {
        const v = (s.heat[i] *= 0.985);              // slow cooling
        if (v < 0.004) { s.heat[i] = 0; continue; }
        any = true;
        const p = Math.min(255, (v * 255) | 0) * 4;
        img.data[i * 4] = PALETTE[p];
        img.data[i * 4 + 1] = PALETTE[p + 1];
        img.data[i * 4 + 2] = PALETTE[p + 2];
        img.data[i * 4 + 3] = PALETTE[p + 3];
      }
      ctx.putImageData(img, 0, 0);
      s.raf = any ? requestAnimationFrame(draw) : 0;
    };

    const btn = cv.parentElement;
    const add = (e) => {
      if (reduced() || !live.current) return;
      const r = cv.getBoundingClientRect();
      const cx = e.clientX - r.left, cy = e.clientY - r.top;
      const R = 22;                                   // a small blob, not the whole button
      for (let y = Math.max(0, (cy - R) | 0); y < Math.min(s.h, cy + R); y++) {
        for (let x = Math.max(0, (cx - R) | 0); x < Math.min(s.w, cx + R); x++) {
          const d = ((x - cx) / R) ** 2 + ((y - cy) / (R * 0.8)) ** 2;
          if (d < 1) {
            const i = y * s.w + x;
            s.heat[i] = Math.min(1, s.heat[i] + 0.09 * (1 - d) ** 2);
          }
        }
      }
      if (!s.raf) s.raf = requestAnimationFrame(draw);
    };
    btn.addEventListener("pointermove", add);
    return () => { ro.disconnect(); btn.removeEventListener("pointermove", add); cancelAnimationFrame(s.raf); };
  }, [live]);

  return <canvas ref={ref} className="primary-nav__heat" aria-hidden="true" />;
}

// flow: null, or { mode: "drain" | "fill" | "flood", dir: "right" | "left", x, y, r }
function NavButton({ to, label, current, flow, onGo }) {
  const live = useRef(true);
  live.current = !current && !flow;

  let blue = null;
  if (flow?.mode === "flood") {
    blue = (
      <span
        className="primary-nav__flood"
        aria-hidden="true"
        style={{ "--fx": `${flow.x}px`, "--fy": `${flow.y}px`, "--fr": `${flow.r}px`, "--flow-ms": `${FLOW_MS}ms` }}
      />
    );
  } else if (flow) {
    blue = (
      <span
        className={`primary-nav__blue primary-nav__blue--${flow.mode}-${flow.dir}`}
        aria-hidden="true"
        style={{ "--flow-ms": `${FLOW_MS}ms` }}
      />
    );
  } else if (current) {
    blue = <span className="primary-nav__blue" aria-hidden="true" />;
  }

  return (
    <a
      href={`${import.meta.env.BASE_URL.replace(/\/$/, "")}${to}`}
      onClick={(e) => { e.preventDefault(); onGo(to, e); }}
      aria-current={current ? "page" : undefined}
      className="primary-nav__link"
    >
      <Heat live={live} />
      {blue}
      <span className="primary-nav__label">{label}</span>
    </a>
  );
}

export default function PrimaryNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const path = pathname.replace(/\/+$/, "") || "/";
  const [flows, setFlows] = useState(null);   // { [to]: flow }

  useEffect(() => { setFlows(null); }, [path]);

  const go = (to, e) => {
    if (to === path || flows) return;
    if (reduced()) return navigate(to);
    const from = LINKS.find((l) => l.to === path);
    const iFrom = LINKS.findIndex((l) => l.to === path);
    const iTo = LINKS.findIndex((l) => l.to === to);
    if (from) {
      // Drain out of the current button toward the one clicked; fill in from the near side.
      const dir = iTo > iFrom ? "right" : "left";
      setFlows({ [from.to]: { mode: "drain", dir }, [to]: { mode: "fill", dir } });
    } else {
      const r = e.currentTarget.getBoundingClientRect();
      const x = e.clientX ? e.clientX - r.left : r.width;
      const y = e.clientY ? e.clientY - r.top : r.height;
      const far = Math.hypot(Math.max(x, r.width - x), Math.max(y, r.height - y));
      setFlows({ [to]: { mode: "flood", x, y, r: far } });
    }
    window.setTimeout(() => navigate(to), FLOW_MS);
  };

  return (
    <nav aria-label="Primary" className="primary-nav">
      {LINKS.map(({ to, label }) => (
        <NavButton key={to} to={to} label={label} current={path === to} flow={flows?.[to] ?? null} onGo={go} />
      ))}
    </nav>
  );
}
