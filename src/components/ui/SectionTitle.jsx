export default function SectionTitle({ eyebrow, title, subtitle, className = "", id }) {
  return (
    <div className={className} style={{ marginBottom: "var(--space-2xl)" }}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="page-title" id={id}>
        {title}
      </h2>
      {subtitle && <p className="page-copy">{subtitle}</p>}
    </div>
  );
}
