// Kicker — a quiet, conversational mini-subheading that sits above a section
// heading. Replaces the old "01 — PAIN POINTS" uppercase eyebrow pattern with
// a short sentence-case phrase. Used sparingly, not on every heading.
export default function Kicker({ children, style }) {
  return (
    <p
      style={{
        fontSize: "var(--type-body)",
        fontWeight: 400,
        color: "var(--color-muted)",
        margin: "0 0 var(--space-1)",
        ...style,
      }}
    >
      {children}
    </p>
  );
}
