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
import { LINKEDIN_URL, RESUME_URL } from "../data/links";
import { HeaderPortal } from "../components/layout/HeaderSlot";
import PrimaryLink from "../components/ui/PrimaryLink";

const ROLES = ["Product owner", "Strategy", "UX Research", "Design"];

const CONTACT = [
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

function About() {
  return (
    <div className="stack stack--big">
      <ul className="stack stack--small home-roles">
        {ROLES.map((r) => <li key={r}>{r}</li>)}
      </ul>

      <ul className="stack stack--small stack--right">
        {CONTACT.map(({ label, href }) => (
          <li key={label}>
            <PrimaryLink href={href}>{label}</PrimaryLink>
          </li>
        ))}
      </ul>

      <p className="home-bio">
        Prev., a founding designer at{" "}
        <Ext href="https://www.metasquare.com/">Metasquare Inc.</Ext>, has worked across data-dense workflows for{" "}
        <Ext href="https://azure.microsoft.com/">Microsoft Azure</Ext>,{" "}
        <Ext href="https://tacc.utexas.edu/">TACC</Ext>,{" "}
        <Ext href="https://sciencegateways.org/">SGX3</Ext>,{" "}
        <Ext href="https://www.ionixxtech.com/">Ionixx</Ext> and{" "}
        <Ext href="https://www.purdue.edu/">Purdue University</Ext>. Trained Psychologist. Grateful to mentors, seniors, teams, fam and friends.
      </p>
    </div>
  );
}

// The object replaces the project-name line only.
function ProjectName({ id, title }) {
  const src = projectObjects[id];
  if (!src) return <span className="home-item__title">{title}</span>;
  return <img className="home-item__object" src={src} alt={title} decoding="async" />;
}

function WorkList() {
  return (
    <ul className="home-work">
      {WORK.map(({ id, title }) => {
        const p = byId(id);
        return (
          <li key={id} className="stack stack--small stack--right">
            <Link to={p.to} className="home-item__link">
              <ProjectName id={id} title={title} />
              <span className="home-item__meta">{projectSummaries[id].homeLine}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function GalleryList() {
  return (
    <ul className="home-gallery">
      {GALLERY.map(({ id, title }) => {
        const p = byId(id);
        return (
          <li key={id} className="stack stack--small stack--right">
            <Link to={p.to} className="home-item__link">
              <ProjectName id={id} title={title} />
              <span className="home-item__meta">{p.title}</span>
            </Link>
          </li>
        );
      })}
    </ul>
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

      <section className="stacks-col stacks-col--1" aria-label="About">
        <About />
      </section>

      <section className="stacks-col stacks-col--x" aria-label="Work and gallery">
        {view === "work" ? <WorkList /> : <GalleryList />}
      </section>

      <div className="stacks-col stacks-col--4" aria-hidden="true" />
    </div>
  );
}
