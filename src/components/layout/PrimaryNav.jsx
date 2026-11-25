// PrimaryNav: Work fills column 2, Gallery fills column 3. Each is a light grey,
// square-cornered button as tall as the S/R/I stack, text right aligned.
// Hover: wherever the pointer goes, a small eye-tracking heatmap blooms
// (green, yellow, orange, red) and slowly cools.
// Click: blue floods the button from the point that was clicked, then the page
// opens. The current page stays filled blue.
// Reduced motion: no heat, no flood; the click just navigates.
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LINKS = [
  { to: "/work", label: "Work" },
  { to: "/gallery", label: "Gallery" },
];

const FILL_MS = 520;
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

function Heat({ active }) {
  const ref = useRef(null);
  const state = useRef({ heat: null, w: 0, h: 0, raf: 0, last: null });

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
        const v = s.heat[i] *= 0.985;               // slow cooling
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
      if (reduced() || !active.current) return;
      const r = cv.getBoundingClientRect();
      const cx = e.clientX - r.left, cy = e.clientY - r.top;
      const R = 22;                                   // small blob, not the whole button
      for (let y = Math.max(0, cy - R | 0); y < Math.min(s.h, cy + R); y++) {
        for (let x = Math.max(0, cx - R | 0); x < Math.min(s.w, cx + R); x++) {
          // slightly wider than tall, like a fixation blob
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
  }, [active]);

  return <canvas ref={ref} className="primary-nav__heat" aria-hidden="true" />;
}

function NavButton({ to, label, current }) {
  const navigate = useNavigate();
  const [fill, setFill] = useState(null);   // {x, y, r} while flooding
  const live = useRef(true);
  live.current = !current;

  const onClick = (e) => {
    e.preventDefault();
    if (current || fill) return;
    if (reduced()) return navigate(to);
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX ? e.clientX - r.left : r.width;   // keyboard: from the right corner
    const y = e.clientY ? e.clientY - r.top : r.height;
    const far = Math.hypot(Math.max(x, r.width - x), Math.max(y, r.height - y));
    setFill({ x, y, r: far });
    window.setTimeout(() => { setFill(null); navigate(to); }, FILL_MS);
  };

  return (
    <a
      href={`${import.meta.env.BASE_URL.replace(/\/$/, "")}${to}`}
      onClick={onClick}
      aria-current={current ? "page" : undefined}
      className={"primary-nav__link" + (fill ? " primary-nav__link--filling" : "")}
    >
      <Heat active={live} />
      {fill && (
        <span
          className="primary-nav__flood"
          aria-hidden="true"
          style={{ "--fx": `${fill.x}px`, "--fy": `${fill.y}px`, "--fr": `${fill.r}px`, "--fill-ms": `${FILL_MS}ms` }}
        />
      )}
      <span className="primary-nav__label">{label}</span>
    </a>
  );
}

export default function PrimaryNav() {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/+$/, "") || "/";
  return (
    <nav aria-label="Primary" className="primary-nav">
      {LINKS.map(({ to, label }) => (
        <NavButton key={to} to={to} label={label} current={path === to} />
      ))}
    </nav>
  );
}
