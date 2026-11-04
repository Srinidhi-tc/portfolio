import { projectSummaries } from "../../data/projectSummaries";

// Name (bold) and outcome (regular), shown right below a case study's title line.
export default function ProjectSummary({ id, color }) {
  const s = projectSummaries[id];
  return (
    <div style={{ marginTop: "var(--padding-small)", color }}>
      <p style={{ margin: 0, fontWeight: "var(--weight-bold)" }}>{s.name}</p>
      <p style={{ margin: 0, fontWeight: "var(--weight-regular)" }}>{s.outcome}</p>
    </div>
  );
}
