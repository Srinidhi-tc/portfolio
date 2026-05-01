import Button from "../components/ui/Button";
import ProfilePhoto from "../components/ui/ProfilePhoto";

export default function About() {
  return (
    <section className="page-section">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3xl)", alignItems: "start" }}>
          <div>
            <p className="eyebrow">About</p>
            <h1 className="page-title" style={{ maxWidth: "none" }}>
              Health + AI + Research
            </h1>
            <p className="page-copy">
              I'm a UX professional with a Master's in User Experience from
              Purdue University and an undergraduate degree in Psychology from
              India. I believe small design decisions compound into real human
              outcomes.
            </p>
            <p className="page-copy">
              My background in psychology, qualitative research, and statistics
              helps me uncover hidden insights that shape meaningful products.
            </p>
          </div>
          <ProfilePhoto />
        </div>

        <div className="about-section" style={{ marginTop: "var(--space-3xl)" }}>
          <h2 className="about-heading">
            Connecting Empathy with Execution
          </h2>
          <p className="about-text">
            I align user needs with business outcomes. Technology should feel
            human. I believe good design doesn't just solve problems — it
            restores agency.
          </p>
          <p className="about-text">
            I create interfaces that feel soft, intentional, and safe — where
            users can move without friction and connect without fear.
          </p>
        </div>

        <div className="about-section">
          <h2 className="about-heading">
            My Most Asked Question: How is Psychology and Design Connected?
          </h2>
          <p className="about-text">
            Psychology gives me the lens to understand why people behave the way
            they do. Design gives me the tools to shape those behaviors into
            positive experiences. Together, they let me create products that
            aren't just usable — they're deeply human.
          </p>
        </div>

        <div className="about-section">
          <h2 className="about-heading">Outside of Design</h2>
          <div className="hobbies-list">
            {["Gym", "Reading", "Swimming", "Exploring Restaurants"].map(
              (hobby) => (
                <span key={hobby} className="tag">
                  {hobby}
                </span>
              )
            )}
          </div>
        </div>

        <div className="about-section" style={{ textAlign: "center" }}>
          <p className="about-text" style={{ margin: "0 auto" }}>
            Want to chat? I'd love to connect.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "var(--space-md)", marginTop: "var(--space-xl)" }}>
            <Button href="https://www.linkedin.com/in/srinidhi-chakravarthy/" variant="primary">
              LinkedIn
            </Button>
            <Button href="mailto:srinidhi.saas@gmail.com" variant="outline">
              Email Me
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
