import ContactLinks from "../components/ui/ContactLinks";

export default function ContactCTA() {
  return (
    <section className="page-section">
      <div className="container">
        <h2 style={{ fontSize: "var(--text-3xl)", margin: "0 0 var(--space-md)", fontWeight: 700 }}>
          What is your AI stack for vibe-coding design systems?
        </h2>
        <ContactLinks />
      </div>
    </section>
  );
}
