// ChapterToggle — persistent in-page navigation for a case study, arranged
// around the four lenses used across the portfolio: Problem, Decisions,
// Tradeoffs, Impact. It scrolls to existing sections on the same page; it
// does not create new pages or duplicate content. Chapters whose section is
// missing from the page are left out, and with none present it renders nothing.
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const DEFAULT_CHAPTERS = [
  { id: "problem", label: "Problem" },
  { id: "decisions", label: "Decisions" },
  { id: "tradeoffs", label: "Tradeoffs" },
  { id: "impact", label: "Impact" },
];

export default function ChapterToggle({ chapters = DEFAULT_CHAPTERS }) {
  const { pathname } = useLocation();
  const [present, setPresent] = useState([]);
  const [active, setActive] = useState(null);

  // Check the page once per route for the sections that actually exist.
  useEffect(() => {
    const found = chapters.filter((c) => document.getElementById(c.id));
    setPresent(found);
    setActive(found[0]?.id ?? null);
  }, [chapters, pathname]);

  useEffect(() => {
    const sections = present
      .map((c) => document.getElementById(c.id))
      .filter(Boolean);
    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [present]);

  const handleClick = (e, id) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    setActive(id);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (present.length === 0) return null;

  const step = Math.max(0, present.findIndex((c) => c.id === active));

  // Same markup and classes as the Work page's Problem → Impact toggle, so the
  // two look identical; this one floats at the bottom of case-study pages.
  return (
    <nav aria-label="Case study chapters" className="chapter-toggle">
      <div className="work-section-process-glass glass-bar">
        <div className="work-section-process-rail" style={{ "--steps": present.length }}>
          <div
            className="work-section-process-indicator"
            style={{ transform: `translateX(calc(${step} * 100%))` }}
            aria-hidden
          />
          <div className="work-section-process-steps">
            {present.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className={
                  "work-section-process-step" +
                  (active === c.id ? " work-section-process-step--active" : "")
                }
                aria-current={active === c.id ? "true" : undefined}
                onClick={(e) => handleClick(e, c.id)}
              >
                <span className="work-section-process-step-label">{c.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
