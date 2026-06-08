export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  className = "",
  id,
  titleHidden = false,
}) {
  return (
    <div className={className} style={{ marginBottom: "var(--space-2xl)" }}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      {/* titleHidden keeps the heading's layout space (separation) but hides the
          text — the nav pill already shows which page you're on. */}
      <h2
        className="page-title"
        id={id}
        style={titleHidden ? { visibility: "hidden" } : undefined}
      >
        {title}
      </h2>
      {subtitle && <p className="page-copy">{subtitle}</p>}
    </div>
  );
}
