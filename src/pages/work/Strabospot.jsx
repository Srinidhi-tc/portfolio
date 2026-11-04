import React from "react";
import ProjectSummary from "../../components/work/ProjectSummary";
import CaseStudyGrid, { Ledger, Prose, Stacks, ImagePair } from "../../components/layout/CaseStudyGrid";

import str5 from "../../assets/str5.jpg";
import str6 from "../../assets/str6.jpg";
import str7 from "../../assets/str7.jpg";
import str8 from "../../assets/str8.jpg";
import str11 from "../../assets/str11.jpg";
import str13 from "../../assets/str13.jpg";
import str14 from "../../assets/str14.jpg";
import str15 from "../../assets/str15.jpg";
import str16 from "../../assets/str16.jpg";
import str17 from "../../assets/str17.jpg";
import str18 from "../../assets/str18.jpg";
import str19 from "../../assets/str19.jpg";
import str20 from "../../assets/str20.jpg";
import straboCover from "../../assets/work-strabospot.webp";

const label = {
  fontSize: "var(--type-base)",
  fontWeight: "var(--weight-regular)",
  color: "var(--text-secondary)",
  margin: 0,
};

const body = {
  fontSize: "var(--type-base)",
  lineHeight: "var(--leading-body)",
  color: "var(--text-secondary)",
  margin: 0,
  maxWidth: 690,
};

const slideBase = {
  width: "100%",
  display: "block",
  borderRadius: "var(--radius)",
  background: "var(--surface-2)",
};

function ClientSwitcher() {
  return (
    <div className="glass-bar client-switcher"
      style={{
        zIndex: 20,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "var(--padding-small)",
        marginBottom: "var(--padding-big)",
        padding: "var(--padding-small) var(--padding-small) var(--padding-small) var(--padding-small)",
        borderRadius: "var(--radius)"
      }}
    >
      <div style={{ minWidth: 0 }}>
        <p style={{ ...label, fontSize: "var(--type-base)", marginBottom: 0 }}>SGX3 · Two concurrent client engagements</p>
        <p
          style={{
            margin: 0,
            fontSize: "var(--type-base)",
            fontWeight: "var(--weight-regular)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          Client 02 · GIS Tool
        </p>
      </div>

      <div className="client-switcher__links" style={{ display: "flex", gap: "var(--padding-small)", flexShrink: 0 }}>
        <a
          href="/portfolio/work/ai-coding"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "var(--padding-small) var(--padding-small)",
            borderRadius: "var(--radius)",
            background: "transparent",
            color: "var(--text-primary)",
            border: "1px solid var(--hairline-weak)",
            textDecoration: "none",
            fontSize: "var(--type-base)",
            fontWeight: "var(--weight-regular)"
          }}
        >
          AI Coding Tutor →
        </a>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "var(--padding-small) var(--padding-small)",
            borderRadius: "var(--radius)",
            background: "transparent",
            color: "var(--text-primary)",
            border: "1px solid var(--text)",
            fontSize: "var(--type-base)",
            fontWeight: "var(--weight-regular)"
          }}
        >
          StraboSpot
        </span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <header style={{ marginBottom: "var(--padding-big)" }}>
      <p style={{ ...label, marginBottom: "var(--padding-small)" }}>
        SGX3 · UX consulting · GIS · scientific software
      </p>
      <h1
        style={{
          fontSize: "var(--type-base)",
          lineHeight: "var(--leading-heading)",
          fontWeight: "var(--weight-bold)",
          margin: "0 0 var(--padding-small)"
        }}
      >
        Designing for adoption inside<br />
        StraboSpot Field Data Platform
      </h1>
      <p style={{ ...body, fontSize: "var(--type-base)" }}>
        Shipped a visual-first redesign of the search, map, and sharing surfaces across the geoscience data platform used by 12,000+ geologists in the field
      </p>
      <ProjectSummary id="strabospot" hideName />
      <figure style={{ margin: "var(--padding-small) 0 0" }}>
        <img
          src={straboCover}
          alt="StraboSpot laptop mockup"
          style={{ ...slideBase, width: "100%", borderRadius: "var(--radius)" }}
        />
      </figure>
    </header>
  );
}

function RoleAtTop() {
  const items = [
    ["Role", "Discovery Lead (UX Consulting), SGX3 Science Gateways"],
    ["Context", "Timeline: Aug 2025 – Dec 2025. StraboSpot geospatial data platform."],
    ["Client", "Doug, StraboSpot leadership. Faculty advisor: Paul Parsons, Purdue."],
    ["Team", "Martin Claire (StraboSpot engineering), Linh Pham, Strim Claire"],
    ["Tools", "Figma, heuristic evaluation (Nielsen's ten), contextual inquiry protocols, Google Workspace for stakeholder deliverables"],
  ];

  return (
    <section style={{ marginBottom: "var(--padding-big)" }}>
      <Ledger items={items} />
    </section>
  );
}

const CHAPTERS = [
  { id: "context",  label: "Context" },
  { id: "problem",  label: "Problem" },
  { id: "tradeoff", label: "Tradeoff" },
  { id: "solution", label: "Solution" },
  { id: "impact",   label: "Impact" },
];

function Section({ id, title, children }) {
  return (
    <section id={id}>
      <h2 style={{ margin: "0 0 var(--padding-small)", fontSize: "var(--type-base)", lineHeight: "var(--leading-heading)", fontWeight: "var(--weight-bold)" }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function P({ children }) {
  return <p style={{ ...body, marginBottom: "var(--padding-small)" }}>{children}</p>;
}

// Label (bold) and description per item; a null label renders the text alone.
function Bullets({ items }) {
  return <Stacks items={items} />;
}

// Stack of slides with the page's usual spacing between them.
function Slides({ children }) {
  return <div style={{ display: "grid", gap: "var(--padding-small)", marginTop: "var(--padding-small)" }}>{children}</div>;
}

function Slide({ src, number, caption }) {
  return (
    <figure style={{ margin: 0 }}>
      <img src={src} alt={`StraboSpot client deck slide ${number}`} style={slideBase} />
      <figcaption
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "var(--padding-small)",
          paddingTop: "var(--padding-small)",
          color: "var(--text-secondary)",
          fontSize: "var(--type-base)",
          lineHeight: "var(--leading-subheading)"
        }}
      >
        {caption ? <span style={{ textAlign: "left", maxWidth: 520, fontSize: "var(--type-caption)", fontWeight: "var(--weight-thin)" }}>{caption}</span> : null}
      </figcaption>
    </figure>
  );
}

function EvidenceLinks() {
  const links = [
    ["View Figma Design File ↗", "https://www.figma.com/design/8UaP0xVxXyXx0FzdMHae9e/Strabospot?node-id=0-1&p=f"],
  ];

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--padding-small)",
        marginTop: "var(--padding-small)",
        marginBottom: 0
      }}
    >
      {links.map(([text, href]) => (
        <a
          key={text}
          href={href}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "var(--padding-small) var(--padding-small)",
            border: "1px solid var(--hairline-weak)",
            borderRadius: "var(--radius)",
            color: "var(--text-primary)",
            textDecoration: "none",
            fontSize: "var(--type-base)",
            fontWeight: "var(--weight-regular)",
            background: "var(--surface-2)"
          }}
        >
          {text}
        </a>
      ))}
    </div>
  );
}

export default function StraboSpot() {
  return (
    <CaseStudyGrid chapters={CHAPTERS}>
      <ClientSwitcher />
      <Hero />
      <EvidenceLinks />

      <RoleAtTop />

      <main style={{ display: "flex", flexDirection: "column", gap: "var(--padding-big)" }}>
        <Section id="context" title="Context">
          <Prose>
          <P>
            StraboSpot is a geospatial data platform used by over 12,000 geologists to document and interpret field observations. Over a decade of expert use, it had accumulated analytical depth that most new users never discovered. The platform served its loyal base; its growth curve was flat.
          </P>
          <P>
            The engagement was discovery and validation research. The ask: find the lever that would scale adoption and retention beyond the existing expert cohort.
          </P>
          </Prose>
        </Section>

        <Section id="problem" title="Problem">
          <Prose>
          <P>Five expert interviews and a heuristic pass surfaced one pattern underneath the surface issues:</P>
          </Prose>
          <Bullets items={[
            ["Buried visual value", "geologists mainly use StraboSpot to see images of rocks and field sites, generate shareable documents, and share work with peers. These behaviors were buried behind text-heavy maps and dense data tables."],
            ["Scaling cap in the search layer", "the search engine was product-specific, not pattern-reusable; extending search to more data types required reinventing the layer for each one."],
            ["No viral loop", "the artifacts geologists produced (field trip documents, image galleries) could not be shared cleanly outside the tool."],
            ["Text-first interface for a color-first user", "geologists are visual professionals; they orient to rock color, field color, map color. The product led with text labels."],
          ]} />
          <Slides>
            <Slide src={str5} number={5} caption="Audit method, heuristic review scoped to find the single lever that would move adoption, not just clean the interface." />
            <Slide src={str6} number={6} caption="Map view audit, visual clutter and technical naming on a surface geologists actually use for visual orientation. The misalignment the project turned on." />
            <Slide src={str7} number={7} caption="Search filter audit, dense results, restart friction, unexpected navigation. Search was the scaling bottleneck disguised as a UX problem." />
            <Slide src={str8} number={8} caption="All Strabo Data audit, the same query returning different results across contexts. Scaling the data model required unifying the search layer first." />
          </Slides>
        </Section>

        <Section id="tradeoff" title="Tradeoff">
          <Prose>
          <P>The real design question was not "clean the interface" but "where does visual priority outweigh expert density, and where does it not."</P>
          </Prose>
          <Bullets items={[
            ["Image-first versus text-first", "new users convert on visual recognition; experts fall back on text labels. Map and image previews lead; text-dense tables remain available but recede."],
            ["Unified search versus specialized search", "one unified search engine made the code lighter and scalable to more data types and more search patterns, at the cost of per-type tuning."],
            ["Virality versus restriction", "field trip documents are inherently shareable, but field data has restricted scientific value. Sharing routes default to permissioned, not open."],
            ["Hook versus depth", "leading with the map (visual, retention-grade) risks hiding the analytical depth experts came for. Depth sits one tap away, not behind five."],
          ]} />
          <Slides>
            <Slide src={str11} number={11} caption="Interview key findings, geologists are visual professionals. They orient to rock color, image previews, and shareable artifacts. The product led with text." />
          </Slides>
        </Section>

        <Section id="solution" title="Solution">
          <Prose>
          <P>Three shipped shifts carried the strategy:</P>
          </Prose>
          <Bullets items={[
            ["Map-first landing", "the search surface opens on the map, with image previews, so the first impression is the visual payload geologists come back for."],
            ["Image-based filters and unified search", "one search layer, lighter in code, with filters that match how geologists actually look for things (image type, rock color, field site, date range)."],
            ["Gallery-to-document pipeline", "the image gallery sits adjacent to the field-trip document generator; a user can scroll a trip, select images, and produce the shareable artifact in the same flow. The artifact routes to classes, peers, and LinkedIn directly."],
            ["Shipped once, consumed everywhere", "one unified search engine, extensible to any new data type without reinventing the layer per feature. The gallery-to-document pipeline uses the same pattern for classroom sharing, peer review, and LinkedIn posts."],
          ]} />
          <Slides>
            <Slide src={str13} number={13} caption="Proposed search surface, map-first, with image previews, filters, bookmarks, help. The hook that drives retention sits above the fold." />
            <Slide src={str14} number={14} caption="Unified navigation between maps, one mental model across contexts, so switching surfaces preserves state. The groundwork for a scalable search layer." />
            <Slide src={str15} number={15} caption="Gallery and document pipeline, image gallery, ownership, and credits adjacent to the generator. Sharing becomes a native action, not an export." />
            <Slide src={str16} number={16} caption="Unified search tool · map view, the shared surface, lighter in code, extensible to new data types without reinventing the layer." />
            <Slide src={str17} number={17} caption="Map detail, visibility, zoom behaviour, base-map controls. Expert tolerances for density, respected on a surface tuned for new-user conversion." />
            <Slide src={str18} number={18} caption="Search bar, image filters, map/list toggle, color-aware sorting. One component, three contexts, no re-invention per surface." />
            <Slide src={str19} number={19} caption="List view, sortable results with image preview. Scanning the gallery, not scrolling the data." />
            <Slide src={str20} number={20} caption="List detail, image preview before opening on the map. The one-tap return pattern that lets geologists scan a trip before committing." />
          </Slides>
        </Section>

        <Section id="impact" title="Impact">
          <Bullets items={[
            [null, <>All <strong>eight recommendations adopted</strong> by the StraboSpot stakeholder and engineering clients</>],
            [null, "Prioritized by the StraboSpot team into their roadmap for the following quarter"],
            [null, <><strong>Unified search layer</strong> reduces per-feature search engineering to one shared pipeline, the groundwork for scaling to new data types without rebuilding</>],
            [null, <><strong>Shareable document pipeline</strong> opens a viral loop, geologists sharing field trips to classes, peers, and LinkedIn, pulling new users in through artifacts rather than marketing</>],
            [null, <>Framework <strong>reusable across adjacent science-gateway tools</strong> in the SGX3 portfolio</>],
          ]} />
          <Prose>
          <P>
            In mature expert tools, growth doesn't come from new features, it comes from surfacing the behaviors users already love and making them easy to share. The brief was adoption, measured in new users retained and documents shared outward.
          </P>
          </Prose>
        </Section>
      </main>

      <style>{`
        @media (max-width: 760px) {
          .str-role-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 640px) {
          body {
            overflow-x: hidden;
          }
        }
      `}</style>
    </CaseStudyGrid>
  );
}
