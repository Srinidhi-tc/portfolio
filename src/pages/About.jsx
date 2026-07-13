// ── ABOUT PAGE REWRITE ─────────────────────────────────────────────────────
// Drop-in replacement for your current About.jsx copy.
// Keeps your voice and structure. Adds metrics, scale signals, and Meta-relevant framing.
// Only the text strings change — all component imports and layout stay identical.

import ProfilePhoto from "../components/ui/ProfilePhoto";
import CollaboratorNotes from "../sections/CollaboratorNotes";

export default function About() {
  return (
    <>
      <section className="page-section">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3xl)", alignItems: "start" }}>
          <div>
            <p className="eyebrow" style={{ visibility: "hidden" }}>About</p>

            {/* CHANGED: was "Health + AI + Research" — too vague for a hiring manager scan */}
            <h1 className="page-title" style={{ maxWidth: "none" }}>
              Product Designer. Researcher. Built on Psychology.
            </h1>

            {/* CHANGED: added MS graduation date, named outcomes, removed passive "I believe" opener */}
            <p className="page-copy">
              I'm a product designer completing my Master's in User Experience
              Design at Purdue University (May 2026), with an undergraduate
              degree in Psychology. I've spent 4+ years turning complex,
              ambiguous product problems into high-craft experiences that ship
              — across AI systems, cybersecurity platforms, and enterprise tools
              serving 10,000+ users.
            </p>

            {/* CHANGED: added what the psychology background actually produces (metrics) */}
            <p className="page-copy">
              My psychology and statistics background isn't decorative — it's
              how I run mixed-methods research, model user behavior, and make
              design decisions that hold up under scrutiny. It's why my work
              at DefenseARK reduced decision latency by 30%, and why the
              interfaces I designed at Microsoft Azure cut alert fatigue by 35%.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              gap: "var(--space-md)",
            }}
          >
            <ProfilePhoto />
          </div>
        </div>

        <div className="about-section" style={{ marginTop: "var(--space-3xl)" }}>
          {/* CHANGED: was "Connecting Empathy with Execution" — kept the idea, made it concrete */}
          <h2 className="about-heading">
            Empathy is the Starting Point. Execution is the Job.
          </h2>

          {/* CHANGED: added "at scale," removed "soft" — signals readiness for large-scale products */}
          <p className="about-text">
            I align user needs with business outcomes — at scale. Good design
            doesn't just solve problems; it changes how people experience
            something they couldn't imagine being different. I build for that
            moment: when a product stops feeling like software and starts
            feeling like it was made for exactly this person, right now.
          </p>
          <p className="about-text">
            I create interfaces that feel intentional and trustworthy — where
            users move without friction, make decisions with confidence, and
            come back because the experience earned it.
          </p>
        </div>

        <div className="about-section">
          {/* KEPT: this section works well — just tightened the answer */}
          <h2 className="about-heading">
            How is Psychology Connected to Design?
          </h2>
          <p className="about-text">
            Psychology gives me the lens to understand why people behave the
            way they do — cognitive load, decision fatigue, trust signals,
            habit formation. Design gives me the tools to work with those
            patterns, not against them. Together, they let me build products
            that aren't just usable: they're predictable, trustworthy, and
            quietly delightful to the people using them every day.
          </p>
        </div>

        <div className="about-section">
          {/* KEPT: hobbies section is fine — shows personality without oversharing */}
          <h2 className="about-heading">Outside of Design</h2>
          <div className="hobbies-list">
            {["Gym", "Museums", "Libraries", "Architecture Walks"].map(
              (hobby) => (
                <span key={hobby} className="tag">
                  {hobby}
                </span>
              )
            )}
          </div>
        </div>
      </div>
      </section>
      <CollaboratorNotes />
    </>
  );
}

// ── CHANGE SUMMARY ──────────────────────────────────────────────────────────
//
// h1 headline
//   BEFORE: "Health + AI + Research"
//   AFTER:  "Product Designer. Researcher. Built on Psychology."
//   WHY:    Hiring managers need to know what you are in 2 seconds.
//           The new headline names the role, names the differentiator.
//
// Paragraph 1
//   BEFORE: "I believe small design decisions compound into real human outcomes."
//   AFTER:  4+ years, May 2026, 10,000+ users — specific, scannable, credible.
//   WHY:    "I believe" is an opinion. Hiring managers want evidence.
//
// Paragraph 2
//   BEFORE: "My background in psychology... helps me uncover hidden insights"
//   AFTER:  Same idea + 30% decision latency reduction + 35% alert fatigue reduction
//   WHY:    The psychology claim needs proof. Two metrics from your resume
//           turn a soft claim into a demonstrated capability.
//
// Section heading 1
//   BEFORE: "Connecting Empathy with Execution"
//   AFTER:  "Empathy is the Starting Point. Execution is the Job."
//   WHY:    More direct. Signals you know the difference between caring
//           about users and actually shipping — which Meta evaluates for.
//
// Section body 1
//   BEFORE: "interfaces that feel soft, intentional, and safe"
//   AFTER:  "interfaces that feel intentional and trustworthy" + "at scale"
//   WHY:    "Soft" reads as junior. "At scale" signals Meta-level ambition.
//           "Trustworthy" is a stronger word for the same intent.
//
// Psychology section
//   BEFORE: "products that aren't just usable — they're deeply human"
//   AFTER:  Named the specific psychology concepts (cognitive load, decision
//           fatigue, trust signals, habit formation) + "predictable, trustworthy"
//   WHY:    Naming the concepts proves you have the knowledge, not just
//           the interest. Hiring managers from Meta's research-heavy teams
//           will recognise these terms and trust the claim.
//
// KEPT UNCHANGED:
//   - All imports, component structure, layout, grid, spacing
//   - Hobbies section (personality signal — leave it)
//   - CollaboratorNotes component
//   - All className and style props
