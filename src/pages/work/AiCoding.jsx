import React from "react";

import tacc1 from "../../assets/tacc1.png";
import tacc2 from "../../assets/tacc2.png";
import tacc3 from "../../assets/tacc3.png";
import tacc4 from "../../assets/tacc4.png";
import tacc5 from "../../assets/tacc5.png";
import tacc6 from "../../assets/tacc6.png";
import tacc7 from "../../assets/tacc7.png";
import tacc8 from "../../assets/tacc8.png";
import tacc9 from "../../assets/tacc9.png";
import tacc10 from "../../assets/tacc10.png";
import tacc11 from "../../assets/tacc11.png";
import tacc12 from "../../assets/tacc12.png";
import tacc13 from "../../assets/tacc13.png";
import tacc14 from "../../assets/tacc14.png";
import tacc15 from "../../assets/tacc15.png";
import tacc16 from "../../assets/tacc16.png";
import tacc17 from "../../assets/tacc17.png";
import tacc18 from "../../assets/tacc18.png";
import tacc19 from "../../assets/tacc19.png";
import tacc20 from "../../assets/tacc20.png";
import tacc21 from "../../assets/tacc21.png";
import tacc22 from "../../assets/tacc22.png";
import tacc23 from "../../assets/tacc23.png";
import tacc24 from "../../assets/tacc24.png";

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
          Client 01 · AI Coding Tutor
        </p>
      </div>

      <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "9px 13px",
            borderRadius: 999,
            background: "var(--text)",
            color: "var(--background)",
            fontSize: 12,
            fontWeight: 650,
          }}
        >
          AI Coding Tutor
        </span>
        <a
          href="/portfolio/work/strabospot"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "9px 13px",
            borderRadius: 999,
            border: "1px solid var(--hairline-weak)",
            color: "var(--text)",
            textDecoration: "none",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          StraboSpot Inc →
        </a>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <header style={{ marginBottom: 72 }}>
      <p style={{ ...label, marginBottom: 12 }}>
        SGX3 · UX CONSULTING · AI · EDUCATION
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
        AI Coding Tutor
      </h1>
      <p
        style={{
          fontSize: "clamp(21px, 4vw, 28px)",
          lineHeight: 1.25,
          letterSpacing: "-0.3px",
          fontWeight: 500,
          margin: "0 0 14px",
          maxWidth: 760,
        }}
      >
        A capable AI system needed a clearer learning model.
      </p>
      <p style={{ ...body, fontSize: 17 }}>
        Texas Advanced Computing Centre TACC AI coding interview tool had useful AI capability, but the interface left students unsure where to start, what the chatbot was for, and what to do next.
      </p>
    </header>
  );
}

function RoleAtTop() {
  const items = [
    ["Role", "UX Consultant"],
    ["Client", "Dr. Bobby Hodgkinson · TACC"],
    ["SGX3", "Paul Parsons · Linh Pham · Claire Stirm"],
    ["Scope", "Heuristic evaluation · comparative analysis · interaction recommendations · survey framework"],
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
          Translating AI capability into clearer learning interactions.
        </h2>
      </div>

      <div
        className="tacc-role-grid"
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
    <div style={{ marginBottom: 30, maxWidth: 760 }}>
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
      <img src={src} alt={`TACC client deck slide ${number}`} style={slideBase} />
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
        <span>CLIENT SLIDE {String(number).padStart(2, "0")} / 24</span>
        {caption ? <span style={{ textAlign: "right", maxWidth: 520 }}>{caption}</span> : null}
      </figcaption>
    </figure>
  );
}

function SlidePair({ left, right, leftCaption, rightCaption }) {
  return (
    <div
      className="tacc-slide-pair"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: 18,
      }}
    >
      <Slide src={left} number={leftCaption?.number || ""} caption={leftCaption?.text} />
      <Slide src={right} number={rightCaption?.number || ""} caption={rightCaption?.text} />
    </div>
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

function TwoColumnNote({ leftLabel, left, rightLabel, right }) {
  return (
    <div
      className="tacc-note-grid"
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
        A better interface started with a better question.
      </h2>
      <p style={body}>
        Instead of adding more AI capability, the engagement focused on making existing capability easier to understand, easier to act on, and easier to learn from. The handoff also gave the product team a research framework for the next round of student learning.
      </p>
    </section>
  );
}

export default function TACC() {
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
      <Slide src={tacc1} number={1} caption="SGX3 · interface evaluation & design recommendation" />

      <RoleAtTop />

      <main style={{ display: "flex", flexDirection: "column", gap: 112 }}>
        {/* 01 */}
        <section>
          <SectionHeading
            number="01 — THE FIRST DECISION"
            title="The problem had to be narrowed."
            intro="The engagement covered an AI-powered coding interview tool. The highest-leverage opportunity was the chatbot experience, so the work centered there."
          />
          <SlidePair
            left={tacc2}
            right={tacc3}
            leftCaption={{ number: 2, text: "Engagement summary" }}
            rightCaption={{ number: 3, text: "Scope and sequence" }}
          />
          <InsightLine>
            The first consulting move was scope: improve the interaction around the AI, not the AI itself.
          </InsightLine>
        </section>

        {/* 02 */}
        <section>
          <SectionHeading
            number="02 — DIAGNOSE BEFORE REDESIGNING"
            title="The problem was not just bad UI."
            intro="A heuristic pass exposed deeper issues around orientation, feedback, system status, and recovery."
          />
          <Slide src={tacc4} number={4} caption="Heuristic evaluation" />
          <div style={{ marginTop: 24 }}>
            <Slide src={tacc5} number={5} caption="Nielsen's 10 heuristics used for the review" />
          </div>
          <div style={{ marginTop: 24 }}>
            <Slide src={tacc6} number={6} caption="Findings grouped by severity" />
          </div>
          <TwoColumnNote
            leftLabel="SURFACE PROBLEMS"
            left="Empty states. Dense responses. Weak hierarchy. Little progress visibility."
            rightLabel="SYSTEMIC ISSUE"
            right="Students were being asked to understand the product before the product explained itself."
          />
        </section>

        {/* 03 */}
        <section>
          <SectionHeading
            number="03 — REFRAME THE EXPERIENCE"
            title="The chatbot needed a learning model."
            intro="The recommendation shifted the flow from open-ended chat toward orientation, guided interaction, feedback, and a clear next step."
          />
          <Slide src={tacc7} number={7} caption="Design recommendations" />
          <InsightLine>
            Orient → practice → reflect → continue.
          </InsightLine>
        </section>

        {/* 04 */}
        <section>
          <SectionHeading
            number="04 — THE FIRST MOMENT"
            title="The first question: what should happen next?"
            intro="The empty chat made the student solve a product question before solving a coding question."
          />
          <SlidePair
            left={tacc8}
            right={tacc9}
            leftCaption={{ number: 8, text: "Current onboarding" }}
            rightCaption={{ number: 9, text: "Clearer first interaction" }}
          />
          <div style={{ marginTop: 22 }}>
            <Slide src={tacc10} number={10} caption="Suggested prompts, guidance, and expectations" />
          </div>
          <InsightLine>
            Good onboarding does not teach every feature. It removes the first decision.
          </InsightLine>
        </section>

        {/* 05 */}
        <section>
          <SectionHeading
            number="05 — DON'T LET AI DO THE THINKING"
            title="The chatbot had to teach, not only answer."
            intro="When a student was stuck, the interface could scaffold the reasoning instead of jumping straight to a solution."
          />
          <Slide src={tacc11} number={11} caption="Current conversation experience" />
          <div style={{ marginTop: 22 }}>
            <SlidePair
              left={tacc12}
              right={tacc13}
              leftCaption={{ number: 12, text: "Guided questions" }}
              rightCaption={{ number: 13, text: "Clearer structure and next steps" }}
            />
          </div>
          <InsightLine>
            The key change was not more explanation. It was better scaffolding.
          </InsightLine>
        </section>

        {/* 06 */}
        <section>
          <SectionHeading
            number="06 — MAKE FEEDBACK LEAD SOMEWHERE"
            title="A score is not the end of learning."
            intro="Feedback needed to become another useful action, not a dead end."
          />
          <SlidePair
            left={tacc14}
            right={tacc15}
            leftCaption={{ number: 14, text: "Current grading and feedback" }}
            rightCaption={{ number: 15, text: "Concepts, attempts, and actionable next steps" }}
          />

          <div style={{ marginTop: 58 }}>
            <p style={{ ...label, marginBottom: 9 }}>16–17 · PRODUCT PERSONALITY</p>
            <p style={{ ...body, marginBottom: 22 }}>
              A clearer learning flow still needed a recognizable product voice. The recommendation explored a friendlier identity and a lighter first message without hiding AI limits.
            </p>
            <SlidePair
              left={tacc16}
              right={tacc17}
              leftCaption={{ number: 16, text: "Current branding" }}
              rightCaption={{ number: 17, text: "Recommended product personality" }}
            />
          </div>

          <InsightLine>
            The next action should be easier to see than the score.
          </InsightLine>
        </section>

        {/* 07 */}
        <section>
          <SectionHeading
            number="07 — MAKE PROGRESS VISIBLE"
            title="Learning should look like progress."
            intro="The interface showed very little about where a student was in the interview. A stronger progress model made effort and closure easier to read."
          />
          <SlidePair
            left={tacc18}
            right={tacc19}
            leftCaption={{ number: 18, text: "Current progress visibility" }}
            rightCaption={{ number: 19, text: "Recommended progress model" }}
          />
          <InsightLine>
            Visibility turns a conversation into a journey.
          </InsightLine>
        </section>

        {/* 08 */}
        <section>
          <SectionHeading
            number="08 — DON'T STOP AT THE INTERFACE"
            title="The client also needed the next question."
            intro="The engagement ended with a research framework the product team could use to learn about students, adoption, and trust beyond the first redesign."
          />
          <Slide src={tacc20} number={20} caption="Survey question framework" />
          <div style={{ marginTop: 22 }}>
            <Slide src={tacc21} number={21} caption="Survey structure" />
          </div>
          <div style={{ marginTop: 22 }}>
            <Slide src={tacc22} number={22} caption="Context and preparation workflow" />
          </div>
          <div style={{ marginTop: 22 }}>
            <Slide src={tacc23} number={23} caption="Moments of need and AI expectations" />
          </div>
          <div style={{ marginTop: 22 }}>
            <Slide src={tacc24} number={24} caption="Trust boundaries and open reflection" />
          </div>
          <InsightLine>
            A strong consulting handoff leaves the team with a way to keep learning.
          </InsightLine>
        </section>
      </main>

      <FinalTakeaway />

      <div
        className="tacc-meta-grid"
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
          ["Client", "TACC · Dr. Bobby Hodgkinson"],
          ["SGX3", "Paul Parsons · Linh Pham · Claire Stirm"],
          ["Methods", "Heuristic evaluation · comparative analysis · survey framework"],
        ].map(([k, v]) => (
          <div key={k}>
            <p style={{ ...label, fontSize: 10, marginBottom: 6 }}>{k}</p>
            <p style={{ fontSize: 14, lineHeight: 1.48, margin: 0, color: "var(--muted)" }}>{v}</p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 760px) {
          .tacc-role-grid,
          .tacc-note-grid,
          .tacc-slide-pair,
          .tacc-meta-grid {
            grid-template-columns: 1fr !important;
          }

          .tacc-slide-pair figure + figure {
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
