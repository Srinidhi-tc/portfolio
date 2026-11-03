import React from "react";
import ChapterToggle from "../../components/ui/ChapterToggle";

import tacc3 from "../../assets/tacc3.jpg";
import tacc6 from "../../assets/tacc6.jpg";
import tacc8 from "../../assets/tacc8.jpg";
import tacc9 from "../../assets/tacc9.jpg";
import tacc10 from "../../assets/tacc10.jpg";
import tacc11 from "../../assets/tacc11.jpg";
import tacc12 from "../../assets/tacc12.jpg";
import tacc13 from "../../assets/tacc13.jpg";
import tacc14 from "../../assets/tacc14.jpg";
import tacc15 from "../../assets/tacc15.jpg";
import tacc16 from "../../assets/tacc16.jpg";
import tacc17 from "../../assets/tacc17.jpg";
import tacc18 from "../../assets/tacc18.jpg";
import tacc19 from "../../assets/tacc19.jpg";

const label = {
  fontSize: "var(--type-base)",
  fontWeight: "var(--weight-regular)",
  color: "var(--color-text-tertiary)",
  margin: 0,
};

const body = {
  fontSize: "var(--type-base)",
  lineHeight: "var(--leading-body)",
  color: "var(--muted)",
  margin: 0,
  maxWidth: 690,
};

const slideBase = {
  width: "100%",
  display: "block",
  borderRadius: "var(--radius)",
  background: "var(--surface-2)",
};

const CHAPTERS = [
  { id: "context",  label: "Context" },
  { id: "problem",  label: "Problem" },
  { id: "tradeoff", label: "Tradeoff" },
  { id: "solution", label: "Solution" },
  { id: "impact",   label: "Impact" },
];

function ClientSwitcher() {
  return (
    <div className="glass-bar" style={{
      position: "sticky", top: 14, zIndex: 20,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      gap: "var(--space-3)", marginBottom: "var(--space-6)", padding: "8px 10px 8px 14px",
      borderRadius: "var(--radius)"
    }}>
      <div style={{ minWidth: 0 }}>
        <p style={{ ...label, fontSize: "var(--type-base)", marginBottom: 2 }}>SGX3 · Two Concurrent Clients </p>
        <p style={{ margin: 0, fontSize: "var(--type-base)", fontWeight: "var(--weight-regular)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          Client 01 · AI Coding Tutor
        </p>
      </div>
      <div style={{ display: "flex", gap: "var(--space-1)", flexShrink: 0 }}>
      <span style={{ display: "inline-flex", alignItems: "center", padding: "9px 13px", borderRadius: "var(--radius)", border: "1px solid var(--text)", color: "var(--text)", background: "transparent", fontSize: "var(--type-base)", fontWeight: "var(--weight-regular)" }}>
  AI Coding Tutor
</span>
        <a href="/portfolio/work/strabospot" style={{ display: "inline-flex", alignItems: "center", padding: "9px 13px", borderRadius: "var(--radius)", border: "1px solid var(--hairline-weak)", color: "var(--text)", textDecoration: "none", fontSize: "var(--type-base)", fontWeight: "var(--weight-regular)" }}>
          StraboSpot Inc →
        </a>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <header style={{ marginBottom: "var(--space-6)" }}>
      <p style={{ ...label, marginBottom: "var(--space-2)" }}>SGX3 · UX consulting · AI · education</p>
      <h1 style={{ fontSize: "var(--type-base)", lineHeight: "var(--leading-heading)", fontWeight: "var(--weight-bold)", margin: "0 0 var(--space-3)" }}>
        Designing institutional trust into<br />
        TACC Coding Tutor Assistant
      </h1>
      <p style={{ ...body, fontSize: "var(--type-base)" }}>
        Shipped conversation design patterns, trust-and-safety architecture, and progress-tracking inside a chat-based AI tutor for the Texas Advanced Computing Center
      </p>
    </header>
  );
}

function RoleAtTop() {
  const items = [
    ["Role", "UX Consultant (Conversation Design), SGX3 Science Gateways"],
    ["Context", "Timeline: Aug 2025 – Dec 2025. TACC chat-based analytics and coding tutor assistant."],
    ["Client", "Bobby Hodgkinson, Texas Advanced Computing Center. Faculty advisor: Paul Parsons, Purdue."],
    ["Team", "Linh Pham, Strim Claire"],
    ["Tools", "Figma, prompt-design frameworks, heuristic evaluation protocols, trust-and-safety review checklists"],
  ];
  return (
    <section style={{ marginBottom: "var(--space-6)", padding: "28px 0 32px"}}>
      <div className="tacc-role-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: "var(--space-4)" }}>
        {items.map(([k, v]) => (
          <div key={k}>
            <p style={{ ...label, fontSize: "var(--type-base)", marginBottom: "var(--space-1)" }}>{k}</p>
            <p style={{ fontSize: "var(--type-base)", lineHeight: "var(--leading-body)", margin: 0, color: "var(--muted)" }}>{v}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id}>
      <h2 style={{ margin: "0 0 var(--space-3)", fontSize: "var(--type-base)", lineHeight: "var(--leading-heading)", fontWeight: "var(--weight-bold)" }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function P({ children }) {
  return <p style={{ ...body, marginBottom: "var(--space-3)" }}>{children}</p>;
}

// Label (bold) and description per item; a null label renders the text alone.
function Bullets({ items }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 var(--space-4)", maxWidth: 690, display: "grid", gap: "var(--space-2)" }}>
      {items.map(([lbl, text], i) => (
        <li key={i} className="hand-bullet" style={body}>
          {lbl && <strong>{lbl}</strong>}{lbl && " — "}{text}
        </li>
      ))}
    </ul>
  );
}

function Slide({ src, number, caption }) {
  return (
    <figure style={{ margin: 0 }}>
      <img src={src} alt={`TACC client deck slide ${number}`} style={slideBase} />
      <figcaption style={{ display: "flex", justifyContent: "space-between", gap: "var(--space-3)", paddingTop: 10, color: "var(--color-text-tertiary)", fontSize: "var(--type-base)", lineHeight: "var(--leading-subheading)" }}>
        <span>Client slide {String(number).padStart(2, "0")} / 24</span>
        {caption ? <span style={{ textAlign: "right", maxWidth: 520, fontSize: "var(--type-caption)" }}>{caption}</span> : null}
      </figcaption>
    </figure>
  );
}

// Stack of slides with the page's usual spacing between them.
function Slides({ children }) {
  return <div style={{ display: "grid", gap: "var(--space-4)", marginTop: "var(--space-4)" }}>{children}</div>;
}

export default function TACC() {
  return (
    <div style={{ color: "var(--text)", maxWidth: 1040, margin: "0 auto", padding: "26px 28px 110px" }}>
      <ClientSwitcher />
      <Hero />
      <RoleAtTop />

      <main style={{ display: "flex", flexDirection: "column", gap: "var(--space-7)" }}>

        <Section id="context" title="Context">
          <P>
            Conversational AI in institutional contexts is not a UX problem; it is a relationship design problem. TACC's tutor needed to teach students who ranged from "has never written a line of code" to "writing scientific compute pipelines at the national supercomputing center" — under institutional constraints most consumer AI products do not face. Legal, compliance, pedagogical ethics, and institutional reputation all converged on a single surface: the chat window.
          </P>
          <P>
            The engineering team had built a working model layer. The design question was not "what can the model do" but "how should the model behave as an institutional actor."
          </P>
        </Section>

        <Section id="problem" title="Problem">
          <P>Three structural issues made the existing experience brittle:</P>
          <Bullets items={[
            ["No trust-and-safety architecture", "the model could give direct answers when it should scaffold, scaffold when it should refuse, and refuse when it should disclose. There was no governance for which behavior belonged to which prompt class."],
            ["No pedagogical scaffold", "long tutor sessions left students with a chat transcript but no learning artifact. Session value depended on the student's ability to extract their own takeaways."],
            ["No institutional continuity", "the tutor had no awareness of where a student had been across sessions, no visible progress model, and no sense of its own authority within the institution's teaching mission."],
          ]} />
          <Slides>
            <Slide src={tacc8} number={8} caption="Current onboarding — a cold start into the tutor without context, prompts, or expectations. The model's institutional voice was undefined." />
            <Slide src={tacc11} number={11} caption="Current conversation experience — turn-by-turn exchange with no structure, no scaffold, and no visible refusal path. The model's authority was implicit, which is where institutional risk lives." />
            <Slide src={tacc14} number={14} caption="Current grading and feedback — binary correctness, no learning artifact left behind. The chat transcript was the only trace of the session." />
            <Slide src={tacc16} number={16} caption="Current branding — undifferentiated, inherited from the engineering stack. The tutor had no voice to carry institutional trust." />
            <Slide src={tacc18} number={18} caption="Current progress visibility — the student cannot see where they are in a session or across sessions. The tutor had no memory of its own prior turns." />
          </Slides>
        </Section>

        <Section id="tradeoff" title="Tradeoff">
          <P>Every decision in this project traded conversational freedom against institutional responsibility.</P>
          <Bullets items={[
            ["Teach versus do", "sharper teaching slowed task completion; faster task completion collapsed the learning. The pedagogical ask was not \"answer the question\" but \"move the student one step forward without taking the step for them.\""],
            ["Guardrail versus flow", "a legal check at every turn killed the conversation; none exposed the institution. Trust-and-safety had to be an architecture, not a filter — routing between answer, scaffold, and refuse based on prompt class, not just prompt content."],
            ["Model authority versus student agency", "the more the tutor acted authoritatively, the more students outsourced their learning. The more deferential it acted, the less institutional trust it carried. The resolution: the tutor speaks with institutional voice but defers to student decision-making at every scaffold."],
            ["Scope the system, not the user", "I pushed scope decisions onto the model layer (what the model would and would not do, when) rather than onto the student. This moved compliance into the design layer where it could be reviewed holistically."],
          ]} />
          <P>
            The resulting interaction model treats trust-and-safety as an architecture, pedagogy as an interaction pattern, and institutional voice as a conversation design decision — not three downstream checks.
          </P>
          <Slides>
            <Slide src={tacc3} number={3} caption="Scope and sequence — audit, interviews, pattern recommendations. The sequence that let legal, institutional, and engineering reviewers land in a single packet." />
            <Slide src={tacc6} number={6} caption="Findings grouped by severity — the prioritization lives in the artifact. Legal and institutional reviewers scored directly from the same ranking." />
          </Slides>
        </Section>

        <Section id="solution" title="Solution">
          <P>Three shipped patterns inside the existing chat frame:</P>
          <Bullets items={[
            ["Trust-and-safety routing layer", "the model classifies incoming prompts into answer, scaffold, or refuse at the system level, with institutional disclosure patterns for each class. One review packet; one source of truth for legal."],
            ["Session summarisation", "the model generates a session recap on demand, persisted to the student's progress view. The artifact of the session is the learning, not the chat."],
            ["Progress tracker", "a thin header bar legible without expanding the chat, carried across sessions. The tutor remembers; the student does not have to."],
          ]} />
          <Slides>
            <Slide src={tacc9} number={9} caption="Proposed first interaction — the model announces its scope, authority, and refusal boundaries before the student asks the first question. Trust is set in the opening turn." />
            <Slide src={tacc10} number={10} caption="Suggested prompts, guidance, and expectations — scaffolding that teaches the student how to use the tutor, not just the subject. Pedagogy as interface." />
            <Slide src={tacc12} number={12} caption="Guided questions — the model prompts the student toward the next move. Model authority deferred to student decision-making at every scaffold." />
            <Slide src={tacc13} number={13} caption="Clearer structure and next steps — every turn ends with a visible path forward, reducing session drop-off and formalizing where the tutor's authority ends." />
            <Slide src={tacc15} number={15} caption="Proposed feedback model — concepts, attempts, and actionable next steps as the durable artifact. The artifact of the session is the learning." />
            <Slide src={tacc17} number={17} caption="Recommended product personality — a voice that signals institutional authority, matched to the pedagogical ask. Conversation design as institutional voice." />
            <Slide src={tacc19} number={19} caption="Recommended progress model — a thin header bar legible without expanding the chat, carried across sessions. The tutor remembers so the student doesn't have to." />
          </Slides>
          <div style={{ marginTop: "var(--space-3)" }}>
            <a href="https://www.figma.com/design/JwsjQAq1Q5UnJpDNrTqkks/AI-Coder-final-recommendation?node-id=0-1"
               target="_blank" rel="noopener noreferrer"
               style={{ fontSize:"var(--type-base)", fontWeight:"var(--weight-regular)", color:"#0055B3", textDecoration:"none" }}>
              View full Figma recommendation ↗
            </a>
          </div>
        </Section>

        <Section id="impact" title="Impact">
          <Bullets items={[
            [null, <>All <strong>eight trust-and-safety recommendations</strong> accepted by TACC legal and institutional review on first submission</>],
            [null, "Session summarisation and progress-tracking shipped to the TACC software engineering team as Figma handoffs"],
            [null, <><strong>Pattern reusable across adjacent AI tutoring tools</strong> in the SGX3 portfolio — the trust-and-safety routing layer is portable to any educational conversational AI with similar institutional constraints</>],
            [null, "Students returned for a second session at a measurable rate against the no-summarisation baseline — because the first session left a durable artifact"],
          ]} />
          <P>
            Educational AI is a trust problem before it is a product problem. The brief was institutional voice, measured in sessions a student returned for because they trusted what the tutor said it was going to do.
          </P>
        </Section>

      </main>

      <ChapterToggle chapters={CHAPTERS} />

      <style>{`
        @media (max-width: 760px) {
          .tacc-role-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          body { overflow-x: hidden; }
        }
      `}</style>
    </div>
  );
}
