// Footer: a thin strip. "Let's build awesome stuff" with SF time and the
// light/dark toggle below it, LinkedIn and GitHub, then the copyright.
// On project pages a full-width line follows, then the next project.
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "../ui/ThemeToggle";
import SFClock from "../ui/SFClock";
import PrimaryLink from "../ui/PrimaryLink";
import GithubStack from "../ui/GithubStack";
import { LINKEDIN_URL } from "../../data/links";
import { workSectionProjects } from "../../data/workSectionProjects";
import { projectSummaries } from "../../data/projectSummaries";

// Same order as the home grid: Work, then Gallery. The last wraps to the first.
// Malli is dormant, so it is not in the loop.
const ORDER = [
  { id: "ai-coding", to: "/work/ai-coding", title: "Tutor", gallery: false },
  { id: "microsoft", to: "/work/microsoft", title: "Azure", gallery: false },
  { id: "defenseark", to: "/work/defenseark", title: "DefenseARK", gallery: false },
  { id: "strabospot", to: "/work/strabospot", title: "StraboSpot", gallery: false },
  { id: "psychosis-literacy", to: "/work/psychosis-literacy", title: "Psychosis", gallery: false },
  { id: "hearts-of-insomnia", to: "/work/hearts-of-insomnia", title: "Heart", gallery: true },
  { id: "bee-feeder", to: "/work/bee-feeder", title: "Bloom", gallery: true },
];

// The same subtitle the home page shows: the one-line summary for Work, card title for Gallery.
function subtitle({ id, gallery }) {
  const p = workSectionProjects.find((x) => x.id === id);
  if (!p) return null;
  return gallery ? p.title : projectSummaries[id].headline;
}

export default function Footer() {
  const { pathname } = useLocation();
  const i = ORDER.findIndex((p) => p.to === pathname.replace(/\/$/, ""));
  const next = i >= 0 ? ORDER[(i + 1) % ORDER.length] : null;

  return (
    <footer>
      <div className="stacks-grid site-footer">
        <div className="stacks-col stacks-col--1 stack stack--small">
          <p className="site-footer__title">Let's build awesome stuff</p>
          <div className="site-footer__time">
            <ThemeToggle />
            <SFClock />
          </div>
        </div>
        <ul className="stacks-col stacks-col--x stack stack--small stack--right">
          <li style={{ width: "100%" }}><GithubStack /></li>
          <li><PrimaryLink href={LINKEDIN_URL}>Linkedin</PrimaryLink></li>
        </ul>
        <div className="stacks-col stacks-col--4" aria-hidden="true" />
        <div className="stacks-col stacks-col--1 stack stack--small">
          <p className="site-footer__title">Thanks for stopping by</p>
          <p className="site-footer__copy">Built with Vite, React, CSS and Claude</p>
          <p className="site-footer__copy">© 2026 Srinidhi Chakravarthy. All rights reserved.</p>
        </div>
      </div>
      {next && (
        <div className="stacks-grid next-project">
          <div className="stacks-col stacks-col--x">
            <Link to={next.to}>
              <span className="next-project__label">Next project</span>
              <span>{next.title}</span>
              <span className="next-project__meta">{subtitle(next)}</span>
            </Link>
          </div>
        </div>
      )}
    </footer>
  );
}
