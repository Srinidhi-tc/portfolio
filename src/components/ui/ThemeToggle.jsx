import sunArt from "../../assets/toggle-sun.webp";
import moonArt from "../../assets/toggle-moon.webp";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Light/dark toggle.
 *
 * The starting value comes from the inline script in index.html, which has
 * already resolved stored-choice-then-system and stamped data-theme on <html>
 * before first paint. Reading it back here (rather than recomputing) is what
 * keeps the button's icon in step with what is already on screen.
 *
 * localStorage is written only on an actual click. While it is empty the reader
 * has expressed no preference, so the page keeps following the OS — including
 * a change made while the tab is open.
 */

const STORAGE_KEY = "theme";
const CHROME = { dark: "#1a1b1e", light: "#E8ECF1" };

function currentTheme() {
  if (typeof document === "undefined") return "light";
  const stamped = document.documentElement.dataset.theme;
  if (stamped === "dark" || stamped === "light") return stamped;
  return "dark";   // dark by default
}


// The sun and moon as one matrix: 12 x 12 blocks, 3px squares on a 4px
// pitch (the same blocks as Research + Design and the GitHub grid), each the
// average colour of that part of the picture. Switching theme dissolves one
// picture into the other, block by block in a random order. No rotation.
const CELLS = 12;
const PITCH = 4;
const BLOCK = 3;
const DISSOLVE_MS = 700;   // whole dissolve
const BLOCK_MS = 160;      // each block's own cross-fade

function cellsOf(img) {
  const probe = document.createElement("canvas");
  probe.width = CELLS;
  probe.height = CELLS;
  const ctx = probe.getContext("2d", { willReadFrequently: true });
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, CELLS, CELLS);
  return ctx.getImageData(0, 0, CELLS, CELLS).data;
}

function MatrixDissolve({ dark }) {
  const ref = useRef(null);
  const art = useRef(null);       // { sun, moon } colour arrays
  const shown = useRef(dark ? 1 : 0);   // 0 = sun, 1 = moon, per block below
  const mix = useRef(null);       // per-block mix, 0..1
  const order = useRef(null);     // per-block start time, 0..1
  const frame = useRef(0);

  const draw = () => {
    const canvas = ref.current;
    if (!canvas || !art.current) return;
    const size = CELLS * PITCH;
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    if (canvas.width !== size * dpr) { canvas.width = size * dpr; canvas.height = size * dpr; }
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);
    const { sun, moon } = art.current;
    for (let i = 0; i < CELLS * CELLS; i += 1) {
      const m = mix.current[i];
      const n = i * 4;
      const c = (k) => Math.round(sun[n + k] * (1 - m) + moon[n + k] * m);
      const a = (sun[n + 3] * (1 - m) + moon[n + 3] * m) / 255;
      ctx.fillStyle = `rgba(${c(0)},${c(1)},${c(2)},${a})`;
      ctx.fillRect((i % CELLS) * PITCH, Math.floor(i / CELLS) * PITCH, BLOCK, BLOCK);
    }
  };

  // Load both pictures once.
  useEffect(() => {
    let alive = true;
    const load = (src) => new Promise((ok) => { const im = new Image(); im.onload = () => ok(im); im.src = src; });
    Promise.all([load(sunArt), load(moonArt)]).then(([s, m]) => {
      if (!alive) return;
      art.current = { sun: cellsOf(s), moon: cellsOf(m) };
      mix.current = new Float32Array(CELLS * CELLS).fill(shown.current);
      draw();
    });
    return () => { alive = false; cancelAnimationFrame(frame.current); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Dissolve on every theme change.
  useEffect(() => {
    const target = dark ? 1 : 0;
    if (!art.current || shown.current === target) { shown.current = target; return; }
    shown.current = target;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still) { mix.current.fill(target); draw(); return; }
    const from = Float32Array.from(mix.current);
    order.current = Float32Array.from({ length: CELLS * CELLS }, () => Math.random());
    const span = DISSOLVE_MS - BLOCK_MS;
    const t0 = performance.now();
    cancelAnimationFrame(frame.current);
    const tick = (now) => {
      const t = now - t0;
      let done = true;
      for (let i = 0; i < CELLS * CELLS; i += 1) {
        const local = Math.min(1, Math.max(0, (t - order.current[i] * span) / BLOCK_MS));
        if (local < 1) done = false;
        mix.current[i] = from[i] + (target - from[i]) * local;
      }
      draw();
      if (!done) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  }, [dark]); // eslint-disable-line react-hooks/exhaustive-deps

  return <canvas ref={ref} className="theme-toggle__matrix" width={CELLS * PITCH} height={CELLS * PITCH} />;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(currentTheme);

  // Apply to the document. No storage write here — see note above.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", CHROME[theme]);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* not fatal: the choice just will not survive a reload */
      }
      return next;
    });
  }, []);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        <MatrixDissolve dark={isDark} />
      </span>
    </button>
  );
}
