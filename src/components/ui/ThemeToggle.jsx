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
        <svg className="theme-toggle__sun" viewBox="0 0 24 24" width="18" height="18">
          <circle cx="12" cy="12" r="4.2" fill="currentColor" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <rect
              key={deg}
              x="11.25"
              y="1.4"
              width="1.5"
              height="3.4"
              rx="0.75"
              fill="currentColor"
              transform={`rotate(${deg} 12 12)`}
            />
          ))}
        </svg>
        <svg className="theme-toggle__moon" viewBox="0 0 24 24" width="18" height="18">
          <path
            d="M20.5 14.6A8.6 8.6 0 0 1 9.4 3.5a8.6 8.6 0 1 0 11.1 11.1Z"
            fill="currentColor"
          />
        </svg>
      </span>
    </button>
  );
}
