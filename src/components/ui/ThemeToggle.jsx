import { useCallback, useEffect, useState } from "react";

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
const CHROME = { dark: "#1a1b1e", light: "#fbfbfd" };

function currentTheme() {
  if (typeof document === "undefined") return "light";
  const stamped = document.documentElement.dataset.theme;
  if (stamped === "dark" || stamped === "light") return stamped;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// Pixel art on a 12 x 12 grid. Sun in the StraboSpot object's yellows,
// moon in the link blue. Each character is one pixel; "." is empty.
const SUN = [
  "....a..a....",
  ".a........a.",
  "....yyyy....",
  "a..yyyyyy..a",
  "..yyyyyyyy..",
  "..yyyyyyyp..",
  "..yyyyyypp..",
  "..yyyyyppp..",
  "a..yyyppp..a",
  "....pppp....",
  ".a........a.",
  "....a..a....",
];
const SUN_COLORS = { y: "#ECF451", p: "#D9DE3E", a: "#EFEFA4" };
const MOON = [
  "....bbbb....",
  "..bbbb......",
  ".bbbb.......",
  ".bbb........",
  "bbbb........",
  "bbbb........",
  "bbbb.......b",
  "bbbbb.....bb",
  ".bbbbb..bbbb",
  ".bbbbbbbbbb.",
  "..bbbbbbbb..",
  "....bbbb....",
];
const MOON_COLORS = { b: "var(--link-blue)" };

function PixelArt({ rows, colors, className }) {
  return (
    <svg className={className} viewBox="0 0 12 12" shapeRendering="crispEdges">
      {rows.flatMap((row, y) =>
        [...row].map((c, x) =>
          colors[c] ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={colors[c]} /> : null
        )
      )}
    </svg>
  );
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
        <PixelArt className="theme-toggle__sun" rows={SUN} colors={SUN_COLORS} />
        <PixelArt className="theme-toggle__moon" rows={MOON} colors={MOON_COLORS} />
      </span>
    </button>
  );
}
