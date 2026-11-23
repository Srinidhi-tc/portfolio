// Footer: at the top, the Design System link with the next project right
// under it; at the bottom, "Let's build awesome stuff" with the toggle and SF
// time, then thanks and copyright.
import { useLayoutEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "../ui/ThemeToggle";
import SFClock from "../ui/SFClock";
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

  // Snap the footer to the 24px grid: case studies end at any height, so a
  // small top margin puts the footer's first line back on a guide line.
  const ref = useRef(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const snap = () => {
      const cur = parseFloat(el.style.marginTop) || 0;
      const top = el.getBoundingClientRect().top + window.scrollY - cur;
      el.style.marginTop = `${(24 - (top % 24)) % 24}px`;
    };
    snap();
    const ro = new ResizeObserver(snap);
    ro.observe(document.body);
    return () => ro.disconnect();
  }, [pathname]);

  return (
    <footer ref={ref}>
      {/* Top: the Design System link and the next project, close together. */}
      <div className="stacks-grid next-project">
        <div className="stacks-col stacks-col--x stack stack--small stack--right">
          <Link className="primary-link" to="/design-system"><span className="primary-link__text">Design System</span></Link>
          {next && (
            <Link to={next.to} className="next-project__link">
              <span className="next-project__label">Next project</span>
              <span>{next.title}</span>
              <span className="next-project__meta">{subtitle(next)}</span>
            </Link>
          )}
        </div>
      </div>
      {/* Bottom: the sign-off, the time, thanks and copyright. */}
      <div className="stacks-grid site-footer">
        <div className="stacks-col stacks-col--1 stack stack--small">
          <p className="site-footer__title">Let's build awesome stuff</p>
          <div className="site-footer__time">
            <ThemeToggle />
            <SFClock />
          </div>
        </div>
        <div className="stacks-col stacks-col--1 stack stack--small">
          <p className="site-footer__title">Thanks for stopping by</p>
          <p className="site-footer__copy">Built with Vite, React, CSS and Claude</p>
          <p className="site-footer__copy">© 2026 Srinidhi Chakravarthy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
