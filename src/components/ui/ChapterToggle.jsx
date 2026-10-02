// ChapterToggle — persistent in-page navigation for a case study, arranged
// around the four lenses used across the portfolio: Problem, Decision,
// Trade-off, Impact. It scrolls to existing sections on the same page; it
// does not create new pages or duplicate content.
import { useEffect, useState } from "react";

const DEFAULT_CHAPTERS = [
  { id: "problem", label: "Problem" },
  { id: "decision", label: "Decision" },
  { id: "tradeoff", label: "Trade-off" },
  { id: "impact", label: "Impact" },
];

export default function ChapterToggle({ chapters = DEFAULT_CHAPTERS }) {
  const [active, setActive] = useState(chapters[0]?.id);

  useEffect(() => {
    const sections = chapters
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
  }, [chapters]);

  const handleClick = (e, id) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav aria-label="Case study chapters" className="chapter-toggle">
      {chapters.map((c) => (
        <a
          key={c.id}
          href={`#${c.id}`}
          className={
            "chapter-toggle__item" +
            (active === c.id ? " chapter-toggle__item--active" : "")
          }
          aria-current={active === c.id ? "true" : undefined}
          onClick={(e) => handleClick(e, c.id)}
        >
          {c.label}
        </a>
      ))}
    </nav>
  );
}
