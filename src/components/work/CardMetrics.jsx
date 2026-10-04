import { useEffect, useState } from "react";

// Edit the metric values here. Keys are project ids from workSectionProjects.
//   circle:   solid round badge in the card's top-right corner
//   headline: large right-aligned text beside the title
//   pills:    one pill, or several that crossfade every `rotateMs`
// `label` is the full wording read out by screen readers.
const METRICS = {
  defenseark: {
    circle:   { text: "2 yrs", label: "2 years" },
    headline: { text: "3 Products", label: "3 products" },
  },
  "psychosis-literacy": {
    pills: [{ text: "↑ 70% retention", label: "Up 70 percent retention" }],
  },
  "bee-feeder": {
    pills: [{ text: "18+ prototypes", label: "18 or more prototypes" }],
  },
  malli: {
    pills: [{ text: "$287M market", label: "287 million dollar market" }],
  },
  "hearts-of-insomnia": {
    pills: [{ text: "<4s results", label: "Results in under 4 seconds" }],
  },
  "ai-coding": {
    circle: { text: "5 months", label: "5 months" },
    pills: [
      { text: "5 user flows", label: "5 user flows" },
      { text: "10+ UX Audits", label: "10 or more UX audits" },
    ],
    rotateMs: 30000,
  },
  strabospot: {
    pills: [{ text: "12K geologists", label: "12 thousand geologists" }],
  },
  microsoft: {
    pills: [{ text: "↓ ~30% decision time", label: "About 30 percent less decision time" }],
  },
};

function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return undefined;
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function Pill({ pills, rotateMs }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const rotates = pills.length > 1 && !reduced;

  useEffect(() => {
    if (!rotates) return undefined;
    const id = setInterval(() => setActive((i) => (i + 1) % pills.length), rotateMs);
    return () => clearInterval(id);
  }, [rotates, rotateMs, pills.length]);

  // Reduced motion: first value only, no animation.
  const shown = rotates ? pills : pills.slice(0, 1);
  const label = shown.map((p) => p.label).join(" and ");

  return (
    <span className="tag work-section-metric" role="img" aria-label={label}>
      {shown.map((p, i) => (
        <span
          key={p.text}
          aria-hidden="true"
          className="work-section-metric-text"
          style={{ opacity: i === active ? 1 : 0 }}
        >
          {p.text}
        </span>
      ))}
    </span>
  );
}

// Right-hand side of the title row: the big headline figure and/or the pill.
export function CardMetricInline({ id }) {
  const m = METRICS[id];
  if (!m || (!m.headline && !m.pills)) return null;
  return m.headline ? (
    <span className="work-section-metric-headline" role="img" aria-label={m.headline.label}>
      <span aria-hidden="true">{m.headline.text}</span>
    </span>
  ) : (
    <Pill pills={m.pills} rotateMs={m.rotateMs} />
  );
}

// Solid circle in the card's top-right corner.
export function CardMetricCircle({ id }) {
  const c = METRICS[id]?.circle;
  if (!c) return null;
  return (
    <span className="work-section-metric-circle" role="img" aria-label={c.label}>
      <span aria-hidden="true">{c.text}</span>
    </span>
  );
}
