import { community } from "../data/community";
import Button from "../components/ui/Button";

export default function Community() {
  const { newsletter, ama, social } = community;

  return (
    <section className="page-section">
      <div className="container">
        <div className="community-hero">
          <h1 className="page-title" style={{ maxWidth: "none", fontSize: "var(--text-4xl)" }}>
            {newsletter.heading}
          </h1>

          <p className="community-tagline">
            {newsletter.emoji} {newsletter.tagline}
          </p>
          <p className="community-detail" style={{ fontWeight: 600 }}>
            {newsletter.platform}
          </p>

          <p className="community-detail">{newsletter.description}</p>
          <p className="community-detail">{newsletter.pitch}</p>
          <p className="community-detail">{newsletter.details}</p>
          <p className="community-detail" style={{ fontWeight: 600 }}>
            Goal: {newsletter.goal}
          </p>

          <p className="community-cta">{newsletter.cta}</p>

          <div style={{ display: "flex", justifyContent: "center", gap: "var(--space-md)", marginTop: "var(--space-xl)" }}>
            <Button href={social.linkedin} variant="primary">
              Subscribe on LinkedIn
            </Button>
            <Button href={`mailto:${social.email}`} variant="outline">
              Email Me
            </Button>
          </div>
        </div>

        <div className="ama-section">
          <h2 className="ama-heading">
            {ama.heading} {ama.emoji}
          </h2>
          <div style={{ marginTop: "var(--space-xl)" }}>
            <Button href={`mailto:${social.email}`} variant="outline">
              Ask a Question
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
