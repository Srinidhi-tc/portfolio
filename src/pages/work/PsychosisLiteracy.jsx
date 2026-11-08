// PsychosisLiteracy.jsx
// Images: name your slides cap1.jpg → cap33.jpg and place in src/assets/
// Only key slides are used, not all 33 are shown

import { ProjectHeader } from "../../components/work/ProjectSummary";
import CaseStudyGrid, { Ledger, Prose, Stacks, ImagePair } from "../../components/layout/CaseStudyGrid";
import cap2  from "../../assets/cap2.jpg";
import cap9  from "../../assets/cap9.jpg";
import cap14 from "../../assets/cap14.jpg";
import cap15 from "../../assets/cap15.jpg";
import cap16 from "../../assets/cap16.jpg";
import cap18 from "../../assets/cap18.jpg";
import cap19 from "../../assets/cap19.jpg";
import cap20 from "../../assets/cap20.jpg";
import cap21 from "../../assets/cap21.jpg";
import cap22 from "../../assets/cap22.jpg";
import cap23 from "../../assets/cap23.jpg";
import cap24 from "../../assets/cap24.jpg";
import cap25 from "../../assets/cap25.jpg";
import cap27 from "../../assets/cap27.jpg";
import cap31 from "../../assets/cap31.jpg";


const label = {
  fontSize: "var(--type-base)", fontWeight: "var(--weight-regular)", color: "var(--text-secondary)", margin: 0,
};
const body = {
  fontSize: "var(--type-base)", lineHeight: "var(--leading-body)", color: "var(--text-secondary)", margin: 0, maxWidth: 680,
};
const slideImg = {
  width: "100%", display: "block", borderRadius: "var(--radius)",
  background: "var(--surface-2)",
};

function Section({ id, title, children }) {
  return (
    <section id={id} style={{ marginBottom: "var(--padding-big)" }}>
      <div style={{ marginBottom: "var(--padding-small)", maxWidth: 720 }}>
        <h2 style={{ margin: "0 0 var(--padding-small)", fontSize: "var(--type-base)", lineHeight: "var(--leading-heading)", color: "var(--text-primary)", fontWeight: "var(--weight-bold)" }}>
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

// Placeholder text only, the real value never reaches the DOM.
function Redact({ children }) {
  return (
    <span aria-label="redacted" style={{ filter: "blur(4px)", userSelect: "none" }}>
      {children}
    </span>
  );
}

function Slide({ src, caption, alt }) {
  return (
    <figure style={{ margin: "0 0 var(--padding-small)" }}>
      <img src={src} alt={alt ?? (typeof caption === "string" ? caption : "")} style={slideImg} />
      {caption && (
        <figcaption style={{ marginTop: "var(--padding-small)", textAlign: "left", fontSize: "var(--type-caption)", fontWeight: "var(--weight-thin)", color: "var(--text-secondary)", lineHeight: "var(--leading-subheading)" }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function P({ children }) {
  return <p style={{ ...body, marginBottom: "var(--padding-small)" }}>{children}</p>;
}

// Label (bold) and description per item; a null label renders the text alone.
function Bullets({ items }) {
  return <Stacks items={items} />;
}

const CHAPTERS = [
  { id: "context",  label: "Context" },
  { id: "problem",  label: "Problem" },
  { id: "tradeoff", label: "Tradeoff" },
  { id: "solution", label: "Solution" },
  { id: "impact",   label: "Impact" },
];

export default function PsychosisLiteracy() {
  return (
    <CaseStudyGrid chapters={CHAPTERS}>

      {/* DISCLAIMER */}
      {/* HERO */}
      <header style={{ marginBottom: "var(--padding-big)" }}>
        <ProjectHeader id="psychosis-literacy">
          Shipped an educational hallucination-simulation tool for ages 15–25, validated by Purdue Psychological Sciences and Purdue CAPS
        </ProjectHeader>
      </header>

      <div style={{ background: "var(--text)", color: "var(--surface-2)", borderRadius: "var(--radius)", padding: "var(--padding-small) var(--padding-small)", marginBottom: "var(--padding-big)", fontSize: "var(--type-base)", lineHeight: "var(--leading-body)" }}>
        <strong>Disclaimer:</strong> This project contains psychoeducation content and simulated visual imagery of hallucinations. Designed for educational purposes only.
      </div>

      {/* HERO SLIDE, the one full-width image */}
      <div style={{ marginBottom: "var(--padding-big)" }}>
        <img src={cap25} alt="Percepta, the shipped educational experience. Cover artifact for clinical review at Purdue Psychological Sciences and CAPS."
             style={{ width: "100%", borderRadius: "var(--radius)", display: "block" }} />
      </div>

      {/* ROLE */}
      <div style={{ marginBottom: "var(--padding-big)" }}>
        <Ledger items={[
            ["Role", "Capstone Lead ▴ Product Design, Research, Shipped Prototype (Base44), Expert Validation"],
            ["Context", "Timeline: Jan 2026 – May 2026. Purdue MS UX Capstone. Youth psychosis education, ages 15–25."],
            ["Client", "Purdue CGT Faculty Review Board. Clinical reviewers: Purdue Psychological Sciences and Purdue CAPS."],
            ["Team", "Solo capstone. Partner, Brianna (research)."],
            ["Tools", "Figma, Base44 (shipped prototype), medical case-study review protocol, Nielsen's ten heuristics, expert validation sessions"],
          ]} />
      </div>

      {/* CONTEXT */}
      <Section id="context" title="Context">
        <Prose>
        <P>
          48% of U.S. public schools report they cannot effectively provide mental health services to students who need them (Institute of Educational Sciences, 2024). Over 100,000 teenagers in the U.S. experience psychosis for the first time each year; most do so without the language, context, or peer understanding to make sense of what is happening to them.
        </P>
        <P>
          The question for this capstone was not "how do we treat psychosis." That belongs to clinicians. The question was: how do you design an empathy tool that teaches 15- to 25-year-olds what psychosis actually feels like, without medicalizing the experience, triggering vulnerable users, or overstepping into clinical territory a designer has no business entering.
        </P>
        </Prose>
        <Slide src={cap2} caption="The ground problem, 48% of U.S. public schools cannot effectively provide mental health services (Institute of Educational Sciences, May 2024). The gap the capstone was scoped to address." />
      </Section>

      {/* PROBLEM */}
      <Section id="problem" title="Problem">
        <Prose>
        <P>Three structural issues shaped every design decision:</P>
        </Prose>
        <Bullets items={[
          ["No consumer-grade empathy tool for psychosis education", "existing resources are either clinical (DSM-5, patient brochures) or sensationalized (horror media, misinformation). Nothing sat between."],
          ["Safety-by-design is non-negotiable", "the primary audience includes users at elevated risk. Any interactive experience must assume someone in distress will encounter it and must not harm them."],
          ["Educational framing versus simulation fidelity", "too clinical and students disengage; too realistic and the experience triggers rather than teaches. The design had to carry authority without triggering."],
        ]} />
        <Slide src={cap9} caption="Customer journey map, Mr. KP's day from waking through night. Emotional hallucinations peak at work; night is most frightening. Ethnographic input, not clinical data." />
      </Section>

      {/* TRADEOFF */}
      <Section id="tradeoff" title="Tradeoff">
        <Prose>
        <P>Every decision in this project traded educational authenticity against safety and ethical restraint.</P>
        </Prose>
        <Bullets items={[
          ["Simulation fidelity versus trigger risk", "authentic hallucination experiences validated against medical literature were essential for credibility; those same experiences, delivered without framing, risked harm. The resolution: a hallucination taxonomy of 10 categories was validated against clinical case studies, then wrapped in opt-in framing, exit controls, and context on every screen."],
          ["Education versus intervention", "the tool had to teach without ever presenting itself as treatment. Every surface declares its scope: \"Designed for ages 15–25 ▴ Educational purposes only.\""],
          ["Expert voice versus student voice", "too clinical and the audience tunes out; too casual and the authority disappears. Clinical reviewers from Purdue Psychological Sciences and CAPS validated voice as well as content."],
          ["Scope the system, not the user", "exit, help, and crisis-escalation paths are built into the system layer so no user has to find them under duress. The 988 Suicide & Crisis Lifeline is one tap from every screen."],
        ]} />
        <Prose>
        <P>The resulting product treats safety and education as the same architecture, not two downstream reviews.</P>
        </Prose>
        <Slide src={cap22} caption="Hallucination image architecture, ten visual categories validated against medical case studies: neutral, shadows, hands, fireworks, smoke, shaky/blurred, animals, slight distortions, colours, random patterns. The taxonomy underneath the product." />
        <Slide src={cap31} caption="Trade-offs and challenges, competitor analysis, paper prototypes, wireframes, initial mockups, and secondary research. Access documentation separately." />
      </Section>

      {/* SOLUTION */}
      <Section id="solution" title="Solution">
        <Prose>
        <P>Three shipped patterns inside a Base44 prototype:</P>
        </Prose>
        <Bullets items={[
          ["Hallucination taxonomy", "10 visual categories (neutral, shadows, hands, fireworks, smoke, shaky/blurred, animals, slight distortions, colours, random patterns) and 5 auditory categories (whispers, self-talk, two voices, footsteps, commands), each validated against medical case studies, each delivered through a gallery-filter metaphor that leverages existing youth mental models."],
          ["Safety architecture woven into the interaction", "opt-in framing on entry, exit controls visible at all times, reflection prompts after the experience, and a persistent crisis-help pathway. The 988 Lifeline is one tap from every screen, with three progressive support options (trusted person → counselor → professional care)."],
          ["Shipped once, consumed everywhere", "the same hallucination taxonomy and safety architecture is applied across all five sections of the Percepta experience: onboarding, visual simulation, auditory simulation, reflection, and help. One pattern, five surfaces, one clinical review packet for Purdue Psychological Sciences and CAPS."],
        ]} />
        <Slide src={cap14} caption={"Percepta onboarding, \"100,000+ teenagers experience psychosis each year for the first time. This experience simulates mild perceptual changes to build empathy and understanding. You can exit at any time.\" Scope and consent declared in the opening screen; the safety architecture begins here."} />
        <Slide src={cap19} caption="Five visual hallucination types, colours, blur, smoke, bubbles, shadows, faces and hands. Each validated against medical case studies before being surfaced to the student." />
        <Slide src={cap20} caption="Five auditory hallucination types, whispers, self-talk, two voices, footsteps, commands. The same validation protocol applied to the auditory channel." />
        <Slide src={cap18} caption={"Filter selection, UX heuristic: match between system and real world. Filters work like gallery filters, a mental model youth already carry. \"Did anything feel off?\" reflection prompt after the experience."} />
        <Slide src={cap21} caption={"\"3 Ways to Ask for Help\", trusted person, counselor, professional support. 988 Suicide & Crisis Lifeline persistent in the frame. UX heuristic: help users recognize, diagnose, and recover from errors, applied to crisis safety."} />
        <Slide src={cap27} caption="Shipped product on Base44, reviewable, usable, extensible. The deliverable was a working artifact, not a mockup. https://app.base44.com/apps/69c1a0c9aa1a1e3081429008/editor/preview" />
      </Section>

      {/* IMPACT */}
      <Section id="impact" title="Impact">
        <Bullets items={[
          [null, <><strong>100% approval</strong> from clinical reviewers at Purdue Psychological Sciences and Purdue CAPS on first validation session</>],
          [null, <><strong>Shipped as a working prototype</strong> on Base44, reviewable, usable, and extensible without further engineering investment</>],
          [null, "Hallucination taxonomy is reusable across adjacent mental-health education contexts, the same architecture could carry anxiety, depression, or neurodivergence education with the same safety wrapper"],
          [null, "Framework for safety-by-design in sensitive-topic consumer design is documented for Purdue CGT program use"],
        ]} />
        <Prose>
        <P>
          In healthcare-adjacent design, the design system is not just visual, it is the architecture that governs who the product can and cannot harm. The brief was educational empathy, measured in clinical review acceptance and the number of surfaces a vulnerable user could safely interact with without a designer in the room.
        </P>
        </Prose>
        <Slide
          src={cap23}
          alt="Expert validation sessions with Purdue Psychological Sciences and CAPS. Door signs blurred for privacy."
          caption={<>Expert validation session, Purdue Psychological Sciences and CAPS. Clinical reviewers validated voice, content, and safety architecture together. Room <Redact>0000</Redact>: <Redact>X.</Redact> Gomez, <Redact>X.</Redact> Rodriguez, <Redact>X.</Redact> Rubi. Room <Redact>0000</Redact>: <Redact>X.</Redact> Haskett. Room <Redact>0000</Redact>: <Redact>X.</Redact> Lim-Kessler.</>}
        />
      </Section>

      <style>{`
        @media (max-width: 680px) {
          .cap-grid-2 { grid-template-columns: 1fr !important; }
          .cap-grid-3 { grid-template-columns: 1fr !important; }
        }
      `}</style>

    </CaseStudyGrid>
  );
}
