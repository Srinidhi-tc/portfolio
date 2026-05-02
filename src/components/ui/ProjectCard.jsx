import { Link } from "react-router-dom";

export default function ProjectCard({ title, description, tags, to, company, image, video }) {
  const mediaStyle = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    objectPosition: "center",
    display: "block",
  };

  return (
    <Link to={to} className="card project-card" style={{ display: "block", textDecoration: "none" }}>
      <div className="project-card__media">
        {video ? (
          <video
            src={video}
            poster={image}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            style={mediaStyle}
          />
        ) : image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            decoding="async"
            style={mediaStyle}
          />
        ) : (
          <div className="img-placeholder img-placeholder--card" style={{ width: "100%", height: "100%" }}>
            <span>{title}</span>
          </div>
        )}
      </div>
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
