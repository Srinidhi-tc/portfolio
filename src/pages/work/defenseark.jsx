// defenseark.jsx ... DefenseARK founding designer case study
// Place in: src/pages/work/defenseark.jsx
//
// The hero image reuses the same image as the Work page thumbnail,
// so nothing about the thumbnail changes.
//
// Before publishing: update the Torus card with what you worked on, if anything.

import { EyeGlobe } from "../../components/ui/PrimaryLink";
import { ProjectHeader } from "../../components/work/ProjectSummary";
import Kicker from "../../components/ui/Kicker";
import CaseStudyGrid, { Ledger, Prose, Stacks, ImagePair } from "../../components/layout/CaseStudyGrid";
import { workSectionProjects } from "../../data/workSectionProjects";

const heroImage = workSectionProjects.find((p) => p.id === "defenseark")?.image;

const lbl  = { fontSize:"var(--type-base)", fontWeight:"var(--weight-regular)", color:"var(--text-secondary)", margin:0 };
const bd   = { fontSize:"var(--type-base)", lineHeight:"var(--leading-body)", color:"var(--text-secondary)", margin:"0 0 var(--padding-small)", maxWidth:680 };

function Section({ id, number, title, children }) {
  return (
    <section id={id} style={{ marginBottom:"var(--padding-big)" }}>
      {number && <Kicker style={{ marginBottom:"var(--padding-small)" }}>{number}</Kicker>}
      <h2 style={{ margin:"0 0 var(--padding-small)", fontSize:"var(--type-base)", lineHeight:"var(--leading-heading)", color:"var(--text-primary)", maxWidth:720, fontWeight: "var(--weight-bold)" }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function P({ children }) {
  return <p style={bd}>{children}</p>;
}

// Label (bold) and description per item; a null label renders the text alone.
function Bullets({ items }) {
  return <Stacks items={items} />;
}

const CHAPTERS = [
  { id: "context",  label: "Context" },
  { id: "problem",  label: "Problem" },
  { id: "approach", label: "Approach" },
  { id: "solution", label: "Solution" },
  { id: "impact",   label: "Impact" },
];

const PRODUCTS = [
  {
    name: "Enigma",
    type: "Ransomware detection and client onboarding",
    my: "I owned the design handover and worked with the product manager and engineers through launch, end to end.",
    href: "https://enigma.defenseark.com/en",
  },
  {
    name: "Brightscan",
    type: "AI-powered threat scanner",
    my: "Already live when I joined. I learned the product system from it and designed around it.",
    href: "https://www.defenseark.com/products/brightscan/",
  },
  {
    name: "Torus",
    type: "Privacy-first browser extension",
    my: "Part of the DefenseARK product family.",
    href: "https://www.defenseark.com/products/torus/",
  },
];

export default function DefenseArk() {
  return (
    <CaseStudyGrid chapters={CHAPTERS}>

      {/* HERO: object + title on top, picture below */}
      <header style={{ marginBottom:"var(--padding-big)" }}>
        <ProjectHeader id="defenseark">
          Founding design hire: unified identity, system, and client intake across Enigma, Brightscan, and Torus
        </ProjectHeader>
        {heroImage && (
        <img src={heroImage} alt="DefenseARK product work"
             style={{ width:"100%", display:"block", borderRadius:"var(--radius)", background:"var(--surface-2)", marginTop:"var(--padding-small)" }} />
      )}
      </header>


      {/* FACTS */}
      <div style={{ marginBottom: "var(--padding-big)" }}>
        <Ledger items={[
          ["Dates",       "May 4, 2021 to June 30, 2023"],
          ["Role",        "Founding design hire"],
          ["Reported to", "Harish, Founder and Managing Director. Product Manager-Ashika"],
          ["Team",        "A design team for my first six months, then an product designer | Individual contributor"],
          ["Tools",       "Figma ▴ Figma Variables ▴ React/CSS Handoff"],
        ]} />
      </div>

      {/* MY ROLE */}
      <Section title="My role">
        <Prose>
        <P>
          Founding design hire. Owned the end-to-end design across three products, Enigma, Brightscan, Torus, plus the marketing site and the client-intake pathway. Built the Figma library, defined the token layer, and shipped Vue, React, and CSS directly into production. There was no other designer at the company; the system that remained is the one I built.
        </P>
        </Prose>
      </Section>

      {/* CONTEXT */}
      <Section id="context" title="Context">
        <Prose>
        <P>
          When I joined DefenseARK as its first designer, the company had three products in flight (Enigma, Brightscan, and Torus) and no shared visual identity. Each had been engineered independently in Vue, with its own color, type, and interaction patterns. The public website and internal narratives had evolved separately from the products themselves.
        </P>
        <P>
          In a security domain where enterprise clients evaluate trust in seconds, the fragmentation was a credibility risk, not an aesthetic one.
        </P>
        </Prose>
      </Section>

      {/* PROBLEM */}
      <Section id="problem" title="Problem">
        <Prose>
        <P>The absence of a coherent brand surfaced across the company:</P>
        </Prose>
        <Bullets items={[
          ["Inconsistent visual language", "across the three products and the marketing site"],
          ["Fragmented messaging", "that obscured what DefenseARK did and why clients should trust it"],
          ["Misalignment between product reality and presentation", "the marketing surface promised sophistication the UI didn't deliver"],
          ["No governance", "for how identity, typography, or motion would scale as new features shipped"],
        ]} />
      </Section>

      {/* APPROACH */}
      <Section id="approach" title="Approach">
        <Prose>
        <P>I approached the work as product alignment and leadership exercise, not a visual refresh.</P>
        </Prose>
        <Bullets items={[
          ["Credibility over decoration", "in a trust-sensitive domain, visual restraint signals seriousness more than ornament"],
          ["Brand as system, not surface", "identity, typography, components, and motion defined once at the token layer, then applied across the three products and the marketing site"],
          ["Governance by convenience", "make the system easier to use than to work around, so engineers adopt it without being asked"],
          ["Ship with engineering, not to it", "I committed Vue, React, and CSS directly so the system existed in code, not Figma alone"],
        ]} />
        <Prose>
        <P>
          I led working sessions with the CEO and CTO to clarify DefenseARK's positioning across the security landscape, analyzed adjacent cybersecurity platforms to understand where seriousness and credibility had to be signaled visually, and worked with engineers to migrate each product onto the shared system one component at a time.
        </P>
        </Prose>
      </Section>

      {/* BUSINESS IMPACT */}
      <Section title="Business impact">
        <Prose>
        <P>
          Enterprise clients in cybersecurity evaluate trust in seconds. Fragmented presentation is lost pipeline, not an aesthetic problem. CEO time on manual client intake was the second most expensive hour in the company; routing it to a self-service pathway freed leadership capacity for sales calls. The brief was credibility, measured in inbound leads.
        </P>
        </Prose>
      </Section>

      {/* SOLUTION */}
      <Section id="solution" title="Solution">
        <Prose>
        <P>
          Enigma, Brightscan, Torus, and the public site shipped under one brand: identity, typography, components, and motion drawn from the same source. Brand guidelines established consistency in color, type, and iconography while remaining flexible enough to accommodate each product's data-density needs. Motion patterns in CSS gave the three products a shared behavioral identity across hover, state change, and transition.
        </P>
        <P>
          Alongside the system work, I designed a client-intake pipeline and CEO-escalation playbook that routed security-urgent files directly into the right workflow, resolving the one place where product and brand still fell apart.
        </P>
        </Prose>
        <Bullets items={[
          [null, <><strong>Shipped once, consumed everywhere</strong>, one token layer applied across three products and the marketing site. The client-intake pathway consumed the same system for CEO escalation, sales handoff, and support. The system outlasted my tenure and the next hire adopted it without rebuilding.</>],
        ]} />
      </Section>

      {/* IMPACT */}
      <Section id="impact" title="Impact">
        <Bullets items={[
          [null, <>Enterprise inbound leads increased <strong>~30%</strong> (year 1 vs. year 0, source: company CRM)</>],
          [null, "Three products shipped on a shared design system; it survived my departure and the hire that followed"],
          [null, "Client intake moved from manual CEO email triage to a documented self-service pathway with a defined escalation ladder"],
          [null, "Brand presentation moved from three vendor voices to one, measured against competitor benchmarks in the leadership workshops"],
        ]} />
        <Prose>
        <P>
          In a 0→1 context, brand isn't decoration; it's the system that lets a small company present as a single credible voice. The job was less to design, and more to decide what the company would look and sound like consistently as it scaled.
        </P>
        </Prose>
      </Section>

      {/* PRODUCTS */}
      <Section number="The products" title="See them live.">
        <div className="da-grid" style={{ display:"grid", gridTemplateColumns:"repeat(2, minmax(0, 1fr))", gap:"var(--padding-small)" }}>
          {PRODUCTS.map((p) => (
            <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className="lift"
               style={{ display:"block", textDecoration:"none", color:"inherit" }}>
              <p style={{ ...lbl, fontSize:"var(--type-base)", marginBottom:"var(--padding-small)" }}>{p.type}</p>
              <p style={{ fontSize:"var(--type-base)", fontWeight:"var(--weight-regular)", color:"var(--text-primary)", margin:"0 0 var(--padding-small)" }}>{p.name}</p>
              <p style={{ fontSize:"var(--type-base)", color:"var(--text-secondary)", lineHeight:"var(--leading-body)", margin:"0 0 var(--padding-small)" }}>{p.my}</p>
              <span className="primary-link"><EyeGlobe /><span className="primary-link__text">Visit {p.name}</span></span>
            </a>
          ))}
        </div>
      </Section>

      <style>{`
        @media (max-width: 760px) {
          .da-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </CaseStudyGrid>
  );
}
