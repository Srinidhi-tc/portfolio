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
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}


// The picture as a matrix: 12 x 12 blocks, 3px squares on a 4px pitch (the
// same blocks as Research + Design and the GitHub grid), each block the
// average colour of that part of the picture.
const CELLS = 12;
const PITCH = 4;
const BLOCK = 3;

function MatrixArt({ src, className }) {
  const ref = useRef(null);
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = ref.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      const size = CELLS * PITCH;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      const ctx = canvas.getContext("2d");
      const probe = document.createElement("canvas");
      probe.width = CELLS;
      probe.height = CELLS;
      const pctx = probe.getContext("2d", { willReadFrequently: true });
      pctx.imageSmoothingQuality = "high";
      pctx.drawImage(img, 0, 0, CELLS, CELLS);
      const { data } = pctx.getImageData(0, 0, CELLS, CELLS);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);
      for (let y = 0; y < CELLS; y += 1) {
        for (let x = 0; x < CELLS; x += 1) {
          const n = (y * CELLS + x) * 4;
          ctx.fillStyle = `rgba(${data[n]},${data[n + 1]},${data[n + 2]},${data[n + 3] / 255})`;
          ctx.fillRect(x * PITCH, y * PITCH, BLOCK, BLOCK);
        }
      }
    };
  }, [src]);
  return <canvas ref={ref} className={className} width={CELLS * PITCH} height={CELLS * PITCH} />;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(currentTheme);

  // Apply to the document. No storage write here — see note above.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", CHROME[theme]);
  }, [theme]);

  // Follow the OS for as long as no explicit choice has been stored.
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!mq) return undefined;
    const onChange = (e) => {
      let stored = null;
      try {
        stored = localStorage.getItem(STORAGE_KEY);
      } catch {
        /* private mode / blocked storage — treat as no preference */
      }
      if (!stored) setTheme(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

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
        {/* Both glyphs are always present; CSS cross-fades and rotates between
            them so the control animates rather than swapping abruptly. */}
        <MatrixArt className="theme-toggle__sun" src={sunArt} />
        <MatrixArt className="theme-toggle__moon" src={moonArt} />
      </span>
    </button>
  );
}
