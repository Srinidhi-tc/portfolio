// Home: the STACKS + Fs home grid.
//
// The S/R/I stack lives in the page header (PageShell), at the same spot on
// every page; the Work / Gallery toggle goes into the header slot beside it.
// Column 1 (About) stacks the role list, the contact links and the bio.
// Columns 2 + 3 hold the Work / Gallery content. Column 4 is empty on purpose.
//
// Dormant content for this page lives in ./Home.dormant
// To revive a block, import its named export and render it.
import { useState } from "react";
import { Link } from "react-router-dom";
import { workSectionProjects } from "../data/workSectionProjects";
import { projectSummaries } from "../data/projectSummaries";
import { projectObjects } from "../data/projectObjects";
import { DESIGN_SYSTEM_URL, LINKEDIN_URL, RESUME_URL } from "../data/links";
import { HeaderPortal } from "../components/layout/HeaderSlot";
import PrimaryLink from "../components/ui/PrimaryLink";

const ROLES = ["Product owner", "Strategy", "UX Research", "Design"];

const CONTACT = [
  { label: "Design system", href: DESIGN_SYSTEM_URL },
  { label: "Resume", href: RESUME_URL },
  { label: "Linkedin", href: LINKEDIN_URL },
];

// Work: in this order, laid out 2, 2, 1.
const WORK = [
  { id: "ai-coding",          title: "Tutor" },
  { id: "microsoft",          title: "Azure" },
  { id: "defenseark",         title: "DefenseARK" },
  { id: "strabospot",         title: "StraboSpot" },
  { id: "psychosis-literacy", title: "Psychosis" },
];

// Gallery: physical objects, one per row. Malli is dormant (see Home.dormant).
const GALLERY = [
  { id: "hearts-of-insomnia", title: "Heart" },
  { id: "bee-feeder",         title: "Bloom" },
];

const byId = (id) => workSectionProjects.find((p) => p.id === id);

function Ext({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="bio-link">
      {children}
    </a>
  );
}

// Column 1, row 1: roles and contact links. Row 2: the bio, so it starts on
// the same row line as the second row of projects.
function AboutTop() {
  return (
    <div className="stack stack--big">
      <ul className="stack stack--small home-roles">
        {ROLES.map((r) => <li key={r}>{r}</li>)}
      </ul>

      {/* One shared left edge, so every eye icon lines up; the block itself
          sits at the right of the column, like every link. */}
      <ul className="stack stack--small home-contact">
        {CONTACT.map(({ label, href }) => (
          <li key={label}>
            <PrimaryLink href={href}>{label}</PrimaryLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Bio() {
  return (
    <p className="home-bio">
      Prev., a founding designer at{" "}
      <Ext href="https://www.metasquare.com/">Metasquare Inc.</Ext>, has worked across data-dense workflows for{" "}
      <Ext href="https://azure.microsoft.com/">Microsoft Azure</Ext>,{" "}
      <Ext href="https://tacc.utexas.edu/">TACC</Ext>,{" "}
      <Ext href="https://sciencegateways.org/">SGX3</Ext>,{" "}
      <Ext href="https://www.ionixxtech.com/">Ionixx</Ext> and{" "}
      <Ext href="https://www.purdue.edu/">Purdue University</Ext>. Trained Psychologist. The connective tissue between research, design, code, legal, and compliance.
    </p>
  );
}

// The object replaces the project-name line only.
function ProjectName({ id, title }) {
  const src = projectObjects[id];
  if (!src) return <span className="home-item__title">{title}</span>;
  return <img className="home-item__object" src={src} alt={title} decoding="async" />;
}

// One item per grid cell: Work fills columns 2 and 3 row by row;
// Gallery uses column 3, one per row.
function Item({ id, title, meta, col, row }) {
  const p = byId(id);
  return (
    <div className="stack stack--small stack--right" style={{ gridColumn: col, gridRow: row }}>
      <Link to={p.to} className="home-item__link">
        <ProjectName id={id} title={title} />
        <span className="home-item__meta">{meta}</span>
      </Link>
    </div>
  );
}

export default function Home() {
  const [view, setView] = useState("work");
  // The active label always sits at the bottom of the toggle, next to its content.
  const order = view === "work" ? ["gallery", "work"] : ["work", "gallery"];
  const LABEL = { work: "Work", gallery: "Gallery" };

  return (
    <div className="stacks-grid home-grid">
      <HeaderPortal>
        <div className="stack stack--small stack--right" role="tablist" aria-label="Work or gallery">
          {order.map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={view === key}
              className={"home-toggle__label" + (view === key ? " home-toggle__label--active" : "")}
              onClick={() => setView(key)}
            >
              {LABEL[key]}
            </button>
          ))}
        </div>
      </HeaderPortal>

      <section className="home-about-top" style={{ gridColumn: 1, gridRow: 1 }} aria-label="About">
        <AboutTop />
      </section>
      <section style={{ gridColumn: 1, gridRow: 2 }}>
        <Bio />
      </section>

      {view === "work"
        ? WORK.map(({ id, title }, i) => (
            <Item key={id} id={id} title={title} meta={projectSummaries[id].headline}
                  col={2 + (i % 2)} row={1 + Math.floor(i / 2)} />
          ))
        : GALLERY.map(({ id, title }, i) => (
            <Item key={id} id={id} title={title} meta={byId(id).title} col={3} row={1 + i} />
          ))}

      <div className="stacks-col stacks-col--4" style={{ gridRow: 1 }} aria-hidden="true" />
    </div>
  );
}
