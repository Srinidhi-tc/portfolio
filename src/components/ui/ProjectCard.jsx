// ProjectCard.jsx — Apple HIG card
// Supports: static image, video loop (3-5s mockup clip), tags
// Hover: scale(1.02), no shadow
//
// Props:
//   eyebrow  — "Microsoft ▴ 2024" (small uppercase)
//   title    — "Redesigning AI-assisted workflows"
//   desc     — 1-2 sentence description
//   tags     — ["AI", "Enterprise UX", "Design systems"]
//   image    — "/images/ms-cover.jpg"  (static)
//   video    — "/videos/ms-interaction.mp4"  (overrides image if set)
//   to       — "/work/microsoft"  (link destination)
//   featured — true → spans 2 columns (use on first card)

import { Link } from "react-router-dom";
import { RevealGroup } from "./useReveal";

export default function ProjectCard({
  eyebrow,
  title,
  desc,
  tags = [],
  image,
  video,
  to = "#",
  featured = false,
}) {
  const cardStyle = {
    background: "var(--color-bg-card)",
    borderRadius: "var(--radius)",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 280ms cubic-bezier(0.25, 0.1, 0.25, 1)",
    display: "block",
    textDecoration: "none",
    color: "inherit",
    gridColumn: featured ? "span 2" : undefined,
  };

  return (
    <Link
      to={to}
      style={cardStyle}
      data-reveal
      onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.015)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
    >
      {/* Media — video takes priority over image */}
      {video ? (
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            aspectRatio: featured ? "21 / 9" : "16 / 10",
            objectFit: "cover",
            display: "block",
            background: "var(--color-bg-secondary)"
          }}
        />
      ) : image ? (
        <img
          src={image}
          alt={title}
          loading="lazy"
          style={{
            width: "100%",
            aspectRatio: featured ? "21 / 9" : "16 / 10",
            objectFit: "cover",
            display: "block",
            background: "var(--color-bg-secondary)"
          }}
        />
      ) : (
        /* Placeholder when no media yet */
        <div
          style={{
            width: "100%",
            aspectRatio: featured ? "21 / 9" : "16 / 10",
            background: "var(--color-bg-secondary)"
          }}
        />
      )}

      {/* Body */}
      <div style={{ padding: "var(--padding-small) var(--padding-small) var(--padding-big)" }}>
        {eyebrow && (
          <p
            style={{
              fontSize: "var(--type-base)",
              fontWeight: "var(--weight-regular)",
              color: "var(--color-text-tertiary)",
              marginBottom: "var(--padding-small)"
            }}
          >
            {eyebrow}
          </p>
        )}

        <h3
          style={{
            fontSize: "var(--type-base)",
            fontWeight: "var(--weight-regular)",
            lineHeight: "var(--leading-heading)",
            color: "var(--color-text-primary)",
            marginBottom: "var(--padding-small)"
          }}
        >
          {title}
        </h3>

        {desc && (
          <p
            style={{
              fontSize: "var(--type-base)",
              color: "var(--color-text-secondary)",
              lineHeight: "var(--leading-body)",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              marginBottom: tags.length ? "16px" : 0
            }}
          >
            {desc}
          </p>
        )}

                {tags && tags.length > 0 && (
          <p className="project-card-tags" style={{
            margin: "var(--padding-small) 0 0",
            color: "var(--muted)",
            lineHeight: "var(--leading-body)"
          }}>
            {tags.join(" ▴ ")}
          </p>
        )}}
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

// ── Grid wrapper ─────────────────────────────────────────────
// Usage:
//   Wrap ProjectCard elements in a ProjectGrid; give the first card the
//   featured prop to span two columns.
export function ProjectGrid({ children }) {
  return (
    <RevealGroup
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "var(--padding-small)"
      }}
      className="card-grid-outer"
    >
      {children}
      <style>{`
        @media (max-width: 640px) {
          .card-grid-outer { grid-template-columns: 1fr !important; }
          /* reset featured span on mobile */
          .card-grid-outer > a { grid-column: span 1 !important; }
        }
      `}</style>
    </RevealGroup>
  );
}
