import Button from "../components/ui/Button";

export default function ContactCTA() {
  return (
    <section className="page-section" style={{ textAlign: "center" }}>
      <div className="container">
        <p className="eyebrow">Get in touch</p>
        <h2 style={{ fontSize: "var(--text-3xl)", margin: "0 0 var(--space-md)", fontWeight: 700 }}>
          If you want help with making your website, connect with me on LinkedIn!
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
