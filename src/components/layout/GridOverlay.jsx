// GridOverlay: add ?guides to any URL to see the layout grid drawn over the
// page: the 48px margins, the 4 columns, the empty 24px gutters, and the 24px
// baseline rows every line of text sits on. Labels name each part.
export default function GridOverlay() {
  return (
    <div className="grid-overlay" aria-hidden="true">
      <div className="grid-overlay__baseline" />
      <div className="stacks-grid grid-overlay__cols">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="grid-overlay__col">
            <span className="grid-overlay__label">
              Column {n}{n === 4 ? " (negative space)" : ""}
            </span>
          </div>
        ))}
      </div>
      <span className="grid-overlay__tag grid-overlay__tag--margin-l">Margin 48</span>
      <span className="grid-overlay__tag grid-overlay__tag--margin-r">Margin 48</span>
      <span className="grid-overlay__tag grid-overlay__tag--gutter">Gutter 24</span>
      <span className="grid-overlay__tag grid-overlay__tag--row">Row 24</span>
    </div>
  );
}
