import { useEffect, useRef } from "react";

/**
 * RevealGroup — wraps a group of elements and fades/slides in any descendant
 * marked with `data-reveal` as it scrolls into view (via IntersectionObserver).
 *
 * The hidden-by-default state is scoped to `.reveal-group` in CSS (see
 * index.css), so a `data-reveal` element rendered *outside* a RevealGroup is
 * never accidentally hidden. Falls back to fully visible when the user prefers
 * reduced motion or IntersectionObserver isn't available.
 */
export function RevealGroup({ children, className = "", style, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = Array.from(root.querySelectorAll("[data-reveal]"));
    if (targets.length === 0) return;

    const revealAll = () =>
      targets.forEach((el) => el.setAttribute("data-revealed", "true"));

    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "true");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-group ${className}`.trim()}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
}

export default RevealGroup;
