// PrimaryLink: the highest-priority link in the system (contacts, GitHub,
// Figma files, DefenseARK products). Eye-globe icon first, then blue,
// underlined text. Every other link is plain text colour with an underline
// and no icon.
export function EyeGlobe() {
  return (
    <svg className="eye-globe" viewBox="0 0 128 88" aria-hidden="true" focusable="false">
      <path className="eye-globe__outer"
            d="M8 44 C24 20 43 8 64 8 C85 8 104 20 120 44 C104 68 85 80 64 80 C43 80 24 68 8 44 Z" />
      <path className="eye-globe__grid" d="M64 8 C45 25 45 63 64 80" />
      <path className="eye-globe__grid" d="M64 8 C83 25 83 63 64 80" />
      <path className="eye-globe__grid" d="M25 29 C46 39 82 39 103 29" />
      <path className="eye-globe__grid" d="M8 44 C39 44 89 44 120 44" />
      <path className="eye-globe__grid" d="M25 59 C46 49 82 49 103 59" />
    </svg>
  );
}

export default function PrimaryLink({ href, children, external = true, className = "", ...rest }) {
  return (
    <a
      href={href}
      className={`primary-link ${className}`.trim()}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      {...rest}
    >
      <EyeGlobe />
      <span className="primary-link__text">{children}</span>
    </a>
  );
}
