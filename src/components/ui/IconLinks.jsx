// IconLinks: the original GitHub mark, then LinkedIn and Email as sharp,
// square, line icons, all in --link-blue. Square caps and mitred joins, 1.5px strokes on a 24px box.
import { GITHUB_URL } from "./GithubStack";
import { LINKEDIN_URL, EMAIL_URL } from "../../data/links";

// Each glyph fills its 24px box, so the 24px gap is the gap you see.
// Strokes are 1.125 in an 18-unit view, which draws 1.5px.
const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.125, strokeLinecap: "square", strokeLinejoin: "miter" };

const ICONS = {
  GitHub: (
    <svg viewBox="1 1 22 22" aria-hidden="true" focusable="false">
      {/* The original GitHub mark (Octicons mark-github). */}
      <path fill="currentColor" fillRule="evenodd" d="M12 1C5.92 1 1 5.92 1 12c0 4.86 3.15 8.98 7.52 10.44.55.1.75-.24.75-.53v-1.86c-3.06.66-3.71-1.48-3.71-1.48-.5-1.27-1.22-1.61-1.22-1.61-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.69 2.58 1.2 3.21.92.1-.71.38-1.2.7-1.47-2.44-.28-5.01-1.22-5.01-5.44 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.4.11-2.91 0 0 .92-.3 3.02 1.13a10.5 10.5 0 0 1 5.5 0c2.1-1.42 3.02-1.13 3.02-1.13.6 1.51.22 2.63.11 2.91.7.77 1.13 1.75 1.13 2.95 0 4.23-2.58 5.16-5.03 5.43.39.34.75 1.01.75 2.04v3.03c0 .29.2.64.76.53A11 11 0 0 0 23 12C23 5.92 18.08 1 12 1Z" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="3 3 18 18" overflow="visible" aria-hidden="true" focusable="false">
      <rect x="3" y="3" width="18" height="18" {...P} />
      <path d="M8 10.5 V17 M8 7 V7.5 M12 17 V10.5 M12 13 Q12 10.5 14.5 10.5 Q17 10.5 17 13 V17" {...P} />
    </svg>
  ),
  Email: (
    <svg viewBox="3 3 18 18" overflow="visible" aria-hidden="true" focusable="false">
      <rect x="3" y="3" width="18" height="18" {...P} />
      <path d="M3 3 L12 12 L21 3" {...P} />
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
