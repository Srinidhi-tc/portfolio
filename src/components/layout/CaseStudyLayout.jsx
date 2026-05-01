import { Link } from "react-router-dom";
import ImagePlaceholder from "../ui/ImagePlaceholder";

export default function CaseStudyLayout({
  backTo = "/work",
  backLabel = "Work",
  eyebrow,
  title,
  subtitle,
  image,
  video,
  overview,
  problem,
  audiences,
  outcomes,
  methodology,
  tools,
  designApproach,
  team,
  client,
  challenge,
  keyLearning,
  impact,
  achievements,
  links,
  children,
}) {
  return (
    <article>
      {/* Hero */}
      <div className="case-study-hero">
        <div className="container">
          <Link to={backTo} className="back-link">
            ← Back to {backLabel}
          </Link>
          {eyebrow && (
            <p className="eyebrow" style={{ marginTop: "var(--space-xl)" }}>
              {eyebrow}
            </p>
          )}
          <h1
            className="page-title"
            style={{ maxWidth: "none", marginTop: "var(--space-sm)" }}
          >
            {title}
          </h1>
          {subtitle && <p className="page-copy">{subtitle}</p>}
        </div>
      </div>

      {/* Hero Image */}
      <div className="container">
        {video ? (
          <video
            src={video}
            poster={image}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover", borderRadius: "var(--radius)", display: "block" }}
          />
        ) : image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            decoding="async"
            style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover", borderRadius: "var(--radius)", display: "block" }}
          />
        ) : (
          <ImagePlaceholder label={`${title} — Hero Image`} aspect="hero" />
        )}
      </div>

      {/* Overview */}
      {overview && (
        <div className="case-study-section">
          <div className="container">
            <p className="case-study-label">Overview</p>
            <p className="case-study-text">{overview}</p>
          </div>
        </div>
      )}

      {/* Problem */}
      {problem && (
        <div className="case-study-section">
          <div className="container">
            <p className="case-study-label">Problem</p>
            <p className="case-study-text">{problem}</p>
          </div>
        </div>
      )}

      {/* Target Audiences */}
      {audiences && audiences.length > 0 && (
        <div className="case-study-section">
          <div className="container">
            <p className="case-study-label">Target Audience</p>
            <ul className="outcome-list">
              {audiences.map((a) => (
                <li key={a.label}>
                  <strong>{a.label}:</strong> {a.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Impact */}
      {impact && (
        <div className="case-study-section">
          <div className="container">
            <p className="case-study-label">My Impact</p>
            <p className="case-study-text">{impact}</p>
            {achievements && (
              <ul className="outcome-list">
                {achievements.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Outcomes */}
      {outcomes && outcomes.length > 0 && (
        <div className="case-study-section">
          <div className="container">
            <p className="case-study-label">Outcomes</p>
            <ul className="outcome-list">
              {outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Methodology */}
      {methodology && methodology.length > 0 && (
        <div className="case-study-section">
          <div className="container">
            <p className="case-study-label">Methodology</p>
            <div className="tag-list">
              {methodology.map((m) => (
                <span key={m} className="tag">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tools */}
      {tools && tools.length > 0 && (
        <div className="case-study-section">
          <div className="container">
            <p className="case-study-label">Tools</p>
            <div className="tag-list">
              {tools.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Design Approach */}
      {designApproach && (
        <div className="case-study-section">
          <div className="container">
            <p className="case-study-label">Design Approach</p>
            <p className="case-study-text">{designApproach}</p>
          </div>
        </div>
      )}

      {/* Challenge */}
      {challenge && (
        <div className="case-study-section">
          <div className="container">
            <p className="case-study-label">Challenge & Resolution</p>
            <p className="case-study-text">{challenge}</p>
          </div>
        </div>
      )}

      {/* Team */}
      {(team || client) && (
        <div className="case-study-section">
          <div className="container">
            <p className="case-study-label">Team</p>
            {client && (
              <p className="case-study-text">
                <strong>Client:</strong> {client}
              </p>
            )}
            {team && (
              <div
                className="tag-list"
                style={{ marginTop: "var(--space-md)" }}
              >
                {(Array.isArray(team) ? team : [team]).map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Key Learning */}
      {keyLearning && (
        <div className="case-study-section">
          <div className="container">
            <p className="case-study-label">Key Learning</p>
            <blockquote
              style={{
                margin: 0,
                paddingLeft: "var(--space-lg)",
                borderLeft: "3px solid var(--accent)",
                fontStyle: "italic",
                fontSize: "var(--text-lg)",
                lineHeight: "var(--leading-relaxed)",
                color: "var(--muted)",
              }}
            >
              "{keyLearning}"
            </blockquote>
          </div>
        </div>
      )}

      {/* Links */}
      {links && (
        <div className="case-study-section">
          <div className="container">
            <p className="case-study-label">Resources</p>
            <div style={{ display: "flex", gap: "var(--space-md)" }}>
              {Object.entries(links).map(([key, label]) => (
                <span key={key} className="tag">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Extra content */}
      {children}
    </article>
  );
}
