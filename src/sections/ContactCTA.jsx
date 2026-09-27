import Button from "../components/ui/Button";

export default function ContactCTA() {
  return (
    <section className="page-section" style={{ textAlign: "center" }}>
      <div className="container">
        <p className="eyebrow">Currently writing papers for CHI 2027, connect for colloboration</p>
        <h2 style={{ fontSize: "var(--text-3xl)", margin: "0 0 var(--space-md)", fontWeight: 700 }}>
       I used figma alongside artificial-intelligence-driven tools such as Cursor and Claude Code to turn ideas into working experiences quickly.
        </h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "var(--space-md)", flexWrap: "wrap" }}>
          <Button href="https://www.linkedin.com/in/srinidhi-chakravarthy/" variant="primary">
            LinkedIn
          </Button>
          <Button href="mailto:srinidhi.saas@gmail.com" variant="outline">
            Email Me
          </Button>
        </div>
      </div>
    </section>
  );
}
