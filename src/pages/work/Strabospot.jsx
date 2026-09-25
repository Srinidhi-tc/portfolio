import React from "react";

import str1 from "../../assets/str1.jpg";
import str2 from "../../assets/str2.jpg";
import str3 from "../../assets/str3.jpg";
import str4 from "../../assets/str4.jpg";
import str5 from "../../assets/str5.jpg";
import str6 from "../../assets/str6.jpg";
import str7 from "../../assets/str7.jpg";
import str8 from "../../assets/str8.jpg";
import str9 from "../../assets/str9.jpg";
import str10 from "../../assets/str10.jpg";
import str11 from "../../assets/str11.jpg";
import str12 from "../../assets/str12.jpg";
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
  fontSize: 12,
  fontWeight: 650,
  letterSpacing: "0.07em",
  textTransform: "uppercase",
  color: "var(--color-text-tertiary)",
  margin: 0,
};

const body = {
  fontSize: 16,
  lineHeight: 1.58,
  color: "var(--muted)",
  margin: 0,
  maxWidth: 690,
};

const slideBase = {
  width: "100%",
  display: "block",
  borderRadius: 18,
  background: "var(--surface-2)",
};

function ClientSwitcher() {
  return (
    <div
      style={{
        position: "sticky",
        top: 14,
        zIndex: 20,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16,
        marginBottom: 58,
        padding: "8px 10px 8px 14px",
        border: "1px solid var(--hairline-weak)",
        borderRadius: 999,
        background: "color-mix(in srgb, var(--background) 88%, transparent)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div style={{ minWidth: 0 }}>
        <p style={{ ...label, fontSize: 10, marginBottom: 2 }}>SGX3 · Two concurrent client engagements</p>
        <p
          style={{
            margin: 0,
            fontSize: 13,
            fontWeight: 600,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          Client 02 · GIS Tool
        </p>
      </div>

      <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
        <a
          href="/portfolio/work/ai-coding"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "9px 13px",
            borderRadius: 999,
            border: "1px solid var(--hairline-weak)",
            color: "#fff",
            background: "rgba(255,255,255,.08)",
            textDecoration: "none",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          AI Coding Tutor →
        </a>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "9px 13px",
            borderRadius: 999,
            background: "rgba(255,255,255,.14)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,.18)",
            fontSize: 12,
            fontWeight: 650,
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
    <header style={{ marginBottom: 72 }}>
      <p style={{ ...label, marginBottom: 12 }}>
        SGX3 · UX CONSULTING · GIS · SCIENTIFIC SOFTWARE
      </p>
      <h1
        style={{
          fontSize: "clamp(42px, 10vw, 72px)",
          lineHeight: 0.98,
          letterSpacing: "-1.5px",
          fontWeight: 700,
          margin: "0 0 18px",
        }}
      >
        StraboSpot
      </h1>
      <p
        style={{
          fontSize: "clamp(21px, 4vw, 28px)",
          lineHeight: 1.25,
          letterSpacing: "-0.3px",
          fontWeight: 500,
          margin: "0 0 14px",
          maxWidth: 780,
        }}
      >
        Making scientific search easier to scan, compare, and trust.
      </p>
      <p style={{ ...body, fontSize: 17 }}>
        The engagement examined StraboSpot's search experience through a UI/UX audit, five user interviews, task analysis, and design recommendations for a more unified search workflow.
      </p>
      <figure style={{ margin: "34px 0 0" }}>
        <img
          src={straboCover}
          alt="StraboSpot laptop mockup"
          style={{ ...slideBase, width: "100%", borderRadius: 24 }}
        />
      </figure>
    </header>
  );
}

function RoleAtTop() {
  const items = [
    ["Role", "UX Consultant"],
    ["Client", "StraboSpot Inc / TACC"],
    ["SGX3", "Paul Parsons · Linh Pham · Srinidhi T. Chakravarthy"],
    ["Scope", "UI/UX audit · 5 interviews · task analysis · search redesign recommendations"],
  ];

  return (
    <section
      style={{
        marginBottom: 88,
        padding: "28px 0 32px",
        borderTop: "1px solid var(--hairline-weak)",
        borderBottom: "1px solid var(--hairline-weak)",
      }}
    >
      <div style={{ marginBottom: 22 }}>
        <p style={{ ...label, marginBottom: 9 }}>MY ROLE</p>
        <h2
          style={{
            margin: 0,
            fontSize: "clamp(25px, 5vw, 38px)",
            lineHeight: 1.08,
            letterSpacing: "-0.6px",
          }}
        >
          Turning expert workflows into clearer search decisions.
        </h2>
      </div>

      <div
        className="str-role-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 22,
        }}
      >
        {items.map(([k, v]) => (
          <div key={k}>
            <p style={{ ...label, fontSize: 10, marginBottom: 6 }}>{k}</p>
            <p style={{ fontSize: 14, lineHeight: 1.48, margin: 0, color: "var(--muted)" }}>{v}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionHeading({ number, title, intro }) {
  return (
    <div style={{ marginBottom: 30, maxWidth: 780 }}>
      <p style={{ ...label, marginBottom: 10 }}>{number}</p>
      <h2
        style={{
          margin: "0 0 12px",
          fontSize: "clamp(29px, 6vw, 45px)",
          lineHeight: 1.06,
          letterSpacing: "-0.8px",
          fontWeight: 650,
        }}
      >
        {title}
      </h2>
      <p style={body}>{intro}</p>
    </div>
  );
}

function Slide({ src, number, caption }) {
  return (
    <figure style={{ margin: 0 }}>
      <img src={src} alt={`StraboSpot client deck slide ${number}`} style={slideBase} />
      <figcaption
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 20,
          paddingTop: 10,
          color: "var(--color-text-tertiary)",
          fontSize: 11,
          lineHeight: 1.4,
        }}
      >
        <span>CLIENT SLIDE {String(number).padStart(2, "0")} / 20</span>
        {caption ? <span style={{ textAlign: "right", maxWidth: 520 }}>{caption}</span> : null}
      </figcaption>
    </figure>
  );
}

function InsightLine({ children }) {
  return (
    <div
      style={{
        marginTop: 28,
        padding: "16px 0",
        borderTop: "1px solid var(--hairline-weak)",
        borderBottom: "1px solid var(--hairline-weak)",
      }}
    >
      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, fontWeight: 600 }}>{children}</p>
    </div>
  );
}

function EvidenceLinks() {
  const links = [
    ["View Figma Design File ↗", "https://www.figma.com/design/8UaP0xVxXyXx0FzdMHae9e/Strabospot?node-id=0-1&p=f"],
    ["User Interview Recordings ↗", "https://purdue0-my.sharepoint.com/personal/pham132_purdue_edu/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fpham132%5Fpurdue%5Fedu%2FDocuments%2FStraboSpot%5FInterviews%2Ezip&parent=%2Fpersonal%2Fpham132%5Fpurdue%5Fedu%2FDocuments&ga=1"],
  ];

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
        marginTop: 18,
        marginBottom: 2,
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
            padding: "10px 14px",
            border: "1px solid var(--hairline-weak)",
            borderRadius: 999,
            color: "var(--text)",
            textDecoration: "none",
            fontSize: 12,
            fontWeight: 650,
            background: "var(--surface-2)",
          }}
        >
          {text}
        </a>
      ))}
    </div>
  );
}

function TwoColumnNote({ leftLabel, left, rightLabel, right }) {
  return (
    <div
      className="str-note-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: 28,
        marginTop: 28,
      }}
    >
      <div>
        <p style={{ ...label, fontSize: 10, marginBottom: 7 }}>{leftLabel}</p>
        <p style={{ ...body, fontSize: 14 }}>{left}</p>
      </div>
      <div>
        <p style={{ ...label, fontSize: 10, marginBottom: 7 }}>{rightLabel}</p>
        <p style={{ ...body, fontSize: 14 }}>{right}</p>
      </div>
    </div>
  );
}

function DecisionTradeoff({ decision, tradeoff }) {
  return (
    <div
      className="str-decision-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: 18,
        marginTop: 28,
      }}
    >
      <div
        style={{
          padding: "20px 22px",
          border: "1px solid var(--hairline-weak)",
          borderRadius: 18,
          background: "var(--surface-2)",
        }}
      >
        <p style={{ ...label, fontSize: 10, marginBottom: 8 }}>DECISION</p>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5 }}>{decision}</p>
      </div>
      <div
        style={{
          padding: "20px 22px",
          border: "1px solid var(--hairline-weak)",
          borderRadius: 18,
          background: "var(--surface-2)",
        }}
      >
        <p style={{ ...label, fontSize: 10, marginBottom: 8 }}>TRADE-OFF</p>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5 }}>{tradeoff}</p>
      </div>
    </div>
  );
}

function CaseStudyToggle() {
  const items = [
    ["01", "Problem", "#frame"],
    ["02", "Audit", "#audit"],
    ["03", "Research", "#research"],
    ["04", "Decisions", "#decisions"],
    ["05", "Recommendations", "#recommendations"],
  ];

  return (
    <nav
      aria-label="Case study navigation"
      className="str-case-toggle"
      style={{
        position: "fixed",
        left: "50%",
        bottom: 18,
        transform: "translateX(-50%)",
        zIndex: 40,
        display: "flex",
        alignItems: "center",
        gap: 4,
        padding: 5,
        maxWidth: "calc(100vw - 28px)",
        overflowX: "auto",
        border: "1px solid rgba(255,255,255,.14)",
        borderRadius: 999,
        background: "rgba(20,20,20,.82)",
        backdropFilter: "blur(18px)",
        boxShadow: "0 10px 34px rgba(0,0,0,.18)",
      }}
    >
      {items.map(([num, text, href]) => (
        <a
          key={num}
          href={href}
          style={{
            flex: "0 0 auto",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 11px",
            borderRadius: 999,
            color: "#fff",
            textDecoration: "none",
            fontSize: 11,
            fontWeight: 650,
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ opacity: 0.55 }}>{num}</span>
          {text}
        </a>
      ))}
    </nav>
  );
}

function FinalTakeaway() {
  return (
    <section
      style={{
        marginTop: 92,
        paddingTop: 34,
        borderTop: "1px solid var(--hairline-weak)",
      }}
    >
      <p style={{ ...label, marginBottom: 10 }}>THE CONSULTING TAKEAWAY</p>
      <h2
        style={{
          margin: "0 0 14px",
          fontSize: "clamp(28px, 5vw, 42px)",
          lineHeight: 1.08,
          letterSpacing: "-0.7px",
          maxWidth: 760,
        }}
      >
        The search problem was really a clarity problem.
      </h2>
      <p style={body}>
        The engagement moved from surface-level interface issues to the deeper decisions researchers make when finding, comparing, and interpreting field data. The final recommendation brought search, maps, images, credits, filters, and result previews into one clearer model.
      </p>
    </section>
  );
}

export default function StraboSpot() {
  return (
    <div
      style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif",
        color: "var(--text)",
        maxWidth: 1040,
        margin: "0 auto",
        padding: "26px 28px 110px",
      }}
    >
      <ClientSwitcher />
      <Hero />
      <Slide src={str1} number={1} caption="SGX3 · interface evaluation & design recommendation" />
      <EvidenceLinks />

      <RoleAtTop />

      <main style={{ display: "flex", flexDirection: "column", gap: 112 }}>
        <section id="frame">
          <SectionHeading
            number="01 — FRAME THE ENGAGEMENT"
            title="The search experience needed a closer look."
            intro="The engagement began with a UI/UX audit of StraboSpot's current search tools, then moved into task analysis interviews and a design recommendation for a more unified search experience."
          />
          <Slide src={str2} number={2} caption="Engagement summary" />
          <div style={{ marginTop: 28 }}><Slide src={str3} number={3} caption="Audit → interview → recommendation" /></div>
          <InsightLine>
            Start broad. Find where the interface creates friction. Then ask users why it matters.
          </InsightLine>
          <DecisionTradeoff
            decision="Begin with the existing search experience before proposing a new one."
            tradeoff="A broad audit exposed interface issues quickly, but could not tell which issues mattered most to researchers."
          />
        </section>

        <section id="audit">
          <SectionHeading
            number="02 — AUDIT THE SURFACE"
            title="The first pass exposed friction quickly."
            intro="Nielsen's 10 usability principles provided a common lens for repeated reviews of key pages and search flows. Screenshots and annotations made the issues concrete for the team."
          />
          <Slide src={str4} number={4} caption="01 / UI/UX Audit" />
          <div style={{ marginTop: 28 }}><Slide src={str5} number={5} caption="Audit method and review approach" /></div>
          <InsightLine>
            The audit was not the answer. It was the map to the questions that needed real users.
          </InsightLine>
          <DecisionTradeoff
            decision="Use heuristics as a shared diagnostic lens, not as a substitute for user research."
            tradeoff="The method created consistency across reviews while leaving room for domain-specific issues to surface later."
          />
        </section>

        <section>
          <SectionHeading
            number="03 — SEE WHERE SEARCH BREAKS"
            title="Maps made the problem visible."
            intro="Search results became harder to interpret when labels overlapped, interaction cues were weak, and technical names competed with the map itself."
          />
          <Slide src={str6} number={6} caption="Map view · visual clutter, weak interaction cues, technical naming" />
          <div style={{ marginTop: 28 }}><Slide src={str7} number={7} caption="Search filter · dense results, restart friction, unexpected navigation" /></div>
          <div style={{ marginTop: 28 }}><Slide src={str8} number={8} caption="All Strabo Data · search/filter ambiguity and result relevance" /></div>
          <TwoColumnNote
            leftLabel="WHAT THE AUDIT SHOWED"
            left="Too much density, too many competing controls, and unclear relationships between search results and the map."
            rightLabel="WHAT IT DID NOT SHOW"
            right="Which problems mattered most to researchers, what mental models they brought, and what information helped them trust a result."
          />
        </section>

        <section id="research">
          <SectionHeading
            number="04 — ASK THE PEOPLE USING IT"
            title="The audit needed a human check."
            intro="Five Zoom interviews with current StraboSpot users, mostly field geologists at different levels, shifted the work from interface symptoms to task needs."
          />
          <Slide src={str9} number={9} caption="02 / Interview & Task Analysis" />
          <div style={{ marginTop: 28 }}><Slide src={str10} number={10} caption="Five user interviews · open-ended and participant-driven" /></div>
          <InsightLine>
            The key question became: what helps a researcher decide that a piece of data is worth opening?
          </InsightLine>
        </section>

        <section id="decisions">
          <SectionHeading
            number="05 — TURN INTERVIEWS INTO PRIORITIES"
            title="Researchers needed visual context and trust."
            intro="The interviews surfaced recurring needs around images, authorship, maps, labels, filter visibility, and familiar mental models for search."
          />
          <Slide src={str11} number={11} caption="Interview key findings · visual learning, credibility, maps, labels, filters, familiar mental models" />
          <div style={{ marginTop: 28 }}>
            <TwoColumnNote
              leftLabel="VISUAL CONTEXT"
              left="Images and colour-rich maps were central to how participants understood geological information."
              rightLabel="TRUST + CONTROL"
              right="Ownership, authorship, clear map controls, and fewer clicks could make results easier to interpret and act on."
            />
          </div>
          <InsightLine>
            The redesign was not about making search look simpler. It was about making the important evidence easier to see.
          </InsightLine>
          <DecisionTradeoff
            decision="Prioritize visual context, credibility, and direct map interaction in the recommendation."
            tradeoff="Adding more information could improve confidence, but too much information would recreate the density the audit exposed."
          />
        </section>

        <section id="recommendations">
          <SectionHeading
            number="06 — REDESIGN THE SEARCH MOMENT"
            title="Search became the hero feature."
            intro="The recommendation reduced competing decisions, clarified filters, made saved spots more visible, and replaced ambiguous actions with language closer to the user's mental model."
          />
          <Slide src={str12} number={12} caption="03 / Design Recommendations" />
          <div style={{ marginTop: 28 }}><Slide src={str13} number={13} caption="Intuitive search page · list/map view, filters, bookmarks, help" /></div>
          <InsightLine>
            Reduce decision points. Keep the search task visible. Make actions say what they actually do.
          </InsightLine>
          <DecisionTradeoff
            decision="Make Search the hero feature and move secondary resources and controls out of the way."
            tradeoff="Less visible chrome creates focus, but important help and saved content still need clear entry points."
          />
        </section>

        <section>
          <SectionHeading
            number="07 — DESIGN AROUND HOW GEOLOGISTS LOOK"
            title="Maps and images became first-class navigation."
            intro="The recommendations gave visually rich maps a stronger default position, simplified map switching, and treated image collections and credits as part of the research experience."
          />
          <Slide src={str14} number={14} caption="Unifying navigation between maps" />
          <div style={{ marginTop: 28 }}><Slide src={str15} number={15} caption="Image gallery, navigation, ownership and credits" /></div>
          <InsightLine>
            Visual information was not decoration. It was part of how the work was understood.
          </InsightLine>
          <DecisionTradeoff
            decision="Keep the visually rich geological map prominent while making alternate layers one click away."
            tradeoff="A strong default supports recognition and curiosity, while alternate layers preserve the depth expert users need."
          />
        </section>

        <section>
          <SectionHeading
            number="08 — BRING THE SEARCH SYSTEM TOGETHER"
            title="One search model connected map, list, and detail."
            intro="The final recommendation unified keyword search, filters, map and list views, result ownership, previews, and direct map navigation into one search workflow."
          />
          <Slide src={str16} number={16} caption="Unified search tool · map view" />
          <div style={{ marginTop: 28 }}><Slide src={str17} number={17} caption="Map detail · visibility, zoom behaviour, and base-map controls" /></div>
          <div style={{ marginTop: 28 }}><Slide src={str18} number={18} caption="Search bar · filters, spacing, typography, and map/list toggle" /></div>
          <div style={{ marginTop: 28 }}><Slide src={str19} number={19} caption="List view · sortable results with preview and map actions" /></div>
          <div style={{ marginTop: 28 }}><Slide src={str20} number={20} caption="List detail · preview a result before opening it on the map" /></div>
          <InsightLine>
            The final system lets a researcher move from question → result → context → location without losing the thread.
          </InsightLine>
          <DecisionTradeoff
            decision="Connect map and list views instead of making them separate search destinations."
            tradeoff="The unified model adds flexibility without forcing researchers to repeatedly restart the search when they need another view."
          />
        </section>
      </main>

      <FinalTakeaway />
      <CaseStudyToggle />

      <div
        className="str-meta-grid"
        style={{
          marginTop: 54,
          paddingTop: 28,
          borderTop: "1px solid var(--hairline-weak)",
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 22,
        }}
      >
        {[
          ["Client", "StraboSpot Inc / TACC"],
          ["SGX3", "Paul Parsons · Linh Pham · Srinidhi T. Chakravarthy"],
          ["Methods", "UI/UX audit · Nielsen heuristics · 5 user interviews · task analysis · design recommendations"],
        ].map(([k, v]) => (
          <div key={k}>
            <p style={{ ...label, fontSize: 10, marginBottom: 6 }}>{k}</p>
            <p style={{ fontSize: 14, lineHeight: 1.48, margin: 0, color: "var(--muted)" }}>{v}</p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 760px) {
          .str-role-grid,
          .str-note-grid,
          .str-decision-grid,
          .str-meta-grid {
            grid-template-columns: 1fr !important;
          }

          .str-slide-pair figure + figure {
            margin-top: 4px;
          }
        }

        @media (max-width: 640px) {
          body {
            overflow-x: hidden;
          }
        }
      `}</style>
    </div>
  );
}
