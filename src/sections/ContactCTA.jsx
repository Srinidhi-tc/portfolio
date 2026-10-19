import ContactLinks from "../components/ui/ContactLinks";

export default function ContactCTA() {
  return (
    <section className="page-section">
      <div className="container">
        <h2 style={{ fontSize: "var(--type-display)", margin: "0 0 var(--space-md)", fontWeight: 700 }}>
          Let's Build Awesome Stuff
        </h2>
        <ContactLinks />
      </div>
    </section>
  );
}
