// PsychosisLiteracy.jsx
// Images: name your slides cap1.jpg → cap33.jpg and place in src/assets/
// Only key slides are used — not all 33 are shown

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

const font = `-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif`;

const label = {
  fontSize: 11, fontWeight: 600, letterSpacing: "0.08em",
  textTransform: "uppercase", color: "#86868B", margin: 0,
};
const body = {
  fontSize: 16, lineHeight: 1.65, color: "#3A3A3C", margin: 0, maxWidth: 680,
};
const slideImg = {
  width: "100%", display: "block", borderRadius: 14,
  background: "#F5F5F7",
};

function Section({ number, title, intro, children }) {
  return (
    <section style={{ marginBottom: 96 }}>
      <div style={{ marginBottom: 28, maxWidth: 720 }}>
        <p style={{ ...label, marginBottom: 10 }}>{number}</p>
        <h2 style={{ margin: "0 0 14px", fontSize: "clamp(26px, 4vw, 40px)", lineHeight: 1.08, letterSpacing: "-0.5px", fontWeight: 650, color: "#1D1D1F" }}>
          {title}
        </h2>
        {intro && <p style={body}>{intro}</p>}
      </div>
      {children}
    </section>
  );
}

function Slide({ src, caption }) {
  return (
    <figure style={{ margin: "0 0 10px" }}>
      <img src={src} alt={caption || ""} style={slideImg} />
      {caption && (
        <figcaption style={{ marginTop: 8, fontSize: 12, color: "#86868B", lineHeight: 1.4 }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function Insight({ children }) {
  return (
    <div style={{ margin: "28px 0", padding: "18px 0", borderTop: "1px solid #E5E5EA", borderBottom: "1px solid #E5E5EA" }}>
      <p style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "#1D1D1F", lineHeight: 1.5 }}>{children}</p>
    </div>
  );
}

function StatRow({ stats }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${stats.length}, 1fr)`, gap: 16, margin: "32px 0" }}>
      {stats.map(({ value, label: lbl }) => (
        <div key={lbl} style={{ background: "#F5F5F7", borderRadius: 12, padding: "18px 20px" }}>
          <span style={{ display: "block", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, color: "#1D1D1F", letterSpacing: "-0.3px", marginBottom: 4 }}>{value}</span>
          <span style={{ fontSize: 12, color: "#86868B", lineHeight: 1.4 }}>{lbl}</span>
        </div>
      ))}
    </div>
  );
}

export default function PsychosisLiteracy() {
  return (
    <div style={{ fontFamily: font, color: "#1D1D1F", maxWidth: 1000, margin: "0 auto", padding: "32px 28px 120px", WebkitFontSmoothing: "antialiased" }}>

      {/* DISCLAIMER */}
      <div style={{ background: "#1D1D1F", color: "#F5F5F7", borderRadius: 12, padding: "16px 20px", marginBottom: 48, fontSize: 13, lineHeight: 1.5 }}>
        <strong>Disclaimer:</strong> This project contains psychoeducation content and simulated visual imagery of hallucinations. Designed for educational purposes only.
      </div>

      {/* HERO */}
      <header style={{ marginBottom: 72 }}>
        <p style={{ ...label, marginBottom: 14 }}>Purdue Capstone 2026 · Health Tech · Youth Mental Health</p>
        <h1 style={{ fontSize: "clamp(44px, 8vw, 80px)", fontWeight: 700, letterSpacing: "-1px", lineHeight: 0.98, margin: "0 0 20px", color: "#1D1D1F" }}>
          Percepta
        </h1>
        <p style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 500, color: "#3A3A3C", letterSpacing: "-0.2px", margin: "0 0 16px", maxWidth: 720 }}>
          How You See Matters.
        </p>
        <p style={{ ...body, fontSize: 18, color: "#6E6E73" }}>
          A psychoeducation tool that builds basic awareness about psychosis — visual and auditory hallucinations for students and office-goers ages 15–25, at in schools and workplaces, before onset education.
        </p>
      </header>

      {/* HERO SLIDE — the one full-width image */}
      <div style={{ marginBottom: 80 }}>
        <img src={cap25} alt="Percepta — Capstone 2026"
             style={{ width: "100%", borderRadius: 18, display: "block" }} />
      </div>

      {/* ROLE */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 80, paddingTop: 32, borderTop: "1px solid #E5E5EA" }}>
        {[
          ["Role", "UX Designer · Solo Capstone"],
          ["Committee", "Prof. Rua · Prof. Paul · Prof. Anastasia · Prof. Nancy · Prof. Shobhan shah (Advisor)"],
          ["My Role", "Information architecture · Expert interviews · Usability testing · Computer vision integration · Base44: Vibe-Coding"],
        ].map(([k, v]) => (
          <div key={k}>
            <p style={{ ...label, fontSize: 10, marginBottom: 6 }}>{k}</p>
            <p style={{ fontSize: 14, color: "#3A3A3C", lineHeight: 1.5, margin: 0 }}>{v}</p>
          </div>
        ))}
      </div>

      {/* 01 THE PROBLEM */}
      <Section
        number="01 — THE GAP"
        title="50% of US schools have no psychoeducator. 100,000+ teenagers develop psychosis each year."
        intro="Psychosis begins in late teens to mid-20s. Without education, students turn to substances, self-harm, and isolation. Crime rates increase 2.5× in populations with untreated psychosis. The awareness gap is the design problem."
      >
        <Slide src={cap2} caption="Institute of Educational Sciences, May 2024 — 48% of public schools cannot effectively provide mental health services to students who need them." />
        <StatRow stats={[
          { value: "100k+", label: "teenagers develop psychosis each year (NIMH)" },
          { value: "50%", label: "of US schools lack in-house psychoeducators" },
          { value: "2.5×", label: "increase in crime rate with untreated psychosis" },
          { value: "70%", label: "of patients with psychosis experience insomnia" },
        ]} />
        <Insight>The gap is NOT treatment. It is awareness before onset, for ages 15–25 while still in school. </Insight>
      </Section>

      {/* 02 RESEARCH */}
      <Section
        number="02 — RESEARCH · JOURNEY MAPPING"
        title="Mapping a day in the life of someone with psychosis."
        intro="I mapped Mr. KP's full day — waking up, commute, work, night time — to find where emotional hallucinations peak and where intervention is possible."
      >
        <Slide src={cap9} caption="Customer journey map: Mr. KP's day — waking up through night time. Emotional hallucinations peak at work. Night time is most frightening." />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 24 }}>
          {[
            ["Waking up", "Hallucinations begin at start of day. Routine overpowers them with morning prayers, music, and constant support."],
            ["At work", "Emotional hallucinations are overwhelming. Difficulty distinguishing friend from threat."],
            ["Commute home", "Visual and auditory hallucinations occur simultaneously. Camera on phone helps navigate."],
            ["Night time", "Weakest willpower. Most frightening. Night hallucinations are the hardest to cope with."],
          ].map(([stage, insight]) => (
            <div key={stage} style={{ background: "#F5F5F7", borderRadius: 10, padding: "16px 18px" }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#86868B", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>{stage}</p>
              <p style={{ fontSize: 14, color: "#3A3A3C", lineHeight: 1.55, margin: 0 }}>{insight}</p>
            </div>
          ))}
        </div>
        <Insight>Touch point: School is the right intervention moment. Value education, art class, biology, mental health day. Awareness needs to land before onset.</Insight>
      </Section>

      {/* 03 resolving ambiguity */}
      <Section
        number="03 — RESOLVING AMBIGUITY"
        title="At interviews were descriptive about experiences"
        intro="I used information architecture to narrow down which hallucination effects were clinically validated. A flowchart forces correct categorisation and prevents misrepresentation — something verbal interviews alone cannot guarantee."
      >
        <Slide src={cap22} caption="Section 1 of the visual hallucination image architecture — categories: neutral, shadows, hands, fireworks, smoke, shaky/blurred, animals, slight distortions, colours, random patterns. Each validated against medical case studies." />
        <Insight>The architecture decision: show only what psychologists validate. Every visual effect was checked against clinical evidence before inclusion.</Insight>
      </Section>

      {/* 04 SOLUTION */}
      <Section
        number="04 — THE SOLUTION"
        title="Show, don't tell. Use the back camera."
        intro="Instead of describing hallucinations in text, Percepta uses the device camera to place hallucination effects on the user's real environment. Back camera is used by default — to show how people with hallucinations see the world."
      >
        <Slide src={cap14} caption="Percepta onboarding: '100,000+ teenagers experience psychosis each year for the first time. This experience simulates mild perceptual changes to build empathy and understanding. You can exit at any time.' — Designed for ages 15–25 · Educational purposes only." />
          <div style={{ marginTop: 20 }}>
          <Slide src={cap19} caption="5 types of visual hallucination: Colours, Blur, Smoke, Bubbles, Shadows, Faces & Hands." />
          <Slide src={cap20} caption="5 types of auditory hallucination: Whispers, Self-Talk, Two Voices, Footsteps, Commands." />
          </div>
          <div style={{ marginTop: 20 }}>
          <Slide src={cap18} caption="Filter selection screen — UX Heuristic: Match between system and real world. Filters work like gallery filters. 'Did anything feel off?' — reflection prompt after the experience." />
          </div>
        <Insight>Back camera is the right choice. Hallucinations happen in the external world, not the face. Designing for the right point of view changes everything.</Insight>
      </Section>

      {/* 05 TESTING */}
      <Section
        number="05 — TESTING  WITH EXPERTS"
        title="5 psychologists from Purdue Psychological Sciences and CAPS."
        intro="I interviewed 5 psychologists from Purdue's Psychology department and CAPS to validate the hallucination architecture and messaging approach."
      >
        <Slide src={cap23} caption="Expert validation sessions — Purdue Psychological Sciences and CAPS. Room 1252: L. Gomez, C. Rodriguez, S. Rubi. Room 1255: K. Haskett. Room 2169: C. Lim-Kessler." />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 24 }}>
          {[
            ["Do not segregate user groups", "Give common, inclusive messaging — Simple · Inclusive · Unconditional Positive Regard"],
            ["Add a big EXIT button", "Users must be able to leave immediately without friction. Safety first."],
            ["Validated the architecture", "The flowchart categorisation of hallucination types was confirmed clinically appropriate."],
            ["Language matters", "Messaging must be non-stigmatising and avoid clinical jargon for a teen audience."],
          ].map(([finding, detail]) => (
            <div key={finding} style={{ background: "#F5F5F7", borderRadius: 10, padding: "16px 18px" }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#1D1D1F", marginBottom: 6 }}>{finding}</p>
              <p style={{ fontSize: 13, color: "#6E6E73", lineHeight: 1.55, margin: 0 }}>{detail}</p>
            </div>
          ))}
        </div>
        <Insight>Psychologists confirmed: architecture is correct. Exit button is non-negotiable. Messaging must show unconditional positive regard.</Insight>
      </Section>

      {/* 06 HELP-SEEKING */}
      <Section
        number="06 — AFTER THE EXPERIENCE"
        title="3 ways to ask for help. 988 is always visible."
        intro="After the simulation, Percepta shows a clear, non-stigmatising help pathway. The 988 Suicide & Crisis Lifeline is shown on the final screen — every time."
      >
        <Slide src={cap21} caption="'3 Ways to Ask for Help: Talk to someone you trust — A friend, family member, or someone who makes you feel safe. Reach out to a counselor — School counselors and teachers are trained to help connect you with support. Seek professional support — Mental health professionals can provide proper assessment and care. If you or someone you know needs immediate help: 988 Suicide & Crisis Lifeline — Call or text 988 · Available 24/7.' — UX Heuristic: Help Users With Errors." />
        <Insight>10/10 users in testing reached this page. 5/10 read through the full content. The helpline got major visibility.</Insight>
      </Section>

      {/* 07 USER TESTING */}
      <Section
        number="07 — USER TESTING · 3 PHASES"
        title="10 users. 3 phases. Numbers that shaped every decision."
      >
        <Slide src={cap27} caption="Product link: https://app.base44.com/apps/69c1a0c9aa1a1e3081429008/editor/preview" />
        <StatRow stats={[
          { value: "8/10",  label: "preferred fast load directly into the experience — removed intro text" },
          { value: "10/10", label: "correctly identified types of visual hallucination after use" },
          { value: "7/10",  label: "correctly identified auditory hallucination types" },
          { value: "10/10", label: "reached the help-seeking page" },
        ]} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 8 }}>
          {[
            ["Phase 1 · Landing Page", "8/10 preferred a quick load directly to the experience. Shows preference for visuals over text."],
            ["Phase 2 · Awareness", "10/10 identified visual hallucination types. 7/10 identified auditory. Architecture worked."],
            ["Phase 3 · Help-Seeking", "10/10 reached the help page. 5/10 read through fully. Helpline got major visibility."],
          ].map(([phase, result]) => (
            <div key={phase} style={{ background: "#F5F5F7", borderRadius: 10, padding: "16px 18px" }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#86868B", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{phase}</p>
              <p style={{ fontSize: 13, color: "#3A3A3C", lineHeight: 1.55, margin: 0 }}>{result}</p>
            </div>
          ))}
        </div>
        <Insight>The architecture decisions worked. Every user reached help-seeking. Awareness transferred. The simulation created empathy, not distress.</Insight>
      </Section>

      {/* 08 TRADE-OFFS */}
      <Section
        number="08 — TRADE-OFFS & CHALLENGES"
        title="What I chose not to build. And why."
      >
        <Slide src={cap31} caption="Trade-offs and challenges — For competitor analysis, paper prototypes, wireframes, initial mockups, and secondary research: Access documentation." />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 24 }}>
          <div>
            <p style={{ ...label, marginBottom: 12 }}>Trade-offs</p>
            {[
              "No data-heavy hallucination effects that require strong internet connections — accessibility over spectacle",
              "English only for V1 — validate the model before scaling language support",
              "No peer-to-peer features — no unsupervised surfaces for this user group",
            ].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10 }}>
                <span style={{ color: "#86868B", flexShrink: 0, marginTop: 2 }}>—</span>
                <p style={{ fontSize: 14, color: "#3A3A3C", lineHeight: 1.55, margin: 0 }}>{t}</p>
              </div>
            ))}
          </div>
          <div>
            <p style={{ ...label, marginBottom: 12 }}>Challenges</p>
            {[
              "Sensitivity of the topic needs continuous care — this is always a work in progress",
              "Hallucination representation must be clinically validated — not aesthetically driven",
              "Exit must always be visible — no user should feel trapped in the simulation",
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10 }}>
                <span style={{ color: "#86868B", flexShrink: 0, marginTop: 2 }}>—</span>
                <p style={{ fontSize: 14, color: "#3A3A3C", lineHeight: 1.55, margin: 0 }}>{c}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <div style={{ borderTop: "1px solid #E5E5EA", paddingTop: 40, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
        {[
          ["Type",    "Capstone · Health Tech · Youth Mental Health"],
          ["Tools",   "Figma · Base44 · Computer Vision · Python"],
          ["Impact",  "10/10 reached help-seeking · 100% hallucination type recognition on visual"],
        ].map(([k, v]) => (
          <div key={k}>
            <p style={{ ...label, fontSize: 10, marginBottom: 5 }}>{k}</p>
            <p style={{ fontSize: 14, color: "#3A3A3C", lineHeight: 1.5, margin: 0 }}>{v}</p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 680px) {
          .cap-grid-2 { grid-template-columns: 1fr !important; }
          .cap-grid-3 { grid-template-columns: 1fr !important; }
        }
      `}</style>

    </div>
  );
}
