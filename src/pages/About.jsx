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
            <h1 className="page-title" style={{ maxWidth: "none" }}>
              I started in psychology. I ended up in design. Both ask the same question.
            </h1>
            <p className="page-copy">
              Why does this feel harder than it should?
            </p>
            <p className="page-copy">
              I'm Srinidhi
              A product designer with a Master's in UX from Purdue and a background in statistics and psychology. I've designed across AI systems, cybersecurity platforms, enterprise tools, physical products, and residential interiors. I'm drawn to complexity wherever it lives.
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
          <h2 className="about-heading">What makes me unusual</h2>
          <div className="hobbies-list" style={{ flexDirection: "column", alignItems: "flex-start", gap: "12px" }}>
            {[
              "I ran an interior design consultancy for 2 years — real clients, real budgets, real construction",
              "I designed a robotic toilet cleaner from CMF to manufacturing",
              "I've done UX for cybersecurity platforms under NDA and youth mental health apps going to CHI 2026",
              "My psychology degree is a differentiator, it's visible in how I frame problems",
              "I think restraint is a skill. The best interfaces are the ones you stop noticing",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <span style={{ color: "var(--color-text-tertiary, #86868B)", flexShrink: 0, marginTop: 2 }}>—</span>
                <p className="about-text" style={{ margin: 0 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="about-section">
          <h2 className="about-heading">How I work</h2>
          <p className="about-text">
            I move between research and craft without losing either. I can run a usability study and redesign the component it exposes in the same week. I care about the 8pt grid and I care about whether the product actually changes someone's day.
          </p>
          <p className="about-text">
            I'm drawn to problems where the stakes are real — healthcare, security, things people use when something matters.
          </p>
        </div>

        <div className="about-section">
          <h2 className="about-heading">Outside of design</h2>
          <div className="hobbies-list">
            {["Gym", "Museums", "Libraries", "Architectural Walks"].map(
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
