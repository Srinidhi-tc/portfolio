import { useEffect, useState } from "react";

// Edit the metric values here. Keys are project ids from workSectionProjects.
//   time:    pill in the card's top-right corner
//   metrics: big bold number with a small caption underneath, beside the title.
//            More than one entry crossfades every `rotateMs`.
// `label` is the full wording read out by screen readers.
const METRICS = {
  defenseark: {
    time: { text: "2 yrs", label: "2 years" },
    metrics: [{ value: "3", caption: "Products", label: "3 products" }],
  },
  "psychosis-literacy": {
    metrics: [{ value: "↑ 70%", caption: "retention", label: "Up 70 percent retention" }],
  },
  "bee-feeder": {
    metrics: [{ value: "18+", caption: "prototypes", label: "18 or more prototypes" }],
  },
  malli: {
    metrics: [{ value: "$287M", caption: "market", label: "287 million dollar market" }],
  },
  "hearts-of-insomnia": {
    metrics: [{ value: "<4s", caption: "results", label: "Results in under 4 seconds" }],
  },
  "ai-coding": {
    time: { text: "5 months", label: "5 months" },
    metrics: [
      { value: "5", caption: "user flows", label: "5 user flows" },
      { value: "10+", caption: "UX Audits", label: "10 or more UX audits" },
    ],
    rotateMs: 30000,
  },
  strabospot: {
    metrics: [{ value: "12K", caption: "geologists", label: "12 thousand geologists" }],
  },
  microsoft: {
    metrics: [{ value: "↓ ~30%", caption: "decision time", label: "About 30 percent less decision time" }],
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

function Metric({ metrics, rotateMs }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const rotates = metrics.length > 1 && !reduced;

  useEffect(() => {
    if (!rotates) return undefined;
    const id = setInterval(() => setActive((i) => (i + 1) % metrics.length), rotateMs);
    return () => clearInterval(id);
  }, [rotates, rotateMs, metrics.length]);

  // Reduced motion: first value only, no animation.
  const shown = rotates ? metrics : metrics.slice(0, 1);
  const label = shown.map((m) => m.label).join(" and ");

  return (
    <span className="work-section-metric" role="img" aria-label={label}>
      {shown.map((m, i) => (
        <span
          key={m.value + m.caption}
          aria-hidden="true"
          className="work-section-metric-item"
          style={{ opacity: i === active ? 1 : 0 }}
        >
          <span className="work-section-metric-value">{m.value}</span>
          <span className="work-section-metric-caption">{m.caption}</span>
        </span>
      ))}
    </span>
  );
}

// Beside the title: big bold number with its caption stacked underneath.
export function CardMetricInline({ id }) {
  const m = METRICS[id];
  if (!m?.metrics) return null;
  return <Metric metrics={m.metrics} rotateMs={m.rotateMs} />;
}

// Time spans use the existing pill style, in the card's top-right corner.
export function CardTimePill({ id }) {
  const t = METRICS[id]?.time;
  if (!t) return null;
  return (
    <span className="tag work-section-time-pill" role="img" aria-label={t.label}>
      <span aria-hidden="true">{t.text}</span>
    </span>
  );
}
