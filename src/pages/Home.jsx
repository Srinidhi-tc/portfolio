// Home: the STACKS + Fs home grid.
//
// Column 1 (About) stacks the SRI letterform, the role list, the contact list
// and the bio. Columns 2 + 3 hold the Work / Gallery toggle and its content.
// Column 4 is empty on purpose: negative space that keeps the grid's rhythm.
//
// Dormant content for this page lives in ./Home.dormant
// To revive a block, import its named export and render it.
import { useState } from "react";
import { Link } from "react-router-dom";
import { workSectionProjects } from "../data/workSectionProjects";
import { EMAIL_URL, LINKEDIN_URL, RESUME_URL } from "../data/links";

const ROLES = ["Product owner", "Strategy", "UX Research", "Design"];

const CONTACT = [
  { label: "Email", href: EMAIL_URL },
  { label: "Linkedin", href: LINKEDIN_URL, external: true },
  { label: "Resume", href: RESUME_URL, external: true },
];

// Work: in this order, laid out 2, 2, 1.
const WORK = [
  { id: "ai-coding",          title: "Tutor" },
  { id: "microsoft",          title: "Azure" },
  { id: "defenseark",         title: "DefenseARK" },
  { id: "strabospot",         title: "StraboSpot" },
  { id: "psychosis-literacy", title: "Psychosis" },
];

// Gallery: physical objects, one per row.
const GALLERY = [
  { id: "hearts-of-insomnia", title: "Heart" },
  { id: "bee-feeder",         title: "Bloom" },
  { id: "malli",              title: "Malli" },
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
      <p className="sri-mark" aria-label="SRI">
        <span>S</span>
        <span>R</span>
        <span>I</span>
      </p>

      <ul className="stack stack--small stack--right">
        {ROLES.map((r) => <li key={r}>{r}</li>)}
      </ul>

      <ul className="stack stack--small stack--right">
        {CONTACT.map(({ label, href, external }) => (
          <li key={label}>
            <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
              {label}
            </a>
          </li>
        ))}
      </ul>

      <p className="home-bio">
        Grateful to mentors, seniors, teams, fam and friends. Prev., a founding designer at{" "}
        <Ext href="https://www.metasquare.com/">Metasquare Inc.</Ext>, has worked across data-dense workflows for{" "}
        <Ext href="https://azure.microsoft.com/">Microsoft Azure</Ext>,{" "}
        <Ext href="https://tacc.utexas.edu/">TACC</Ext>,{" "}
        <Ext href="https://sciencegateways.org/">SGX3</Ext>,{" "}
        <Ext href="https://www.ionixxtech.com/">Ionixx</Ext> and{" "}
        <Ext href="https://www.purdue.edu/">Purdue University</Ext>. Trained Psychologist.
      </p>
    </div>
  );
}

function WorkList() {
  return (
    <ul className="home-work">
      {WORK.map(({ id, title }) => {
        const p = byId(id);
        return (
          <li key={id} className="stack stack--small stack--right">
            <Link to={p.to} className="home-item__title">{title}</Link>
            <span className="home-item__meta">{p.tags.join(" · ")}</span>
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
            <Link to={p.to} className="home-item__title">{title}</Link>
            <span className="home-item__meta">{p.title}</span>
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
      <section className="stacks-col stacks-col--1" aria-label="About">
        <About />
      </section>

      <section className="stacks-col stacks-col--x" aria-label="Work and gallery">
        <div className="stack stack--small stack--right home-toggle" role="tablist" aria-label="Work or gallery">
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
        {view === "work" ? <WorkList /> : <GalleryList />}
      </section>

      <div className="stacks-col stacks-col--4" aria-hidden="true" />
    </div>
  );
}
