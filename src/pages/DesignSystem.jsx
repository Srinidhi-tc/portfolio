// Design system: a one-screen cheat sheet rendered from the real tokens.
// Every swatch, size and label below reads tokens.css at runtime, and the
// components are the same ones the site uses. Change a token, this page changes.
import { useEffect, useState } from "react";
import PrimaryLink from "../components/ui/PrimaryLink";

const REPO = "https://github.com/Srinidhi-tc/portfolio";
const TOKENS_URL = `${REPO}/blob/main/src/styles/tokens.css`;

const TYPE = [
  { token: "--type-display", weight: "--weight-bold", role: "display" },
  { token: "--type-base", weight: "--weight-bold", role: "heading" },
  { token: "--type-base", weight: "--weight-regular", role: "body" },
  { token: "--type-caption", weight: "--weight-thin", role: "caption" },
];
const COLORS = [
  { token: "--text-primary", role: "primary" },
  { token: "--text-secondary", role: "secondary" },
  { token: "--link-blue", role: "link" },
];
const SPACE = [
  { token: "--space-s", role: "inside a stack" },
  { token: "--space-m", role: "one line, gutter" },
  { token: "--space-l", role: "margin, section" },
];
const ALL = [...new Set([
  ...TYPE.flatMap((t) => [t.token, t.weight]),
  ...COLORS.map((c) => c.token),
  ...SPACE.map((s) => s.token),
  "--object-size-sm", "--edge-margin", "--col-gap", "--bl",
])];

// Read the live value of each token; re-read when the theme flips.
function useTokens() {
  const [vals, setVals] = useState({});
  useEffect(() => {
    const read = () => {
      const cs = getComputedStyle(document.documentElement);
      setVals(Object.fromEntries(ALL.map((n) => [n, cs.getPropertyValue(n).trim()])));
    };
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "style"] });
    return () => mo.disconnect();
  }, []);
  return vals;
}

function Row({ left, right }) {
  return (
    <div className="ds-row">
      <span>{left}</span>
      <span className="ds-meta">{right}</span>
    </div>
  );
}

export default function DesignSystem() {
  const v = useTokens();
  const px = (n) => (v[n] || "").replace("px", "");

  return (
    <div className="stacks-grid ds">
      <div className="stack" style={{ gridColumn: 1, gridRow: 1 }}>
        <h1 className="ds-h">Design system</h1>
        <p className="ds-meta">Stacks ▴ Fs ▴ Objects</p>
        <div className="ds-gap" />
        <ul className="stack">
          <li><PrimaryLink href={TOKENS_URL}>View tokens.css on GitHub</PrimaryLink></li>
          <li><PrimaryLink href={REPO}>Repository</PrimaryLink></li>
        </ul>
      </div>

      <section className="stack" style={{ gridColumn: 2, gridRow: 1 }}>
        <h2 className="ds-h">Type</h2>
        {TYPE.map((t) => (
          <Row
            key={t.role}
            left={<span style={{ fontSize: `var(${t.token})`, fontWeight: `var(${t.weight})`, lineHeight: "var(--space-m)" }}>Aa</span>}
            right={`${px(t.token)} ${t.role}`}
          />
        ))}
      </section>

      <section className="stack" style={{ gridColumn: 3, gridRow: 1 }}>
        <h2 className="ds-h">Color</h2>
        {COLORS.map((c) => (
          <Row
            key={c.token}
            left={<span className="ds-swatch" style={{ background: `var(${c.token})` }} />}
            right={`${(v[c.token] || "").toUpperCase()} ${c.role}`}
          />
        ))}
      </section>

      <section className="stack" style={{ gridColumn: 1, gridRow: 2 }}>
        <h2 className="ds-h">Space</h2>
        {SPACE.map((s) => (
          <Row
            key={s.token}
            left={<span className="ds-bar" style={{ width: `var(${s.token})` }} />}
            right={`${px(s.token)} ${s.role}`}
          />
        ))}
        <Row left="Margin" right={px("--edge-margin")} />
        <Row left="Gutter" right={`${px("--col-gap")}, empty`} />
      </section>

      <section className="stack" style={{ gridColumn: 2, gridRow: 2 }}>
        <h2 className="ds-h">Baseline</h2>
        <div className="ds-baseline">
          <span className="ds-object" />
          <span className="ds-baseline__text">Object ends on the baseline</span>
        </div>
        <p className="ds-meta">One 24px line for every style. Baseline measured in the browser: {px("--bl")}px into each line.</p>
      </section>

      <section className="stack" style={{ gridColumn: 3, gridRow: 2 }}>
        <h2 className="ds-h">Components</h2>
        <Row left={<PrimaryLink href={REPO}>Link</PrimaryLink>} right="primary link" />
        <Row left={<span className="home-toggle__label home-toggle__label--active">Work</span>} right="selected" />
        <Row left={<span className="home-toggle__label">Gallery</span>} right="not selected" />
        <Row left="▴" right="separator" />
        <Row left={<span className="ds-object ds-object--inline" />} right={`object ${px("--object-size-sm")}, two lines`} />
      </section>
    </div>
  );
}
