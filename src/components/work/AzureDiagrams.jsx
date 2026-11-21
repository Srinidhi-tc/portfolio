// Azure Health Models: two small diagrams drawn in the design system.
// Hairlines in --color-line, text in --text-primary / --text-secondary,
// 13px thin captions, ▴ as the only arrowhead. Status orange is the
// accessible #B35900 from the case study's accessibility pass.
//
// 1. Confidence flow: a natural language query resolves inline when the
//    model is confident and falls back to a structured query when it is not.
// 2. Health on the entity: creating or editing an entity adds signals; each
//    signal is queried for its state; the count of healthy signals is drawn as
//    a radial ring on top of the entity card (3/4, 4/4).

const T = { fontSize: 13, fontWeight: 300 };
const INK = "var(--text-primary)";
const SOFT = "var(--text-secondary)";
const LINE = "var(--text-secondary)";
const OK = "var(--text-primary)";
const WARN = "#B35900";

function Box({ x, y, w, label, sub, strong }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={48} fill="none" stroke={LINE} strokeWidth="1" />
      <text x={x + 12} y={y + 20} fill={INK} style={{ fontSize: 16, fontWeight: strong ? 700 : 400 }}>{label}</text>
      {sub && <text x={x + 12} y={y + 38} fill={SOFT} style={T}>{sub}</text>}
    </g>
  );
}

// A line ending in a ▴ pointing along it (right or down).
function Arrow({ x1, y1, x2, y2, label, lx, ly }) {
  const down = x1 === x2;
  const tip = down
    ? `${x2 - 4},${y2 - 8} ${x2 + 4},${y2 - 8} ${x2},${y2}`
    : `${x2 - 8},${y2 - 4} ${x2 - 8},${y2 + 4} ${x2},${y2}`;
  return (
    <g>
      <line x1={x1} y1={y1} x2={down ? x2 : x2 - 8} y2={down ? y2 - 8 : y2} stroke={LINE} strokeWidth="1" />
      <polygon points={tip} fill={LINE} />
      {label && <text x={lx} y={ly} fill={SOFT} style={T}>{label}</text>}
    </g>
  );
}

function Figure({ children, caption, viewBox, label }) {
  return (
    <figure className="azure-diagram">
      <svg viewBox={viewBox} role="img" aria-label={label} style={{ width: "100%", height: "auto", display: "block" }}>
        {children}
      </svg>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export function ConfidenceFlow() {
  return (
    <Figure
      viewBox="0 0 640 216"
      label="Confidence flow: query, model, then inline answer when confident or structured query when not"
      caption="Confidence flow. A natural language query resolves inline when the model is confident, and falls back to a structured query when it is not. The engineer is never left with a low-confidence answer presented as fact."
    >
      <Box x={0} y={24} w={176} label="Query" sub="natural language" />
      <Arrow x1={176} y1={48} x2={232} y2={48} />
      <Box x={232} y={24} w={176} label="Model" sub="scores its confidence" />
      <Arrow x1={408} y1={48} x2={464} y2={48} label="confident" lx={412} ly={40} />
      <Box x={464} y={24} w={176} label="Inline answer" sub="on the same surface" strong />
      <Arrow x1={320} y1={72} x2={320} y2={144} label="not confident" lx={328} ly={112} />
      <Box x={232} y={144} w={176} label="Structured query" sub="fields the engineer refines" />
      <Arrow x1={408} y1={168} x2={464} y2={168} />
      <Box x={464} y={144} w={176} label="Answer" sub="from exact filters" />
    </Figure>
  );
}

// One radial ring: four quarter arcs, healthy ones in ink, the rest orange.
function Ring({ cx, cy, r, healthy }) {
  const arcs = [0, 1, 2, 3].map((q) => {
    const a0 = (q * 90 - 90 + 6) * (Math.PI / 180);
    const a1 = ((q + 1) * 90 - 90 - 6) * (Math.PI / 180);
    const p = (a) => `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    return <path key={q} d={`M ${p(a0)} A ${r} ${r} 0 0 1 ${p(a1)}`} fill="none" stroke={q < healthy ? OK : WARN} strokeWidth="3" />;
  });
  return <g>{arcs}</g>;
}

export function HealthOnEntity() {
  const signals = [
    { y: 24, name: "Signal 1", state: "healthy" },
    { y: 72, name: "Signal 2", state: "healthy" },
    { y: 120, name: "Signal 3", state: "healthy" },
    { y: 168, name: "Signal 4", state: "degraded" },
  ];
  return (
    <Figure
      viewBox="0 0 640 240"
      label="Health on the entity: signals added while creating or editing an entity are queried, and the healthy count is drawn as a radial ring on the entity card"
      caption="Health on the entity. Creating or editing an entity adds signals (Add New, New Signal, Save). Each signal is queried for its current state, and the count of healthy signals is drawn as a radial ring right on the entity card: 3/4 here, one signal degraded. Status uses symbol, number and the darker orange (#B35900), never colour alone."
    >
      <Box x={0} y={96} w={160} label="Entity" sub="create or edit" />
      {signals.map((s) => (
        <g key={s.name}>
          <Arrow x1={160} y1={120} x2={232} y2={s.y + 16} />
          <rect x={232} y={s.y} width={176} height={32} fill="none" stroke={LINE} strokeWidth="1" />
          <text x={244} y={s.y + 21} fill={INK} style={{ fontSize: 13, fontWeight: 400 }}>{s.name}</text>
          <text x={396} y={s.y + 21} textAnchor="end" fill={s.state === "healthy" ? SOFT : WARN} style={T}>
            {s.state === "healthy" ? "healthy" : "▴ degraded"}
          </text>
          <Arrow x1={408} y1={s.y + 16} x2={472} y2={120} />
        </g>
      ))}
      <text x={420} y={12} fill={SOFT} style={T}>state query per signal</text>
      <rect x={472} y={72} width={168} height={96} fill="none" stroke={LINE} strokeWidth="1" />
      <Ring cx={512} cy={120} r={22} healthy={3} />
      <text x={512} y={125} textAnchor="middle" fill={INK} style={{ fontSize: 13, fontWeight: 700 }}>3/4</text>
      <text x={548} y={116} fill={INK} style={{ fontSize: 16, fontWeight: 400 }}>Entity card</text>
      <text x={548} y={136} fill={SOFT} style={T}>ring on top</text>
    </Figure>
  );
}
