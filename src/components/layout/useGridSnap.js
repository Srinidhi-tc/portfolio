// useGridSnap: give an element a small top margin so its top lands on the
// 24px grid, whatever height the content above it ends at.
import { useLayoutEffect } from "react";

export default function useGridSnap(ref, deps = []) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const snap = () => {
      const cur = parseFloat(el.style.marginTop) || 0;
      const top = el.getBoundingClientRect().top + window.scrollY - cur;
      el.style.marginTop = `${(24 - (top % 24)) % 24}px`;
    };
    snap();
    const ro = new ResizeObserver(snap);
    ro.observe(document.body);
    return () => ro.disconnect();
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}
