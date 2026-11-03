// CaseStudyGrid: the STACKS + Fs case-study template.
//
// Four columns. Column 1 holds the vertical chapter toggle (right-aligned);
// columns 2 + 3 hold the project content (call its width X); column 4 is
// left empty as negative space. The helpers below lay text out inside X:
//   Ledger: X in three equal sub-columns, one label/value stack per item.
//   Prose:  X in two sub-columns, paragraphs flowing like a newspaper.
//   Stacks: X in two sub-columns, one label/description stack per bullet.
//   ImagePair: two portrait images side by side, one per column.
import ChapterToggle from "../ui/ChapterToggle";

export default function CaseStudyGrid({ chapters, children }) {
  return (
    <div className="stacks-grid cs-grid">
      <aside className="stacks-col stacks-col--1 cs-toggle">
        <ChapterToggle chapters={chapters} variant="vertical" />
      </aside>
      <div className="stacks-col stacks-col--x cs-main">{children}</div>
      <div className="stacks-col stacks-col--4" aria-hidden="true" />
    </div>
  );
}

export function Ledger({ items }) {
  return (
    <dl className="cs-ledger">
      {items.map(([label, value]) => (
        <div key={label} className="cs-ledger__item">
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Prose({ children }) {
  return <div className="cs-prose">{children}</div>;
}

// Each item is [label, description]; a null label renders the description alone.
export function Stacks({ items }) {
  return (
    <ul className="cs-stacks">
      {items.map(([label, text], i) => (
        <li key={i}>
          {label && <strong>{label}</strong>}
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}

export function ImagePair({ children }) {
  return <div className="cs-image-pair">{children}</div>;
}
