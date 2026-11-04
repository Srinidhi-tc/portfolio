// Footer: a thin strip. "Let's build awesome stuff" with SF time and the
// light/dark toggle below it, LinkedIn / Instagram, then the copyright.
// On project pages a full-width line follows, then "Next project ↓".
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "../ui/ThemeToggle";
import SFClock from "../ui/SFClock";
import { LINKEDIN_URL, INSTAGRAM_URL } from "../../data/links";
import { workSectionProjects } from "../../data/workSectionProjects";
import { projectSummaries } from "../../data/projectSummaries";

// Same order as the home grid: Work, then Gallery. The last wraps to the first.
const ORDER = [
  { id: "ai-coding", to: "/work/ai-coding", title: "Tutor", gallery: false },
  { id: "microsoft", to: "/work/microsoft", title: "Azure", gallery: false },
  { id: "defenseark", to: "/work/defenseark", title: "DefenseARK", gallery: false },
  { id: "strabospot", to: "/work/strabospot", title: "StraboSpot", gallery: false },
  { id: "psychosis-literacy", to: "/work/psychosis-literacy", title: "Psychosis", gallery: false },
  { id: "hearts-of-insomnia", to: "/work/hearts-of-insomnia", title: "Heart", gallery: true },
  { id: "bee-feeder", to: "/work/bee-feeder", title: "Bloom", gallery: true },
  { id: "malli", to: "/work/malli", title: "Malli", gallery: true },
];

// The same subtitle the home page shows: the one-line summary for Work, card title for Gallery.
function subtitle({ id, gallery }) {
  const p = workSectionProjects.find((x) => x.id === id);
  if (!p) return null;
  return gallery ? p.title : projectSummaries[id].homeLine;
}

export default function Footer() {
  const { pathname } = useLocation();
  const i = ORDER.findIndex((p) => p.to === pathname.replace(/\/$/, ""));
  const next = i >= 0 ? ORDER[(i + 1) % ORDER.length] : null;

  return (
    <footer>
      <div className="site-footer">
        <div className="site-footer__strip">
          <div className="stack stack--small">
            <p style={{ margin: 0 }}>Let's build awesome stuff</p>
            <div className="site-footer__time">
              <SFClock />
              <ThemeToggle />
            </div>
          </div>
          <ul className="stack stack--small stack--right">
            <li><a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">Linkedin</a></li>
            <li><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </div>
        <p className="site-footer__copy" style={{ marginTop: "var(--padding-small)" }}>
          © 2026 Srinidhi Chakravarthy. All rights reserved.
        </p>
      </div>
      {next && (
        <div className="next-project">
          <Link to={next.to}>
            <span className="next-project__label">Next project ↓</span>
            <span>{next.title}</span>
            <span className="next-project__meta">{subtitle(next)}</span>
          </Link>
        </div>
      )}
    </footer>
  );
}
