import { Link } from "react-router-dom";

export default function ProjectCard({ title, description, tags, to, company, image }) {
  return (
    <Link to={to} className="card" style={{ display: "block", textDecoration: "none" }}>
      {image ? (
        <img
          src={image}
          alt={title}
          style={{ width: "100%", aspectRatio: "4 / 3", objectFit: "cover", display: "block" }}
        />
      ) : (
        <div className="img-placeholder img-placeholder--card">
          <span>{title}</span>
        </div>
      )}
      <div style={{ padding: "var(--space-lg)" }}>
        {company && <p className="eyebrow" style={{ marginBottom: "var(--space-xs)" }}>{company}</p>}
        <h3 style={{ margin: 0, fontSize: "var(--text-xl)", fontWeight: 700, lineHeight: "var(--leading-snug)" }}>
          {title}
        </h3>
        <p style={{ margin: "var(--space-sm) 0 0", color: "var(--muted)", fontSize: "var(--text-sm)", lineHeight: "var(--leading-relaxed)" }}>
          {description}
        </p>
        {tags && (
          <div className="tag-list" style={{ marginTop: "var(--space-md)" }}>
            {tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}
        <span className="btn--ghost" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", marginTop: "var(--space-md)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--accent-dark)" }}>
          View Project →
        </span>
      </div>
    </Link>
  );
}
