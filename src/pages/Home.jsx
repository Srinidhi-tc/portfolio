// Home (interim layout): everything in columns 2 + 3, one stack.
//
// S/R/Iː sits in column 1, right aligned.
// Scroll 1: the fact-first bio (left, columns 2 + 3), icon links, eye links and the GitHub grid
//   (right, column 3).
// Scroll 2: Product + Design blocks, Work / Gallery (right), the projects one per row (right), the
//   theme toggle (right), then SF time, thanks and copyright (left, column 2).
// No header row and no footer on this page. Column 4 stays empty.
//
// Dormant content for this page lives in ./Home.dormant
// To revive a block, import its named export and render it.
import { useRef, useState } from "react";
import useGridSnap from "../components/layout/useGridSnap";
import { Link, useLocation } from "react-router-dom";
import { workSectionProjects } from "../data/workSectionProjects";
import { projectSummaries } from "../data/projectSummaries";
import { projectObjects } from "../data/projectObjects";
import { DESIGN_SYSTEM_URL, RESUME_URL } from "../data/links";
import FadeWords from "../components/ui/FadeWords";
import IconLinks from "../components/ui/IconLinks";
import { SriMark } from "../components/layout/PageShell";
import GithubStack from "../components/ui/GithubStack";
import ThemeToggle from "../components/ui/ThemeToggle";
import SFClock from "../components/ui/SFClock";
import PrimaryLink from "../components/ui/PrimaryLink";
import { GalleryList } from "./Home.dormant";
import PrimaryNav from "../components/layout/PrimaryNav";


// GitHub, LinkedIn and Email are square line icons (IconLinks).
// Resume and Design System stay as eye links, lighter than body text.
const CONTACT = [
  { label: "Resume", href: RESUME_URL },
  { label: "Design System", href: DESIGN_SYSTEM_URL },
];

// Paragraph 1: one phrase at a time, fading into the next.
const BIO_PHRASES = [
  "ships and builds.",
  "vibe-codes.",
  "works in AI and data-dense workflows.",
  "tests with ANOVA in Python and SPSS.",
  "does field research and interviews.",
  "takes pride in understanding niche users.",
];

// Paragraph 2: facts, the label in bold.
const FACTS = [
  { label: "Prev.", text: "Founding designer at Metasquare Inc." },
  { label: "Recently", text: "MS in HCI, Purdue University." },
  { label: "Hustled hard:", text: "grad TA, and product design for Microsoft Azure, SGX3, TAPD INTO-STEM and StraboSpot GIS." },
  { label: "Loves", text: "cheese, hikes and long drives." },
];

// Work: in this order. StraboSpot shows by default, after Tutor.
const WORK = [
  { id: "strabospot",         title: "StraboSpot" },
  { id: "microsoft",          title: "Azure" },
  { id: "defenseark",         title: "DefenseARK" },
];

// Behind "More": shown once it is clicked.
const MORE = [
  { id: "ai-coding",          title: "Tutor" },
  { id: "psychosis-literacy", title: "Psychosis" },
];

// Shown only when the ▴ next to the TACC object is opened.
const TUCKED = {};


const byId = (id) => workSectionProjects.find((p) => p.id === id);

// Headlines stack four words to a line.
function Meta({ text }) {
  const w = String(text).split(" ");
  const lines = [];
  for (let i = 0; i < w.length; i += 4) lines.push(w.slice(i, i + 4).join(" "));
  return <span className="home-item__meta">{lines.map((l, i) => <span key={i} style={{ display: "block" }}>{l}</span>)}</span>;
}

// The object replaces the project-name line only.
function ProjectName({ id, title }) {
  const src = projectObjects[id];
  if (!src) return <span className="home-item__title">{title}</span>;
  return <img className="home-item__object" src={src} alt={title} decoding="async" />;
}

// One project: object, then its one-line title, right aligned.
function Item({ id, title, meta, tucked }) {
  const p = byId(id);
  const [open, setOpen] = useState(false);
  if (!tucked) {
    return (
      <div className="stack stack--small stack--right home-v2__right">
        <Link to={p.to} className="home-item__link">
          <ProjectName id={id} title={title} />
          <Meta text={meta} />
        </Link>
      </div>
    );
  }
  // A project with a second client tucked under it (TACC -> StraboSpot, both
  // SGX3). The ▴ next to the object opens it: object + title, same as above.
  const t = byId(tucked.id);
  return (
    <div className="stack stack--small stack--right home-v2__right">
      <div className="home-item__objrow">
        <button
          type="button"
          className={"home-item__tuck" + (open ? " home-item__tuck--open" : "")}
          aria-expanded={open}
          aria-controls={`tucked-${tucked.id}`}
          aria-label={open ? `Hide ${tucked.title}` : `Show ${tucked.title}, the other SGX3 client`}
          onClick={() => setOpen((o) => !o)}
        >
          <span aria-hidden="true">▴</span>
        </button>
        <Link to={p.to} className="home-item__link" tabIndex={-1} aria-hidden="true">
          <ProjectName id={id} title={title} />
        </Link>
      </div>
      <Link to={p.to} className="home-item__link">
        <Meta text={meta} />
      </Link>
      {open && (
        <Link to={t.to} id={`tucked-${tucked.id}`} className="home-item__link home-item__tucked">
          <ProjectName id={tucked.id} title={tucked.title} />
          <Meta text={projectSummaries[tucked.id].headline} />
        </Link>
      )}
    </div>
  );
}

export default function Home() {
  const { pathname } = useLocation();
  const [more, setMore] = useState(false);
  const footRef = useRef(null);
  useGridSnap(footRef, [pathname, more]);
  const path = pathname.replace(/\/+$/, "") || "/";
  const view = path === "/work" ? "work" : path === "/gallery" ? "gallery" : "intro";
  const list = WORK.map((w) => ({ ...w, meta: projectSummaries[w.id].headline, tucked: TUCKED[w.id] }));

  return (
    <div className="stacks-grid home-v2">
      {/* S/R/Iː: column 1, right aligned. */}
      <div className="home-v2__sri">
        <SriMark isHome />
      </div>

      <div className="home-v2__col">
        <PrimaryNav />
        {view === "intro" && (
        <section className="home-v2__fold" aria-label="About">

          <div className="home-bio stack home-v2__wide">
            <p>
              I’m a product designer who
              <FadeWords phrases={BIO_PHRASES} />
            </p>
            <ul className="home-facts">
              {FACTS.map(({ label, text }) => (
                <li key={label}><strong>{label}</strong> {text}</li>
              ))}
            </ul>
          </div>

        </section>

        )}

        {view !== "intro" && (
        <section className="home-v2__work" aria-label={view === "work" ? "Work" : "Gallery"}>
          {view === "work"
            ? <>
                {list.map(({ id, title, meta, tucked }) => (
                  <Item key={id} id={id} title={title} meta={meta} tucked={tucked} />
                ))}
                <div className="home-v2__right">
                  <button
                    type="button"
                    className="home-more"
                    aria-expanded={more}
                    onClick={() => setMore((m) => !m)}
                  >
                    {more ? "Less" : "More"}
                  </button>
                </div>
                {more && MORE.map(({ id, title }) => (
                  <Item key={id} id={id} title={title} meta={projectSummaries[id].headline} />
                ))}
              </>
            : <GalleryList />}
        </section>
        )}

        <section className="home-v2__foot" aria-label="Footer" ref={footRef}>
          <div className="stack stack--small home-v2__left home-v2__end">
            <ThemeToggle />
            <SFClock />
            <p className="site-footer__title">Thanks for stopping by</p>
            <p className="site-footer__copy">© 2026 Srinidhi Chakravarthy. All rights reserved.</p>
          </div>
          <ul className="stack stack--small stack--right home-v2__right home-v2__links">
            <li><IconLinks /></li>
            {CONTACT.map(({ label, href }) => (
              <li key={label}>
                <PrimaryLink href={href} className="primary-link--light">{label}</PrimaryLink>
              </li>
            ))}
            <li><GithubStack /></li>
          </ul>
        </section>
      </div>
    </div>
  );
}
