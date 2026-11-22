// Home (interim layout): everything in columns 2 + 3, one stack.
//
// S/R/Iː sits in column 1, right aligned.
// Scroll 1: the bio (left, columns 2 + 3), links with the GitHub grid
//   (right, column 3), Research + Design (right, column 3).
// Scroll 2: Work / Gallery (right), the projects one per row (right), the
//   theme toggle (right), then SF time, thanks and copyright (left, column 2).
// No header row and no footer on this page. Column 4 stays empty.
//
// Dormant content for this page lives in ./Home.dormant
// To revive a block, import its named export and render it.
import { useState } from "react";
import { Link } from "react-router-dom";
import { workSectionProjects } from "../data/workSectionProjects";
import { projectSummaries } from "../data/projectSummaries";
import { projectObjects } from "../data/projectObjects";
import { DESIGN_SYSTEM_URL, LINKEDIN_URL, RESUME_URL } from "../data/links";
import { SriMark } from "../components/layout/PageShell";
import GithubStack from "../components/ui/GithubStack";
import ThemeToggle from "../components/ui/ThemeToggle";
import SFClock from "../components/ui/SFClock";
import PrimaryLink from "../components/ui/PrimaryLink";
import BlockWords from "../components/ui/BlockWords";


const CONTACT = [
  { label: "Resume", href: RESUME_URL },
  { label: "LinkedIn", href: LINKEDIN_URL },
  { label: "Design System", href: DESIGN_SYSTEM_URL },
];

// Work: in this order. StraboSpot shows by default, after Tutor.
const WORK = [
  { id: "ai-coding",          title: "Tutor" },
  { id: "strabospot",         title: "StraboSpot" },
  { id: "microsoft",          title: "Azure" },
  { id: "defenseark",         title: "DefenseARK" },
  { id: "psychosis-literacy", title: "Psychosis" },
];

// Shown only when the ▴ next to the TACC object is opened.
const TUCKED = {};

// Gallery: physical objects, one per row. Malli is dormant (see Home.dormant).
const GALLERY = [
  { id: "hearts-of-insomnia", title: "Heart" },
  { id: "bee-feeder",         title: "Bloom" },
];

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
  const [view, setView] = useState("work");
  const LABEL = { work: "Work", gallery: "Gallery" };
  const list = view === "work"
    ? WORK.map((w) => ({ ...w, meta: projectSummaries[w.id].headline, tucked: TUCKED[w.id] }))
    : GALLERY.map((g) => ({ ...g, meta: byId(g.id).title }));

  return (
    <div className="stacks-grid home-v2">
      {/* S/R/Iː: column 1, right aligned. */}
      <div className="home-v2__sri">
        <SriMark isHome />
      </div>

      <div className="home-v2__col">
        {/* Scroll 1 */}
        <section className="home-v2__fold" aria-label="About">

          <div className="home-bio stack home-v2__wide">
            <p>
              Hi. I’m a product designer working at the intersection of AI, computer vision, and data-dense systems. My users are rarely “everyone”. I take pride in understanding my users.
            </p>
            <p>
              I’ve shipped research-driven software design for geologists, security analysts, ML engineers, and developers.
            </p>
            <p>Passionate about physical AI, and hardware for health.</p>
          </div>

          <ul className="stack stack--small stack--right home-v2__right home-v2__links">
            {CONTACT.map(({ label, href }) => (
              <li key={label}>
                <PrimaryLink href={href}>{label}</PrimaryLink>
              </li>
            ))}
            <li><GithubStack /></li>
          </ul>

          <div className="home-v2__right home-v2__motif">
            <BlockWords words={["Research", "+", "Design"]} label="Research + Design" />
          </div>
        </section>

        {/* Scroll 2 */}
        <section className="home-v2__work" aria-label="Work">
          <div className="stack stack--small stack--right home-v2__right" role="tablist" aria-label="Work or gallery">
            {["work", "gallery"].map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={view === key}
                className={"home-toggle__label home-v2__toggle" + (view === key ? " home-toggle__label--active" : "")}
                data-label={LABEL[key]}
                onClick={() => setView(key)}
              >
                {LABEL[key]}
              </button>
            ))}
          </div>

          {list.map(({ id, title, meta, tucked }) => (
            <Item key={id} id={id} title={title} meta={meta} tucked={tucked} />
          ))}

          <div className="stack stack--small home-v2__left home-v2__end">
            <ThemeToggle />
            <SFClock />
            <p className="site-footer__title">Thanks for stopping by</p>
            <p className="site-footer__copy">© 2026 Srinidhi Chakravarthy. All rights reserved.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
