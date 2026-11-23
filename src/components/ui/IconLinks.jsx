// IconLinks: GitHub, LinkedIn and Email as sharp, square, line icons in
// --link-blue. Square caps and mitred joins, 1.5px strokes on a 24px box.
import { GITHUB_URL } from "./GithubStack";
import { LINKEDIN_URL, EMAIL_URL } from "../../data/links";

const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "square", strokeLinejoin: "miter" };

const ICONS = {
  GitHub: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="3" y="3" width="18" height="18" {...P} />
      <path d="M8 16 L5 12 L8 8 M16 8 L19 12 L16 16 M13.5 7 L10.5 17" {...P} />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="3" y="3" width="18" height="18" {...P} />
      <path d="M8 10.5 V17 M8 7 V7.5 M12 17 V10.5 M12 13 Q12 10.5 14.5 10.5 Q17 10.5 17 13 V17" {...P} />
    </svg>
  ),
  Email: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="3" y="5" width="18" height="14" {...P} />
      <path d="M3 5 L12 13 L21 5" {...P} />
    </svg>
  ),
};

const LINKS = [
  { label: "GitHub", href: GITHUB_URL, external: true },
  { label: "LinkedIn", href: LINKEDIN_URL, external: true },
  { label: "Email", href: EMAIL_URL, external: false },
];

export default function IconLinks() {
  return (
    <ul className="icon-links" aria-label="GitHub, LinkedIn and email">
      {LINKS.map(({ label, href, external }) => (
        <li key={label}>
          <a
            href={href}
            className="icon-links__link"
            aria-label={label}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
          >
            {ICONS[label]}
          </a>
        </li>
      ))}
    </ul>
  );
}
