// DecisionObject — the signature component for documenting design reasoning:
// what was decided, why, what evidence supported it, and what it cost.
// Any field left out is simply not rendered; this never invents content.
export default function DecisionObject({ decision, why, evidence, tradeoff }) {
  const fields = [
    why && { label: "Why", body: why },
    evidence && { label: "Evidence", body: evidence },
    tradeoff && { label: "Trade-off", body: tradeoff },
  ].filter(Boolean);

  return (
    <div className="decision-object">
      <p className="decision-object__label">
        <span className="decision-object__dot" aria-hidden="true" />
        Decision
      </p>
      <p className="decision-object__decision">{decision}</p>

      {fields.length > 0 && (
        <div className="decision-object__grid">
          {fields.map((f) => (
            <div key={f.label}>
              <p className="decision-object__field-label">{f.label}</p>
              <p className="decision-object__field-body">{f.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
