import Button from "../components/ui/Button";

export default function CommunityPreview() {
  return (
    <section className="page-section" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="container" style={{ textAlign: "center", maxWidth: "600px" }}>
        <p className="eyebrow">Community</p>
        <h2 style={{ fontSize: "var(--text-3xl)", margin: "0 0 var(--space-md)", fontWeight: 700 }}>
          💛 1 Chapter 1 Day!
        </h2>
        <p className="page-copy" style={{ margin: "0 auto var(--space-xl)" }}>
          Summaries and key applications on serious design books — delivered
          every day on LinkedIn. Let's fight Brain rot together.
        </p>
        <Button to="/community" variant="primary">
          Learn More
        </Button>
      </div>
    </section>
  );
}
